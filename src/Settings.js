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
  Settings,
  Home,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Shield,
  Bell,
  Globe,
  Accessibility,
  Heart,
  Activity,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Sun,
  Moon,
  Contrast,
  Type,
  MousePointer,
  Keyboard,
  Monitor,
  Headphones,
  Speaker,
  Gamepad2,
  Wifi,
  Battery,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Search,
  Filter,
  Plus,
  Minus,
  X,
  Check,
  AlertTriangle,
  Info,
  HelpCircle,
  Star,
  Award,
  Target,
  TrendingUp,
  Users,
  MessageSquare,
  BookOpen,
  Zap,
  Brain,
  Sparkles,
  BarChart3,
  Loader,
  Copy,
  ExternalLink,
  Share2,
  Edit3,
  Camera,
  Maximize2,
  Minimize2,
  RotateCcw,
  Palette,
  Sliders,
  ToggleLeft,
  ToggleRight,
  Power,
  Database,
  CloudDownload,
  CloudUpload,
  HardDrive,
  Smartphone,
  Tablet,
  Laptop,
  Desktop,
  Watch,
  Tv,
  Radio,
  Bluetooth,
  Cast,
  PictureInPicture,
  Subtitles,
  Languages,
  Timer,
  Stopwatch,
  AlarmClock,
  History,
  Bookmark,
  Tag,
  Flag,
  Archive,
  Folder,
  File,
  FileText,
  Image,
  Video,
  Music,
  Paperclip,
  Link2,
} from "lucide-react";
import "./Settings.css";

