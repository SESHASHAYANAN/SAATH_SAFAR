import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Settings,
  User,
  Lock,
  AlertCircle,
  CheckCircle,
  Loader,
  Speaker,
} from "lucide-react";
import "./Login.css";

// Voice recognition hook
const useVoiceRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
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

      recognitionInstance.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
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

  return { isListening, transcript, startListening, stopListening };
};

// Text-to-speech hook
const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const updateVoices = () => {
      setVoices(speechSynthesis.getVoices());
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

        utterance.rate = options.rate || 1;
        utterance.pitch = options.pitch || 1;
        utterance.volume = options.volume || 1;

        if (options.voice) {
          const selectedVoice = voices.find(
            (voice) => voice.name === options.voice
          );
          if (selectedVoice) utterance.voice = selectedVoice;
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        speechSynthesis.speak(utterance);
      }
    },
    [voices]
  );

  const stop = useCallback(() => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return { speak, stop, isSpeaking, voices };
};

// Accessibility settings hook
const useAccessibilitySettings = () => {
  const [settings, setSettings] = useState({
    fontSize: "medium",
    contrast: "normal",
    motionReduced: false,
    screenReader: false,
    keyboardNavigation: true,
    voiceCommands: false,
    textToSpeech: false,
    highContrast: false,
    largeText: false,
    colorBlind: false,
    dyslexiaMode: false,
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

// Keyboard navigation hook
const useKeyboardNavigation = () => {
  const [focusedElement, setFocusedElement] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Tab") {
        const focusableElements = document.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const focusedIndex = Array.from(focusableElements).indexOf(
          document.activeElement
        );

        if (e.shiftKey) {
          const prevIndex = focusedIndex - 1;
          if (prevIndex >= 0) {
            focusableElements[prevIndex].focus();
          } else {
            focusableElements[focusableElements.length - 1].focus();
          }
        } else {
          const nextIndex = focusedIndex + 1;
          if (nextIndex < focusableElements.length) {
            focusableElements[nextIndex].focus();
          } else {
            focusableElements[0].focus();
          }
        }
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return { focusedElement, setFocusedElement };
};

// Main Login Component
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimer, setBlockTimer] = useState(0);
  const [currentFocus, setCurrentFocus] = useState(0);
  const [announcement, setAnnouncement] = useState("");

  // Hooks
  const { isListening, transcript, startListening, stopListening } =
    useVoiceRecognition();
  const { speak, stop, isSpeaking } = useTextToSpeech();
  const { settings, updateSetting } = useAccessibilitySettings();
  const { focusedElement } = useKeyboardNavigation();

  // Refs
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const submitRef = useRef(null);
  const voiceButtonRef = useRef(null);
  const speakerButtonRef = useRef(null);

  // Voice command processing
  useEffect(() => {
    if (transcript) {
      const command = transcript.toLowerCase();

      if (command.includes("login") || command.includes("sign in")) {
        handleSubmit();
      } else if (command.includes("email") && command.includes("field")) {
        emailRef.current?.focus();
      } else if (command.includes("password") && command.includes("field")) {
        passwordRef.current?.focus();
      } else if (command.includes("show password")) {
        setShowPassword(true);
      } else if (command.includes("hide password")) {
        setShowPassword(false);
      } else if (command.includes("help")) {
        announceHelp();
      } else if (command.includes("clear")) {
        setFormData({ email: "", password: "", rememberMe: false });
      }
    }
  }, [transcript]);

  // Block timer effect
  useEffect(() => {
    let timer;
    if (isBlocked && blockTimer > 0) {
      timer = setTimeout(() => {
        setBlockTimer((prev) => prev - 1);
      }, 1000);
    } else if (blockTimer === 0 && isBlocked) {
      setIsBlocked(false);
      setLoginAttempts(0);
    }
    return () => clearTimeout(timer);
  }, [blockTimer, isBlocked]);

  // Accessibility announcements
  const announce = useCallback(
    (message) => {
      setAnnouncement(message);
      if (settings.textToSpeech) {
        speak(message);
      }
      setTimeout(() => setAnnouncement(""), 3000);
    },
    [speak, settings.textToSpeech]
  );

  const announceHelp = useCallback(() => {
    const helpText = `
      Welcome to the accessible login page. 
      You can navigate using Tab key or voice commands.
      Voice commands include: 
      Say "email field" to focus email input,
      Say "password field" to focus password input,
      Say "login" or "sign in" to submit the form,
      Say "show password" or "hide password" to toggle password visibility,
      Say "help" to hear this message again,
      Say "clear" to clear all fields.
    `;
    announce(helpText);
  }, [announce]);

  // Form validation
  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Handle input changes
  const handleInputChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));

      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    },
    [errors]
  );

  // Handle form submission
  const handleSubmit = useCallback(
    async (e) => {
      if (e) e.preventDefault();

      if (isBlocked) {
        announce(
          `Account temporarily blocked. Please wait ${blockTimer} seconds.`
        );
        return;
      }

      if (!validateForm()) {
        announce("Please correct the form errors and try again.");
        return;
      }

      setLoading(true);
      announce("Logging in...");

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Simulate login failure for demo (remove in production)
        const loginSuccess = Math.random() > 0.3;

        if (loginSuccess) {
          announce("Login successful. Redirecting to dashboard.");
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("userEmail", formData.email);
          setTimeout(() => navigate("/dashboard"), 1000);
        } else {
          setLoginAttempts((prev) => prev + 1);

          if (loginAttempts >= 2) {
            setIsBlocked(true);
            setBlockTimer(30);
            announce(
              "Too many failed attempts. Account blocked for 30 seconds."
            );
          } else {
            announce("Invalid credentials. Please try again.");
          }

          setErrors({ general: "Invalid email or password" });
        }
      } catch (error) {
        announce("Login failed. Please try again later.");
        setErrors({ general: "Login failed. Please try again later." });
      } finally {
        setLoading(false);
      }
    },
    [
      formData,
      validateForm,
      isBlocked,
      blockTimer,
      loginAttempts,
      announce,
      navigate,
    ]
  );

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.key === "h") {
        e.preventDefault();
        announceHelp();
      } else if (e.altKey && e.key === "v") {
        e.preventDefault();
        if (isListening) {
          stopListening();
        } else {
          startListening();
        }
      } else if (e.altKey && e.key === "s") {
        e.preventDefault();
        if (isSpeaking) {
          stop();
        } else if (announcement) {
          speak(announcement);
        }
      } else if (e.key === "Enter" && e.ctrlKey) {
        e.preventDefault();
        handleSubmit();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    announceHelp,
    isListening,
    startListening,
    stopListening,
    isSpeaking,
    stop,
    speak,
    announcement,
    handleSubmit,
  ]);

  // Accessibility settings panel
  const AccessibilityPanel = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="accessibility-panel"
      role="dialog"
      aria-label="Accessibility Settings"
    >
      <h3>Accessibility Settings</h3>

      <div className="setting-group">
        <label>
          <input
            type="checkbox"
            checked={settings.textToSpeech}
            onChange={(e) => updateSetting("textToSpeech", e.target.checked)}
            aria-describedby="tts-desc"
          />
          Text-to-Speech
        </label>
        <p id="tts-desc" className="setting-desc">
          Automatically read form messages and announcements
        </p>
      </div>

      <div className="setting-group">
        <label>
          <input
            type="checkbox"
            checked={settings.highContrast}
            onChange={(e) => updateSetting("highContrast", e.target.checked)}
            aria-describedby="contrast-desc"
          />
          High Contrast Mode
        </label>
        <p id="contrast-desc" className="setting-desc">
          Increase contrast for better visibility
        </p>
      </div>

      <div className="setting-group">
        <label>
          <input
            type="checkbox"
            checked={settings.largeText}
            onChange={(e) => updateSetting("largeText", e.target.checked)}
            aria-describedby="large-text-desc"
          />
          Large Text
        </label>
        <p id="large-text-desc" className="setting-desc">
          Increase text size for better readability
        </p>
      </div>

      <div className="setting-group">
        <label>
          <input
            type="checkbox"
            checked={settings.motionReduced}
            onChange={(e) => updateSetting("motionReduced", e.target.checked)}
            aria-describedby="motion-desc"
          />
          Reduce Motion
        </label>
        <p id="motion-desc" className="setting-desc">
          Minimize animations and transitions
        </p>
      </div>

      <div className="setting-group">
        <label>
          <input
            type="checkbox"
            checked={settings.dyslexiaMode}
            onChange={(e) => updateSetting("dyslexiaMode", e.target.checked)}
            aria-describedby="dyslexia-desc"
          />
          Dyslexia-Friendly Font
        </label>
        <p id="dyslexia-desc" className="setting-desc">
          Use fonts optimized for dyslexic users
        </p>
      </div>
    </motion.div>
  );

  // Voice command indicator
  const VoiceIndicator = () => (
    <AnimatePresence>
      {isListening && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="voice-indicator"
          aria-live="polite"
        >
          <div className="pulse-ring"></div>
          <Mic className="voice-icon" />
          <span className="sr-only">Voice recognition active</span>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Error display component
  const ErrorDisplay = ({ error }) => (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="error-message"
      role="alert"
      aria-live="polite"
    >
      <AlertCircle size={16} />
      <span>{error}</span>
    </motion.div>
  );

  // Success display component
  const SuccessDisplay = ({ message }) => (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="success-message"
      role="status"
      aria-live="polite"
    >
      <CheckCircle size={16} />
      <span>{message}</span>
    </motion.div>
  );

  return (
    <div
      className={`login-container ${
        settings.highContrast ? "high-contrast" : ""
      } ${settings.largeText ? "large-text" : ""} ${
        settings.dyslexiaMode ? "dyslexia-font" : ""
      }`}
    >
      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* Skip link for keyboard users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Header with accessibility tools */}
      <header className="login-header" role="banner">
        <div className="header-content">
          <h1 className="app-title">
            <span className="sr-only">Accessibility First Login</span>
            <span aria-hidden="true">🌟 AccessApp</span>
          </h1>

          <div className="header-tools">
            <button
              ref={voiceButtonRef}
              className={`tool-button ${isListening ? "active" : ""}`}
              onClick={isListening ? stopListening : startListening}
              aria-label={
                isListening
                  ? "Stop voice recognition"
                  : "Start voice recognition"
              }
              title="Alt+V for voice commands"
            >
              {isListening ? <MicOff /> : <Mic />}
            </button>

            <button
              ref={speakerButtonRef}
              className={`tool-button ${isSpeaking ? "active" : ""}`}
              onClick={
                isSpeaking
                  ? stop
                  : () => speak("Welcome to the accessible login page")
              }
              aria-label={
                isSpeaking ? "Stop text-to-speech" : "Start text-to-speech"
              }
              title="Alt+S for text-to-speech"
            >
              {isSpeaking ? <VolumeX /> : <Volume2 />}
            </button>

            <button
              className="tool-button"
              onClick={announceHelp}
              aria-label="Get help and keyboard shortcuts"
              title="Alt+H for help"
            >
              <Settings />
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main id="main-content" className="login-main" role="main">
        <div className="login-card">
          {/* Voice indicator */}
          <VoiceIndicator />

          {/* Login form header */}
          <div className="form-header">
            <div className="form-icon">
              <User size={40} />
            </div>
            <h2>Welcome Back</h2>
            <p className="form-subtitle">
              Sign in to your accessible dashboard
            </p>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="login-form" noValidate>
            {/* General error display */}
            {errors.general && <ErrorDisplay error={errors.general} />}

            {/* Block notification */}
            {isBlocked && (
              <ErrorDisplay
                error={`Account blocked. Try again in ${blockTimer} seconds.`}
              />
            )}

            {/* Email field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
                <span className="required-indicator" aria-label="required">
                  *
                </span>
              </label>
              <div className="input-wrapper">
                <User className="input-icon" aria-hidden="true" />
                <input
                  ref={emailRef}
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-input ${errors.email ? "error" : ""}`}
                  placeholder="Enter your email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : "email-desc"}
                  autoComplete="email"
                  disabled={loading || isBlocked}
                  required
                />
              </div>
              <div id="email-desc" className="input-desc">
                Enter the email address associated with your account
              </div>
              {errors.email && (
                <div id="email-error" className="error-text" role="alert">
                  {errors.email}
                </div>
              )}
            </div>

            {/* Password field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
                <span className="required-indicator" aria-label="required">
                  *
                </span>
              </label>
              <div className="input-wrapper">
                <Lock className="input-icon" aria-hidden="true" />
                <input
                  ref={passwordRef}
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`form-input ${errors.password ? "error" : ""}`}
                  placeholder="Enter your password"
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password ? "password-error" : "password-desc"
                  }
                  autoComplete="current-password"
                  disabled={loading || isBlocked}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              <div id="password-desc" className="input-desc">
                Enter your secure password (minimum 6 characters)
              </div>
              {errors.password && (
                <div id="password-error" className="error-text" role="alert">
                  {errors.password}
                </div>
              )}
            </div>

            {/* Remember me checkbox */}
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="checkbox-input"
                  disabled={loading || isBlocked}
                />
                <span className="checkbox-custom" aria-hidden="true"></span>
                <span className="checkbox-text">
                  Remember me on this device
                </span>
              </label>
            </div>

            {/* Submit button */}
            <button
              ref={submitRef}
              type="submit"
              className="submit-button"
              disabled={loading || isBlocked}
              aria-describedby="submit-desc"
            >
              {loading ? (
                <>
                  <Loader className="spin" size={20} />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
            <div id="submit-desc" className="input-desc">
              Press Ctrl+Enter to submit form quickly
            </div>

            {/* Forgot password link */}
            <div className="form-footer">
              <button
                type="button"
                className="link-button"
                onClick={() => announce("Password reset feature coming soon")}
              >
                Forgot your password?
              </button>
            </div>
          </form>

          {/* Accessibility panel */}
          <details className="accessibility-details">
            <summary className="accessibility-summary">
              <Settings size={16} />
              Accessibility Options
            </summary>
            <AccessibilityPanel />
          </details>

          {/* Help section */}
          <div className="help-section">
            <h3>Keyboard Shortcuts</h3>
            <ul className="shortcut-list">
              <li>
                <kbd>Alt</kbd> + <kbd>H</kbd> - Get help
              </li>
              <li>
                <kbd>Alt</kbd> + <kbd>V</kbd> - Toggle voice commands
              </li>
              <li>
                <kbd>Alt</kbd> + <kbd>S</kbd> - Toggle text-to-speech
              </li>
              <li>
                <kbd>Ctrl</kbd> + <kbd>Enter</kbd> - Submit form
              </li>
              <li>
                <kbd>Tab</kbd> - Navigate between fields
              </li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="login-footer" role="contentinfo">
        <p>&copy; 2025 AccessApp. Designed for everyone.</p>
        <div className="footer-links">
          <button
            className="link-button"
            onClick={() => announce("Privacy policy coming soon")}
          >
            Privacy Policy
          </button>
          <button
            className="link-button"
            onClick={() => announce("Terms of service coming soon")}
          >
            Terms of Service
          </button>
          <button
            className="link-button"
            onClick={() => announce("Accessibility statement coming soon")}
          >
            Accessibility
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Login;
