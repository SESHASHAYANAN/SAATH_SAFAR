
"""
GPT-OSS-120B Fine-tuning Implementation
A comprehensive Python script for loading, fine-tuning, and deploying OpenAI's GPT-OSS-120B model.

Author: AI Assistant
Date: September 2025
License: MIT

Requirements:
- PyTorch >= 2.0
- Transformers >= 4.55.0
- PEFT >= 0.17.0
- Datasets
- Wandb (optional, for experiment tracking)
- Flash Attention 2 (recommended)
"""

import os
import sys
import json
import time
import math
import logging
import argparse
import warnings
from pathlib import Path
from typing import Dict, List, Optional, Tuple, Union, Any
from dataclasses import dataclass, field
import traceback

import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.utils.data import Dataset, DataLoader, DistributedSampler
from torch.nn.parallel import DistributedDataParallel as DDP
import torch.distributed as dist

import numpy as np
from tqdm.auto import tqdm
import wandb

# Transformers and PEFT imports
from transformers import (
    AutoTokenizer, 
    AutoModelForCausalLM,
    AutoConfig,
    TrainingArguments,
    Trainer,
    DataCollatorForLanguageModeling,
    get_linear_schedule_with_warmup,
    get_cosine_schedule_with_warmup
)

from peft import (
    get_peft_model,
    LoraConfig,
    TaskType,
    prepare_model_for_kbit_training,
    PeftModel,
    PeftConfig
)

from datasets import Dataset as HFDataset

# Configure logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Suppress warnings
warnings.filterwarnings("ignore", category=UserWarning)
os.environ["TOKENIZERS_PARALLELISM"] = "false"


@dataclass
class ModelConfig:
    """Configuration class for GPT-OSS-120B model"""
    model_name: str = "openai/gpt-oss-120b"
    model_revision: str = "main"
    cache_dir: Optional[str] = None
    use_auth_token: Optional[str] = None
    torch_dtype: str = "bfloat16"
    device_map: str = "auto"
    max_memory: Optional[Dict[int, str]] = None
    offload_folder: Optional[str] = None
    low_cpu_mem_usage: bool = True
    trust_remote_code: bool = True
    use_flash_attention: bool = True
    attn_implementation: str = "flash_attention_2"


@dataclass
class LoRAConfig:
    """Configuration for LoRA fine-tuning"""
    r: int = 16
    lora_alpha: int = 32
    target_modules: List[str] = field(default_factory=lambda: [
        "q_proj", "k_proj", "v_proj", "o_proj",
        "gate_proj", "up_proj", "down_proj"
    ])
    lora_dropout: float = 0.05
    bias: str = "none"
    task_type: str = "CAUSAL_LM"
    inference_mode: bool = False
    modules_to_save: Optional[List[str]] = None


@dataclass
class TrainingConfig:
    """Training configuration"""
    output_dir: str = "./gpt-oss-120b-finetuned"
    num_train_epochs: int = 3
    per_device_train_batch_size: int = 1
    per_device_eval_batch_size: int = 1
    gradient_accumulation_steps: int = 8
    learning_rate: float = 2e-4
    weight_decay: float = 0.01
    adam_beta1: float = 0.9
    adam_beta2: float = 0.999
    adam_epsilon: float = 1e-8
    max_grad_norm: float = 1.0
    warmup_ratio: float = 0.1
    lr_scheduler_type: str = "cosine"
    logging_steps: int = 10
    eval_steps: int = 500
    save_steps: int = 1000
    save_total_limit: int = 3
    evaluation_strategy: str = "steps"
    load_best_model_at_end: bool = True
    metric_for_best_model: str = "eval_loss"
    greater_is_better: bool = False
    seed: int = 42
    fp16: bool = False
    bf16: bool = True
    dataloader_num_workers: int = 4
    remove_unused_columns: bool = False
    report_to: str = "wandb"
    run_name: Optional[str] = None
    max_length: int = 2048
    use_reasoning_tokens: bool = True
    reasoning_level: str = "medium"  # low, medium, high


