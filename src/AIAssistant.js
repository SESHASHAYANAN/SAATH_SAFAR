import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Bot,
  User,
  Loader,
  Copy,
  Download,
  Trash2,
  Settings,
  Home,
  RefreshCw,
  Plus,
  Edit3,
  Save,
  X,
  Check,
  AlertTriangle,
  Info,
  HelpCircle,
  Zap,
  Brain,
  Sparkles,
  Star,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Maximize2,
  Minimize2,
  RotateCcw,
  Share2,
  Bookmark,
  Filter,
  Search,
  Calendar,
  Clock,
  Accessibility,
  Shield,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
} from "lucide-react";
import "./AIAssistant.css";

// GPT-Ross-120B Model Integration Hook
const useGPTRoss120B = () => {
  const [model, setModel] = useState(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize GPT-Ross-120B model
    const initializeModel = async () => {
      setLoading(true);
      try {
        // In a real implementation, this would load the actual model
        // For this demo, we'll simulate the model loading
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Mock model object with fine-tuned parameters for accessibility
        const mockModel = {
          name: "GPT-Ross-120B",
          version: "1.0.0",
          parameters: 120000000000,
          fineTuned: true,
          specializations: [
            "accessibility-support",
            "disability-assistance",
            "inclusive-communication",
            "assistive-technology",
          ],
          capabilities: {
            textGeneration: true,
            conversationalAI: true,
            accessibilityAnalysis: true,
            personalizedAssistance: true,
            multimodalInput: true,
            voiceInteraction: true,
          },
        };

        setModel(mockModel);
        setModelLoaded(true);
      } catch (error) {
        console.error("Failed to load GPT-Ross-120B model:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeModel();
  }, []);

  const generateResponse = useCallback(
    async (prompt, context = {}) => {
      if (!modelLoaded) return null;

      // Simulate AI processing with fine-tuned responses for disabled users
      const processingTime = Math.random() * 2000 + 1000; // 1-3 seconds
      await new Promise((resolve) => setTimeout(resolve, processingTime));

      // Enhanced prompt processing for accessibility
      const accessibilityPrompt = `
      Context: This is an AI assistant specifically fine-tuned for disabled users.
      User preferences: ${JSON.stringify(context.userPreferences || {})}
      Accessibility needs: ${JSON.stringify(context.accessibilityNeeds || {})}
      Previous conversation: ${JSON.stringify(
        context.conversationHistory || []
      )}
      
      User message: ${prompt}
      
      Please provide a helpful, accessible, and empathetic response that considers the user's specific needs.
    `;

      // Mock intelligent response generation
      const responses = [
        "I understand your needs and I'm here to help. Let me provide you with accessible solutions tailored to your requirements.",
        "Based on your accessibility preferences, I recommend the following approaches that should work well with your assistive technology.",
        "I've analyzed your request with consideration for accessibility best practices. Here's what I suggest:",
        "As an AI trained specifically for accessibility support, I can help you navigate this challenge step by step.",
        "I notice you're using accessibility features. I'll make sure my response is optimized for your screen reader and other assistive tools.",
      ];

      const baseResponse =
        responses[Math.floor(Math.random() * responses.length)];

      // Add context-specific information
      let contextualResponse = baseResponse;
      if (context.userPreferences?.largeText) {
        contextualResponse +=
          " I'll format this response with clear headings and bullet points for better readability.";
      }
      if (context.userPreferences?.textToSpeech) {
        contextualResponse +=
          " This response is optimized for text-to-speech playback.";
      }
      if (context.userPreferences?.highContrast) {
        contextualResponse +=
          " I'll ensure any visual information is described in text.";
      }

      return {
        text: contextualResponse,
        confidence: Math.random() * 0.3 + 0.7, // 0.7-1.0
        tokens: Math.floor(Math.random() * 100) + 50,
        processingTime: processingTime,
        accessibility: {
          screenReaderOptimized: true,
          highContrastCompatible: true,
          keyboardNavigable: true,
          voiceControlReady: true,
        },
      };
    },
    [modelLoaded]
  );

  const fineTuneModel = useCallback(
    async (trainingData, accessibilityFocus) => {
      setLoading(true);
      try {
        // Simulate fine-tuning process
        await new Promise((resolve) => setTimeout(resolve, 5000));

        // Update model with new fine-tuning parameters
        setModel((prev) => ({
          ...prev,
          fineTuned: true,
          lastFineTuned: new Date().toISOString(),
          accessibilityFocus: accessibilityFocus,
          trainingDataSize: trainingData.length,
        }));

        return true;
      } catch (error) {
        console.error("Fine-tuning failed:", error);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    model,
    modelLoaded,
    loading,
    generateResponse,
    fineTuneModel,
  };
};

// Voice Recognition Hook
const useVoiceRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();

      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = "en-US";
      recognitionInstance.maxAlternatives = 3;

      recognitionInstance.onresult = (event) => {
        const current = event.resultIndex;
        const result = event.results[current];
        const transcript = result[0].transcript;
        const confidence = result[0].confidence;

        setTranscript(transcript);
        setConfidence(confidence || 0);
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const startListening = useCallback(() => {
    if (recognition) {
      setTranscript("");
      setConfidence(0);
      recognition.start();
      setIsListening(true);
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition]);

  return {
    isListening,
    transcript,
    confidence,
    startListening,
    stopListening,
    supported: !!recognition,
  };
};

// Text-to-Speech Hook
const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [speechRate, setSpeechRate] = useState(1);
  const [speechPitch, setSpeechPitch] = useState(1);
  const [speechVolume, setSpeechVolume] = useState(1);

  useEffect(() => {
    const updateVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);

      // Set default voice (prefer English voices)
      const defaultVoice =
        availableVoices.find(
          (voice) => voice.lang.startsWith("en") && voice.localService
        ) || availableVoices[0];
      setSelectedVoice(defaultVoice);
    };

    updateVoices();
    speechSynthesis.addEventListener("voiceschanged", updateVoices);

    return () => {
      speechSynthesis.removeEventListener("voiceschanged", updateVoices);
    };
  }, []);

  const speak = useCallback(
    (text, options = {}) => {
      if ("speechSynthesis" in window) {
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);

        utterance.voice = options.voice || selectedVoice;
        utterance.rate = options.rate || speechRate;
        utterance.pitch = options.pitch || speechPitch;
        utterance.volume = options.volume || speechVolume;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        utterance.onpause = () => setIsSpeaking(false);
        utterance.onresume = () => setIsSpeaking(true);

        speechSynthesis.speak(utterance);
      }
    },
    [selectedVoice, speechRate, speechPitch, speechVolume]
  );

  const stop = useCallback(() => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const pause = useCallback(() => {
    speechSynthesis.pause();
    setIsSpeaking(false);
  }, []);

  const resume = useCallback(() => {
    speechSynthesis.resume();
    setIsSpeaking(true);
  }, []);

  return {
    speak,
    stop,
    pause,
    resume,
    isSpeaking,
    voices,
    selectedVoice,
    setSelectedVoice,
    speechRate,
    setSpeechRate,
    speechPitch,
    setSpeechPitch,
    speechVolume,
    setSpeechVolume,
  };
};

// Accessibility Settings Hook
const useAccessibilitySettings = () => {
  const [settings, setSettings] = useState({
    fontSize: "medium",
    contrast: "normal",
    motionReduced: false,
    screenReader: false,
    keyboardNavigation: true,
    voiceCommands: true,
    textToSpeech: true,
    highContrast: false,
    largeText: false,
    colorBlind: false,
    dyslexiaMode: false,
    darkMode: false,
    autoSpeak: false,
    skipAnimations: false,
    focusVisible: true,
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem("accessibilitySettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const updateSetting = useCallback((key, value) => {
    setSettings((prev) => {
      const newSettings = { ...prev, [key]: value };
      localStorage.setItem(
        "accessibilitySettings",
        JSON.stringify(newSettings)
      );
      return newSettings;
    });
  }, []);

  return { settings, updateSetting };
};

// Message Component
const Message = ({
  message,
  isUser,
  timestamp,
  onSpeak,
  onCopy,
  onRegenerate,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      if (onCopy) onCopy();
    } catch (error) {
      console.error("Failed to copy message:", error);
    }
  }, [message.text, onCopy]);

  const handleSpeak = useCallback(() => {
    if (onSpeak) onSpeak(message.text);
  }, [message.text, onSpeak]);

  return (
    <motion.div
      className={`message ${isUser ? "user-message" : "ai-message"}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      role="listitem"
      aria-label={`${isUser ? "User" : "AI"} message sent at ${new Date(
        timestamp
      ).toLocaleTimeString()}`}
    >
      <div className="message-header">
        <div className="message-avatar">
          {isUser ? (
            <User size={20} aria-hidden="true" />
          ) : (
            <Bot size={20} aria-hidden="true" />
          )}
        </div>
        <div className="message-meta">
          <span className="message-sender">
            {isUser ? "You" : "AI Assistant"}
          </span>
          <time className="message-time" dateTime={timestamp}>
            {new Date(timestamp).toLocaleTimeString()}
          </time>
        </div>
        <div className="message-actions">
          <button
            className="message-action-btn"
            onClick={handleSpeak}
            aria-label="Speak this message"
            title="Speak message"
          >
            <Volume2 size={14} />
          </button>
          <button
            className="message-action-btn"
            onClick={handleCopy}
            aria-label="Copy message to clipboard"
            title="Copy message"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
          {!isUser && onRegenerate && (
            <button
              className="message-action-btn"
              onClick={onRegenerate}
              aria-label="Regenerate response"
              title="Regenerate response"
            >
              <RefreshCw size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="message-content">
        <div className={`message-text ${expanded ? "expanded" : ""}`}>
          {message.text}
        </div>

        {message.text.length > 300 && (
          <button
            className="expand-button"
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? "Show less" : "Show more"}
          >
            {expanded ? "Show less" : "Show more"}
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        )}

        {!isUser && message.confidence && (
          <div className="message-confidence">
            <div className="confidence-bar">
              <div
                className="confidence-fill"
                style={{ width: `${message.confidence * 100}%` }}
              />
            </div>
            <span className="confidence-text">
              Confidence: {Math.round(message.confidence * 100)}%
            </span>
          </div>
        )}

        {!isUser && message.accessibility && (
          <div className="message-accessibility-info">
            <Accessibility size={12} />
            <span className="sr-only">Accessibility optimized response</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Chat Input Component
const ChatInput = ({
  onSendMessage,
  loading,
  onVoiceToggle,
  isListening,
  transcript,
}) => {
  const [message, setMessage] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (transcript) {
      setMessage(transcript);
    }
  }, [transcript]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const trimmedMessage = message.trim();
      if (trimmedMessage && !loading && onSendMessage) {
        onSendMessage(trimmedMessage);
        setMessage("");
      }
    },
    [message, loading, onSendMessage]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
      }
    },
    [handleSubmit]
  );

  return (
    <motion.form
      className={`chat-input-form ${focused ? "focused" : ""} ${
        loading ? "loading" : ""
      }`}
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="input-container">
        <label htmlFor="chat-input" className="sr-only">
          Type your message to the AI assistant
        </label>
        <textarea
          ref={inputRef}
          id="chat-input"
          className="chat-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={
            isListening
              ? "Listening..."
              : "Type your message or use voice input..."
          }
          disabled={loading}
          rows={1}
          style={{
            minHeight: "44px",
            maxHeight: "120px",
            resize: "none",
            overflow: "auto",
          }}
          aria-describedby="chat-input-help"
        />
        <div id="chat-input-help" className="sr-only">
          Press Enter to send, Shift+Enter for new line, or use the voice button
          to speak your message
        </div>

        <div className="input-actions">
          <button
            type="button"
            className={`voice-button ${isListening ? "active" : ""}`}
            onClick={onVoiceToggle}
            disabled={loading}
            aria-label={isListening ? "Stop voice input" : "Start voice input"}
            title={isListening ? "Stop listening" : "Voice input (Alt+V)"}
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>

          <button
            type="submit"
            className="send-button"
            disabled={!message.trim() || loading}
            aria-label="Send message"
            title="Send message (Enter)"
          >
            {loading ? (
              <Loader className="spin" size={18} />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>
      </div>

      {isListening && (
        <motion.div
          className="voice-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="pulse-ring" />
          <span>Listening...</span>
        </motion.div>
      )}
    </motion.form>
  );
};

// Model Status Component
const ModelStatus = ({ model, loading }) => (
  <motion.div
    className="model-status"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    role="status"
    aria-live="polite"
  >
    <div className="model-info">
      <Brain size={16} aria-hidden="true" />
      <div className="model-details">
        <span className="model-name">{model?.name || "Loading..."}</span>
        <span className="model-status-text">
          {loading ? "Processing..." : "Ready"}
        </span>
      </div>
      <div
        className={`status-indicator ${loading ? "loading" : "ready"}`}
        aria-hidden="true"
      />
    </div>

    {model && (
      <div className="model-specs">
        <span className="spec-item">
          <Zap size={12} />
          {(model.parameters / 1000000000).toFixed(0)}B params
        </span>
        <span className="spec-item">
          <Sparkles size={12} />
          Fine-tuned
        </span>
        <span className="spec-item">
          <Accessibility size={12} />
          Accessible
        </span>
      </div>
    )}
  </motion.div>
);

// Settings Panel Component
const SettingsPanel = ({
  isOpen,
  onClose,
  settings,
  onUpdateSetting,
  voices,
  selectedVoice,
  onVoiceChange,
  speechRate,
  onRateChange,
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="settings-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="settings-panel"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-labelledby="settings-title"
          aria-modal="true"
        >
          <div className="settings-header">
            <h2 id="settings-title">AI Assistant Settings</h2>
            <button
              className="settings-close"
              onClick={onClose}
              aria-label="Close settings"
            >
              <X size={20} />
            </button>
          </div>

          <div className="settings-content">
            <section className="settings-section">
              <h3>Accessibility</h3>

              <div className="setting-item">
                <label>
                  <input
                    type="checkbox"
                    checked={settings.textToSpeech}
                    onChange={(e) =>
                      onUpdateSetting("textToSpeech", e.target.checked)
                    }
                  />
                  <span>Auto-speak AI responses</span>
                </label>
              </div>

              <div className="setting-item">
                <label>
                  <input
                    type="checkbox"
                    checked={settings.highContrast}
                    onChange={(e) =>
                      onUpdateSetting("highContrast", e.target.checked)
                    }
                  />
                  <span>High contrast mode</span>
                </label>
              </div>

              <div className="setting-item">
                <label>
                  <input
                    type="checkbox"
                    checked={settings.largeText}
                    onChange={(e) =>
                      onUpdateSetting("largeText", e.target.checked)
                    }
                  />
                  <span>Large text</span>
                </label>
              </div>

              <div className="setting-item">
                <label>
                  <input
                    type="checkbox"
                    checked={settings.motionReduced}
                    onChange={(e) =>
                      onUpdateSetting("motionReduced", e.target.checked)
                    }
                  />
                  <span>Reduce motion</span>
                </label>
              </div>

              <div className="setting-item">
                <label>
                  <input
                    type="checkbox"
                    checked={settings.dyslexiaMode}
                    onChange={(e) =>
                      onUpdateSetting("dyslexiaMode", e.target.checked)
                    }
                  />
                  <span>Dyslexia-friendly font</span>
                </label>
              </div>
            </section>

            <section className="settings-section">
              <h3>Voice Settings</h3>

              <div className="setting-item">
                <label htmlFor="voice-select">Voice</label>
                <select
                  id="voice-select"
                  value={selectedVoice?.name || ""}
                  onChange={(e) => {
                    const voice = voices.find((v) => v.name === e.target.value);
                    if (voice) onVoiceChange(voice);
                  }}
                >
                  {voices.map((voice) => (
                    <option key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
              </div>

              <div className="setting-item">
                <label htmlFor="speech-rate">Speech Rate</label>
                <input
                  id="speech-rate"
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={speechRate}
                  onChange={(e) => onRateChange(parseFloat(e.target.value))}
                  aria-describedby="speech-rate-desc"
                />
                <span id="speech-rate-desc" className="range-value">
                  {speechRate}x
                </span>
              </div>
            </section>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Main AI Assistant Component
const AIAssistant = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [fineTuning, setFineTuning] = useState(false);
  const [lastResponse, setLastResponse] = useState(null);

  // Hooks
  const { model, modelLoaded, generateResponse, fineTuneModel } =
    useGPTRoss120B();
  const { isListening, transcript, confidence, startListening, stopListening } =
    useVoiceRecognition();
  const {
    speak,
    stop,
    isSpeaking,
    voices,
    selectedVoice,
    setSelectedVoice,
    speechRate,
    setSpeechRate,
    speechPitch,
    setSpeechPitch,
  } = useTextToSpeech();
  const { settings, updateSetting } = useAccessibilitySettings();

  // Refs
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize session
  useEffect(() => {
    const initializeSession = () => {
      const sessionId = `session_${Date.now()}`;
      setCurrentSession({
        id: sessionId,
        startTime: new Date().toISOString(),
        messageCount: 0,
        fineTuned: false,
      });

      // Welcome message
      const welcomeMessage = {
        id: "welcome",
        text: `Hello! I'm your AI assistant powered by GPT-Ross-120B, specially fine-tuned for accessibility support. I'm here to help you with any questions or tasks. You can type, use voice commands, or navigate with keyboard shortcuts.`,
        isUser: false,
        timestamp: new Date().toISOString(),
        confidence: 1.0,
        accessibility: {
          screenReaderOptimized: true,
          highContrastCompatible: true,
          keyboardNavigable: true,
          voiceControlReady: true,
        },
      };

      setMessages([welcomeMessage]);
      announce(
        "AI Assistant ready. You can start chatting or use voice commands."
      );
    };

    if (modelLoaded) {
      initializeSession();
    }
  }, [modelLoaded]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-speak responses
  useEffect(() => {
    if (settings.textToSpeech && lastResponse) {
      speak(lastResponse.text);
    }
  }, [lastResponse, settings.textToSpeech, speak]);

  // Voice command processing
  useEffect(() => {
    if (transcript && isListening) {
      const command = transcript.toLowerCase();

      if (command.includes("send message") || command.includes("send that")) {
        handleSendMessage(transcript);
        stopListening();
      } else if (
        command.includes("clear chat") ||
        command.includes("clear messages")
      ) {
        handleClearChat();
        stopListening();
      } else if (command.includes("go back") || command.includes("go home")) {
        navigate("/dashboard");
        stopListening();
      } else if (command.includes("open settings")) {
        setShowSettings(true);
        stopListening();
      } else if (command.includes("fine tune model")) {
        handleFineTuning();
        stopListening();
      }
    }
  }, [transcript, isListening]);

  // Announcement function
  const announce = useCallback((message) => {
    setAnnouncement(message);
    setTimeout(() => setAnnouncement(""), 5000);
  }, []);

  // Handle send message
  const handleSendMessage = useCallback(
    async (messageText) => {
      if (!messageText.trim() || loading) return;

      const userMessage = {
        id: `msg_${Date.now()}_user`,
        text: messageText,
        isUser: true,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setLoading(true);
      announce("Processing your message...");

      try {
        const context = {
          userPreferences: settings,
          accessibilityNeeds: {
            screenReader: settings.screenReader,
            highContrast: settings.highContrast,
            largeText: settings.largeText,
            textToSpeech: settings.textToSpeech,
          },
          conversationHistory: messages.slice(-5),
        };

        const response = await generateResponse(messageText, context);

        if (response) {
          const aiMessage = {
            id: `msg_${Date.now()}_ai`,
            text: response.text,
            isUser: false,
            timestamp: new Date().toISOString(),
            confidence: response.confidence,
            accessibility: response.accessibility,
            tokens: response.tokens,
            processingTime: response.processingTime,
          };

          setMessages((prev) => [...prev, aiMessage]);
          setLastResponse(aiMessage);
          setChatHistory((prev) => [...prev, userMessage, aiMessage]);

          // Update session
          setCurrentSession((prev) =>
            prev
              ? {
                  ...prev,
                  messageCount: prev.messageCount + 2,
                  lastActivity: new Date().toISOString(),
                }
              : null
          );

          announce("Response generated successfully.");
        }
      } catch (error) {
        console.error("Failed to generate response:", error);
        const errorMessage = {
          id: `msg_${Date.now()}_error`,
          text: "I apologize, but I encountered an error processing your request. Please try again or rephrase your question.",
          isUser: false,
          timestamp: new Date().toISOString(),
          confidence: 0,
          accessibility: {
            screenReaderOptimized: true,
            highContrastCompatible: true,
          },
        };

        setMessages((prev) => [...prev, errorMessage]);
        announce("Sorry, I encountered an error. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [loading, messages, settings, generateResponse, announce]
  );

  // Handle voice toggle
  const handleVoiceToggle = useCallback(() => {
    if (isListening) {
      stopListening();
      announce("Voice input stopped.");
    } else {
      startListening();
      announce("Voice input started. Please speak your message.");
    }
  }, [isListening, startListening, stopListening, announce]);

  // Handle clear chat
  const handleClearChat = useCallback(() => {
    setMessages([]);
    setChatHistory([]);
    setLastResponse(null);
    announce("Chat cleared.");
  }, [announce]);

  // Handle fine-tuning
  const handleFineTuning = useCallback(async () => {
    if (fineTuning) return;

    setFineTuning(true);
    announce("Starting model fine-tuning process...");

    try {
      const trainingData = chatHistory
        .map((msg) => ({
          input: msg.text,
          output: msg.isUser ? null : msg.text,
          context: "accessibility_support",
          timestamp: msg.timestamp,
        }))
        .filter((item) => item.output);

      const success = await fineTuneModel(trainingData, {
        focus: "accessibility",
        userPreferences: settings,
        conversationStyle: "supportive_and_informative",
      });

      if (success) {
        announce(
          "Model fine-tuning completed successfully. The AI is now better personalized to your needs."
        );
        setCurrentSession((prev) =>
          prev ? { ...prev, fineTuned: true } : null
        );
      } else {
        announce("Fine-tuning failed. Please try again later.");
      }
    } catch (error) {
      console.error("Fine-tuning error:", error);
      announce("Fine-tuning encountered an error. Please try again later.");
    } finally {
      setFineTuning(false);
    }
  }, [fineTuning, chatHistory, fineTuneModel, settings, announce]);

  // Handle regenerate response
  const handleRegenerateResponse = useCallback(
    async (messageId) => {
      const messageIndex = messages.findIndex((msg) => msg.id === messageId);
      if (messageIndex === -1 || messageIndex === 0) return;

      const previousUserMessage = messages[messageIndex - 1];
      if (!previousUserMessage?.isUser) return;

      // Remove the AI message to regenerate
      setMessages((prev) => prev.slice(0, messageIndex));

      // Generate new response
      await handleSendMessage(previousUserMessage.text);
    },
    [messages, handleSendMessage]
  );

  // Handle copy message
  const handleCopyMessage = useCallback(() => {
    announce("Message copied to clipboard.");
  }, [announce]);

  // Handle speak message
  const handleSpeakMessage = useCallback(
    (text) => {
      if (isSpeaking) {
        stop();
      } else {
        speak(text);
      }
    },
    [isSpeaking, stop, speak]
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey) {
        switch (e.key) {
          case "c":
            e.preventDefault();
            handleClearChat();
            break;
          case "v":
            e.preventDefault();
            handleVoiceToggle();
            break;
          case "s":
            e.preventDefault();
            setShowSettings(!showSettings);
            break;
          case "f":
            e.preventDefault();
            handleFineTuning();
            break;
          case "h":
            e.preventDefault();
            announceHelp();
            break;
        }
      } else if (e.key === "Escape") {
        if (showSettings) {
          setShowSettings(false);
        } else if (isListening) {
          stopListening();
        }
      }
    };

    const announceHelp = () => {
      const helpText = `
        AI Assistant keyboard shortcuts:
        Alt+C - Clear chat
        Alt+V - Toggle voice input
        Alt+S - Toggle settings
        Alt+F - Fine-tune model
        Alt+H - Help
        Escape - Cancel current action
        Tab - Navigate between elements
      `;
      announce(helpText);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    showSettings,
    isListening,
    handleClearChat,
    handleVoiceToggle,
    handleFineTuning,
    announce,
    stopListening,
  ]);

  return (
    <div
      className={`ai-assistant-container ${
        settings.highContrast ? "high-contrast" : ""
      } ${settings.largeText ? "large-text" : ""} ${
        settings.dyslexiaMode ? "dyslexia-font" : ""
      } ${settings.darkMode ? "dark-mode" : ""}`}
    >
      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* Skip link */}
      <a href="#chat-messages" className="skip-link">
        Skip to chat messages
      </a>

      {/* Header */}
      <header className="ai-header" role="banner">
        <div className="header-content">
          <div className="header-left">
            <button
              className="back-button"
              onClick={() => navigate("/dashboard")}
              aria-label="Back to dashboard"
            >
              <ChevronLeft size={20} />
              <span>Back</span>
            </button>
            <h1 className="page-title">AI Assistant</h1>
          </div>

          <div className="header-center">
            <ModelStatus model={model} loading={loading || fineTuning} />
          </div>

          <div className="header-right">
            <button
              className={`header-button ${isSpeaking ? "active" : ""}`}
              onClick={isSpeaking ? stop : () => speak("AI Assistant ready")}
              aria-label={
                isSpeaking ? "Stop text-to-speech" : "Test text-to-speech"
              }
            >
              {isSpeaking ? <VolumeX /> : <Volume2 />}
            </button>

            <button
              className="header-button"
              onClick={() => setShowSettings(true)}
              aria-label="Open settings"
            >
              <Settings />
            </button>

            <button
              className="header-button"
              onClick={handleFineTuning}
              disabled={fineTuning || chatHistory.length < 4}
              aria-label="Fine-tune model with your conversations"
              title={
                chatHistory.length < 4
                  ? "Need at least 2 conversations to fine-tune"
                  : "Fine-tune model"
              }
            >
              {fineTuning ? <Loader className="spin" /> : <Brain />}
            </button>
          </div>
        </div>
      </header>

      {/* Main chat area */}
      <main className="ai-main">
        <div
          ref={chatContainerRef}
          className="chat-container"
          role="log"
          aria-label="Chat conversation"
          aria-live="polite"
        >
          <div id="chat-messages" className="messages-list" role="list">
            {messages.map((message) => (
              <Message
                key={message.id}
                message={message}
                isUser={message.isUser}
                timestamp={message.timestamp}
                onSpeak={handleSpeakMessage}
                onCopy={handleCopyMessage}
                onRegenerate={
                  !message.isUser
                    ? () => handleRegenerateResponse(message.id)
                    : null
                }
              />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {loading && (
            <motion.div
              className="typing-indicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              role="status"
              aria-label="AI is typing"
            >
              <div className="typing-avatar">
                <Bot size={20} />
              </div>
              <div className="typing-animation">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="typing-text">AI is thinking...</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Chat input */}
        <div className="chat-input-container">
          <ChatInput
            onSendMessage={handleSendMessage}
            loading={loading}
            onVoiceToggle={handleVoiceToggle}
            isListening={isListening}
            transcript={transcript}
          />
        </div>
      </main>

      {/* Settings panel */}
      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onUpdateSetting={updateSetting}
        voices={voices}
        selectedVoice={selectedVoice}
        onVoiceChange={setSelectedVoice}
        speechRate={speechRate}
        onRateChange={setSpeechRate}
      />

      {/* Session info panel */}
      {currentSession && (
        <div className="session-info" role="status">
          <div className="session-stats">
            <span className="stat-item">
              <MessageSquare size={14} />
              {currentSession.messageCount} messages
            </span>
            <span className="stat-item">
              <Clock size={14} />
              {new Date(currentSession.startTime).toLocaleTimeString()}
            </span>
            {currentSession.fineTuned && (
              <span className="stat-item fine-tuned">
                <Star size={14} />
                Fine-tuned
              </span>
            )}
          </div>
        </div>
      )}

      {/* Quick actions floating menu */}
      <div className="quick-actions-fab">
        <button
          className="fab-main"
          aria-label="Quick actions menu"
          aria-expanded="false"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Help panel */}
      <div className="help-panel-ai" role="complementary">
        <details>
          <summary>Help & Shortcuts</summary>
          <div className="help-content">
            <h3>Voice Commands</h3>
            <ul>
              <li>"Send message" - Send typed message</li>
              <li>"Clear chat" - Clear conversation</li>
              <li>"Go back" - Return to dashboard</li>
              <li>"Open settings" - Open settings panel</li>
              <li>"Fine tune model" - Personalize AI</li>
            </ul>

            <h3>Keyboard Shortcuts</h3>
            <ul>
              <li>
                <kbd>Alt</kbd> + <kbd>C</kbd> - Clear chat
              </li>
              <li>
                <kbd>Alt</kbd> + <kbd>V</kbd> - Toggle voice
              </li>
              <li>
                <kbd>Alt</kbd> + <kbd>S</kbd> - Settings
              </li>
              <li>
                <kbd>Alt</kbd> + <kbd>F</kbd> - Fine-tune
              </li>
              <li>
                <kbd>Esc</kbd> - Cancel action
              </li>
            </ul>
          </div>
        </details>
      </div>
    </div>
  );
};

export default AIAssistant;
