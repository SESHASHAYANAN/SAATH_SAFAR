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
  Home,
  User,
  Settings,
  LogOut,
  Bell,
  Search,
  Plus,
  Calendar,
  Clock,
  Activity,
  BarChart3,
  TrendingUp,
  Users,
  MessageSquare,
  BookOpen,
  Heart,
  Shield,
  Accessibility,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Sun,
  Moon,
  Maximize2,
  Minimize2,
  RefreshCw,
  Download,
  Upload,
  Edit3,
  Trash2,
  Eye,
  Filter,
  Sort,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Star,
  Bookmark,
  Share2,
  HelpCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from "lucide-react";
import "./Dashboard.css";

// Custom hooks
const useAccessibilitySettings = () => {
  const [settings, setSettings] = useState({
    fontSize: "medium",
    contrast: "normal",
    motionReduced: false,
    screenReader: false,
    keyboardNavigation: true,
    voiceCommands: false,
    textToSpeech: true,
    highContrast: false,
    largeText: false,
    colorBlind: false,
    dyslexiaMode: false,
    darkMode: false,
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

// Widget components
const StatsWidget = ({ title, value, icon: Icon, trend, color = "blue" }) => (
  <motion.div
    className={`stats-widget ${color}`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    role="region"
    aria-label={`${title} statistics`}
  >
    <div className="stats-header">
      <div className="stats-icon">
        <Icon size={24} aria-hidden="true" />
      </div>
      <div className="stats-trend">
        <TrendingUp size={16} className={trend > 0 ? "positive" : "negative"} />
        <span className="sr-only">
          {trend > 0 ? "Increasing" : "Decreasing"}
        </span>
      </div>
    </div>
    <div className="stats-content">
      <h3 className="stats-title">{title}</h3>
      <p className="stats-value" aria-label={`Current value: ${value}`}>
        {value}
      </p>
      <p className="stats-change">
        <span className={trend > 0 ? "positive" : "negative"}>
          {trend > 0 ? "+" : ""}
          {trend}%
        </span>
        <span className="sr-only">
          {trend > 0 ? "increase" : "decrease"} from last period
        </span>
      </p>
    </div>
  </motion.div>
);

const QuickActionCard = ({
  title,
  description,
  icon: Icon,
  onClick,
  color = "blue",
}) => (
  <motion.button
    className={`quick-action-card ${color}`}
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    role="button"
    aria-label={`${title}: ${description}`}
  >
    <div className="action-icon">
      <Icon size={32} aria-hidden="true" />
    </div>
    <div className="action-content">
      <h3 className="action-title">{title}</h3>
      <p className="action-description">{description}</p>
    </div>
  </motion.button>
);

const ActivityItem = ({ activity, timestamp, type, icon: Icon }) => (
  <motion.div
    className={`activity-item ${type}`}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    role="listitem"
  >
    <div className="activity-icon">
      <Icon size={16} aria-hidden="true" />
    </div>
    <div className="activity-content">
      <p className="activity-text">{activity}</p>
      <time className="activity-time" dateTime={timestamp}>
        {new Date(timestamp).toLocaleString()}
      </time>
    </div>
  </motion.div>
);

const NotificationPanel = ({ notifications, onDismiss, onDismissAll }) => (
  <motion.div
    className="notification-panel"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    role="region"
    aria-label="Notifications"
  >
    <div className="notification-header">
      <h3>Notifications</h3>
      {notifications.length > 0 && (
        <button
          className="dismiss-all-button"
          onClick={onDismissAll}
          aria-label="Dismiss all notifications"
        >
          Clear All
        </button>
      )}
    </div>
    <div className="notification-list" role="list">
      {notifications.length === 0 ? (
        <p className="no-notifications">No new notifications</p>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification-item ${notification.type}`}
            role="listitem"
          >
            <div className="notification-icon">
              {notification.type === "success" && <CheckCircle size={16} />}
              {notification.type === "warning" && <AlertTriangle size={16} />}
              {notification.type === "error" && <X size={16} />}
              {notification.type === "info" && <Info size={16} />}
            </div>
            <div className="notification-content">
              <p className="notification-title">{notification.title}</p>
              <p className="notification-message">{notification.message}</p>
              <time
                className="notification-time"
                dateTime={notification.timestamp}
              >
                {new Date(notification.timestamp).toLocaleString()}
              </time>
            </div>
            <button
              className="notification-dismiss"
              onClick={() => onDismiss(notification.id)}
              aria-label={`Dismiss ${notification.title} notification`}
            >
              <X size={14} />
            </button>
          </div>
        ))
      )}
    </div>
  </motion.div>
);

// Main Dashboard Component
const Dashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const [announcement, setAnnouncement] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState("overview");

  // Hooks
  const { settings, updateSetting } = useAccessibilitySettings();
  const { speak, stop, isSpeaking } = useTextToSpeech();
  const { isListening, transcript, startListening, stopListening } =
    useVoiceRecognition();

  // Refs
  const mainContentRef = useRef(null);
  const searchInputRef = useRef(null);
  const notificationButtonRef = useRef(null);

  // Initialize dashboard data
  useEffect(() => {
    const initializeDashboard = async () => {
      setLoading(true);

      try {
        // Simulate API calls
        await Promise.all([
          fetchUserData(),
          fetchNotifications(),
          fetchActivities(),
          fetchStats(),
        ]);
      } catch (error) {
        console.error("Failed to initialize dashboard:", error);
        announce("Failed to load dashboard data. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    initializeDashboard();
  }, []);

  // Mock data fetchers
  const fetchUserData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setCurrentUser({
      name: "John Doe",
      email: localStorage.getItem("userEmail") || "user@example.com",
      avatar: "/api/placeholder/40/40",
      role: "User",
      joinDate: "2024-01-15",
      preferences: {
        theme: "light",
        notifications: true,
        accessibility: true,
      },
    });
  };

  const fetchNotifications = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setNotifications([
      {
        id: 1,
        type: "info",
        title: "Welcome to Dashboard",
        message: "Your accessible dashboard is ready to use.",
        timestamp: new Date().toISOString(),
        read: false,
      },
      {
        id: 2,
        type: "success",
        title: "Profile Updated",
        message: "Your accessibility preferences have been saved.",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        read: false,
      },
      {
        id: 3,
        type: "warning",
        title: "Reminder",
        message: "Please review your privacy settings.",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        read: false,
      },
    ]);
  };

  const fetchActivities = async () => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    setActivities([
      {
        id: 1,
        activity: "Logged into dashboard",
        timestamp: new Date().toISOString(),
        type: "login",
        icon: User,
      },
      {
        id: 2,
        activity: "Updated accessibility settings",
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        type: "settings",
        icon: Settings,
      },
      {
        id: 3,
        activity: "Viewed AI assistant",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        type: "ai",
        icon: MessageSquare,
      },
      {
        id: 4,
        activity: "Downloaded report",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        type: "download",
        icon: Download,
      },
    ]);
  };

  const fetchStats = async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    setStats({
      totalSessions: { value: "127", trend: 12.5 },
      aiInteractions: { value: "45", trend: 8.3 },
      accessibilityScore: { value: "98%", trend: 2.1 },
      timeSpent: { value: "24h 32m", trend: -5.2 },
    });
  };

  // Time update effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Voice command processing
  useEffect(() => {
    if (transcript) {
      const command = transcript.toLowerCase();

      if (command.includes("go to ai") || command.includes("open ai")) {
        navigate("/ai");
      } else if (
        command.includes("go to profile") ||
        command.includes("open profile")
      ) {
        navigate("/profile");
      } else if (command.includes("show notifications")) {
        setShowNotifications(true);
        notificationButtonRef.current?.focus();
      } else if (command.includes("hide notifications")) {
        setShowNotifications(false);
      } else if (command.includes("search")) {
        searchInputRef.current?.focus();
      } else if (command.includes("collapse sidebar")) {
        setSidebarCollapsed(true);
      } else if (command.includes("expand sidebar")) {
        setSidebarCollapsed(false);
      } else if (command.includes("logout") || command.includes("sign out")) {
        handleLogout();
      } else if (command.includes("help")) {
        announceHelp();
      }
    }
  }, [transcript, navigate]);

  // Announcement function
  const announce = useCallback(
    (message) => {
      setAnnouncement(message);
      if (settings.textToSpeech) {
        speak(message);
      }
      setTimeout(() => setAnnouncement(""), 5000);
    },
    [speak, settings.textToSpeech]
  );

  // Help announcement
  const announceHelp = useCallback(() => {
    const helpText = `
      Dashboard voice commands available:
      Say "go to AI" to open AI assistant,
      Say "show notifications" to view notifications,
      Say "search" to focus search field,
      Say "collapse sidebar" or "expand sidebar" to toggle sidebar,
      Say "logout" to sign out,
      Say "help" to hear this message again.
      Use Tab key to navigate between elements.
    `;
    announce(helpText);
  }, [announce]);

  // Handle logout
  const handleLogout = useCallback(() => {
    announce("Signing out...");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    setTimeout(() => navigate("/login"), 1000);
  }, [announce, navigate]);

  // Notification handlers
  const handleDismissNotification = useCallback(
    (notificationId) => {
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
      announce("Notification dismissed");
    },
    [announce]
  );

  const handleDismissAllNotifications = useCallback(() => {
    setNotifications([]);
    announce("All notifications cleared");
  }, [announce]);

  // Quick actions
  const quickActions = useMemo(
    () => [
      {
        title: "AI Assistant",
        description: "Chat with your AI helper",
        icon: MessageSquare,
        onClick: () => navigate("/ai"),
        color: "purple",
      },
      {
        title: "Accessibility",
        description: "Customize your experience",
        icon: Accessibility,
        onClick: () => navigate("/settings"),
        color: "blue",
      },
      {
        title: "Health Monitor",
        description: "Track your wellbeing",
        icon: Heart,
        onClick: () => navigate("/health"),
        color: "red",
      },
      {
        title: "Learning Hub",
        description: "Educational resources",
        icon: BookOpen,
        onClick: () => navigate("/learning"),
        color: "green",
      },
      {
        title: "Community",
        description: "Connect with others",
        icon: Users,
        onClick: () => navigate("/community"),
        color: "orange",
      },
      {
        title: "Calendar",
        description: "Manage your schedule",
        icon: Calendar,
        onClick: () => navigate("/calendar"),
        color: "cyan",
      },
    ],
    [navigate]
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey) {
        switch (e.key) {
          case "h":
            e.preventDefault();
            announceHelp();
            break;
          case "s":
            e.preventDefault();
            searchInputRef.current?.focus();
            break;
          case "n":
            e.preventDefault();
            setShowNotifications(!showNotifications);
            break;
          case "m":
            e.preventDefault();
            mainContentRef.current?.focus();
            break;
          case "v":
            e.preventDefault();
            if (isListening) {
              stopListening();
            } else {
              startListening();
            }
            break;
          case "t":
            e.preventDefault();
            if (isSpeaking) {
              stop();
            } else {
              speak("Dashboard overview loaded");
            }
            break;
        }
      } else if (e.ctrlKey && e.key === "q") {
        e.preventDefault();
        handleLogout();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    announceHelp,
    showNotifications,
    isListening,
    startListening,
    stopListening,
    isSpeaking,
    stop,
    speak,
    handleLogout,
  ]);

  // Loading state
  if (loading) {
    return (
      <div className="dashboard-loading" role="status" aria-live="polite">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="loading-spinner"
        >
          <RefreshCw size={48} />
        </motion.div>
        <p>Loading your accessible dashboard...</p>
      </div>
    );
  }

  return (
    <div
      className={`dashboard-container ${
        settings.highContrast ? "high-contrast" : ""
      } ${settings.largeText ? "large-text" : ""} ${
        settings.dyslexiaMode ? "dyslexia-font" : ""
      } ${settings.darkMode ? "dark-mode" : ""}`}
    >
      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* Skip navigation */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Sidebar */}
      <motion.aside
        className={`dashboard-sidebar ${sidebarCollapsed ? "collapsed" : ""}`}
        animate={{ width: sidebarCollapsed ? 80 : 280 }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="sidebar-header">
          <div className="logo">
            <Accessibility size={32} aria-hidden="true" />
            {!sidebarCollapsed && <span>AccessApp</span>}
          </div>
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label={
              sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
          >
            {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list" role="menubar">
            <li role="none">
              <button
                className={`nav-item ${
                  activeView === "overview" ? "active" : ""
                }`}
                onClick={() => setActiveView("overview")}
                role="menuitem"
                aria-label="Dashboard overview"
              >
                <Home size={20} aria-hidden="true" />
                {!sidebarCollapsed && <span>Overview</span>}
              </button>
            </li>
            <li role="none">
              <button
                className="nav-item"
                onClick={() => navigate("/ai")}
                role="menuitem"
                aria-label="AI Assistant"
              >
                <MessageSquare size={20} aria-hidden="true" />
                {!sidebarCollapsed && <span>AI Assistant</span>}
              </button>
            </li>
            <li role="none">
              <button
                className="nav-item"
                onClick={() => navigate("/profile")}
                role="menuitem"
                aria-label="User profile"
              >
                <User size={20} aria-hidden="true" />
                {!sidebarCollapsed && <span>Profile</span>}
              </button>
            </li>
            <li role="none">
              <button
                className="nav-item"
                onClick={() => navigate("/settings")}
                role="menuitem"
                aria-label="Settings"
              >
                <Settings size={20} aria-hidden="true" />
                {!sidebarCollapsed && <span>Settings</span>}
              </button>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button
            className="nav-item logout-button"
            onClick={handleLogout}
            aria-label="Sign out"
          >
            <LogOut size={20} aria-hidden="true" />
            {!sidebarCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main content area */}
      <main className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header" role="banner">
          <div className="header-left">
            <h1 className="page-title">Dashboard</h1>
            <div className="search-container">
              <label htmlFor="dashboard-search" className="sr-only">
                Search dashboard
              </label>
              <input
                ref={searchInputRef}
                id="dashboard-search"
                type="search"
                placeholder="Search..."
                className="search-input"
                aria-describedby="search-desc"
              />
              <Search className="search-icon" aria-hidden="true" />
              <div id="search-desc" className="sr-only">
                Search across all dashboard content and features
              </div>
            </div>
          </div>

          <div className="header-right">
            <div className="current-time" aria-live="polite">
              <Clock size={16} aria-hidden="true" />
              <time dateTime={currentTime.toISOString()}>
                {currentTime.toLocaleTimeString()}
              </time>
            </div>

            <button
              className={`header-button ${isListening ? "active" : ""}`}
              onClick={isListening ? stopListening : startListening}
              aria-label={
                isListening
                  ? "Stop voice recognition"
                  : "Start voice recognition"
              }
              title="Alt+V"
            >
              {isListening ? <MicOff /> : <Mic />}
            </button>

            <button
              className={`header-button ${isSpeaking ? "active" : ""}`}
              onClick={isSpeaking ? stop : () => speak("Dashboard overview")}
              aria-label={
                isSpeaking ? "Stop text-to-speech" : "Start text-to-speech"
              }
              title="Alt+T"
            >
              {isSpeaking ? <VolumeX /> : <Volume2 />}
            </button>

            <div className="notification-container">
              <button
                ref={notificationButtonRef}
                className={`header-button notification-button ${
                  showNotifications ? "active" : ""
                }`}
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label={`Notifications ${
                  notifications.length > 0
                    ? `(${notifications.length} unread)`
                    : ""
                }`}
                aria-expanded={showNotifications}
                aria-haspopup="true"
              >
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="notification-badge" aria-hidden="true">
                    {notifications.length}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <NotificationPanel
                    notifications={notifications}
                    onDismiss={handleDismissNotification}
                    onDismissAll={handleDismissAllNotifications}
                  />
                )}
              </AnimatePresence>
            </div>

            <div className="user-menu">
              <button className="user-button" aria-label="User menu">
                <img
                  src={currentUser?.avatar}
                  alt=""
                  className="user-avatar"
                  aria-hidden="true"
                />
                <span className="user-name">{currentUser?.name}</span>
                <ChevronDown size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <div
          ref={mainContentRef}
          className="dashboard-content"
          role="main"
          aria-label="Dashboard main content"
          tabIndex="-1"
        >
          {/* Welcome section */}
          <section
            className="welcome-section"
            aria-labelledby="welcome-heading"
          >
            <motion.div
              className="welcome-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 id="welcome-heading">Welcome back, {currentUser?.name}!</h2>
              <p>
                Here's what's happening with your accessible experience today.
              </p>
            </motion.div>
          </section>

          {/* Stats grid */}
          <section className="stats-section" aria-labelledby="stats-heading">
            <h2 id="stats-heading" className="section-title">
              Your Statistics
            </h2>
            <div className="stats-grid">
              <StatsWidget
                title="Total Sessions"
                value={stats.totalSessions?.value}
                icon={Activity}
                trend={stats.totalSessions?.trend}
                color="blue"
              />
              <StatsWidget
                title="AI Interactions"
                value={stats.aiInteractions?.value}
                icon={MessageSquare}
                trend={stats.aiInteractions?.trend}
                color="purple"
              />
              <StatsWidget
                title="Accessibility Score"
                value={stats.accessibilityScore?.value}
                icon={Accessibility}
                trend={stats.accessibilityScore?.trend}
                color="green"
              />
              <StatsWidget
                title="Time Spent"
                value={stats.timeSpent?.value}
                icon={Clock}
                trend={stats.timeSpent?.trend}
                color="orange"
              />
            </div>
          </section>

          {/* Quick actions */}
          <section
            className="quick-actions-section"
            aria-labelledby="actions-heading"
          >
            <h2 id="actions-heading" className="section-title">
              Quick Actions
            </h2>
            <div className="quick-actions-grid">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <QuickActionCard {...action} />
                </motion.div>
              ))}
            </div>
          </section>

          {/* Recent activity */}
          <section
            className="activity-section"
            aria-labelledby="activity-heading"
          >
            <h2 id="activity-heading" className="section-title">
              Recent Activity
            </h2>
            <div className="activity-list" role="list">
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <ActivityItem {...activity} />
                </motion.div>
              ))}
            </div>
          </section>

          {/* Voice indicator */}
          <AnimatePresence>
            {isListening && (
              <motion.div
                className="voice-indicator-dashboard"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                aria-live="polite"
              >
                <div className="pulse-ring"></div>
                <Mic className="voice-icon" />
                <span className="sr-only">Voice recognition active</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Help panel */}
      <div
        className="help-panel"
        role="complementary"
        aria-label="Help and shortcuts"
      >
        <details>
          <summary>Keyboard Shortcuts</summary>
          <ul>
            <li>
              <kbd>Alt</kbd> + <kbd>H</kbd> - Help
            </li>
            <li>
              <kbd>Alt</kbd> + <kbd>S</kbd> - Search
            </li>
            <li>
              <kbd>Alt</kbd> + <kbd>N</kbd> - Notifications
            </li>
            <li>
              <kbd>Alt</kbd> + <kbd>M</kbd> - Main content
            </li>
            <li>
              <kbd>Alt</kbd> + <kbd>V</kbd> - Voice commands
            </li>
            <li>
              <kbd>Alt</kbd> + <kbd>T</kbd> - Text-to-speech
            </li>
            <li>
              <kbd>Ctrl</kbd> + <kbd>Q</kbd> - Sign out
            </li>
          </ul>
        </details>
      </div>
    </div>
  );
};

export default Dashboard;