// Custom hooks for settings management
const useSettingsData = () => {
  const [settings, setSettings] = useState({
    accessibility: {
      fontSize: "medium",
      fontFamily: "system",
      contrast: "normal",
      colorScheme: "auto",
      reducedMotion: false,
      screenReader: false,
      keyboardNavigation: true,
      voiceCommands: true,
      textToSpeech: true,
      captions: true,
      signLanguage: false,
      highContrast: false,
      largeText: false,
      colorBlind: "none",
      dyslexiaMode: false,
      focusIndicator: true,
      skipLinks: true,
      magnification: 100,
      speechRate: 1.0,
      speechPitch: 1.0,
      speechVolume: 1.0,
      brailleDotSize: "medium",
      brailleGrade: "2",
      screenReaderVoice: "default",
      screenReaderLanguage: "en-US",
      keyboardShortcuts: true,
      stickyKeys: false,
      filterKeys: false,
      mouseKeys: false,
      soundOnCaps: false,
      visualBell: false,
      audioDescriptions: true,
      autoplayVideos: false,
      flashingContent: "reduce",
      parallaxEffects: false,
      autoFocus: true,
      timeoutExtensions: true,
    },
    interface: {
      theme: "auto",
      layout: "comfortable",
      sidebarPosition: "left",
      sidebarCollapsed: false,
      toolbarVisible: true,
      statusBarVisible: true,
      breadcrumbsVisible: true,
      shortcutsVisible: true,
      animationsEnabled: true,
      transitionsEnabled: true,
      soundEffectsEnabled: true,
      hapticFeedback: true,
      customCss: "",
      compactMode: false,
      fullWidth: false,
      gridDensity: "medium",
      iconSize: "medium",
      buttonSize: "medium",
      inputSize: "medium",
      borderRadius: "medium",
      shadows: true,
      transparency: false,
      customTheme: {
        primaryColor: "#0066cc",
        secondaryColor: "#666666",
        accentColor: "#ff6b35",
        backgroundColor: "#ffffff",
        textColor: "#000000",
        linkColor: "#0066cc",
        successColor: "#28a745",
        warningColor: "#ffc107",
        errorColor: "#dc3545",
        infoColor: "#17a2b8",
      },
    },
    privacy: {
      profileVisibility: "friends",
      activityVisibility: "private",
      searchVisibility: true,
      indexBySearchEngines: false,
      shareUsageData: false,
      shareAnalytics: false,
      personalization: true,
      targetedAds: false,
      thirdPartyTracking: false,
      cookiePreferences: "essential",
      dataRetention: "2_years",
      autoDeleteData: false,
      downloadMyData: false,
      deleteMyAccount: false,
      twoFactorAuth: false,
      sessionTimeout: 30,
      ipRestrictions: false,
      deviceManagement: true,
      loginNotifications: true,
      securityAlerts: true,
      passwordStrength: "strong",
      biometricAuth: false,
      securityQuestions: 3,
      backupCodes: 8,
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      desktopNotifications: true,
      soundNotifications: true,
      vibrationNotifications: true,
      ledNotifications: false,
      quietHours: {
        enabled: true,
        startTime: "22:00",
        endTime: "08:00",
        weekendsOnly: false,
      },
      categories: {
        system: true,
        security: true,
        updates: true,
        social: false,
        marketing: false,
        reminders: true,
        calendar: true,
        messages: true,
        mentions: true,
        follows: false,
        achievements: true,
        news: false,
        recommendations: false,
      },
      frequency: {
        immediate: ["security", "system"],
        daily: ["reminders", "calendar"],
        weekly: ["updates", "achievements"],
        never: ["marketing", "social"],
      },
      channels: {
        email: ["security", "system", "updates"],
        push: ["messages", "reminders", "calendar"],
        sms: ["security"],
        desktop: ["messages", "calendar", "reminders"],
      },
    },
    communication: {
      language: "en-US",
      timezone: "America/New_York",
      dateFormat: "MM/DD/YYYY",
      timeFormat: "12h",
      numberFormat: "US",
      currency: "USD",
      units: "imperial",
      weekStart: "sunday",
      calendarType: "gregorian",
      translationService: "auto",
      spellCheck: true,
      autoCorrect: true,
      autoComplete: true,
      predictiveText: false,
      voiceToText: true,
      textToVoice: true,
      preferredVoice: "default",
      voiceSpeed: 1.0,
      voicePitch: 1.0,
      communicationStyle: "balanced",
      formalityLevel: "medium",
      verbosity: "medium",
      emojiSupport: true,
      markdownSupport: true,
      richTextEditor: true,
    },
    data: {
      autoSync: true,
      syncFrequency: "hourly",
      offlineMode: true,
      cacheSize: "1GB",
      compressionEnabled: true,
      encryptionEnabled: true,
      backupEnabled: true,
      backupFrequency: "daily",
      backupLocation: "cloud",
      maxBackups: 30,
      exportFormat: "json",
      importValidation: true,
      dataValidation: true,
      conflictResolution: "manual",
      versionControl: true,
      auditLog: true,
      dataDeduplication: true,
      archiveOldData: true,
      archiveAfter: "1_year",
      purgeAfter: "5_years",
    },
    performance: {
      preloadContent: true,
      lazyLoading: true,
      imageOptimization: true,
      cacheStrategy: "aggressive",
      compressionLevel: "medium",
      prefetchLinks: false,
      serviceWorker: true,
      offlineSupport: true,
      backgroundSync: true,
      resourceHints: true,
      criticalCss: true,
      assetMinification: true,
      bundleSplitting: true,
      treeShaking: true,
      deadCodeElimination: true,
      performanceBudget: "2MB",
      loadingStrategy: "progressive",
      renderStrategy: "client",
      networkMode: "auto",
    },
    integrations: {
      assistiveTechnology: {
        screenReaders: ["nvda", "jaws", "voiceover"],
        voiceControl: ["dragon", "voice_access"],
        eyeTracking: ["tobii", "eyegaze"],
        switchControl: ["jelly_bean", "specs"],
        magnification: ["zoomtext", "magic"],
      },
      thirdPartyServices: {
        cloudStorage: "none",
        calendarService: "none",
        emailService: "none",
        translationService: "none",
        weatherService: "none",
        newsService: "none",
        socialMedia: "none",
        analyticsService: "none",
      },
      apis: {
        speechSynthesis: true,
        speechRecognition: true,
        geolocation: false,
        notifications: true,
        camera: false,
        microphone: true,
        fullscreen: true,
        vibration: true,
        deviceOrientation: false,
        battery: false,
        networkInformation: true,
        userMedia: false,
      },
      webhooks: {
        enabled: false,
        endpoints: [],
        authentication: "token",
        retryPolicy: "exponential",
        timeout: 30,
      },
    },
    advanced: {
      developerMode: false,
      debugMode: false,
      verboseLogging: false,
      errorReporting: true,
      crashReporting: true,
      performanceMonitoring: true,
      featureFlags: {},
      experimentalFeatures: false,
      betaProgram: false,
      customScripts: [],
      cssOverrides: "",
      userAgent: "default",
      proxySettings: {
        enabled: false,
        host: "",
        port: "",
        username: "",
        password: "",
      },
      contentSecurityPolicy: "strict",
      crossOriginPolicy: "strict",
      referrerPolicy: "strict-origin-when-cross-origin",
    },
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Load settings from storage
  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const savedSettings = localStorage.getItem("appSettings");
        if (savedSettings) {
          const parsed = JSON.parse(savedSettings);
          setSettings((prevSettings) => ({ ...prevSettings, ...parsed }));
        }

        setLastSaved(
          new Date(localStorage.getItem("settingsLastSaved") || Date.now())
        );
      } catch (error) {
        console.error("Failed to load settings:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Save settings
  const saveSettings = useCallback(async (newSettings) => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      localStorage.setItem("appSettings", JSON.stringify(newSettings));
      localStorage.setItem("settingsLastSaved", new Date().toISOString());

      setSettings(newSettings);
      setLastSaved(new Date());
      setHasChanges(false);

      return true;
    } catch (error) {
      console.error("Failed to save settings:", error);
      return false;
    } finally {
      setSaving(false);
    }
  }, []);

  // Update setting
  const updateSetting = useCallback((category, key, value) => {
    setSettings((prev) => {
      const newSettings = {
        ...prev,
        [category]: {
          ...prev[category],
          [key]: value,
        },
      };
      setHasChanges(true);
      return newSettings;
    });
  }, []);

  // Reset settings
  const resetSettings = useCallback(async (category) => {
    if (category) {
      // Reset specific category
      const defaultCategory = getDefaultSettings()[category];
      setSettings((prev) => ({
        ...prev,
        [category]: defaultCategory,
      }));
    } else {
      // Reset all settings
      setSettings(getDefaultSettings());
    }
    setHasChanges(true);
  }, []);

  // Export settings
  const exportSettings = useCallback(() => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `settings_${
      new Date().toISOString().split("T")[0]
    }.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();

    return exportFileDefaultName;
  }, [settings]);

  // Import settings
  const importSettings = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target.result);
          setSettings(importedSettings);
          setHasChanges(true);
          resolve(true);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file);
    });
  }, []);

  return {
    settings,
    loading,
    saving,
    lastSaved,
    hasChanges,
    updateSetting,
    saveSettings,
    resetSettings,
    exportSettings,
    importSettings,
  };
};

// Default settings function
const getDefaultSettings = () => ({
  accessibility: {
    fontSize: "medium",
    fontFamily: "system",
    contrast: "normal",
    colorScheme: "auto",
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: true,
    voiceCommands: false,
    textToSpeech: false,
    highContrast: false,
    largeText: false,
    colorBlind: "none",
    dyslexiaMode: false,
  },
  interface: {
    theme: "auto",
    layout: "comfortable",
    animationsEnabled: true,
    soundEffectsEnabled: true,
  },
  privacy: {
    profileVisibility: "friends",
    shareUsageData: false,
    personalization: true,
  },
  notifications: {
    emailNotifications: true,
    pushNotifications: true,
    soundNotifications: true,
  },
});

// Settings section components
const AccessibilitySettings = ({ settings, updateSetting, onAnnounce }) => {
  const [previewMode, setPreviewMode] = useState(false);

  const handlePreview = useCallback(() => {
    setPreviewMode(!previewMode);
    onAnnounce(
      previewMode
        ? "Preview mode disabled"
        : "Preview mode enabled - you can see how your settings will look"
    );
  }, [previewMode, onAnnounce]);

  const fontSizeOptions = [
    { value: "small", label: "Small (12px)", preview: "12px" },
    { value: "medium", label: "Medium (16px)", preview: "16px" },
    { value: "large", label: "Large (20px)", preview: "20px" },
    { value: "extra-large", label: "Extra Large (24px)", preview: "24px" },
  ];

  const fontFamilyOptions = [
    { value: "system", label: "System Default" },
    { value: "sans-serif", label: "Sans Serif" },
    { value: "serif", label: "Serif" },
    { value: "dyslexic", label: "Dyslexic Friendly" },
    { value: "monospace", label: "Monospace" },
  ];

  const contrastOptions = [
    { value: "normal", label: "Normal" },
    { value: "high", label: "High Contrast" },
    { value: "extra-high", label: "Extra High" },
    { value: "inverted", label: "Inverted" },
  ];

  const colorBlindOptions = [
    { value: "none", label: "None" },
    { value: "protanopia", label: "Protanopia (Red-blind)" },
    { value: "deuteranopia", label: "Deuteranopia (Green-blind)" },
    { value: "tritanopia", label: "Tritanopia (Blue-blind)" },
    { value: "achromatopsia", label: "Achromatopsia (Complete)" },
  ];

  return (
    <motion.div
      className={`settings-section accessibility-settings ${
        previewMode ? "preview-mode" : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="section-header">
        <h2>
          <Accessibility size={24} />
          Accessibility Settings
        </h2>
        <button
          className={`preview-button ${previewMode ? "active" : ""}`}
          onClick={handlePreview}
          aria-label={
            previewMode ? "Disable preview mode" : "Enable preview mode"
          }
        >
          <Eye size={16} />
          {previewMode ? "Exit Preview" : "Preview Changes"}
        </button>
      </div>

      <div className="settings-grid">
        {/* Visual Settings */}
        <div className="setting-group">
          <h3>Visual Settings</h3>

          <div className="setting-item">
            <label htmlFor="fontSize" className="setting-label">
              <Type size={16} />
              Font Size
            </label>
            <select
              id="fontSize"
              value={settings.fontSize}
              onChange={(e) =>
                updateSetting("accessibility", "fontSize", e.target.value)
              }
              className="setting-select"
            >
              {fontSizeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="setting-description">
              Choose the text size that's most comfortable for you to read
            </div>
            {previewMode && (
              <div
                className="setting-preview"
                style={{
                  fontSize: fontSizeOptions.find(
                    (o) => o.value === settings.fontSize
                  )?.preview,
                }}
              >
                Sample text at selected size
              </div>
            )}
          </div>

          <div className="setting-item">
            <label htmlFor="fontFamily" className="setting-label">
              <Type size={16} />
              Font Family
            </label>
            <select
              id="fontFamily"
              value={settings.fontFamily}
              onChange={(e) =>
                updateSetting("accessibility", "fontFamily", e.target.value)
              }
              className="setting-select"
            >
              {fontFamilyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="setting-description">
              Select a font that's easy for you to read
            </div>
          </div>

          <div className="setting-item">
            <label htmlFor="contrast" className="setting-label">
              <Contrast size={16} />
              Contrast Level
            </label>
            <select
              id="contrast"
              value={settings.contrast}
              onChange={(e) =>
                updateSetting("accessibility", "contrast", e.target.value)
              }
              className="setting-select"
            >
              {contrastOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="setting-description">
              Adjust contrast for better visibility
            </div>
          </div>

          <div className="setting-item">
            <label htmlFor="colorBlind" className="setting-label">
              <Palette size={16} />
              Color Vision Support
            </label>
            <select
              id="colorBlind"
              value={settings.colorBlind}
              onChange={(e) =>
                updateSetting("accessibility", "colorBlind", e.target.value)
              }
              className="setting-select"
            >
              {colorBlindOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="setting-description">
              Optimize colors for your type of color vision
            </div>
          </div>

          <div className="setting-item toggle-item">
            <div className="toggle-container">
              <input
                id="dyslexiaMode"
                type="checkbox"
                checked={settings.dyslexiaMode}
                onChange={(e) =>
                  updateSetting(
                    "accessibility",
                    "dyslexiaMode",
                    e.target.checked
                  )
                }
                className="toggle-input"
              />
              <label htmlFor="dyslexiaMode" className="toggle-label">
                <span className="toggle-switch"></span>
                <div className="toggle-content">
                  <div className="toggle-title">
                    <BookOpen size={16} />
                    Dyslexia-Friendly Font
                  </div>
                  <div className="toggle-description">
                    Use fonts designed to be easier to read for people with
                    dyslexia
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="setting-item toggle-item">
            <div className="toggle-container">
              <input
                id="reducedMotion"
                type="checkbox"
                checked={settings.reducedMotion}
                onChange={(e) =>
                  updateSetting(
                    "accessibility",
                    "reducedMotion",
                    e.target.checked
                  )
                }
                className="toggle-input"
              />
              <label htmlFor="reducedMotion" className="toggle-label">
                <span className="toggle-switch"></span>
                <div className="toggle-content">
                  <div className="toggle-title">
                    <Minimize2 size={16} />
                    Reduce Motion
                  </div>
                  <div className="toggle-description">
                    Minimize animations and transitions that might cause motion
                    sickness
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Screen Reader Settings */}
        <div className="setting-group">
          <h3>Screen Reader & Audio</h3>

          <div className="setting-item toggle-item">
            <div className="toggle-container">
              <input
                id="screenReader"
                type="checkbox"
                checked={settings.screenReader}
                onChange={(e) =>
                  updateSetting(
                    "accessibility",
                    "screenReader",
                    e.target.checked
                  )
                }
                className="toggle-input"
              />
              <label htmlFor="screenReader" className="toggle-label">
                <span className="toggle-switch"></span>
                <div className="toggle-content">
                  <div className="toggle-title">
                    <Speaker size={16} />
                    Screen Reader Optimization
                  </div>
                  <div className="toggle-description">
                    Optimize interface for screen readers and other assistive
                    technologies
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="setting-item toggle-item">
            <div className="toggle-container">
              <input
                id="textToSpeech"
                type="checkbox"
                checked={settings.textToSpeech}
                onChange={(e) =>
                  updateSetting(
                    "accessibility",
                    "textToSpeech",
                    e.target.checked
                  )
                }
                className="toggle-input"
              />
              <label htmlFor="textToSpeech" className="toggle-label">
                <span className="toggle-switch"></span>
                <div className="toggle-content">
                  <div className="toggle-title">
                    <Volume2 size={16} />
                    Text-to-Speech
                  </div>
                  <div className="toggle-description">
                    Automatically read important messages and content aloud
                  </div>
                </div>
              </label>
            </div>
          </div>

          {settings.textToSpeech && (
            <div className="sub-settings">
              <div className="setting-item">
                <label htmlFor="speechRate" className="setting-label">
                  Speech Rate
                </label>
                <div className="range-container">
                  <input
                    id="speechRate"
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={settings.speechRate}
                    onChange={(e) =>
                      updateSetting(
                        "accessibility",
                        "speechRate",
                        parseFloat(e.target.value)
                      )
                    }
                    className="range-input"
                  />
                  <span className="range-value">{settings.speechRate}x</span>
                </div>
              </div>

              <div className="setting-item">
                <label htmlFor="speechPitch" className="setting-label">
                  Speech Pitch
                </label>
                <div className="range-container">
                  <input
                    id="speechPitch"
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={settings.speechPitch}
                    onChange={(e) =>
                      updateSetting(
                        "accessibility",
                        "speechPitch",
                        parseFloat(e.target.value)
                      )
                    }
                    className="range-input"
                  />
                  <span className="range-value">{settings.speechPitch}</span>
                </div>
              </div>

              <div className="setting-item">
                <label htmlFor="speechVolume" className="setting-label">
                  Speech Volume
                </label>
                <div className="range-container">
                  <input
                    id="speechVolume"
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={settings.speechVolume}
                    onChange={(e) =>
                      updateSetting(
                        "accessibility",
                        "speechVolume",
                        parseFloat(e.target.value)
                      )
                    }
                    className="range-input"
                  />
                  <span className="range-value">
                    {Math.round(settings.speechVolume * 100)}%
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="setting-item toggle-item">
            <div className="toggle-container">
              <input
                id="audioDescriptions"
                type="checkbox"
                checked={settings.audioDescriptions}
                onChange={(e) =>
                  updateSetting(
                    "accessibility",
                    "audioDescriptions",
                    e.target.checked
                  )
                }
                className="toggle-input"
              />
              <label htmlFor="audioDescriptions" className="toggle-label">
                <span className="toggle-switch"></span>
                <div className="toggle-content">
                  <div className="toggle-title">
                    <Headphones size={16} />
                    Audio Descriptions
                  </div>
                  <div className="toggle-description">
                    Enable audio descriptions for videos and visual content
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Interaction Settings */}
        <div className="setting-group">
          <h3>Interaction & Navigation</h3>

          <div className="setting-item toggle-item">
            <div className="toggle-container">
              <input
                id="keyboardNavigation"
                type="checkbox"
                checked={settings.keyboardNavigation}
                onChange={(e) =>
                  updateSetting(
                    "accessibility",
                    "keyboardNavigation",
                    e.target.checked
                  )
                }
                className="toggle-input"
              />
              <label htmlFor="keyboardNavigation" className="toggle-label">
                <span className="toggle-switch"></span>
                <div className="toggle-content">
                  <div className="toggle-title">
                    <Keyboard size={16} />
                    Enhanced Keyboard Navigation
                  </div>
                  <div className="toggle-description">
                    Enable advanced keyboard shortcuts and navigation features
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="setting-item toggle-item">
            <div className="toggle-container">
              <input
                id="voiceCommands"
                type="checkbox"
                checked={settings.voiceCommands}
                onChange={(e) =>
                  updateSetting(
                    "accessibility",
                    "voiceCommands",
                    e.target.checked
                  )
                }
                className="toggle-input"
              />
              <label htmlFor="voiceCommands" className="toggle-label">
                <span className="toggle-switch"></span>
                <div className="toggle-content">
                  <div className="toggle-title">
                    <Mic size={16} />
                    Voice Commands
                  </div>
                  <div className="toggle-description">
                    Control the interface using voice commands
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="setting-item toggle-item">
            <div className="toggle-container">
              <input
                id="focusIndicator"
                type="checkbox"
                checked={settings.focusIndicator}
                onChange={(e) =>
                  updateSetting(
                    "accessibility",
                    "focusIndicator",
                    e.target.checked
                  )
                }
                className="toggle-input"
              />
              <label htmlFor="focusIndicator" className="toggle-label">
                <span className="toggle-switch"></span>
                <div className="toggle-content">
                  <div className="toggle-title">
                    <Target size={16} />
                    Enhanced Focus Indicators
                  </div>
                  <div className="toggle-description">
                    Show clear visual indicators for focused elements
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="setting-item toggle-item">
            <div className="toggle-container">
              <input
                id="skipLinks"
                type="checkbox"
                checked={settings.skipLinks}
                onChange={(e) =>
                  updateSetting("accessibility", "skipLinks", e.target.checked)
                }
                className="toggle-input"
              />
              <label htmlFor="skipLinks" className="toggle-label">
                <span className="toggle-switch"></span>
                <div className="toggle-content">
                  <div className="toggle-title">
                    <Link2 size={16} />
                    Skip Navigation Links
                  </div>
                  <div className="toggle-description">
                    Show links to skip to main content and navigation
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="setting-item toggle-item">
            <div className="toggle-container">
              <input
                id="timeoutExtensions"
                type="checkbox"
                checked={settings.timeoutExtensions}
                onChange={(e) =>
                  updateSetting(
                    "accessibility",
                    "timeoutExtensions",
                    e.target.checked
                  )
                }
                className="toggle-input"
              />
              <label htmlFor="timeoutExtensions" className="toggle-label">
                <span className="toggle-switch"></span>
                <div className="toggle-content">
                  <div className="toggle-title">
                    <Timer size={16} />
                    Extended Timeouts
                  </div>
                  <div className="toggle-description">
                    Provide more time to complete actions and forms
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Content Settings */}
        <div className="setting-group">
          <h3>Content & Media</h3>

          <div className="setting-item toggle-item">
            <div className="toggle-container">
              <input
                id="captions"
                type="checkbox"
                checked={settings.captions}
                onChange={(e) =>
                  updateSetting("accessibility", "captions", e.target.checked)
                }
                className="toggle-input"
              />
              <label htmlFor="captions" className="toggle-label">
                <span className="toggle-switch"></span>
                <div className="toggle-content">
                  <div className="toggle-title">
                    <Subtitles size={16} />
                    Captions & Subtitles
                  </div>
                  <div className="toggle-description">
                    Show captions and subtitles for videos and audio content
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="setting-item toggle-item">
            <div className="toggle-container">
              <input
                id="autoplayVideos"
                type="checkbox"
                checked={!settings.autoplayVideos}
                onChange={(e) =>
                  updateSetting(
                    "accessibility",
                    "autoplayVideos",
                    !e.target.checked
                  )
                }
                className="toggle-input"
              />
              <label htmlFor="autoplayVideos" className="toggle-label">
                <span className="toggle-switch"></span>
                <div className="toggle-content">
                  <div className="toggle-title">
                    <Video size={16} />
                    Disable Autoplay
                  </div>
                  <div className="toggle-description">
                    Prevent videos from playing automatically
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="setting-item">
            <label htmlFor="flashingContent" className="setting-label">
              <Zap size={16} />
              Flashing Content
            </label>
            <select
              id="flashingContent"
              value={settings.flashingContent}
              onChange={(e) =>
                updateSetting(
                  "accessibility",
                  "flashingContent",
                  e.target.value
                )
              }
              className="setting-select"
            >
              <option value="allow">Allow</option>
              <option value="reduce">Reduce</option>
              <option value="block">Block</option>
            </select>
            <div className="setting-description">
              Control how flashing or blinking content is handled
            </div>
          </div>

          <div className="setting-item">
            <label htmlFor="magnification" className="setting-label">
              <Search size={16} />
              Magnification Level
            </label>
            <div className="range-container">
              <input
                id="magnification"
                type="range"
                min="50"
                max="300"
                step="25"
                value={settings.magnification}
                onChange={(e) =>
                  updateSetting(
                    "accessibility",
                    "magnification",
                    parseInt(e.target.value)
                  )
                }
                className="range-input"
              />
              <span className="range-value">{settings.magnification}%</span>
            </div>
            <div className="setting-description">
              Adjust the default zoom level for all content
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button
            className="action-button"
            onClick={() => {
              updateSetting("accessibility", "fontSize", "large");
              updateSetting("accessibility", "contrast", "high");
              updateSetting("accessibility", "textToSpeech", true);
              onAnnounce("Applied high accessibility preset");
            }}
          >
            <Accessibility size={16} />
            High Accessibility
          </button>

          <button
            className="action-button"
            onClick={() => {
              updateSetting("accessibility", "screenReader", true);
              updateSetting("accessibility", "keyboardNavigation", true);
              updateSetting("accessibility", "focusIndicator", true);
              updateSetting("accessibility", "skipLinks", true);
              onAnnounce("Applied screen reader preset");
            }}
          >
            <Speaker size={16} />
            Screen Reader
          </button>

          <button
            className="action-button"
            onClick={() => {
              updateSetting("accessibility", "fontSize", "extra-large");
              updateSetting("accessibility", "magnification", 200);
              updateSetting("accessibility", "contrast", "high");
              onAnnounce("Applied low vision preset");
            }}
          >
            <Eye size={16} />
            Low Vision
          </button>

          <button
            className="action-button"
            onClick={() => {
              updateSetting("accessibility", "reducedMotion", true);
              updateSetting("accessibility", "autoplayVideos", false);
              updateSetting("accessibility", "flashingContent", "block");
              onAnnounce("Applied motion sensitivity preset");
            }}
          >
            <Minimize2 size={16} />
            Motion Sensitive
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const InterfaceSettings = ({ settings, updateSetting }) => {
  const themeOptions = [
    { value: "auto", label: "Auto (System)", icon: Monitor },
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "high-contrast", label: "High Contrast", icon: Contrast },
    { value: "custom", label: "Custom", icon: Palette },
  ];

  const layoutOptions = [
    { value: "compact", label: "Compact" },
    { value: "comfortable", label: "Comfortable" },
    { value: "spacious", label: "Spacious" },
  ];

  const sizeOptions = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ];

  return (
    <motion.div
      className="settings-section interface-settings"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="section-header">
        <h2>
          <Monitor size={24} />
          Interface Settings
        </h2>
      </div>

      <div className="settings-grid">
        <div className="setting-group">
          <h3>Appearance</h3>

          <div className="setting-item">
            <label className="setting-label">
              <Palette size={16} />
              Theme
            </label>
            <div className="theme-selector">
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  className={`theme-option ${
                    settings.theme === option.value ? "active" : ""
                  }`}
                  onClick={() =>
                    updateSetting("interface", "theme", option.value)
                  }
                  aria-label={option.label}
                >
                  <option.icon size={20} />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {settings.theme === "custom" && (
            <div className="custom-theme-editor">
              <h4>Custom Theme Colors</h4>
              <div className="color-inputs">
                <div className="color-input-group">
                  <label htmlFor="primaryColor">Primary Color</label>
                  <input
                    id="primaryColor"
                    type="color"
                    value={settings.customTheme.primaryColor}
                    onChange={(e) =>
                      updateSetting("interface", "customTheme", {
                        ...settings.customTheme,
                        primaryColor: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="color-input-group">
                  <label htmlFor="backgroundColor">Background Color</label>
                  <input
                    id="backgroundColor"
                    type="color"
                    value={settings.customTheme.backgroundColor}
                    onChange={(e) =>
                      updateSetting("interface", "customTheme", {
                        ...settings.customTheme,
                        backgroundColor: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="color-input-group">
                  <label htmlFor="textColor">Text Color</label>
                  <input
                    id="textColor"
                    type="color"
                    value={settings.customTheme.textColor}
                    onChange={(e) =>
                      updateSetting("interface", "customTheme", {
                        ...settings.customTheme,
                        textColor: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}

          <div className="setting-item">
            <label htmlFor="layout" className="setting-label">
              <Sliders size={16} />
              Layout Density
            </label>
            <select
              id="layout"
              value={settings.layout}
              onChange={(e) =>
                updateSetting("interface", "layout", e.target.value)
              }
              className="setting-select"
            >
              {layoutOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="setting-group">
          <h3>Layout Options</h3>

          <div className="setting-item">
            <label htmlFor="sidebarPosition" className="setting-label">
              Sidebar Position
            </label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="sidebarPosition"
                  value="left"
                  checked={settings.sidebarPosition === "left"}
                  onChange={(e) =>
                    updateSetting(
                      "interface",
                      "sidebarPosition",
                      e.target.value
                    )
                  }
                />
                <span>Left</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="sidebarPosition"
                  value="right"
                  checked={settings.sidebarPosition === "right"}
                  onChange={(e) =>
                    updateSetting(
                      "interface",
                      "sidebarPosition",
                      e.target.value
                    )
                  }
                />
                <span>Right</span>
              </label>
            </div>
          </div>

          <div className="setting-item toggle-item">
            <div className="toggle-container">
              <input
                id="sidebarCollapsed"
                type="checkbox"
                checked={settings.sidebarCollapsed}
                onChange={(e) =>
                  updateSetting(
                    "interface",
                    "sidebarCollapsed",
                    e.target.checked
                  )
                }
                className="toggle-input"
              />
              <label htmlFor="sidebarCollapsed" className="toggle-label">
                <span className="toggle-switch"></span>
                <div className="toggle-content">
                  <div className="toggle-title">
                    Collapsed Sidebar by Default
                  </div>
                  <div className="toggle-description">
                    Start with the sidebar in collapsed state
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="setting-item toggle-item">
            <div className="toggle-container">
              <input
                id="fullWidth"
                type="checkbox"
                checked={settings.fullWidth}
                onChange={(e) =>
                  updateSetting("interface", "fullWidth", e.target.checked)
                }
                className="toggle-input"
              />
              <label htmlFor="fullWidth" className="toggle-label">
                <span className="toggle-switch"></span>
                <div className="toggle-content">
                  <div className="toggle-title">
                    <Maximize2 size={16} />
                    Full Width Layout
                  </div>
                  <div className="toggle-description">
                    Use the full width of the screen for content
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="setting-group">
          <h3>Visual Elements</h3>

          <div className="setting-item toggle-item">
            <div className="toggle-container">
              <input
                id="toolbarVisible"
                type="checkbox"
                checked={settings.toolbarVisible}
                onChange={(e) =>
                  updateSetting("interface", "toolbarVisible", e.target.checked)
                }
                className="toggle-input"
              />
              <label htmlFor="toolbarVisible" className="toggle-label">
                <span className="toggle-switch"></span>
                <div className="toggle-content">
                  <div className="toggle-title">Show Toolbar</div>
                </div>
              </label>
            </div>
          </div>

          <div className="setting-item toggle-item">
            <div className="toggle-container">
              <input
                id="breadcrumbsVisible"
                type="checkbox"
                checked={settings.breadcrumbsVisible}
                onChange={(e) =>
                  updateSetting(
                    "interface",
                    "breadcrumbsVisible",
                    e.target.checked
                  )
                }
                className="toggle-input"
              />
              <label htmlFor="breadcrumbsVisible" className="toggle-label">
                <span className="toggle-switch"></span>
                <div className="toggle-content">
                  <div className="toggle-title">Show Breadcrumbs</div>
                </div>
              </label>
            </div>
          </div>

          <div className="setting-item toggle-item">
            <div className="toggle-container">
              <input
                id="animationsEnabled"
                type="checkbox"
                checked={settings.animationsEnabled}
                onChange={(e) =>
                  updateSetting(
                    "interface",
                    "animationsEnabled",
                    e.target.checked
                  )
                }
                className="toggle-input"
              />
              <label htmlFor="animationsEnabled" className="toggle-label">
                <span className="toggle-switch"></span>
                <div className="toggle-content">
                  <div className="toggle-title">Enable Animations</div>
                  <div className="toggle-description">
                    Show smooth transitions and animations
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="setting-item toggle-item">
            <div className="toggle-container">
              <input
                id="shadows"
                type="checkbox"
                checked={settings.shadows}
                onChange={(e) =>
                  updateSetting("interface", "shadows", e.target.checked)
                }
                className="toggle-input"
              />
              <label htmlFor="shadows" className="toggle-label">
                <span className="toggle-switch"></span>
                <div className="toggle-content">
                  <div className="toggle-title">Enable Shadows</div>
                  <div className="toggle-description">
                    Add depth with drop shadows on elements
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="setting-group">
          <h3>Element Sizes</h3>

          <div className="setting-item">
            <label htmlFor="iconSize" className="setting-label">
              Icon Size
            </label>
            <select
              id="iconSize"
              value={settings.iconSize}
              onChange={(e) =>
                updateSetting("interface", "iconSize", e.target.value)
              }
              className="setting-select"
            >
              {sizeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
    </div>

          <div className="setting-item">
            <label htmlFor="buttonSize" className="setting-label">
              Button Size
            </label>
            <select
              id="buttonSize"
              value={settings.buttonSize}
              onChange={(e) =>
                updateSetting("interface", "buttonSize", e.target.value)
              }
              className="setting-select"
            >
              {sizeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="setting-item">
            <label htmlFor="borderRadius" className="setting-label">
              Border Radius
            </label>
            <select
              id="borderRadius"
              value={settings.borderRadius}
              onChange={(e) =>
                updateSetting("interface", "borderRadius", e.target.value)
              }
              className="setting-select"
            >
              <option value="none">None</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="round">Round</option>
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Settings Component
const Settingsr = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("accessibility");
  const [searchQuery, setSearchQuery] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetCategory, setResetCategory] = useState(null);

  // Hooks
  const {
    settings,
    loading,
    saving,
    lastSaved,
    hasChanges,
    updateSetting,
    saveSettings,
    resetSettings,
    exportSettings,
    importSettings,
  } = useSettingsData();

  // Refs
  const fileInputRef = useRef(null);
  const searchInputRef = useRef(null);

  // Tabs configuration
  const tabs = useMemo(
    () => [
      {
        id: "accessibility",
        label: "Accessibility",
        icon: Accessibility,
        color: "blue",
      },
      { id: "interface", label: "Interface", icon: Monitor, color: "purple" },
      { id: "privacy", label: "Privacy", icon: Shield, color: "green" },
      {
        id: "notifications",
        label: "Notifications",
        icon: Bell,
        color: "orange",
      },
      {
        id: "communication",
        label: "Communication",
        icon: Globe,
        color: "cyan",
      },
      { id: "data", label: "Data & Sync", icon: Database, color: "indigo" },
      { id: "performance", label: "Performance", icon: Zap, color: "yellow" },
      { id: "integrations", label: "Integrations", icon: Link2, color: "pink" },
      { id: "advanced", label: "Advanced", icon: Sliders, color: "gray" },
    ],
    []
  );

  // Announcement function
  const announce = useCallback((message) => {
    setAnnouncement(message);
    setTimeout(() => setAnnouncement(""), 5000);
  }, []);

  // Handle save settings
  const handleSaveSettings = useCallback(async () => {
    const success = await saveSettings(settings);
    if (success) {
      announce("Settings saved successfully");
    } else {
      announce("Failed to save settings. Please try again.");
    }
  }, [settings, saveSettings, announce]);

  // Handle reset settings
  const handleResetSettings = useCallback(async (category) => {
    setResetCategory(category);
    setShowResetConfirm(true);
  }, []);

  const confirmReset = useCallback(async () => {
    await resetSettings(resetCategory);
    setShowResetConfirm(false);
    setResetCategory(null);
    announce(
      resetCategory
        ? `${resetCategory} settings reset to defaults`
        : "All settings reset to defaults"
    );
  }, [resetSettings, resetCategory, announce]);

  // Handle export settings
  const handleExportSettings = useCallback(async () => {
    try {
      const filename = exportSettings();
      announce(`Settings exported as ${filename}`);
    } catch (error) {
      announce("Failed to export settings");
    }
  }, [exportSettings, announce]);

  // Handle import settings
  const handleImportSettings = useCallback(
    async (event) => {
      const file = event.target.files[0];
      if (file) {
        try {
          await importSettings(file);
          announce("Settings imported successfully");
        } catch (error) {
          announce("Failed to import settings. Please check the file format.");
        }
      }
    },
    [importSettings, announce]
  );

  // Filter settings based on search
  const filteredTabs = useMemo(() => {
    if (!searchQuery) return tabs;

    return tabs.filter((tab) =>
      tab.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tabs, searchQuery]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "s":
            e.preventDefault();
            if (hasChanges) handleSaveSettings();
            break;
          case "e":
            e.preventDefault();
            handleExportSettings();
            break;
          case "f":
            e.preventDefault();
            searchInputRef.current?.focus();
            break;
        }
      } else if (e.altKey) {
        const tabIndex = parseInt(e.key) - 1;
        if (tabIndex >= 0 && tabIndex < tabs.length) {
          e.preventDefault();
          setActiveTab(tabs[tabIndex].id);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [hasChanges, handleSaveSettings, handleExportSettings, tabs]);

  if (loading) {
    return (
      <div className="settings-loading" role="status" aria-live="polite">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="loading-spinner"
        >
          <RefreshCw size={48} />
        </motion.div>
        <p>Loading your settings...</p>
      </div>
    );
  }

  return (
    <div className="settings-container">
      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* Skip navigation */}
      <a href="#settings-content" className="skip-link">
        Skip to settings content
      </a>

      {/* Header */}
      <header className="settings-header" role="banner">
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
            <h1 className="page-title">Settings</h1>
          </div>

          <div className="header-center">
            <div className="search-container">
              <Search className="search-icon" size={16} />
              <input
                ref={searchInputRef}
                type="search"
                placeholder="Search settings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                aria-label="Search settings"
              />
            </div>
          </div>

          <div className="header-right">
            <div className="header-actions">
              <button
                className="header-button"
                onClick={handleExportSettings}
                aria-label="Export settings"
                title="Ctrl+E"
              >
                <Download size={16} />
                <span>Export</span>
              </button>

              <button
                className="header-button"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Import settings"
              >
                <Upload size={16} />
                <span>Import</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImportSettings}
                className="sr-only"
              />

              {hasChanges && (
                <button
                  className="header-button save-button"
                  onClick={handleSaveSettings}
                  disabled={saving}
                  aria-label="Save settings"
                  title="Ctrl+S"
                >
                  {saving ? (
                    <RefreshCw className="spin" size={16} />
                  ) : (
                    <Save size={16} />
                  )}
                  <span>{saving ? "Saving..." : "Save"}</span>
                </button>
              )}
            </div>

            {lastSaved && !hasChanges && (
              <div className="last-saved" role="status">
                <Check size={16} />
                <span>Saved {lastSaved.toLocaleTimeString()}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="settings-main">
        {/* Settings navigation */}
        <nav
          className="settings-nav"
          role="navigation"
          aria-label="Settings navigation"
        >
          <div className="nav-tabs" role="tablist">
            {filteredTabs.map((tab) => (
              <button
                key={tab.id}
                className={`nav-tab ${activeTab === tab.id ? "active" : ""} ${
                  tab.color
                }`}
                onClick={() => setActiveTab(tab.id)}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`${tab.id}-panel`}
                id={`${tab.id}-tab`}
              >
                <tab.icon size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Settings content */}
        <div
          id="settings-content"
          className="settings-content"
          role="main"
          aria-label="Settings content"
        >
          <AnimatePresence mode="wait">
            {activeTab === "accessibility" && (
              <div
                key="accessibility"
                role="tabpanel"
                id="accessibility-panel"
                aria-labelledby="accessibility-tab"
              >
                <AccessibilitySettings
                  settings={settings.accessibility}
                  updateSetting={updateSetting}
                  onAnnounce={announce}
                />
              </div>
            )}

            {activeTab === "interface" && (
              <div
                key="interface"
                role="tabpanel"
                id="interface-panel"
                aria-labelledby="interface-tab"
              >
                <InterfaceSettings
                  settings={settings.interface}
                  updateSetting={updateSetting}
                />
              </div>
            )}

            {/* Additional tabs would be implemented similarly */}
          </AnimatePresence>

          {/* Section actions */}
          <div className="section-actions">
            <button
              className="action-button secondary"
              onClick={() => handleResetSettings(activeTab)}
              aria-label={`Reset ${
                tabs.find((t) => t.id === activeTab)?.label
              } settings`}
            >
              <RefreshCw size={16} />
              Reset Section
            </button>

            <button
              className="action-button danger"
              onClick={() => handleResetSettings(null)}
              aria-label="Reset all settings"
            >
              <Trash2 size={16} />
              Reset All
            </button>
          </div>
        </div>
      </main>

      {/* Reset confirmation modal */}
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowResetConfirm(false)}
          >
            <motion.div
              className="confirmation-modal"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-labelledby="reset-title"
              aria-describedby="reset-description"
            >
              <div className="modal-header">
                <AlertTriangle size={24} className="warning-icon" />
                <h2 id="reset-title">Confirm Reset</h2>
              </div>

              <div className="modal-content">
                <p id="reset-description">
                  {resetCategory
                    ? `Are you sure you want to reset all ${resetCategory} settings to their defaults?`
                    : "Are you sure you want to reset ALL settings to their defaults?"}
                </p>
                <p className="warning-text">
                  This action cannot be undone. Consider exporting your current
                  settings first.
                </p>
              </div>

              <div className="modal-actions">
                <button
                  className="btn-secondary"
                  onClick={() => setShowResetConfirm(false)}
                >
                  Cancel
                </button>
                <button className="btn-danger" onClick={confirmReset} autoFocus>
                  <RefreshCw size={16} />
                  Reset Settings
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help panel */}
      <div className="help-panel-settings" role="complementary">
        <details>
          <summary>Keyboard Shortcuts</summary>
          <div className="help-content">
            <ul>
              <li>
                <kbd>Ctrl</kbd> + <kbd>S</kbd> - Save settings
              </li>
              <li>
                <kbd>Ctrl</kbd> + <kbd>E</kbd> - Export settings
              </li>
              <li>
                <kbd>Ctrl</kbd> + <kbd>F</kbd> - Search settings
              </li>
              <li>
                <kbd>Alt</kbd> + <kbd>1-9</kbd> - Switch tabs
              </li>
              <li>
                <kbd>Tab</kbd> - Navigate between controls
              </li>
            </ul>
          </div>
        </details>
      </div>
    </div>
  );
};

export default Settings;
