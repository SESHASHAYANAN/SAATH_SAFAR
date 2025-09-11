import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

function App() {
  const [page, setPage] = useState("login");
  const [username, setUsername] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [userPoints, setUserPoints] = useState(0);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [taskProgress, setTaskProgress] = useState(0);
  const [exerciseTimer, setExerciseTimer] = useState(0);
  const [chairPosition, setChairPosition] = useState("center");
  const [leaderboard, setLeaderboard] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [activeBodyPart, setActiveBodyPart] = useState(null);
  const [highlightedBodyPart, setHighlightedBodyPart] = useState(null);
  const [showFeaturePopup, setShowFeaturePopup] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [showBodyPartPopup, setShowBodyPartPopup] = useState(false);
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [currentExerciseStep, setCurrentExerciseStep] = useState(0);
  const [exerciseInProgress, setExerciseInProgress] = useState(false);
  const [currentInstructions, setCurrentInstructions] = useState([]);
  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0);
  const [exerciseSequenceActive, setExerciseSequenceActive] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);

  const timerRef = useRef(null);
  const instructionTimerRef = useRef(null);
  const stepTimerRef = useRef(null);

  // Detailed features data
  const featuresData = {
    smartTracking: {
      title: "Smart Exercise Tracking",
      description:
        "AI-powered monitoring of your exercise form and progress with real-time feedback",
      details: [
        "Real-time posture analysis using advanced sensors",
        "Exercise form correction with instant feedback",
        "Progress tracking with detailed analytics and reports",
        "Personalized recommendations based on your performance data",
        "Integration with wearable devices and health apps",
      ],
      icon: "📊",
    },
    personalizedPlans: {
      title: "Personalized Therapy Plans",
      description:
        "Custom rehabilitation plans tailored specifically to your medical needs and goals",
      details: [
        "AI-generated exercise routines based on your condition",
        "Adaptive difficulty levels that evolve with your progress",
        "Integration with medical history and doctor recommendations",
        "Regular plan updates based on recovery milestones",
        "Customizable intensity and duration settings",
      ],
      icon: "🎯",
    },
    progressMonitoring: {
      title: "Progress Monitoring",
      description:
        "Comprehensive tracking and analysis of your rehabilitation journey",
      details: [
        "Daily progress reports with detailed metrics",
        "Visual progress charts and trend analysis",
        "Milestone tracking with achievement badges",
        "Recovery timeline predictions using machine learning",
        "Comparative analysis with similar cases",
      ],
      icon: "📈",
    },
    healthAnalytics: {
      title: "Health Analytics",
      description:
        "Advanced analytics and insights for better health management",
      details: [
        "Pain pattern analysis and trigger identification",
        "Movement quality assessment with biomechanical insights",
        "Recovery trend analysis and predictive modeling",
        "Predictive health insights and early warning systems",
        "Integration with medical databases for evidence-based care",
      ],
      icon: "🔍",
    },
    aiAssistant: {
      title: "AI Health Assistant",
      description:
        "24/7 intelligent health companion for personalized care and support",
      details: [
        "Natural language processing for intuitive interaction",
        "Instant pain assessment and relief recommendations",
        "Emergency response protocols and alerts",
        "Medication reminders and health tracking",
        "Telemedicine integration for doctor consultations",
      ],
      icon: "🤖",
    },
    smartChair: {
      title: "Smart Chair Integration",
      description:
        "Revolutionary smart chair technology for automated therapy sessions",
      details: [
        "Automated positioning and movement control",
        "Pressure point analysis and adjustment",
        "Real-time biometric monitoring",
        "Customizable therapy programs",
        "Safety protocols and emergency stop features",
      ],
      icon: "🪑",
    },
  };

  // Enhanced body parts with detailed information
  const bodyPartsData = {
    head: {
      name: "Head & Neck",
      commonIssues: [
        "Tension headaches",
        "Neck stiffness",
        "TMJ disorders",
        "Cervical pain",
      ],
      exercises: [
        "Neck rotations",
        "Head tilts",
        "Shoulder shrugs",
        "Jaw exercises",
      ],
      tips: "Maintain proper head alignment and take regular breaks from screens",
      svgId: "head",
    },
    upperBack: {
      name: "Upper Back & Shoulders",
      commonIssues: [
        "Tension",
        "Poor posture",
        "Muscle knots",
        "Rounded shoulders",
      ],
      exercises: [
        "Shoulder blade squeezes",
        "Upper back stretches",
        "Chest opening",
        "Wall angels",
      ],
      tips: "Focus on improving posture and reducing forward head position",
      svgId: "upperBack",
    },
    lowerBack: {
      name: "Lower Back",
      commonIssues: [
        "Chronic pain",
        "Muscle tension",
        "Spinal alignment issues",
        "Disc problems",
      ],
      exercises: [
        "Cat-cow stretch",
        "Pelvic tilts",
        "Knee-to-chest stretches",
        "Bridge poses",
      ],
      tips: "Maintain proper posture and strengthen core muscles for support",
      svgId: "lowerBack",
    },
    spine: {
      name: "Spine",
      commonIssues: [
        "Curvature issues",
        "Disc problems",
        "General stiffness",
        "Vertebral misalignment",
      ],
      exercises: [
        "Spinal twists",
        "Extension exercises",
        "Core strengthening",
        "Decompression stretches",
      ],
      tips: "Maintain neutral spine alignment during all activities and exercises",
      svgId: "spine",
    },
    hip: {
      name: "Hip & Pelvis",
      commonIssues: [
        "Hip flexor tightness",
        "Pelvic tilt",
        "Hip arthritis",
        "IT band syndrome",
      ],
      exercises: [
        "Hip flexor stretch",
        "Hip circles",
        "Pigeon pose",
        "Clamshells",
      ],
      tips: "Keep your hip aligned and avoid sudden movements during exercises",
      svgId: "hip",
    },
    pelvis: {
      name: "Pelvic Region",
      commonIssues: [
        "Pelvic tilt",
        "Hip flexor tightness",
        "Core weakness",
        "SI joint dysfunction",
      ],
      exercises: [
        "Pelvic tilts",
        "Hip flexor stretches",
        "Glute bridges",
        "Dead bugs",
      ],
      tips: "Focus on core stability and hip flexibility for optimal pelvic health",
      svgId: "pelvis",
    },
    leftLeg: {
      name: "Left Leg",
      commonIssues: [
        "Muscle fatigue",
        "Cramping",
        "Weakness",
        "Circulation issues",
      ],
      exercises: [
        "Leg raises",
        "Calf stretches",
        "Thigh strengthening",
        "Hamstring stretches",
      ],
      tips: "Focus on balanced muscle development and proper alignment",
      svgId: "leftLeg",
    },
    rightLeg: {
      name: "Right Leg",
      commonIssues: [
        "Muscle fatigue",
        "Cramping",
        "Weakness",
        "Circulation issues",
      ],
      exercises: [
        "Leg raises",
        "Calf stretches",
        "Thigh strengthening",
        "Hamstring stretches",
      ],
      tips: "Focus on balanced muscle development and proper alignment",
      svgId: "rightLeg",
    },
    knee: {
      name: "Knee Joint",
      commonIssues: [
        "Joint pain",
        "Swelling",
        "Clicking sounds",
        "Stiffness",
        "Cartilage wear",
      ],
      exercises: [
        "Knee bends",
        "Quad stretches",
        "Hamstring stretches",
        "Wall sits",
      ],
      tips: "Strengthen surrounding muscles to support the knee joint and avoid high-impact activities",
      svgId: "knee",
    },
    ankle: {
      name: "Ankle & Foot",
      commonIssues: [
        "Stiffness",
        "Weakness",
        "Balance issues",
        "Plantar fasciitis",
      ],
      exercises: [
        "Ankle circles",
        "Calf raises",
        "Toe flexion",
        "Alphabet drawings",
      ],
      tips: "Improve flexibility and strength gradually, focus on balance training",
      svgId: "ankle",
    },
  };

  // Process AI response into individual cards
  const processAIResponse = (userMessage, aiResponse) => {
    const painLocation = detectPainLocation(userMessage);

    // Split response into individual instructions
    const lines = aiResponse.split("\n").filter((line) => line.trim());
    const instructions = [];

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      // Check if line starts with number or bullet point
      if (
        trimmedLine.match(/^\d+\./) ||
        trimmedLine.match(/^[-•*]/) ||
        trimmedLine.length > 10
      ) {
        // Clean up the instruction text
        const cleanInstruction = trimmedLine
          .replace(/^\d+\.\s*/, "")
          .replace(/^[-•*]\s*/, "");
        if (cleanInstruction.length > 5) {
          instructions.push(cleanInstruction);
        }
      }
    });

    // If no numbered instructions found, split by sentences
    if (instructions.length === 0) {
      const sentences = aiResponse
        .split(/[.!?]+/)
        .filter((s) => s.trim().length > 10);
      instructions.push(...sentences.map((s) => s.trim()));
    }

    // Create individual instruction cards
    const instructionCards = instructions
      .slice(0, 8)
      .map((instruction, index) => ({
        id: Date.now() + index,
        text: instruction,
        type: "instruction-card",
        painLocation,
        stepNumber: index + 1,
        timestamp: new Date(),
        completed: false,
        active: false,
        duration: extractDurationFromInstruction(instruction) || 15, // default 15 seconds
      }));

    if (instructionCards.length > 0) {
      setCards((prev) => [...prev, ...instructionCards]);
      setCurrentInstructions(instructionCards);

      // Highlight the affected body part
      if (painLocation !== "general") {
        setHighlightedBodyPart(painLocation);
        setTimeout(() => setHighlightedBodyPart(null), 20000);
      }

      // Start instruction sequence
      startInstructionSequence(instructionCards, painLocation);
    }
  };

  // Start instruction sequence with real-time body part highlighting
  const startInstructionSequence = (instructions, painLocation) => {
    setExerciseInProgress(true);
    setExerciseSequenceActive(true);
    setCurrentInstructionIndex(0);
    setCompletedSteps([]);

    // Show exercise modal
    setShowExerciseModal(true);
    setCurrentTask(instructions[0]);

    // Start with first instruction
    executeInstruction(instructions[0], painLocation, 0);
  };

  // Execute individual instruction with body part highlighting
  const executeInstruction = (instruction, painLocation, index) => {
    // Highlight specific body part based on instruction content
    const bodyPartToHighlight = determineBodyPartFromInstruction(
      instruction.text,
      painLocation
    );
    setActiveBodyPart(bodyPartToHighlight);

    // Mark current instruction as active
    setCards((prev) =>
      prev.map((card) => ({
        ...card,
        active: card.id === instruction.id,
        completed: card.stepNumber < instruction.stepNumber,
      }))
    );

    // Set timer for instruction
    const instructionDuration = instruction.duration;
    setExerciseTimer(instructionDuration);

    // Start countdown timer
    stepTimerRef.current = setInterval(() => {
      setExerciseTimer((prev) => {
        if (prev <= 1) {
          completeInstruction(instruction.id, index);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Complete individual instruction
  const completeInstruction = (instructionId, index) => {
    // Clear timer
    if (stepTimerRef.current) {
      clearInterval(stepTimerRef.current);
    }

    // Mark instruction as completed
    setCards((prev) =>
      prev.map((card) =>
        card.id === instructionId
          ? { ...card, completed: true, active: false }
          : card
      )
    );

    setCompletedSteps((prev) => [...prev, instructionId]);

    // Move to next instruction or complete sequence
    if (index < currentInstructions.length - 1) {
      const nextInstruction = currentInstructions[index + 1];
      const painLocation = currentInstructions[0].painLocation;
      setCurrentInstructionIndex(index + 1);
      setCurrentTask(nextInstruction);

      // Small delay between instructions
      setTimeout(() => {
        executeInstruction(nextInstruction, painLocation, index + 1);
      }, 1000);
    } else {
      completeExerciseSequence();
    }
  };

  // Manual completion of instruction
  const manualCompleteInstruction = (instructionId, index) => {
    if (stepTimerRef.current) {
      clearInterval(stepTimerRef.current);
    }
    completeInstruction(instructionId, index);
  };

  // Skip to next instruction
  const skipInstruction = () => {
    const currentIndex = currentInstructionIndex;
    const currentInstructionId = currentInstructions[currentIndex]?.id;
    if (currentInstructionId) {
      completeInstruction(currentInstructionId, currentIndex);
    }
  };

  const determineBodyPartFromInstruction = (
    instructionText,
    defaultPainLocation
  ) => {
    const lowerText = instructionText.toLowerCase();

    if (lowerText.includes("left leg") || lowerText.includes("left thigh"))
      return "leftLeg";
    if (lowerText.includes("right leg") || lowerText.includes("right thigh"))
      return "rightLeg";
    if (lowerText.includes("hip") || lowerText.includes("hips")) return "hip";
    if (lowerText.includes("knee")) return "knee";
    if (lowerText.includes("ankle") || lowerText.includes("foot"))
      return "ankle";
    if (lowerText.includes("back") || lowerText.includes("spine"))
      return "lowerBack";
    if (lowerText.includes("pelvis") || lowerText.includes("pelvic"))
      return "pelvis";
    if (lowerText.includes("neck") || lowerText.includes("head")) return "head";
    if (lowerText.includes("shoulder")) return "upperBack";

    return defaultPainLocation;
  };

  // Extract duration from instruction text
  const extractDurationFromInstruction = (text) => {
    const timeMatch = text.match(/(\d+)\s*(second|minute|min|sec)/i);
    if (timeMatch) {
      const value = parseInt(timeMatch[1]);
      const unit = timeMatch[2].toLowerCase();
      return unit.startsWith("min") ? value * 60 : value;
    }

    // Check for "hold" or "repeat" instructions
    if (text.toLowerCase().includes("hold")) return 20;
    if (text.toLowerCase().includes("repeat")) return 25;
    if (text.toLowerCase().includes("stretch")) return 30;
    if (text.toLowerCase().includes("position")) return 10;

    return 15; // default
  };

  // Detect pain location from user message
  const detectPainLocation = (message) => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes("leg")) {
      return lowerMessage.includes("left") ? "leftLeg" : "rightLeg";
    }
    if (lowerMessage.includes("hip")) return "hip";
    if (lowerMessage.includes("knee")) return "knee";
    if (lowerMessage.includes("ankle") || lowerMessage.includes("foot"))
      return "ankle";
    if (lowerMessage.includes("back")) return "lowerBack";
    if (lowerMessage.includes("spine")) return "spine";
    if (lowerMessage.includes("pelvis")) return "pelvis";
    if (lowerMessage.includes("neck") || lowerMessage.includes("head"))
      return "head";
    if (lowerMessage.includes("shoulder")) return "upperBack";
    return "general";
  };

  // Complete entire exercise sequence
  const completeExerciseSequence = () => {
    setExerciseInProgress(false);
    setExerciseSequenceActive(false);
    setActiveBodyPart(null);
    setHighlightedBodyPart(null);
    setCurrentInstructionIndex(0);
    setShowExerciseModal(false);
    setCurrentTask(null);

    // Clear all timers
    if (stepTimerRef.current) {
      clearInterval(stepTimerRef.current);
    }
    if (instructionTimerRef.current) {
      clearTimeout(instructionTimerRef.current);
    }

    // Award points
    const pointsEarned = Math.min(currentInstructions.length * 25, 250);
    setUserPoints((prev) => prev + pointsEarned);

    // Update completed exercises
    const exerciseData = {
      id: Date.now(),
      date: new Date(),
      type: currentInstructions[0]?.painLocation || "general",
      steps: currentInstructions.length,
      points: pointsEarned,
      completedAt: new Date().toLocaleTimeString(),
    };

    setCompletedExercises((prev) => [...prev, exerciseData]);

    // Update leaderboard
    updateLeaderboard(pointsEarned);

    // Show enhanced celebration
    setShowCelebration({
      points: pointsEarned,
      exercises: currentInstructions.length,
      type:
        bodyPartsData[currentInstructions[0]?.painLocation]?.name || "Exercise",
    });

    // Auto-hide celebration after 4 seconds
    setTimeout(() => setShowCelebration(false), 4000);

    // Reset instruction state
    setCurrentInstructions([]);
  };

  // Update leaderboard
  const updateLeaderboard = async (points) => {
    try {
      const updatedLeaderboard = [...leaderboard];
      const userIndex = updatedLeaderboard.findIndex(
        (user) => user.name === username
      );

      if (userIndex >= 0) {
        updatedLeaderboard[userIndex].points += points;
        updatedLeaderboard[userIndex].completedExercises =
          completedExercises.length + 1;
      } else {
        updatedLeaderboard.push({
          name: username,
          points: userPoints + points,
          completedExercises: completedExercises.length + 1,
        });
      }

      updatedLeaderboard.sort((a, b) => b.points - a.points);
      setLeaderboard(updatedLeaderboard);
    } catch (error) {
      console.error("Error updating leaderboard:", error);
    }
  };

  // Load leaderboard on component mount
  useEffect(() => {
    setLeaderboard([
      { name: "Alex Chen", points: 1250, completedExercises: 47 },
      { name: "Sarah Johnson", points: 1180, completedExercises: 43 },
      { name: "Mike Rodriguez", points: 980, completedExercises: 38 },
      { name: "Emma Thompson", points: 850, completedExercises: 32 },
      { name: "David Park", points: 720, completedExercises: 28 },
    ]);
  }, []);

  const handleSend = () => {
    if (!input.trim() || loading || exerciseInProgress) return;

    // Add user message to chat
    const userCard = {
      id: Date.now(),
      text: input,
      type: "user-message",
      timestamp: new Date(),
    };
    setCards((prev) => [...prev, userCard]);

    fetchAIResponse(input);
    setInput("");
  };

  // Enhanced body diagram with comprehensive body parts
  const BodyDiagram = () => (
    <div className="body-diagram">
      <svg width="200" height="500" viewBox="0 0 200 500">
        {/* Head */}
        <circle
          cx="100"
          cy="40"
          r="25"
          className={`body-part head ${
            activeBodyPart === "head" || highlightedBodyPart === "head"
              ? "active"
              : ""
          }`}
          onClick={() => handleBodyPartClick("head")}
          style={{ cursor: "pointer" }}
        />

        {/* Neck */}
        <rect
          x="90"
          y="65"
          width="20"
          height="20"
          className={`body-part neck ${
            activeBodyPart === "head" || highlightedBodyPart === "head"
              ? "active"
              : ""
          }`}
          onClick={() => handleBodyPartClick("head")}
          style={{ cursor: "pointer" }}
        />

        {/* Upper Back/Shoulders */}
        <rect
          x="70"
          y="85"
          width="60"
          height="30"
          className={`body-part upperBack ${
            activeBodyPart === "upperBack" ||
            highlightedBodyPart === "upperBack"
              ? "active"
              : ""
          }`}
          onClick={() => handleBodyPartClick("upperBack")}
          style={{ cursor: "pointer" }}
        />

        {/* Arms */}
        <rect
          x="25"
          y="90"
          width="45"
          height="15"
          className="body-part leftArm"
        />
        <rect
          x="130"
          y="90"
          width="45"
          height="15"
          className="body-part rightArm"
        />

        {/* Torso/Chest */}
        <rect
          x="75"
          y="115"
          width="50"
          height="45"
          className="body-part torso"
        />

        {/* Lower Back/Spine */}
        <rect
          x="80"
          y="160"
          width="40"
          height="40"
          className={`body-part lowerBack ${
            activeBodyPart === "lowerBack" ||
            activeBodyPart === "spine" ||
            highlightedBodyPart === "lowerBack" ||
            highlightedBodyPart === "spine"
              ? "active"
              : ""
          }`}
          onClick={() => handleBodyPartClick("lowerBack")}
          style={{ cursor: "pointer" }}
        />

        {/* Spine line */}
        <line
          x1="100"
          y1="85"
          x2="100"
          y2="200"
          stroke="#666"
          strokeWidth="3"
          className={`body-part spine ${
            activeBodyPart === "spine" || highlightedBodyPart === "spine"
              ? "active"
              : ""
          }`}
          onClick={() => handleBodyPartClick("spine")}
          style={{ cursor: "pointer" }}
        />

        {/* Pelvis/Hip Region */}
        <ellipse
          cx="100"
          cy="220"
          rx="40"
          ry="25"
          className={`body-part pelvis ${
            activeBodyPart === "hip" ||
            activeBodyPart === "pelvis" ||
            highlightedBodyPart === "hip" ||
            highlightedBodyPart === "pelvis"
              ? "active"
              : ""
          }`}
          onClick={() => handleBodyPartClick("pelvis")}
          style={{ cursor: "pointer" }}
        />

        {/* Left Leg Upper */}
        <rect
          x="70"
          y="245"
          width="25"
          height="80"
          className={`body-part leftLeg ${
            activeBodyPart === "leftLeg" || highlightedBodyPart === "leftLeg"
              ? "active"
              : ""
          }`}
          onClick={() => handleBodyPartClick("leftLeg")}
          style={{ cursor: "pointer" }}
        />

        {/* Right Leg Upper */}
        <rect
          x="105"
          y="245"
          width="25"
          height="80"
          className={`body-part rightLeg ${
            activeBodyPart === "rightLeg" || highlightedBodyPart === "rightLeg"
              ? "active"
              : ""
          }`}
          onClick={() => handleBodyPartClick("rightLeg")}
          style={{ cursor: "pointer" }}
        />

        {/* Left Knee */}
        <circle
          cx="82"
          cy="335"
          r="15"
          className={`body-part knee ${
            activeBodyPart === "knee" || highlightedBodyPart === "knee"
              ? "active"
              : ""
          }`}
          onClick={() => handleBodyPartClick("knee")}
          style={{ cursor: "pointer" }}
        />

        {/* Right Knee */}
        <circle
          cx="118"
          cy="335"
          r="15"
          className={`body-part knee ${
            activeBodyPart === "knee" || highlightedBodyPart === "knee"
              ? "active"
              : ""
          }`}
          onClick={() => handleBodyPartClick("knee")}
          style={{ cursor: "pointer" }}
        />

        {/* Left Leg Lower */}
        <rect
          x="70"
          y="350"
          width="25"
          height="80"
          className={`body-part leftLeg ${
            activeBodyPart === "leftLeg" || highlightedBodyPart === "leftLeg"
              ? "active"
              : ""
          }`}
          onClick={() => handleBodyPartClick("leftLeg")}
          style={{ cursor: "pointer" }}
        />

        {/* Right Leg Lower */}
        <rect
          x="105"
          y="350"
          width="25"
          height="80"
          className={`body-part rightLeg ${
            activeBodyPart === "rightLeg" || highlightedBodyPart === "rightLeg"
              ? "active"
              : ""
          }`}
          onClick={() => handleBodyPartClick("rightLeg")}
          style={{ cursor: "pointer" }}
        />

        {/* Left Ankle */}
        <circle
          cx="82"
          cy="440"
          r="12"
          className={`body-part ankle ${
            activeBodyPart === "ankle" || highlightedBodyPart === "ankle"
              ? "active"
              : ""
          }`}
          onClick={() => handleBodyPartClick("ankle")}
          style={{ cursor: "pointer" }}
        />

        {/* Right Ankle */}
        <circle
          cx="118"
          cy="440"
          r="12"
          className={`body-part ankle ${
            activeBodyPart === "ankle" || highlightedBodyPart === "ankle"
              ? "active"
              : ""
          }`}
          onClick={() => handleBodyPartClick("ankle")}
          style={{ cursor: "pointer" }}
        />

        {/* Feet */}
        <ellipse cx="82" cy="465" rx="18" ry="10" className="body-part foot" />
        <ellipse cx="118" cy="465" rx="18" ry="10" className="body-part foot" />
      </svg>
    </div>
  );

  const handleBodyPartClick = (bodyPart) => {
    if (exerciseInProgress) return; // Don't allow clicks during exercise
    setSelectedBodyPart(bodyPart);
    setShowBodyPartPopup(true);
  };

  // Feature popup component
  const FeaturePopup = () => {
    if (!showFeaturePopup || !selectedFeature) return null;

    const feature = featuresData[selectedFeature];

    return (
      <div className="popup-overlay" onClick={() => setShowFeaturePopup(false)}>
        <div
          className="popup-content feature-popup"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="popup-header">
            <span className="feature-icon">{feature.icon}</span>
            <h3>{feature.title}</h3>
          </div>
          <p className="feature-description">{feature.description}</p>
          <div className="feature-details">
            <h4>Key Features:</h4>
            <ul>
              {feature.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
          <div className="popup-actions">
            <button
              className="start-treatment-btn"
              onClick={() => {
                setShowFeaturePopup(false);
                setPage("chair");
              }}
            >
              Try This Feature
            </button>
            <button
              className="popup-close-btn"
              onClick={() => setShowFeaturePopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Body part popup component
  const BodyPartPopup = () => {
    if (!showBodyPartPopup || !selectedBodyPart) return null;

    const bodyPart = bodyPartsData[selectedBodyPart];
    if (!bodyPart) return null;

    return (
      <div
        className="popup-overlay"
        onClick={() => setShowBodyPartPopup(false)}
      >
        <div
          className="popup-content body-part-popup"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="popup-header">
            <span className="body-icon">🎯</span>
            <h3>{bodyPart.name} Information</h3>
          </div>

          <div className="popup-section">
            <h4>📋 Common Issues:</h4>
            <ul>
              {bodyPart.commonIssues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          </div>

          <div className="popup-section">
            <h4>💪 Recommended Exercises:</h4>
            <ul>
              {bodyPart.exercises.map((exercise, index) => (
                <li key={index}>{exercise}</li>
              ))}
            </ul>
          </div>

          <div className="popup-section">
            <h4>💡 Pro Tip:</h4>
            <p className="tip-text">{bodyPart.tips}</p>
          </div>

          <div className="popup-actions">
            <button
              className="start-treatment-btn"
              onClick={() => {
                setShowBodyPartPopup(false);
                setInput(`My ${bodyPart.name.toLowerCase()} is paining`);
                setPage("chat");
                setTimeout(() => handleSend(), 100);
              }}
            >
              🚀 Get Treatment Plan
            </button>
            <button
              className="popup-close-btn"
              onClick={() => setShowBodyPartPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Exercise progress modal
  const ExerciseModal = () => {
    if (!showExerciseModal || !currentTask) return null;

    const progressPercentage =
      ((currentInstructionIndex + 1) / currentInstructions.length) * 100;

    return (
      <div className="exercise-modal-overlay">
        <div className="exercise-modal">
          <div className="exercise-header">
            <h3>🎯 Exercise in Progress</h3>
            <div className="step-indicator">
              Step {currentInstructionIndex + 1} of {currentInstructions.length}
            </div>
          </div>

          <div className="current-task">
            <h4>{currentTask.text}</h4>
            <div className="task-timer">
              <div className="timer-circle">
                <span className="timer-text">
                  {Math.floor(exerciseTimer / 60)}:
                  {(exerciseTimer % 60).toString().padStart(2, "0")}
                </span>
              </div>
              <div className="timer-label">Time Remaining</div>
            </div>
          </div>

          <div className="exercise-progress-bar">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="progress-text">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>

          <div className="chair-status">
            <div className={`chair-indicator ${chairPosition}`}>
              🪑 Chair:{" "}
              {chairPosition === "center" ? "Ready" : `Moving ${chairPosition}`}
            </div>
          </div>

          <div className="body-part-focus">
            {activeBodyPart && (
              <div className="focus-indicator">
                <span className="focus-icon">🎯</span>
                <span>
                  Focusing on:{" "}
                  <strong>
                    {bodyPartsData[activeBodyPart]?.name || activeBodyPart}
                  </strong>
                </span>
              </div>
            )}
          </div>

          <div className="exercise-controls">
            <button className="skip-btn" onClick={skipInstruction}>
              ⏭️ Skip Step
            </button>
            <button
              className="pause-btn"
              onClick={() => setShowExerciseModal(false)}
            >
              ⏸️ Minimize
            </button>
            <button
              className="complete-btn"
              onClick={() =>
                manualCompleteInstruction(
                  currentTask.id,
                  currentInstructionIndex
                )
              }
            >
              ✅ Complete
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced celebration modal
  const CelebrationModal = () => {
    if (!showCelebration) return null;

    return (
      <div className="celebration-modal">
        <div className="celebration-content">
          <div className="celebration-animation">
            <div className="trophy-bounce">🏆</div>
            <div className="confetti-left">🎉</div>
            <div className="confetti-right">🎊</div>
            <div className="stars-left">⭐</div>
            <div className="stars-right">✨</div>
          </div>

          <h2>🎉 Fantastic Work! 🎉</h2>

          <div className="celebration-stats">
            <div className="stat-item">
              <div className="stat-icon">💎</div>
              <span className="stat-number">+{showCelebration.points}</span>
              <span className="stat-label">Points Earned</span>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🎯</div>
              <span className="stat-number">{showCelebration.exercises}</span>
              <span className="stat-label">Steps Completed</span>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🏥</div>
              <span className="stat-number">{showCelebration.type}</span>
              <span className="stat-label">Area Treated</span>
            </div>
          </div>

          <div className="achievement-message">
            <p>
              You've successfully completed your{" "}
              <strong>{showCelebration.type}</strong> therapy session!
            </p>
            <p>🚀 Your progress has been added to the leaderboard!</p>
            <p>💪 Keep up the excellent work on your recovery journey!</p>
          </div>

          <div className="celebration-progress">
            <div className="progress-ring">
              <div className="progress-text">
                <span className="level-text">Level</span>
                <span className="level-number">
                  {Math.floor(userPoints / 100) + 1}
                </span>
              </div>
            </div>
          </div>

          <div className="next-steps">
            <h4>🎯 What's Next?</h4>
            <p>Continue with regular exercises to maintain your progress</p>
          </div>
        </div>
      </div>
    );
  };

  // Format time helper
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Calculate user level
  const getUserLevel = () => Math.floor(userPoints / 100) + 1;
  const getProgressToNextLevel = () => userPoints % 100;

  // Pages
  if (page === "login") {
    return (
      <div className="login-page">
        <div className="login-container">
          <div className="app-logo">🏥</div>
          <h1>ORCA SAATH SAFAR</h1>
          <p className="app-tagline">
            Your AI-Powered Rehabilitation Companion
          </p>
          <p className="app-subtitle">
            Personalized physiotherapy powered by intelligent technology
          </p>
          <div className="login-form">
            <input
              type="text"
              placeholder="Enter your name to begin your wellness journey"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && username && setPage("dashboard")
              }
              className="name-input"
            />
            <button
              onClick={() => username && setPage("dashboard")}
              disabled={!username}
              className="start-btn"
            >
              🚀 Start Your Journey
            </button>
          </div>
          <div className="login-features">
            <div className="feature-highlight">
              <span className="feature-emoji">🤖</span>
              <span>AI-Powered Assessment</span>
            </div>
            <div className="feature-highlight">
              <span className="feature-emoji">🪑</span>
              <span>Smart Chair Integration</span>
            </div>
            <div className="feature-highlight">
              <span className="feature-emoji">📊</span>
              <span>Progress Tracking</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (page === "dashboard") {
    return (
      <div className="dashboard-page">
        <header className="dashboard-header">
          <div className="user-welcome">
            <h1>Welcome back, {username}! 👋</h1>
            <p className="welcome-subtitle">
              Ready to continue your wellness journey?
            </p>
          </div>
          <div className="user-stats">
            <div className="stat">
              <div className="stat-icon">💎</div>
              <span className="stat-value">{userPoints}</span>
              <span className="stat-label">Points</span>
            </div>
            <div className="stat">
              <div className="stat-icon">🎯</div>
              <span className="stat-value">{completedExercises.length}</span>
              <span className="stat-label">Sessions</span>
            </div>
            <div className="stat">
              <div className="stat-icon">📈</div>
              <span className="stat-value">Level {getUserLevel()}</span>
              <span className="stat-label">Progress</span>
            </div>
          </div>
        </header>

        <div className="dashboard-grid">
          <div className="dashboard-card features-card">
            <h2>🚀 Smart Features</h2>
            <p className="card-subtitle">
              Explore our advanced physiotherapy tools
            </p>
            <div className="features-grid">
              {Object.entries(featuresData).map(([key, feature]) => (
                <div
                  key={key}
                  className="feature-item"
                  onClick={() => {
                    setSelectedFeature(key);
                    setShowFeaturePopup(true);
                  }}
                >
                  <span className="feature-icon">{feature.icon}</span>
                  <span className="feature-title">{feature.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-card ai-assistant-card">
            <h2>🤖 AI Health Assistant</h2>
            <p>Get instant, personalized help for your pain and discomfort</p>
            <div className="assistant-stats">
              <div className="assistant-stat">
                <span className="stat-icon">⚡</span>
                <span>Instant Response</span>
              </div>
              <div className="assistant-stat">
                <span className="stat-icon">🎯</span>
                <span>Personalized Plans</span>
              </div>
            </div>
            <div className="quick-actions">
              <button
                className="primary-action"
                onClick={() => setPage("chair")}
              >
                🪑 Start Smart Chair Session
              </button>
              <button
                className="secondary-action"
                onClick={() => {
                  setInput("My leg is paining");
                  setPage("chat");
                  setTimeout(() => handleSend(), 100);
                }}
              >
                💬 Quick Chat Session
              </button>
            </div>
          </div>

          <div className="dashboard-card progress-card">
            <h2>📊 Your Progress</h2>
            <div className="progress-overview">
              <div className="level-progress">
                <h4>Current Level: {getUserLevel()}</h4>
                <div className="level-bar">
                  <div
                    className="level-fill"
                    style={{ width: `${getProgressToNextLevel()}%` }}
                  ></div>
                </div>
                <span>{getProgressToNextLevel()}/100 to next level</span>
              </div>
            </div>
            <div className="progress-stats">
              <div className="progress-item">
                <span>This Week</span>
                <div className="progress-bar mini">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${Math.min(
                        (completedExercises.length / 7) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
                <span>{completedExercises.length}/7 sessions</span>
              </div>
              <div className="progress-item">
                <span>Pain Level</span>
                <div className="pain-indicator low">📉 Improving</div>
              </div>
              <div className="progress-item">
                <span>Consistency</span>
                <div className="consistency-indicator high">🔥 Great</div>
              </div>
            </div>
          </div>

          <div className="dashboard-card leaderboard-card">
            <h2>🏆 Community Leaderboard</h2>
            <p className="card-subtitle">See how you rank among other users</p>
            <div className="leaderboard-list">
              {leaderboard.slice(0, 5).map((user, index) => (
                <div
                  key={index}
                  className={`leaderboard-item ${
                    user.name === username ? "current-user" : ""
                  }`}
                >
                  <div className="rank-section">
                    <span className="rank">#{index + 1}</span>
                    {index === 0 && <span className="crown">👑</span>}
                  </div>
                  <div className="user-section">
                    <span className="name">{user.name}</span>
                    <span className="exercises">
                      {user.completedExercises} exercises
                    </span>
                  </div>
                  <span className="points">{user.points} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <FeaturePopup />
      </div>
    );
  }

  if (page === "chair") {
    return (
      <div className="chair-page">
        <div className="chair-setup">
          <div className="setup-header">
            <h2>🪑 Smart Chair Setup</h2>
            <p className="setup-subtitle">
              Preparing your personalized therapy session
            </p>
          </div>

          <div className="chair-visual">
            <div className="chair-animation">
              <div className="chair-icon">🪑</div>
              <div className="connection-waves">
                <div className="wave wave-1"></div>
                <div className="wave wave-2"></div>
                <div className="wave wave-3"></div>
              </div>
            </div>

            <div className="setup-steps">
              <div className="step completed">
                <div className="step-icon">✅</div>
                <div className="step-content">
                  <span className="step-title">Chair detected</span>
                  <span className="step-description">
                    Smart chair is online and ready
                  </span>
                </div>
              </div>
              <div className="step completed">
                <div className="step-icon">✅</div>
                <div className="step-content">
                  <span className="step-title">Sensors calibrated</span>
                  <span className="step-description">
                    All health monitoring systems active
                  </span>
                </div>
              </div>
              <div className="step active">
                <div className="step-icon">⏳</div>
                <div className="step-content">
                  <span className="step-title">Awaiting user</span>
                  <span className="step-description">
                    Please take your seat to continue
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="setup-instructions">
            <h3>📋 Setup Instructions:</h3>
            <p>
              Please sit comfortably on the chair with your back straight and
              feet flat on the ground. The smart chair will automatically adjust
              to your body measurements and posture requirements.
            </p>
          </div>

          <div className="safety-checklist">
            <h3>🛡️ Safety Checklist:</h3>
            <div className="checklist-grid">
              <div className="checklist-item">
                <span className="check-icon">✅</span>
                <span>Chair is stable and secure</span>
              </div>
              <div className="checklist-item">
                <span className="check-icon">✅</span>
                <span>Emergency stop within reach</span>
              </div>
              <div className="checklist-item">
                <span className="check-icon">✅</span>
                <span>Area around chair is clear</span>
              </div>
              <div className="checklist-item">
                <span className="check-icon">✅</span>
                <span>Comfortable clothing worn</span>
              </div>
            </div>
          </div>

          <button
            className="start-analysis-btn"
            onClick={() => setPage("fetching")}
          >
            🔍 Begin Health Analysis
          </button>
        </div>
      </div>
    );
  }

  if (page === "fetching") {
    return (
      <div className="fetch-page">
        <div className="analysis-container">
          <div className="analysis-header">
            <h2>🔍 Analyzing Your Health Data</h2>
            <p className="analysis-subtitle">
              Advanced AI is processing your biometric information
            </p>
          </div>

          <div className="analysis-visual">
            <div className="scanning-animation">
              <div className="pulse-ring"></div>
              <div className="scan-line"></div>
              <div className="data-points">
                <div className="data-point" style={{ top: "20%", left: "30%" }}>
                  📊
                </div>
                <div
                  className="data-point"
                  style={{ top: "60%", right: "25%" }}
                >
                  💓
                </div>
                <div
                  className="data-point"
                  style={{ bottom: "30%", left: "40%" }}
                >
                  🎯
                </div>
              </div>
            </div>
          </div>

          <div className="analysis-steps">
            <div className="step completed">
              <div className="step-icon">✅</div>
              <div className="step-content">
                <div className="step-title">Connected to smart chair</div>
                <div className="step-description">
                  Established secure connection with all sensors
                </div>
              </div>
            </div>
            <div className="step completed">
              <div className="step-icon">✅</div>
              <div className="step-content">
                <div className="step-title">Reading biometric data</div>
                <div className="step-description">
                  Collecting posture, pressure, and movement data
                </div>
              </div>
            </div>
            <div className="step active">
              <div className="step-icon">⚡</div>
              <div className="step-content">
                <div className="step-title">AI analysis in progress</div>
                <div className="step-description">
                  Processing data through neural networks
                </div>
              </div>
            </div>
            <div className="step pending">
              <div className="step-icon">⏳</div>
              <div className="step-content">
                <div className="step-title">Generating recommendations</div>
                <div className="step-description">
                  Creating your personalized treatment plan
                </div>
              </div>
            </div>
          </div>

          <div className="analysis-stats">
            <div className="stat-item">
              <span className="stat-value">127</span>
              <span className="stat-label">Data Points</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">98%</span>
              <span className="stat-label">Accuracy</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">15s</span>
              <span className="stat-label">Processing</span>
            </div>
          </div>

          <button className="continue-btn" onClick={() => setPage("chat")}>
            🚀 Continue to Health Assistant
          </button>
        </div>
      </div>
    );
  }

  if (page === "chat") {
    return (
      <div className="chat-page">
        <div className="chat-header">
          <button className="back-btn" onClick={() => setPage("dashboard")}>
            ← Dashboard
          </button>
          <div className="header-center">
            <h1>🤖 AI Health Assistant</h1>
            <span className="status-indicator">🟢 Online</span>
          </div>
          <div className="user-info">
            <span className="user-name">{username}</span>
            <span className="user-points">💎 {userPoints} points</span>
            <span className="user-level">Level {getUserLevel()}</span>
          </div>
        </div>

        <div className="chat-layout">
          <div className="left-sidebar">
            <div className="body-section">
              <h3>🎯 Body Map</h3>
              <BodyDiagram />
              <p className="body-hint">
                Click on any body part for detailed information and exercises
              </p>
              {activeBodyPart && (
                <div className="active-body-part">
                  <span className="active-indicator">🔴</span>
                  <div className="active-info">
                    <span className="active-text">Currently targeting:</span>
                    <strong>
                      {bodyPartsData[activeBodyPart]?.name || activeBodyPart}
                    </strong>
                  </div>
                </div>
              )}
            </div>

            {exerciseInProgress && (
              <div className="exercise-progress-sidebar">
                <h4>⚡ Exercise Status</h4>
                <div className="progress-info">
                  <span className="progress-step">
                    Step {currentInstructionIndex + 1}/
                    {currentInstructions.length}
                  </span>
                  <div className="mini-progress-bar">
                    <div
                      className="mini-progress-fill"
                      style={{
                        width: `${
                          ((currentInstructionIndex + 1) /
                            currentInstructions.length) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                  <span className="progress-percentage">
                    {Math.round(
                      ((currentInstructionIndex + 1) /
                        currentInstructions.length) *
                        100
                    )}
                    % Complete
                  </span>
                </div>
                <button
                  className="show-modal-btn"
                  onClick={() => setShowExerciseModal(true)}
                >
                  👁️ Show Progress
                </button>
              </div>
            )}
          </div>

          <div className="chat-main">
            <div className="chat-container">
              {cards.length === 0 && (
                <div className="welcome-message">
                  <div className="welcome-header">
                    <h3>👋 Hello {username}!</h3>
                    <span className="ai-badge">🤖 AI Powered</span>
                  </div>
                  <p className="welcome-description">
                    I'm your AI health assistant, ready to provide personalized
                    exercises and treatments. Tell me about any pain or
                    discomfort you're experiencing, and I'll create a
                    step-by-step treatment plan just for you.
                  </p>
                  <div className="capabilities">
                    <div className="capability-item">
                      <span className="capability-icon">🎯</span>
                      <span>Personalized Treatment Plans</span>
                    </div>
                    <div className="capability-item">
                      <span className="capability-icon">📱</span>
                      <span>Real-time Exercise Guidance</span>
                    </div>
                    <div className="capability-item">
                      <span className="capability-icon">📊</span>
                      <span>Progress Tracking</span>
                    </div>
                  </div>
                  <div className="quick-suggestions">
                    <h4>🚀 Quick Start Options:</h4>
                    <div className="suggestions-grid">
                      <button
                        className="suggestion-btn"
                        onClick={() => {
                          setInput("My left leg is paining");
                          setTimeout(() => handleSend(), 100);
                        }}
                      >
                        <span className="suggestion-icon">🦵</span>
                        <span>Left Leg Pain</span>
                      </button>
                      <button
                        className="suggestion-btn"
                        onClick={() => {
                          setInput("I have knee pain");
                          setTimeout(() => handleSend(), 100);
                        }}
                      >
                        <span className="suggestion-icon">🔘</span>
                        <span>Knee Pain</span>
                      </button>
                      <button
                        className="suggestion-btn"
                        onClick={() => {
                          setInput("My back hurts");
                          setTimeout(() => handleSend(), 100);
                        }}
                      >
                        <span className="suggestion-icon">🏥</span>
                        <span>Back Pain</span>
                      </button>
                      <button
                        className="suggestion-btn"
                        onClick={() => {
                          setInput("Hip pain and stiffness");
                          setTimeout(() => handleSend(), 100);
                        }}
                      >
                        <span className="suggestion-icon">⚕️</span>
                        <span>Hip Issues</span>
                      </button>
                      <button
                        className="suggestion-btn"
                        onClick={() => {
                          setInput("Neck stiffness and pain");
                          setTimeout(() => handleSend(), 100);
                        }}
                      >
                        <span className="suggestion-icon">🩺</span>
                        <span>Neck Problems</span>
                      </button>
                      <button
                        className="suggestion-btn"
                        onClick={() => {
                          setInput("Ankle mobility issues");
                          setTimeout(() => handleSend(), 100);
                        }}
                      >
                        <span className="suggestion-icon">🏃</span>
                        <span>Ankle Mobility</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {cards.map((card, index) => {
                if (card.type === "user-message") {
                  return (
                    <div key={card.id} className="message user-message">
                      <div className="message-avatar">👤</div>
                      <div className="message-bubble">
                        <div className="message-content">{card.text}</div>
                        <div className="message-time">
                          {card.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  );
                }

                if (card.type === "instruction-card") {
                  return (
                    <div
                      key={card.id}
                      className={`instruction-card ${
                        card.completed ? "completed" : ""
                      } ${card.active ? "active" : ""}`}
                    >
                      <div className="instruction-header">
                        <div className="step-info">
                          <span className="step-number">
                            Step {card.stepNumber}
                          </span>
                          <span className="body-part-tag">
                            {bodyPartsData[card.painLocation]?.name ||
                              card.painLocation}
                          </span>
                        </div>
                        <div className="card-status">
                          {card.completed && (
                            <span className="completed-badge">✅ Done</span>
                          )}
                          {card.active && (
                            <span className="active-badge">🔄 Active</span>
                          )}
                          {!card.completed && !card.active && (
                            <span className="pending-badge">⏳ Pending</span>
                          )}
                        </div>
                      </div>

                      <div className="instruction-content">
                        <p>{card.text}</p>
                        {card.active && exerciseTimer > 0 && (
                          <div className="timer-display">
                            <span className="timer-icon">⏱️</span>
                            <span className="timer-text">
                              {formatTime(exerciseTimer)} remaining
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="instruction-footer">
                        <div className="card-meta">
                          <span className="instruction-time">
                            {card.timestamp.toLocaleTimeString()}
                          </span>
                          <span className="duration-info">
                            ~{card.duration}s duration
                          </span>
                        </div>
                        {!card.completed && !exerciseInProgress && (
                          <button
                            className="manual-complete-btn"
                            onClick={() =>
                              manualCompleteInstruction(
                                card.id,
                                card.stepNumber - 1
                              )
                            }
                          >
                            ✅ Mark Complete
                          </button>
                        )}
                      </div>
                    </div>
                  );
                }

                return null;
              })}

              {loading && (
                <div className="loading-message">
                  <div className="ai-avatar">🤖</div>
                  <div className="loading-content">
                    <div className="loading-spinner"></div>
                    <span className="loading-text">
                      Creating your personalized treatment plan...
                    </span>
                    <div className="loading-steps">
                      <span className="loading-step">
                        Analyzing your condition...
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="error-message">
                  <div className="error-icon">⚠️</div>
                  <div className="error-content">
                    <span className="error-text">{errorMsg}</span>
                    <button
                      className="retry-btn"
                      onClick={() => {
                        setErrorMsg("");
                        if (input.trim()) handleSend();
                      }}
                    >
                      🔄 Retry
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="chat-input-container">
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Describe your pain or ask for help... (e.g., 'My leg is paining', 'I need back exercises')"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  disabled={loading || exerciseInProgress}
                  className="message-input"
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim() || exerciseInProgress}
                  className="send-btn"
                >
                  {loading ? "🔄" : "🚀"}
                </button>
              </div>
              {exerciseInProgress && (
                <div className="input-status">
                  <span className="status-text">
                    ⚡ Exercise in progress - messaging temporarily disabled
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="right-sidebar">
            <div className="session-progress">
              <h4>📊 Session Progress</h4>
              <div className="progress-ring-container">
                <div className="progress-ring">
                  <span className="progress-percentage">
                    {Math.round((completedExercises.length / 5) * 100)}%
                  </span>
                </div>
              </div>
              <div className="progress-details">
                <p>
                  {completedExercises.length} of 5 exercises completed today
                </p>
                <div className="streak-info">
                  <span className="streak-icon">🔥</span>
                  <span>3 day streak!</span>
                </div>
              </div>
            </div>

            <div className="quick-actions">
              <h4>🚀 Common Treatments</h4>
              <button
                className="quick-action-btn"
                onClick={() => {
                  setInput("Lower back pain relief exercises");
                  setTimeout(() => handleSend(), 100);
                }}
                disabled={exerciseInProgress}
              >
                <span className="action-icon">🏥</span>
                <span>Lower Back Pain</span>
              </button>
              <button
                className="quick-action-btn"
                onClick={() => {
                  setInput("Neck stiffness treatment");
                  setTimeout(() => handleSend(), 100);
                }}
                disabled={exerciseInProgress}
              >
                <span className="action-icon">🩺</span>
                <span>Neck Stiffness</span>
              </button>
              <button
                className="quick-action-btn"
                onClick={() => {
                  setInput("Hip mobility exercises");
                  setTimeout(() => handleSend(), 100);
                }}
                disabled={exerciseInProgress}
              >
                <span className="action-icon">🏃</span>
                <span>Hip Mobility</span>
              </button>
              <button
                className="quick-action-btn"
                onClick={() => {
                  setInput("Posture improvement exercises");
                  setTimeout(() => handleSend(), 100);
                }}
                disabled={exerciseInProgress}
              >
                <span className="action-icon">📐</span>
                <span>Posture Help</span>
              </button>
            </div>

            <div className="leaderboard-mini">
              <h4>🏆 Top Performers</h4>
              {leaderboard.slice(0, 3).map((user, index) => (
                <div
                  key={index}
                  className={`mini-leaderboard-item ${
                    user.name === username ? "current-user" : ""
                  }`}
                >
                  <div className="mini-rank">
                    <span className="rank-number">#{index + 1}</span>
                    {index === 0 && <span className="crown">👑</span>}
                  </div>
                  <div className="mini-user-info">
                    <span className="mini-name">{user.name}</span>
                    <span className="mini-exercises">
                      {user.completedExercises} exercises
                    </span>
                  </div>
                  <span className="mini-points">{user.points}</span>
                </div>
              ))}
              {!leaderboard.find((user) => user.name === username) &&
                userPoints > 0 && (
                  <div className="mini-leaderboard-item current-user">
                    <div className="mini-rank">
                      <span className="rank-number">
                        #{leaderboard.length + 1}
                      </span>
                    </div>
                    <div className="mini-user-info">
                      <span className="mini-name">{username}</span>
                      <span className="mini-exercises">
                        {completedExercises.length} exercises
                      </span>
                    </div>
                    <span className="mini-points">{userPoints}</span>
                  </div>
                )}
            </div>
          </div>
        </div>

        <BodyPartPopup />
        <ExerciseModal />
        <CelebrationModal />
      </div>
    );
  }

  return null;
}

export default App;
