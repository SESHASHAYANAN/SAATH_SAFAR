import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-thinking";
import {
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  Search,
  Book,
  Video,
  FileText,
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Star,
  ThumbsUp,
  ThumbsDown,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Settings,
  User,
  Users,
  Clock,
  Calendar,
  Tag,
  Filter,
  Home,
  Eye,
  EyeOff,
  Copy,
  Share2,
  Bookmark,
  Flag,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  RefreshCw,
  Loader,
  Edit3,
  Save,
  X,
  Check,
  Accessibility,
  Heart,
  Shield,
  Globe,
  Bell,
  Target,
  Award,
  TrendingUp,
  BarChart3,
  Activity,
  Zap,
  Brain,
  Monitor,
  Smartphone,
  Tablet,
  Watch,
  Headphones,
  Speaker,
  Camera,
  Upload,
  Image,
  Paperclip,
  Link2,
  Archive,
  Folder,
  File,
  Timer,
  Stopwatch,
  AlarmClock,
  History,
  MapPin,
  Navigation,
  Compass,
  Database,
  CloudDownload,
  CloudUpload,
  Wifi,
  Battery,
  Signal,
  Bluetooth,
  Cast,
  Radio,
} from "lucide-react";
import "./Support.css";

// Custom hooks for support data
const useSupportData = () => {
  const [supportData, setSupportData] = useState({
    faqs: [],
    tutorials: [],
    tickets: [],
    resources: [],
    contacts: [],
    announcements: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSupportData = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Mock support data
        const mockData = {
          faqs: [
            {
              id: "faq_1",
              question: "How do I enable voice commands?",
              answer:
                'To enable voice commands, go to Settings > Accessibility > Voice Commands and toggle the switch on. You can then use Alt+V to start voice recognition and speak commands like "go to dashboard" or "open settings".',
              category: "accessibility",
              tags: ["voice", "commands", "settings"],
              helpful: 45,
              notHelpful: 3,
              lastUpdated: "2024-03-15T10:30:00Z",
              difficulty: "beginner",
              estimatedTime: 2,
              relatedFaqs: ["faq_2", "faq_5"],
              hasVideo: true,
              hasAudio: true,
            },
            {
              id: "faq_2",
              question: "What screen readers are supported?",
              answer:
                "Our platform supports all major screen readers including NVDA, JAWS, VoiceOver (macOS/iOS), TalkBack (Android), and Narrator (Windows). We test regularly with these tools to ensure compatibility and provide the best experience.",
              category: "accessibility",
              tags: ["screen-reader", "NVDA", "JAWS", "VoiceOver"],
              helpful: 78,
              notHelpful: 5,
              lastUpdated: "2024-03-10T14:22:00Z",
              difficulty: "beginner",
              estimatedTime: 3,
              relatedFaqs: ["faq_1", "faq_3"],
              hasVideo: false,
              hasAudio: true,
            },
            {
              id: "faq_3",
              question: "How do I adjust text size and contrast?",
              answer:
                "You can adjust text size and contrast in Settings > Accessibility. Choose from small, medium, large, or extra-large text sizes. For contrast, select normal, high, extra-high, or inverted options. Changes apply immediately across the entire platform.",
              category: "accessibility",
              tags: ["text-size", "contrast", "visual"],
              helpful: 92,
              notHelpful: 2,
              lastUpdated: "2024-03-12T09:15:00Z",
              difficulty: "beginner",
              estimatedTime: 1,
              relatedFaqs: ["faq_4", "faq_6"],
              hasVideo: true,
              hasAudio: true,
            },
            {
              id: "faq_4",
              question: "Can I sync my calendar with external services?",
              answer:
                "Yes! You can sync with Google Calendar, Outlook, Apple Calendar, and other CalDAV-compatible services. Go to Calendar > Settings > Integration and follow the setup wizard. Sync is bi-directional and real-time.",
              category: "calendar",
              tags: ["calendar", "sync", "google", "outlook"],
              helpful: 67,
              notHelpful: 8,
              lastUpdated: "2024-03-08T16:45:00Z",
              difficulty: "intermediate",
              estimatedTime: 5,
              relatedFaqs: ["faq_7"],
              hasVideo: true,
              hasAudio: false,
            },
            {
              id: "faq_5",
              question: "How does the AI assistant learn my preferences?",
              answer:
                "The AI assistant uses machine learning to adapt to your communication style and preferences. It learns from your interactions, frequently used commands, and feedback. You can also manually fine-tune the model with your conversation history for better personalization.",
              category: "ai",
              tags: ["AI", "learning", "personalization", "fine-tuning"],
              helpful: 134,
              notHelpful: 12,
              lastUpdated: "2024-03-14T11:20:00Z",
              difficulty: "advanced",
              estimatedTime: 7,
              relatedFaqs: ["faq_1", "faq_8"],
              hasVideo: true,
              hasAudio: true,
            },
            {
              id: "faq_6",
              question: "What keyboard shortcuts are available?",
              answer:
                "We have extensive keyboard shortcuts for navigation and functionality. Common ones include Alt+H for help, Alt+S for search, Tab for navigation, and Escape to close dialogs. Each page has specific shortcuts listed in the help panel.",
              category: "navigation",
              tags: ["keyboard", "shortcuts", "navigation"],
              helpful: 89,
              notHelpful: 4,
              lastUpdated: "2024-03-11T13:30:00Z",
              difficulty: "beginner",
              estimatedTime: 3,
              relatedFaqs: ["faq_3", "faq_9"],
              hasVideo: false,
              hasAudio: true,
            },
          ],
          tutorials: [
            {
              id: "tutorial_1",
              title: "Getting Started with Voice Commands",
              description:
                "Learn how to set up and use voice commands for hands-free navigation",
              category: "accessibility",
              difficulty: "beginner",
              duration: 480, // seconds
              views: 1234,
              rating: 4.8,
              thumbnail: "/api/placeholder/300/200",
              videoUrl: "/api/videos/voice-commands-tutorial",
              transcriptUrl: "/api/transcripts/voice-commands-tutorial.txt",
              captionsUrl: "/api/captions/voice-commands-tutorial.vtt",
              lastUpdated: "2024-03-15T10:30:00Z",
              author: {
                name: "Sarah Johnson",
                title: "Accessibility Specialist",
                avatar: "/api/placeholder/40/40",
              },
              tags: ["voice", "commands", "setup", "navigation"],
              accessibility: {
                hasTranscript: true,
                hasCaptions: true,
                hasAudioDescription: true,
                keyboardNavigable: true,
              },
              chapters: [
                { title: "Introduction", startTime: 0, duration: 30 },
                {
                  title: "Enabling Voice Commands",
                  startTime: 30,
                  duration: 90,
                },
                { title: "Basic Commands", startTime: 120, duration: 180 },
                { title: "Advanced Features", startTime: 300, duration: 120 },
                { title: "Troubleshooting", startTime: 420, duration: 60 },
              ],
            },
            {
              id: "tutorial_2",
              title: "Screen Reader Optimization",
              description:
                "Optimize your screen reader settings for the best experience",
              category: "accessibility",
              difficulty: "intermediate",
              duration: 720,
              views: 2156,
              rating: 4.9,
              thumbnail: "/api/placeholder/300/200",
              videoUrl: "/api/videos/screen-reader-optimization",
              transcriptUrl: "/api/transcripts/screen-reader-optimization.txt",
              captionsUrl: "/api/captions/screen-reader-optimization.vtt",
              lastUpdated: "2024-03-12T14:20:00Z",
              author: {
                name: "Mike Chen",
                title: "Screen Reader Expert",
                avatar: "/api/placeholder/40/40",
              },
              tags: ["screen-reader", "NVDA", "JAWS", "optimization"],
              accessibility: {
                hasTranscript: true,
                hasCaptions: true,
                hasAudioDescription: false,
                keyboardNavigable: true,
              },
              chapters: [
                { title: "Screen Reader Basics", startTime: 0, duration: 120 },
                { title: "NVDA Configuration", startTime: 120, duration: 180 },
                { title: "JAWS Settings", startTime: 300, duration: 180 },
                { title: "VoiceOver Tips", startTime: 480, duration: 150 },
              ],
            },
            {
              id: "tutorial_3",
              title: "AI Assistant Deep Dive",
              description:
                "Master the AI assistant features and customization options",
              category: "ai",
              difficulty: "advanced",
              duration: 900,
              views: 987,
              rating: 4.7,
              thumbnail: "/api/placeholder/300/200",
              videoUrl: "/api/videos/ai-assistant-deep-dive",
              transcriptUrl: "/api/transcripts/ai-assistant-deep-dive.txt",
              captionsUrl: "/api/captions/ai-assistant-deep-dive.vtt",
              lastUpdated: "2024-03-14T09:45:00Z",
              author: {
                name: "Dr. Emma Rodriguez",
                title: "AI Researcher",
                avatar: "/api/placeholder/40/40",
              },
              tags: ["AI", "assistant", "customization", "fine-tuning"],
              accessibility: {
                hasTranscript: true,
                hasCaptions: true,
                hasAudioDescription: true,
                keyboardNavigable: true,
              },
              chapters: [
                { title: "AI Basics", startTime: 0, duration: 180 },
                { title: "Training Your Model", startTime: 180, duration: 300 },
                { title: "Advanced Commands", startTime: 480, duration: 240 },
                { title: "Fine-tuning Tips", startTime: 720, duration: 180 },
              ],
            },
          ],
          tickets: [
            {
              id: "ticket_1",
              title: "Voice commands not working on Chrome",
              description:
                "Voice recognition fails to activate when using Chrome browser on Windows 11.",
              status: "open",
              priority: "medium",
              category: "technical",
              submittedBy: "current_user",
              submittedAt: "2024-03-15T14:30:00Z",
              lastUpdate: "2024-03-15T16:45:00Z",
              assignedTo: {
                name: "Tech Support Team",
                avatar: "/api/placeholder/40/40",
              },
              responses: [
                {
                  id: "response_1",
                  author: {
                    name: "Sarah Johnson",
                    title: "Support Specialist",
                    avatar: "/api/placeholder/40/40",
                  },
                  message:
                    "Thank you for reporting this issue. We're looking into the Chrome compatibility issue. As a temporary workaround, please try using Firefox or Edge.",
                  timestamp: "2024-03-15T16:45:00Z",
                  type: "support",
                },
              ],
              attachments: [
                {
                  id: "attach_1",
                  name: "error_screenshot.png",
                  size: "245KB",
                  type: "image",
                },
              ],
              tags: ["chrome", "voice-commands", "windows"],
              satisfaction: null,
            },
          ],
          resources: [
            {
              id: "resource_1",
              title: "WCAG 2.1 Quick Reference",
              description:
                "Comprehensive guide to Web Content Accessibility Guidelines",
              type: "guide",
              format: "PDF",
              size: "2.3MB",
              downloadUrl: "/api/resources/wcag-quick-reference.pdf",
              previewUrl: "/api/resources/wcag-quick-reference-preview",
              category: "accessibility",
              tags: ["WCAG", "guidelines", "reference"],
              downloads: 5678,
              rating: 4.9,
              lastUpdated: "2024-03-10T12:00:00Z",
              author: {
                name: "W3C",
                avatar: "/api/placeholder/40/40",
              },
              accessibility: {
                hasTextVersion: true,
                hasAudio: false,
                screenReaderFriendly: true,
              },
            },
            {
              id: "resource_2",
              title: "Keyboard Navigation Cheat Sheet",
              description:
                "Essential keyboard shortcuts for efficient navigation",
              type: "cheatsheet",
              format: "HTML",
              size: "125KB",
              downloadUrl: "/api/resources/keyboard-navigation-cheatsheet.html",
              previewUrl: "/api/resources/keyboard-navigation-preview",
              category: "navigation",
              tags: ["keyboard", "shortcuts", "navigation"],
              downloads: 3421,
              rating: 4.8,
              lastUpdated: "2024-03-12T15:30:00Z",
              author: {
                name: "AccessApp Team",
                avatar: "/api/placeholder/40/40",
              },
              accessibility: {
                hasTextVersion: true,
                hasAudio: true,
                screenReaderFriendly: true,
              },
            },
          ],
          contacts: [
            {
              id: "contact_1",
              name: "General Support",
              description: "For general questions and technical support",
              methods: [
                {
                  type: "email",
                  value: "support@accessapp.com",
                  primary: true,
                },
                { type: "phone", value: "1-800-ACCESS", primary: false },
                { type: "chat", value: "Live Chat", primary: false },
              ],
              hours: {
                monday: "9:00 AM - 6:00 PM EST",
                tuesday: "9:00 AM - 6:00 PM EST",
                wednesday: "9:00 AM - 6:00 PM EST",
                thursday: "9:00 AM - 6:00 PM EST",
                friday: "9:00 AM - 6:00 PM EST",
                saturday: "Closed",
                sunday: "Closed",
              },
              languages: ["English", "Spanish", "French"],
              accessibility: {
                signLanguage: true,
                tty: true,
                textRelay: true,
              },
            },
            {
              id: "contact_2",
              name: "Accessibility Support",
              description:
                "Specialized support for accessibility features and assistive technology",
              methods: [
                {
                  type: "email",
                  value: "accessibility@accessapp.com",
                  primary: true,
                },
                { type: "phone", value: "1-800-A11Y-HELP", primary: true },
              ],
              hours: {
                monday: "8:00 AM - 8:00 PM EST",
                tuesday: "8:00 AM - 8:00 PM EST",
                wednesday: "8:00 AM - 8:00 PM EST",
                thursday: "8:00 AM - 8:00 PM EST",
                friday: "8:00 AM - 8:00 PM EST",
                saturday: "10:00 AM - 4:00 PM EST",
                sunday: "10:00 AM - 4:00 PM EST",
              },
              languages: ["English", "Spanish", "French", "ASL"],
              accessibility: {
                signLanguage: true,
                tty: true,
                textRelay: true,
                videoRelay: true,
              },
            },
          ],
          announcements: [
            {
              id: "announce_1",
              title: "New Voice Recognition Features Released",
              content:
                "We've improved voice recognition accuracy by 25% and added support for 12 new languages.",
              type: "feature",
              priority: "high",
              publishedAt: "2024-03-15T10:00:00Z",
              expiresAt: "2024-04-15T10:00:00Z",
              tags: ["voice-recognition", "features", "update"],
            },
            {
              id: "announce_2",
              title: "Scheduled Maintenance - March 20th",
              content:
                "We'll be performing system maintenance on March 20th from 2:00 AM to 4:00 AM EST. Some features may be temporarily unavailable.",
              type: "maintenance",
              priority: "medium",
              publishedAt: "2024-03-14T16:00:00Z",
              expiresAt: "2024-03-21T10:00:00Z",
              tags: ["maintenance", "downtime", "schedule"],
            },
          ],
        };

        setSupportData(mockData);
      } catch (error) {
        console.error("Failed to load support data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSupportData();
  }, []);

  return { supportData, loading, setSupportData };
};

// FAQ Component
const FAQItem = ({ faq, onSpeak, onHelpful, onNotHelpful }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userVote, setUserVote] = useState(null);

  const handleVote = useCallback(
    (vote) => {
      if (userVote === vote) return; // Prevent double voting

      setUserVote(vote);
      if (vote === "helpful") {
        onHelpful(faq.id);
      } else {
        onNotHelpful(faq.id);
      }
    },
    [userVote, faq.id, onHelpful, onNotHelpful]
  );

  const handleSpeak = useCallback(() => {
    const text = `Question: ${faq.question}. Answer: ${faq.answer}`;
    onSpeak(text);
  }, [faq, onSpeak]);

  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: "#27ae60",
      intermediate: "#f39c12",
      advanced: "#e74c3c",
    };
    return colors[difficulty] || colors.beginner;
  };

  return (
    <motion.div
      className="faq-item"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div
        className="faq-header"
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-controls={`faq-answer-${faq.id}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }
        }}
      >
        <div className="faq-question">
          <h3>{faq.question}</h3>
          <div className="faq-meta">
            <span
              className="faq-difficulty"
              style={{ color: getDifficultyColor(faq.difficulty) }}
            >
              {faq.difficulty}
            </span>
            <span className="faq-time">
              <Clock size={12} />
              {faq.estimatedTime} min
            </span>
            <span className="faq-category">{faq.category}</span>
          </div>
        </div>

        <div className="faq-controls">
          <button
            className="faq-speak-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleSpeak();
            }}
            aria-label="Read FAQ aloud"
          >
            <Volume2 size={16} />
          </button>
          <div className="faq-expand-icon">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id={`faq-answer-${faq.id}`}
            className="faq-content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            role="region"
            aria-labelledby={`faq-question-${faq.id}`}
          >
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>

            {faq.hasVideo && (
              <div className="faq-media">
                <button className="media-button video-button">
                  <Video size={16} />
                  Watch Tutorial
                </button>
              </div>
            )}

            {faq.hasAudio && (
              <div className="faq-media">
                <button className="media-button audio-button">
                  <Headphones size={16} />
                  Listen to Audio Guide
                </button>
              </div>
            )}

            <div className="faq-tags">
              {faq.tags.map((tag) => (
                <span key={tag} className="faq-tag">
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>

            <div className="faq-feedback">
              <span className="feedback-question">Was this helpful?</span>
              <div className="feedback-actions">
                <button
                  className={`feedback-btn ${
                    userVote === "helpful" ? "active" : ""
                  }`}
                  onClick={() => handleVote("helpful")}
                  aria-pressed={userVote === "helpful"}
                  aria-label="Mark as helpful"
                >
                  <ThumbsUp size={14} />
                  <span>{faq.helpful + (userVote === "helpful" ? 1 : 0)}</span>
                </button>
                <button
                  className={`feedback-btn ${
                    userVote === "not-helpful" ? "active" : ""
                  }`}
                  onClick={() => handleVote("not-helpful")}
                  aria-pressed={userVote === "not-helpful"}
                  aria-label="Mark as not helpful"
                >
                  <ThumbsDown size={14} />
                  <span>
                    {faq.notHelpful + (userVote === "not-helpful" ? 1 : 0)}
                  </span>
                </button>
              </div>
            </div>

            <div className="faq-footer">
              <span className="last-updated">
                Last updated: {new Date(faq.lastUpdated).toLocaleDateString()}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Tutorial Card Component
const TutorialCard = ({ tutorial, onPlay, onSpeak }) => {
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: "#27ae60",
      intermediate: "#f39c12",
      advanced: "#e74c3c",
    };
    return colors[difficulty] || colors.beginner;
  };

  const handleSpeak = useCallback(() => {
    const text = `Tutorial: ${tutorial.title}. ${
      tutorial.description
    }. Duration: ${formatDuration(tutorial.duration)}. Difficulty: ${
      tutorial.difficulty
    }. Rating: ${tutorial.rating} out of 5 stars.`;
    onSpeak(text);
  }, [tutorial, onSpeak]);

  return (
    <motion.div
      className="tutorial-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="tutorial-thumbnail">
        <img src={tutorial.thumbnail} alt="" className="thumbnail-image" />
        <div className="tutorial-overlay">
          <button
            className="play-button"
            onClick={() => onPlay(tutorial)}
            aria-label={`Play ${tutorial.title} tutorial`}
          >
            <Video size={32} />
          </button>
          <span className="tutorial-duration">
            {formatDuration(tutorial.duration)}
          </span>
        </div>
      </div>

      <div className="tutorial-content">
        <div className="tutorial-header">
          <h3 className="tutorial-title">{tutorial.title}</h3>
          <button
            className="tutorial-speak-btn"
            onClick={handleSpeak}
            aria-label={`Read ${tutorial.title} details aloud`}
          >
            <Volume2 size={16} />
          </button>
        </div>

        <p className="tutorial-description">{tutorial.description}</p>

        <div className="tutorial-meta">
          <div className="tutorial-stats">
            <span className="stat-item">
              <Eye size={14} />
              {tutorial.views.toLocaleString()} views
            </span>
            <span className="stat-item">
              <Star size={14} fill="currentColor" />
              {tutorial.rating}
            </span>
            <span
              className="stat-item difficulty"
              style={{ color: getDifficultyColor(tutorial.difficulty) }}
            >
              {tutorial.difficulty}
            </span>
          </div>

          <div className="tutorial-author">
            <img
              src={tutorial.author.avatar}
              alt=""
              className="author-avatar"
            />
            <div className="author-info">
              <span className="author-name">{tutorial.author.name}</span>
              <span className="author-title">{tutorial.author.title}</span>
            </div>
          </div>
        </div>

        <div className="tutorial-accessibility">
          <h4>Accessibility Features:</h4>
          <div className="accessibility-features">
            {tutorial.accessibility.hasTranscript && (
              <span className="feature-tag">
                <FileText size={12} />
                Transcript
              </span>
            )}
            {tutorial.accessibility.hasCaptions && (
              <span className="feature-tag">
                <MessageSquare size={12} />
                Captions
              </span>
            )}
            {tutorial.accessibility.hasAudioDescription && (
              <span className="feature-tag">
                <Headphones size={12} />
                Audio Description
              </span>
            )}
            {tutorial.accessibility.keyboardNavigable && (
              <span className="feature-tag">
                <Accessibility size={12} />
                Keyboard Navigation
              </span>
            )}
          </div>
        </div>

        <div className="tutorial-tags">
          {tutorial.tags.map((tag) => (
            <span key={tag} className="tutorial-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Contact Card Component
const ContactCard = ({ contact, onContact, onSpeak }) => {
  const handleSpeak = useCallback(() => {
    const text = `Contact: ${contact.name}. ${
      contact.description
    }. Available methods: ${contact.methods
      .map((m) => m.type)
      .join(", ")}. Languages supported: ${contact.languages.join(", ")}.`;
    onSpeak(text);
  }, [contact, onSpeak]);

  const getMethodIcon = (type) => {
    const icons = {
      email: Mail,
      phone: Phone,
      chat: MessageSquare,
      video: Video,
    };
    return icons[type] || MessageSquare;
  };

  return (
    <motion.div
      className="contact-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="contact-header">
        <h3>{contact.name}</h3>
        <button
          className="contact-speak-btn"
          onClick={handleSpeak}
          aria-label={`Read ${contact.name} details aloud`}
        >
          <Volume2 size={16} />
        </button>
      </div>

      <p className="contact-description">{contact.description}</p>

      <div className="contact-methods">
        <h4>Contact Methods:</h4>
        {contact.methods.map((method, index) => {
          const MethodIcon = getMethodIcon(method.type);
          return (
            <div
              key={index}
              className={`contact-method ${method.primary ? "primary" : ""}`}
            >
              <MethodIcon size={16} />
              <div className="method-info">
                <span className="method-type">{method.type.toUpperCase()}</span>
                <button
                  className="method-value"
                  onClick={() => onContact(method)}
                  aria-label={`Contact via ${method.type}: ${method.value}`}
                >
                  {method.value}
                </button>
              </div>
              {method.primary && <span className="primary-badge">Primary</span>}
            </div>
          );
        })}
      </div>

      <div className="contact-hours">
        <h4>Hours:</h4>
        <div className="hours-list">
          {Object.entries(contact.hours).map(([day, hours]) => (
            <div key={day} className="hours-item">
              <span className="day">
                {day.charAt(0).toUpperCase() + day.slice(1)}:
              </span>
              <span className="hours">{hours}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="contact-languages">
        <h4>Languages:</h4>
        <div className="languages-list">
          {contact.languages.map((language) => (
            <span key={language} className="language-tag">
              {language}
            </span>
          ))}
        </div>
      </div>

      {contact.accessibility && (
        <div className="contact-accessibility">
          <h4>Accessibility Support:</h4>
          <div className="accessibility-options">
            {contact.accessibility.signLanguage && (
              <span className="accessibility-tag">
                <Users size={12} />
                Sign Language
              </span>
            )}
            {contact.accessibility.tty && (
              <span className="accessibility-tag">
                <Phone size={12} />
                TTY
              </span>
            )}
            {contact.accessibility.textRelay && (
              <span className="accessibility-tag">
                <MessageSquare size={12} />
                Text Relay
              </span>
            )}
            {contact.accessibility.videoRelay && (
              <span className="accessibility-tag">
                <Video size={12} />
                Video Relay
              </span>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Support Ticket Component
const SupportTicket = ({ ticket, onRespond, onClose, onSpeak }) => {
  const [newResponse, setNewResponse] = useState("");

  const getStatusColor = (status) => {
    const colors = {
      open: "#3498db",
      "in-progress": "#f39c12",
      resolved: "#27ae60",
      closed: "#95a5a6",
    };
    return colors[status] || colors.open;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: "#27ae60",
      medium: "#f39c12",
      high: "#e74c3c",
      urgent: "#8e44ad",
    };
    return colors[priority] || colors.medium;
  };

  const handleSpeak = useCallback(() => {
    const text = `Support ticket: ${ticket.title}. Status: ${
      ticket.status
    }. Priority: ${ticket.priority}. Description: ${
      ticket.description
    }. Submitted on ${new Date(ticket.submittedAt).toLocaleDateString()}.`;
    onSpeak(text);
  }, [ticket, onSpeak]);

  const handleSubmitResponse = useCallback(
    (e) => {
      e.preventDefault();
      if (newResponse.trim()) {
        onRespond(ticket.id, newResponse);
        setNewResponse("");
      }
    },
    [ticket.id, newResponse, onRespond]
  );

  return (
    <motion.div
      className="support-ticket"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="ticket-header">
        <div className="ticket-title-section">
          <h3 className="ticket-title">{ticket.title}</h3>
          <div className="ticket-meta">
            <span
              className="ticket-status"
              style={{ backgroundColor: getStatusColor(ticket.status) }}
            >
              {ticket.status}
            </span>
            <span
              className="ticket-priority"
              style={{ backgroundColor: getPriorityColor(ticket.priority) }}
            >
              {ticket.priority}
            </span>
            <span className="ticket-category">{ticket.category}</span>
          </div>
        </div>

        <div className="ticket-actions">
          <button
            className="ticket-speak-btn"
            onClick={handleSpeak}
            aria-label="Read ticket details aloud"
          >
            <Volume2 size={16} />
          </button>
          <button
            className="ticket-close-btn"
            onClick={() => onClose(ticket.id)}
            aria-label="Close ticket"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="ticket-content">
        <div className="ticket-description">{ticket.description}</div>

        <div className="ticket-details">
          <div className="detail-item">
            <span className="detail-label">Submitted:</span>
            <time dateTime={ticket.submittedAt}>
              {new Date(ticket.submittedAt).toLocaleString()}
            </time>
          </div>
          <div className="detail-item">
            <span className="detail-label">Last Update:</span>
            <time dateTime={ticket.lastUpdate}>
              {new Date(ticket.lastUpdate).toLocaleString()}
            </time>
          </div>
          <div className="detail-item">
            <span className="detail-label">Assigned to:</span>
            <span>{ticket.assignedTo.name}</span>
          </div>
        </div>

        {ticket.attachments && ticket.attachments.length > 0 && (
          <div className="ticket-attachments">
            <h4>Attachments:</h4>
            <div className="attachments-list">
              {ticket.attachments.map((attachment) => (
                <div key={attachment.id} className="attachment-item">
                  <File size={16} />
                  <span className="attachment-name">{attachment.name}</span>
                  <span className="attachment-size">{attachment.size}</span>
                  <button className="attachment-download">
                    <Download size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="ticket-responses">
          <h4>Responses:</h4>
          <div className="responses-list">
            {ticket.responses.map((response) => (
              <div key={response.id} className="response-item">
                <div className="response-header">
                  <img
                    src={response.author.avatar}
                    alt=""
                    className="response-avatar"
                  />
                  <div className="response-author">
                    <span className="author-name">{response.author.name}</span>
                    <span className="author-title">
                      {response.author.title}
                    </span>
                  </div>
                  <time className="response-time" dateTime={response.timestamp}>
                    {new Date(response.timestamp).toLocaleString()}
                  </time>
                </div>
                <div className="response-message">{response.message}</div>
              </div>
            ))}
          </div>
        </div>

        <form className="response-form" onSubmit={handleSubmitResponse}>
          <div className="form-group">
            <label htmlFor={`response-${ticket.id}`}>Add Response:</label>
            <textarea
              id={`response-${ticket.id}`}
              value={newResponse}
              onChange={(e) => setNewResponse(e.target.value)}
              placeholder="Type your response..."
              rows={3}
              className="response-input"
            />
          </div>
          <button
            type="submit"
            className="response-submit"
            disabled={!newResponse.trim()}
          >
            <Send size={16} />
            Send Response
          </button>
        </form>
      </div>
    </motion.div>
  );
};

// Main Support Component
const Support = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("faq");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [announcement, setAnnouncement] = useState("");
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  // Hooks
  const { supportData, loading } = useSupportData();

  // Refs
  const searchInputRef = useRef(null);

  // Tabs configuration
  const tabs = useMemo(
    () => [
      { id: "faq", label: "FAQ", icon: HelpCircle, color: "blue" },
      { id: "tutorials", label: "Tutorials", icon: Video, color: "purple" },
      {
        id: "tickets",
        label: "Support Tickets",
        icon: MessageSquare,
        color: "orange",
      },
      { id: "resources", label: "Resources", icon: Archive, color: "green" },
      { id: "contact", label: "Contact Us", icon: Phone, color: "red" },
    ],
    []
  );

  // Announcement function
  const announce = useCallback((message) => {
    setAnnouncement(message);
    setTimeout(() => setAnnouncement(""), 5000);
  }, []);

  // Handle FAQ feedback
  const handleFAQHelpful = useCallback(
    (faqId) => {
      announce("Thank you for your feedback");
      // In real app, make API call
    },
    [announce]
  );

  const handleFAQNotHelpful = useCallback(
    (faqId) => {
      announce(
        "Thank you for your feedback. We'll work to improve this answer."
      );
      // In real app, make API call
    },
    [announce]
  );

  // Handle tutorial play
  const handlePlayTutorial = useCallback(
    (tutorial) => {
      setSelectedTutorial(tutorial);
      setShowVideoPlayer(true);
      announce(`Starting tutorial: ${tutorial.title}`);
    },
    [announce]
  );

  // Handle contact
  const handleContact = useCallback(
    (method) => {
      if (method.type === "email") {
        window.location.href = `mailto:${method.value}`;
      } else if (method.type === "phone") {
        window.location.href = `tel:${method.value}`;
      } else if (method.type === "chat") {
        announce("Live chat opening...");
        // In real app, open chat widget
      }
    },
    [announce]
  );

  // Handle ticket operations
  const handleTicketRespond = useCallback(
    (ticketId, response) => {
      announce("Response submitted");
      // In real app, make API call
    },
    [announce]
  );

  const handleTicketClose = useCallback(
    (ticketId) => {
      announce("Ticket closed");
      // In real app, make API call
    },
    [announce]
  );

  // Filter content based on search and category
  const filteredContent = useMemo(() => {
    const filterBySearch = (items, searchFields) => {
      if (!searchQuery) return items;
      return items.filter((item) =>
        searchFields.some((field) =>
          item[field]?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    };

    const filterByCategory = (items) => {
      if (filterCategory === "all") return items;
      return items.filter((item) => item.category === filterCategory);
    };

    return {
      faqs: filterByCategory(
        filterBySearch(supportData.faqs, ["question", "answer"])
      ),
      tutorials: filterByCategory(
        filterBySearch(supportData.tutorials, ["title", "description"])
      ),
      resources: filterByCategory(
        filterBySearch(supportData.resources, ["title", "description"])
      ),
    };
  }, [supportData, searchQuery, filterCategory]);

  // Categories for filtering
  const categories = useMemo(
    () => [
      { value: "all", label: "All Categories" },
      { value: "accessibility", label: "Accessibility" },
      { value: "ai", label: "AI Assistant" },
      { value: "calendar", label: "Calendar" },
      { value: "navigation", label: "Navigation" },
      { value: "technical", label: "Technical" },
    ],
    []
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey) {
        const tabIndex = parseInt(e.key) - 1;
        if (tabIndex >= 0 && tabIndex < tabs.length) {
          e.preventDefault();
          setActiveTab(tabs[tabIndex].id);
        } else if (e.key === "s") {
          e.preventDefault();
          searchInputRef.current?.focus();
        } else if (e.key === "h") {
          e.preventDefault();
          announceHelp();
        }
      } else if (e.key === "Escape" && showVideoPlayer) {
        setShowVideoPlayer(false);
        setSelectedTutorial(null);
        announce("Video player closed");
      }
    };

    const announceHelp = () => {
      const helpText = `
        Support page shortcuts:
        Alt+1-5 to switch between sections,
        Alt+S to search,
        Alt+H for help,
        Tab to navigate between elements,
        Escape to close video player.
      `;
      announce(helpText);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [tabs, announce, showVideoPlayer]);

  if (loading) {
    return (
      <div className="support-loading" role="status" aria-live="polite">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="loading-spinner"
        >
          <HelpCircle size={48} />
        </motion.div>
        <p>Loading support content...</p>
      </div>
    );
  }

  return (
    <div className="support-container">
      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* Skip navigation */}
      <a href="#support-content" className="skip-link">
        Skip to support content
      </a>

      {/* Header */}
      <header className="support-header" role="banner">
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
            <h1 className="page-title">Support & Help</h1>
          </div>

          <div className="header-center">
            <div className="search-container">
              <Search className="search-icon" size={16} />
              <input
                ref={searchInputRef}
                type="search"
                placeholder="Search help articles, tutorials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                aria-label="Search support content"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="category-filter"
              aria-label="Filter by category"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="header-right">
            <div className="quick-actions">
              <button
                className="quick-action-btn"
                onClick={() => setActiveTab("contact")}
                aria-label="Contact support"
              >
                <Phone size={16} />
                <span>Contact</span>
              </button>
              <button
                className="quick-action-btn"
                onClick={() => setActiveTab("tickets")}
                aria-label="View support tickets"
              >
                <MessageSquare size={16} />
                <span>Tickets</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Announcements banner */}
      {supportData.announcements.length > 0 && (
        <div
          className="announcements-banner"
          role="region"
          aria-label="Important announcements"
        >
          {supportData.announcements.map((announcement) => (
            <motion.div
              key={announcement.id}
              className={`announcement ${announcement.type} priority-${announcement.priority}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="announcement-icon">
                {announcement.type === "feature" && <Star size={16} />}
                {announcement.type === "maintenance" && <Settings size={16} />}
                {announcement.type === "security" && <Shield size={16} />}
              </div>
              <div className="announcement-content">
                <h3>{announcement.title}</h3>
                <p>{announcement.content}</p>
              </div>
              <time
                className="announcement-date"
                dateTime={announcement.publishedAt}
              >
                {new Date(announcement.publishedAt).toLocaleDateString()}
              </time>
            </motion.div>
          ))}
        </div>
      )}

      {/* Main content */}
      <main className="support-main">
        {/* Navigation tabs */}
        <nav
          className="support-nav"
          role="navigation"
          aria-label="Support sections"
        >
          <div className="nav-tabs" role="tablist">
            {tabs.map((tab) => (
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

        {/* Content area */}
        <div
          id="support-content"
          className="support-content"
          role="main"
          aria-label="Support content"
        >
          <AnimatePresence mode="wait">
            {activeTab === "faq" && (
              <motion.div
                key="faq"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                role="tabpanel"
                id="faq-panel"
                aria-labelledby="faq-tab"
                className="faq-panel"
              >
                <div className="panel-header">
                  <h2>Frequently Asked Questions</h2>
                  <p>
                    Find quick answers to common questions about using our
                    platform.
                  </p>
                </div>

                <div className="faq-list">
                  {filteredContent.faqs.map((faq) => (
                    <FAQItem
                      key={faq.id}
                      faq={faq}
                      onSpeak={announce}
                      onHelpful={handleFAQHelpful}
                      onNotHelpful={handleFAQNotHelpful}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "tutorials" && (
              <motion.div
                key="tutorials"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                role="tabpanel"
                id="tutorials-panel"
                aria-labelledby="tutorials-tab"
                className="tutorials-panel"
              >
                <div className="panel-header">
                  <h2>Video Tutorials</h2>
                  <p>
                    Step-by-step video guides to help you master our platform.
                  </p>
                </div>

                <div className="tutorials-grid">
                  {filteredContent.tutorials.map((tutorial) => (
                    <TutorialCard
                      key={tutorial.id}
                      tutorial={tutorial}
                      onPlay={handlePlayTutorial}
                      onSpeak={announce}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "tickets" && (
              <motion.div
                key="tickets"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                role="tabpanel"
                id="tickets-panel"
                aria-labelledby="tickets-tab"
                className="tickets-panel"
              >
                <div className="panel-header">
                  <h2>Support Tickets</h2>
                  <p>Track and manage your support requests.</p>
                  <button className="create-ticket-btn">
                    <Plus size={16} />
                    Create New Ticket
                  </button>
                </div>

                <div className="tickets-list">
                  {supportData.tickets.map((ticket) => (
                    <SupportTicket
                      key={ticket.id}
                      ticket={ticket}
                      onRespond={handleTicketRespond}
                      onClose={handleTicketClose}
                      onSpeak={announce}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "resources" && (
              <motion.div
                key="resources"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                role="tabpanel"
                id="resources-panel"
                aria-labelledby="resources-tab"
                className="resources-panel"
              >
                <div className="panel-header">
                  <h2>Resources & Downloads</h2>
                  <p>
                    Helpful guides, documents, and tools to enhance your
                    experience.
                  </p>
                </div>

                <div className="resources-grid">
                  {filteredContent.resources.map((resource) => (
                    <motion.div
                      key={resource.id}
                      className="resource-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="resource-header">
                        <div className="resource-icon">
                          <FileText size={32} />
                        </div>
                        <div className="resource-info">
                          <h3>{resource.title}</h3>
                          <p>{resource.description}</p>
                        </div>
                      </div>

                      <div className="resource-meta">
                        <span className="resource-format">
                          {resource.format}
                        </span>
                        <span className="resource-size">{resource.size}</span>
                        <span className="resource-downloads">
                          <Download size={12} />
                          {resource.downloads.toLocaleString()} downloads
                        </span>
                        <span className="resource-rating">
                          <Star size={12} fill="currentColor" />
                          {resource.rating}
                        </span>
                      </div>

                      <div className="resource-actions">
                        <button className="resource-preview-btn">
                          <Eye size={16} />
                          Preview
                        </button>
                        <button className="resource-download-btn">
                          <Download size={16} />
                          Download
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "contact" && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                role="tabpanel"
                id="contact-panel"
                aria-labelledby="contact-tab"
                className="contact-panel"
              >
                <div className="panel-header">
                  <h2>Contact Support</h2>
                  <p>
                    Get in touch with our support team for personalized
                    assistance.
                  </p>
                </div>

                <div className="contacts-grid">
                  {supportData.contacts.map((contact) => (
                    <ContactCard
                      key={contact.id}
                      contact={contact}
                      onContact={handleContact}
                      onSpeak={announce}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Video Player Modal */}
      <AnimatePresence>
        {showVideoPlayer && selectedTutorial && (
          <motion.div
            className="video-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVideoPlayer(false)}
          >
            <motion.div
              className="video-modal"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-labelledby="tutorial-title"
            >
              <div className="video-modal-header">
                <h2 id="tutorial-title">{selectedTutorial.title}</h2>
                <button
                  className="modal-close"
                  onClick={() => setShowVideoPlayer(false)}
                  aria-label="Close video player"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="video-content">
                <div className="video-placeholder">
                  <Video size={64} />
                  <p>Video tutorial would play here</p>
                  <p className="video-description">
                    {selectedTutorial.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help panel */}
      <div className="help-panel-support" role="complementary">
        <details>
          <summary>Support Help</summary>
          <div className="help-content">
            <h3>Navigation</h3>
            <ul>
              <li>
                <kbd>Alt</kbd> + <kbd>1-5</kbd> - Switch between sections
              </li>
              <li>
                <kbd>Alt</kbd> + <kbd>S</kbd> - Search support content
              </li>
              <li>
                <kbd>Alt</kbd> + <kbd>H</kbd> - Help
              </li>
              <li>
                <kbd>Esc</kbd> - Close video player
              </li>
            </ul>

            <h3>Getting Help</h3>
            <ul>
              <li>Start with FAQ for quick answers</li>
              <li>Watch tutorials for visual learning</li>
              <li>Create support tickets for specific issues</li>
              <li>Download resources for offline reference</li>
              <li>Contact us directly for urgent matters</li>
            </ul>
          </div>
        </details>
      </div>
    </div>
  );
};

export default Support;