class GPTOSSDataset(Dataset):
    """Custom dataset for GPT-OSS-120B fine-tuning with harmony format support"""
    
    def __init__(
        self,
        data_path: str,
        tokenizer,
        max_length: int = 2048,
        use_reasoning_tokens: bool = True,
        reasoning_level: str = "medium"
    ):
        self.tokenizer = tokenizer
        self.max_length = max_length
        self.use_reasoning_tokens = use_reasoning_tokens
        self.reasoning_level = reasoning_level
        
        # Load data
        self.data = self._load_data(data_path)
        logger.info(f"Loaded {len(self.data)} examples from {data_path}")
        
        # Set up special tokens
        self._setup_special_tokens()
        
    def _load_data(self, data_path: str) -> List[Dict[str, str]]:
        """Load data from JSONL file"""
        data = []
        with open(data_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line:
                    try:
                        item = json.loads(line)
                        data.append(item)
                    except json.JSONDecodeError as e:
                        logger.warning(f"Failed to parse line: {line[:100]}... Error: {e}")
                        continue
        return data
    
    def _setup_special_tokens(self):
        """Setup special tokens for harmony format"""
        special_tokens = {
            "pad_token": "<pad>",
            "bos_token": "<s>",
            "eos_token": "</s>",
            "unk_token": "<unk>"
        }
        
        # Add reasoning tokens if needed
        if self.use_reasoning_tokens:
            special_tokens.update({
                "reasoning_start": "<reasoning>",
                "reasoning_end": "</reasoning>",
                "answer_start": "<answer>",
                "answer_end": "</answer>"
            })
        
        # Add tokens that don't exist
        tokens_to_add = []
        for token_name, token_value in special_tokens.items():
            if not hasattr(self.tokenizer, token_name) or getattr(self.tokenizer, token_name) is None:
                tokens_to_add.append(token_value)
        
        if tokens_to_add:
            self.tokenizer.add_special_tokens({"additional_special_tokens": tokens_to_add})
            
    def _format_harmony_prompt(self, item: Dict[str, str]) -> str:
        """Format prompt according to harmony format"""
        system_prompt = item.get("system", "You are a helpful AI assistant.")
        user_message = item.get("user", item.get("prompt", ""))
        assistant_message = item.get("assistant", item.get("response", ""))
        
        # Add reasoning level to system prompt
        if self.use_reasoning_tokens:
            system_prompt = f"Reasoning: {self.reasoning_level}\n\n{system_prompt}"
        
        # Format according to harmony format
        formatted = f"<s>System: {system_prompt}\n\n"
        formatted += f"User: {user_message}\n\n"
        
        if self.use_reasoning_tokens and "reasoning" in item:
            formatted += f"<reasoning>\n{item['reasoning']}\n</reasoning>\n\n"
        
        formatted += f"Assistant: {assistant_message}</s>"
        
        return formatted
    
    def __len__(self) -> int:
        return len(self.data)
    
    def __getitem__(self, idx: int) -> Dict[str, torch.Tensor]:
        item = self.data[idx]
        
        # Format the text according to harmony format
        text = self._format_harmony_prompt(item)
        
        # Tokenize
        encoding = self.tokenizer(
            text,
            truncation=True,
            max_length=self.max_length,
            padding="max_length",
            return_tensors="pt"
        )
        
        input_ids = encoding["input_ids"].squeeze()
        attention_mask = encoding["attention_mask"].squeeze()
        
        # Labels are the same as input_ids for causal LM
        labels = input_ids.clone()
        
        # Mask padding tokens in labels
        labels[attention_mask == 0] = -100
        
        return {
            "input_ids": input_ids,
            "attention_mask": attention_mask,
            "labels": labels
        }


class GPTOSSFineTuner:
    """Main class for fine-tuning GPT-OSS-120B"""
    
    def __init__(
        self,
        model_config: ModelConfig,
        lora_config: LoRAConfig,
        training_config: TrainingConfig
    ):
        self.model_config = model_config
        self.lora_config = lora_config
        self.training_config = training_config
        
        self.tokenizer = None
        self.model = None
        self.trainer = None
        
        # Set up device and distributed training
        self._setup_device()
        
    def _setup_device(self):
        """Setup device and distributed training"""
        if torch.cuda.is_available():
            self.device = torch.device("cuda")
            self.n_gpu = torch.cuda.device_count()
            logger.info(f"Using {self.n_gpu} GPU(s)")
        else:
            self.device = torch.device("cpu")
            self.n_gpu = 0
            logger.warning("No GPU available, using CPU")
        
        # Initialize distributed training if multiple GPUs
        if self.n_gpu > 1:
            if not dist.is_initialized():
                dist.init_process_group(backend='nccl')
            self.local_rank = int(os.environ.get("LOCAL_RANK", 0))
            torch.cuda.set_device(self.local_rank)
        else:
            self.local_rank = 0
    
    def load_tokenizer(self):
        """Load and configure tokenizer"""
        logger.info(f"Loading tokenizer from {self.model_config.model_name}")
        
        self.tokenizer = AutoTokenizer.from_pretrained(
            self.model_config.model_name,
            revision=self.model_config.model_revision,
            cache_dir=self.model_config.cache_dir,
            use_auth_token=self.model_config.use_auth_token,
            trust_remote_code=self.model_config.trust_remote_code
        )
        
        # Ensure tokenizer has pad token
        if self.tokenizer.pad_token is None:
            self.tokenizer.pad_token = self.tokenizer.eos_token
            
        logger.info(f"Tokenizer loaded. Vocab size: {len(self.tokenizer)}")
        
    def load_model(self):
        """Load and configure the base model"""
        logger.info(f"Loading model from {self.model_config.model_name}")
        
        # Configure torch dtype
        if self.model_config.torch_dtype == "float16":
            torch_dtype = torch.float16
        elif self.model_config.torch_dtype == "bfloat16":
            torch_dtype = torch.bfloat16
        else:
            torch_dtype = torch.float32
        
        # Load model configuration
        config = AutoConfig.from_pretrained(
            self.model_config.model_name,
            revision=self.model_config.model_revision,
            cache_dir=self.model_config.cache_dir,
            use_auth_token=self.model_config.use_auth_token,
            trust_remote_code=self.model_config.trust_remote_code
        )
        
        # Configure attention implementation
        if self.model_config.use_flash_attention:
            config._attn_implementation = self.model_config.attn_implementation
        
        # Load model
        self.model = AutoModelForCausalLM.from_pretrained(
            self.model_config.model_name,
            config=config,
            revision=self.model_config.model_revision,
            cache_dir=self.model_config.cache_dir,
            use_auth_token=self.model_config.use_auth_token,
            torch_dtype=torch_dtype,
            device_map=self.model_config.device_map,
            max_memory=self.model_config.max_memory,
            offload_folder=self.model_config.offload_folder,
            low_cpu_mem_usage=self.model_config.low_cpu_mem_usage,
            trust_remote_code=self.model_config.trust_remote_code
        )
        
        # Resize token embeddings if necessary
        if len(self.tokenizer) != self.model.config.vocab_size:
            logger.info(f"Resizing token embeddings from {self.model.config.vocab_size} to {len(self.tokenizer)}")
            self.model.resize_token_embeddings(len(self.tokenizer))
        
        logger.info(f"Model loaded. Parameters: {self.model.num_parameters():,}")
        
    def setup_lora(self):
        """Setup LoRA for parameter-efficient fine-tuning"""
        logger.info("Setting up LoRA")
        
        # Prepare model for k-bit training if using quantization
        self.model = prepare_model_for_kbit_training(self.model)
        
        # Configure LoRA
        lora_config = LoraConfig(
            r=self.lora_config.r,
            lora_alpha=self.lora_config.lora_alpha,
            target_modules=self.lora_config.target_modules,
            lora_dropout=self.lora_config.lora_dropout,
            bias=self.lora_config.bias,
            task_type=TaskType.CAUSAL_LM,
            inference_mode=self.lora_config.inference_mode,
            modules_to_save=self.lora_config.modules_to_save
        )
        
        # Apply LoRA
        self.model = get_peft_model(self.model, lora_config)
        
        # Print trainable parameters
        self.model.print_trainable_parameters()
        
        logger.info("LoRA setup complete")
        
    def create_datasets(self, train_data_path: str, eval_data_path: Optional[str] = None) -> Tuple[GPTOSSDataset, Optional[GPTOSSDataset]]:
        """Create training and evaluation datasets"""
        logger.info("Creating datasets")
        
        train_dataset = GPTOSSDataset(
            train_data_path,
            self.tokenizer,
            max_length=self.training_config.max_length,
            use_reasoning_tokens=self.training_config.use_reasoning_tokens,
            reasoning_level=self.training_config.reasoning_level
        )
        
        eval_dataset = None
        if eval_data_path:
            eval_dataset = GPTOSSDataset(
                eval_data_path,
                self.tokenizer,
                max_length=self.training_config.max_length,
                use_reasoning_tokens=self.training_config.use_reasoning_tokens,
                reasoning_level=self.training_config.reasoning_level
            )
            logger.info(f"Created evaluation dataset with {len(eval_dataset)} examples")
        
        logger.info(f"Created training dataset with {len(train_dataset)} examples")
        return train_dataset, eval_dataset
    
    def setup_trainer(self, train_dataset: GPTOSSDataset, eval_dataset: Optional[GPTOSSDataset] = None):
        """Setup the Hugging Face trainer"""
        logger.info("Setting up trainer")
        
        # Create training arguments
        training_args = TrainingArguments(
            output_dir=self.training_config.output_dir,
            num_train_epochs=self.training_config.num_train_epochs,
            per_device_train_batch_size=self.training_config.per_device_train_batch_size,
            per_device_eval_batch_size=self.training_config.per_device_eval_batch_size,
            gradient_accumulation_steps=self.training_config.gradient_accumulation_steps,
            learning_rate=self.training_config.learning_rate,
            weight_decay=self.training_config.weight_decay,
            adam_beta1=self.training_config.adam_beta1,
            adam_beta2=self.training_config.adam_beta2,
            adam_epsilon=self.training_config.adam_epsilon,
            max_grad_norm=self.training_config.max_grad_norm,
            warmup_ratio=self.training_config.warmup_ratio,
            lr_scheduler_type=self.training_config.lr_scheduler_type,
            logging_steps=self.training_config.logging_steps,
            eval_steps=self.training_config.eval_steps if eval_dataset else None,
            save_steps=self.training_config.save_steps,
            save_total_limit=self.training_config.save_total_limit,
            evaluation_strategy=self.training_config.evaluation_strategy if eval_dataset else "no",
            load_best_model_at_end=self.training_config.load_best_model_at_end if eval_dataset else False,
            metric_for_best_model=self.training_config.metric_for_best_model,
            greater_is_better=self.training_config.greater_is_better,
            seed=self.training_config.seed,
            fp16=self.training_config.fp16,
            bf16=self.training_config.bf16,
            dataloader_num_workers=self.training_config.dataloader_num_workers,
            remove_unused_columns=self.training_config.remove_unused_columns,
            report_to=self.training_config.report_to,
            run_name=self.training_config.run_name or f"gpt-oss-120b-{int(time.time())}",
            ddp_find_unused_parameters=False,
            dataloader_pin_memory=False,
        )
        
        # Data collator
        data_collator = DataCollatorForLanguageModeling(
            tokenizer=self.tokenizer,
            mlm=False,
        )
        
        # Create trainer
        self.trainer = Trainer(
            model=self.model,
            args=training_args,
            train_dataset=train_dataset,
            eval_dataset=eval_dataset,
            tokenizer=self.tokenizer,
            data_collator=data_collator,
        )
        
        logger.info("Trainer setup complete")
    
    def train(self):
        """Start training"""
        logger.info("Starting training")
        
        try:
            # Start training
            result = self.trainer.train()
            
            # Save final model
            self.trainer.save_model()
            
            # Log results
            logger.info(f"Training completed. Final loss: {result.training_loss:.4f}")
            
            return result
            
        except Exception as e:
            logger.error(f"Training failed: {e}")
            traceback.print_exc()
            raise
    
    def evaluate(self) -> Dict[str, float]:
        """Evaluate the model"""
        if self.trainer is None:
            raise ValueError("Trainer not initialized. Call setup_trainer first.")
        
        logger.info("Starting evaluation")
        results = self.trainer.evaluate()
        
        for key, value in results.items():
            logger.info(f"{key}: {value}")
        
        return results
    
    def save_model(self, path: str):
        """Save the fine-tuned model"""
        logger.info(f"Saving model to {path}")
        
        os.makedirs(path, exist_ok=True)
        
        # Save model and tokenizer
        self.model.save_pretrained(path)
        self.tokenizer.save_pretrained(path)
        
        # Save configuration
        config = {
            "model_config": self.model_config.__dict__,
            "lora_config": self.lora_config.__dict__,
            "training_config": self.training_config.__dict__
        }
        
        with open(os.path.join(path, "fine_tuning_config.json"), "w") as f:
            json.dump(config, f, indent=2)
        
        logger.info(f"Model saved to {path}")
    
    def load_finetuned_model(self, path: str):
        """Load a fine-tuned model"""
        logger.info(f"Loading fine-tuned model from {path}")
        
        # Load base model first
        self.load_model()
        
        # Load PEFT model
        self.model = PeftModel.from_pretrained(self.model, path)
        
        logger.info("Fine-tuned model loaded")
    
    def generate(
        self,
        prompt: str,
        max_length: int = 512,
        temperature: float = 0.7,
        top_p: float = 0.9,
        do_sample: bool = True,
        reasoning_level: str = "medium"
    ) -> str:
        """Generate text using the fine-tuned model"""
        if self.model is None or self.tokenizer is None:
            raise ValueError("Model and tokenizer must be loaded first")
        
        # Format prompt with reasoning level
        if self.training_config.use_reasoning_tokens:
            formatted_prompt = f"<s>System: Reasoning: {reasoning_level}\n\nYou are a helpful AI assistant.\n\nUser: {prompt}\n\nAssistant:"
        else:
            formatted_prompt = f"<s>User: {prompt}\n\nAssistant:"
        
        # Tokenize
        inputs = self.tokenizer(
            formatted_prompt,
            return_tensors="pt",
            truncation=True,
            max_length=self.training_config.max_length
        )
        
        # Move to device
        inputs = {k: v.to(self.device) for k, v in inputs.items()}
        
        # Generate
        with torch.no_grad():
            outputs = self.model.generate(
                **inputs,
                max_length=max_length,
                temperature=temperature,
                top_p=top_p,
                do_sample=do_sample,
                pad_token_id=self.tokenizer.pad_token_id,
                eos_token_id=self.tokenizer.eos_token_id
            )
        
        # Decode
        generated = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        # Extract assistant response
        if "Assistant:" in generated:
            response = generated.split("Assistant:")[-1].strip()
        else:
            response = generated
        
        return response
    
    def merge_and_unload(self) -> AutoModelForCausalLM:
        """Merge LoRA weights and unload adapters"""
        logger.info("Merging LoRA weights and unloading adapters")
        
        if not hasattr(self.model, 'merge_and_unload'):
            raise ValueError("Model does not have LoRA adapters to merge")
        
        merged_model = self.model.merge_and_unload()
        logger.info("LoRA weights merged successfully")
        
        return merged_model


def create_sample_data(output_path: str, num_samples: int = 100):
    """Create sample training data in the harmony format"""
    logger.info(f"Creating {num_samples} sample training examples")
    
    sample_conversations = [
        {
            "system": "You are a helpful AI assistant specialized in accessibility support.",
            "user": "How can I enable voice commands on my device?",
            "reasoning": "The user is asking about voice commands, which is an accessibility feature. I should provide clear, step-by-step instructions for enabling voice commands on common devices.",
            "assistant": "To enable voice commands on your device:\n\n1. **Windows**: Go to Settings > Accessibility > Speech, then turn on 'Use speech recognition'\n2. **Mac**: System Preferences > Accessibility > Voice Control > Enable\n3. **iOS**: Settings > Accessibility > Voice Control > Set Up Voice Control\n4. **Android**: Settings > Accessibility > Voice Access\n\nOnce enabled, you can use voice commands to navigate and control your device hands-free."
        },
        {
            "system": "You are a helpful AI assistant that provides health advice.",
            "user": "What are the benefits of regular exercise?",
            "reasoning": "This is a straightforward question about exercise benefits. I should provide accurate, evidence-based information about the physical and mental health benefits of regular exercise.",
            "assistant": "Regular exercise provides numerous benefits:\n\n**Physical Benefits:**\n- Strengthens heart and improves cardiovascular health\n- Helps maintain healthy weight\n- Builds and maintains strong bones and muscles\n- Improves flexibility and balance\n- Boosts immune system\n\n**Mental Benefits:**\n- Reduces stress and anxiety\n- Improves mood and mental well-being\n- Enhances cognitive function\n- Promotes better sleep\n- Increases energy levels\n\nAim for at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity per week, plus muscle-strengthening exercises twice a week."
        }
    ]
    
    # Generate more samples by varying the conversations
    all_samples = []
    for i in range(num_samples):
        base_conv = sample_conversations[i % len(sample_conversations)]
        sample = {
            "system": base_conv["system"],
            "user": f"{base_conv['user']} (Sample {i+1})",
            "reasoning": base_conv["reasoning"],
            "assistant": base_conv["assistant"]
        }
        all_samples.append(sample)
    
    # Save to JSONL file
    with open(output_path, 'w', encoding='utf-8') as f:
        for sample in all_samples:
            f.write(json.dumps(sample) + '\n')
    
    logger.info(f"Sample data saved to {output_path}")


def main():
    """Main function"""
    parser = argparse.ArgumentParser(description="Fine-tune GPT-OSS-120B model")
    parser.add_argument("--train_data", type=str, required=True, help="Path to training data (JSONL)")
    parser.add_argument("--eval_data", type=str, help="Path to evaluation data (JSONL)")
    parser.add_argument("--output_dir", type=str, default="./gpt-oss-120b-finetuned", help="Output directory")
    parser.add_argument("--model_name", type=str, default="openai/gpt-oss-120b", help="Model name or path")
    parser.add_argument("--epochs", type=int, default=3, help="Number of training epochs")
    parser.add_argument("--batch_size", type=int, default=1, help="Per device batch size")
    parser.add_argument("--learning_rate", type=float, default=2e-4, help="Learning rate")
    parser.add_argument("--max_length", type=int, default=2048, help="Maximum sequence length")
    parser.add_argument("--lora_r", type=int, default=16, help="LoRA r parameter")
    parser.add_argument("--lora_alpha", type=int, default=32, help="LoRA alpha parameter")
    parser.add_argument("--reasoning_level", type=str, default="medium", choices=["low", "medium", "high"])
    parser.add_argument("--create_sample_data", type=str, help="Create sample data and save to this path")
    parser.add_argument("--load_model", type=str, help="Load fine-tuned model from this path")
    parser.add_argument("--interactive", action="store_true", help="Run interactive mode after training")
    parser.add_argument("--wandb_project", type=str, default="gpt-oss-120b-finetune", help="W&B project name")
    
    args = parser.parse_args()
    
    # Initialize wandb if using
    if args.wandb_project:
        wandb.init(project=args.wandb_project)
    
    try:
        # Create sample data if requested
        if args.create_sample_data:
            create_sample_data(args.create_sample_data, 100)
            logger.info("Sample data created successfully")
            return
        
        # Configure the fine-tuner
        model_config = ModelConfig(
            model_name=args.model_name,
            torch_dtype="bfloat16",
            device_map="auto"
        )
        
        lora_config = LoRAConfig(
            r=args.lora_r,
            lora_alpha=args.lora_alpha
        )
        
        training_config = TrainingConfig(
            output_dir=args.output_dir,
            num_train_epochs=args.epochs,
            per_device_train_batch_size=args.batch_size,
            learning_rate=args.learning_rate,
            max_length=args.max_length,
            reasoning_level=args.reasoning_level,
            run_name=f"gpt-oss-120b-finetune-{int(time.time())}"
        )
        
        # Initialize fine-tuner
        fine_tuner = GPTOSSFineTuner(model_config, lora_config, training_config)
        
        # Load model if specified, otherwise train new model
        if args.load_model:
            fine_tuner.load_tokenizer()
            fine_tuner.load_finetuned_model(args.load_model)
            logger.info("Model loaded successfully")
        else:
            # Load tokenizer and model
            fine_tuner.load_tokenizer()
            fine_tuner.load_model()
            fine_tuner.setup_lora()
            
            # Create datasets
            train_dataset, eval_dataset = fine_tuner.create_datasets(args.train_data, args.eval_data)
            
            # Setup trainer
            fine_tuner.setup_trainer(train_dataset, eval_dataset)
            
            # Train the model
            fine_tuner.train()
            
            # Evaluate if eval data provided
            if eval_dataset:
                fine_tuner.evaluate()
            
            # Save the model
            fine_tuner.save_model(args.output_dir)
        
        # Interactive mode
        if args.interactive:
            logger.info("Entering interactive mode. Type 'quit' to exit.")
            while True:
                try:
                    prompt = input("\nUser: ").strip()
                    if prompt.lower() in ['quit', 'exit', 'q']:
                        break
                    
                    if prompt:
                        response = fine_tuner.generate(
                            prompt,
                            reasoning_level=args.reasoning_level,
                            temperature=0.7
                        )
                        print(f"Assistant: {response}")
                
                except KeyboardInterrupt:
                    break
                except Exception as e:
                    logger.error(f"Error during generation: {e}")
        
        logger.info("Fine-tuning process completed successfully!")
        
    except Exception as e:
        logger.error(f"An error occurred: {e}")
        traceback.print_exc()
        sys.exit(1)
    
    finally:
        if wandb.run:
            wandb.finish()


if __name__ == "__main__":
    main()
