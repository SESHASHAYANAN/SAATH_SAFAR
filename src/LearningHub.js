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
  BookOpen,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Subtitles,
  Settings,
  Download,
  Share2,
  Bookmark,
  Star,
  Award,
  Target,
  TrendingUp,
  Clock,
  User,
  Users,
  Search,
  Filter,
  Plus,
  Edit3,
  Save,
  X,
  Check,
  AlertTriangle,
  Info,
  HelpCircle,
  RefreshCw,
  Loader,
  BarChart3,
  PieChart,
  LineChart,
  Calendar,
  Home,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Mic,
  MicOff,
  Headphones,
  Speaker,
  Monitor,
  Smartphone,
  Tablet,
  Accessibility,
  Brain,
  Zap,
  Heart,
  Shield,
  Globe,
  FileText,
  Image,
  Video,
  Music,
  Paperclip,
  Link2,
  Tag,
  Flag,
  Archive,
  Folder,
  File,
  Timer,
  Stopwatch,
  AlarmClock,
  History,
  Camera,
  Upload,
  Maximize2,
  Minimize2,
  RotateCcw,
  Copy,
  ExternalLink,
  MessageSquare,
  Bell,
} from "lucide-react";
import "./LearningHub.css";

// Custom hooks for learning data management
const useLearningData = () => {
  const [learningData, setLearningData] = useState({
    courses: [],
    lessons: [],
    progress: {},
    achievements: [],
    bookmarks: [],
    notes: [],
    preferences: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLearningData = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Mock learning data
        const mockData = {
          courses: [
            {
              id: "course_1",
              title: "Digital Accessibility Fundamentals",
              description:
                "Learn the basics of digital accessibility, including WCAG guidelines, screen readers, and inclusive design principles.",
              instructor: "Dr. Sarah Johnson",
              duration: 480, // minutes
              difficulty: "beginner",
              category: "accessibility",
              tags: ["WCAG", "screen reader", "inclusive design"],
              rating: 4.8,
              reviews: 156,
              enrolled: 1234,
              thumbnail: "/api/placeholder/300/200",
              isEnrolled: true,
              progress: 65,
              lastAccessed: new Date().toISOString(),
              estimatedCompletion: new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000
              ).toISOString(),
              accessibility: {
                hasTranscripts: true,
                hasAudioDescription: true,
                hasCaptions: true,
                supportsScreenReader: true,
                keyboardNavigable: true,
                highContrast: true,
              },
              lessons: [
                {
                  id: "lesson_1_1",
                  title: "Introduction to Accessibility",
                  duration: 45,
                  type: "video",
                  completed: true,
                  transcript: true,
                  captions: true,
                },
                {
                  id: "lesson_1_2",
                  title: "Understanding Screen Readers",
                  duration: 60,
                  type: "interactive",
                  completed: true,
                  transcript: true,
                  captions: true,
                },
                {
                  id: "lesson_1_3",
                  title: "WCAG Guidelines Overview",
                  duration: 75,
                  type: "video",
                  completed: false,
                  transcript: true,
                  captions: true,
                  current: true,
                },
              ],
            },
            {
              id: "course_2",
              title: "Assistive Technology Mastery",
              description:
                "Master various assistive technologies including voice recognition, eye tracking, and switch controls.",
              instructor: "Mike Thompson",
              duration: 360,
              difficulty: "intermediate",
              category: "assistive_tech",
              tags: ["voice control", "eye tracking", "switch control"],
              rating: 4.9,
              reviews: 89,
              enrolled: 567,
              thumbnail: "/api/placeholder/300/200",
              isEnrolled: false,
              progress: 0,
              lastAccessed: null,
              estimatedCompletion: null,
              accessibility: {
                hasTranscripts: true,
                hasAudioDescription: true,
                hasCaptions: true,
                supportsScreenReader: true,
                keyboardNavigable: true,
                highContrast: true,
              },
              lessons: [],
            },
            {
              id: "course_3",
              title: "Adaptive Learning Strategies",
              description:
                "Develop effective learning strategies tailored to different disabilities and learning preferences.",
              instructor: "Emma Davis",
              duration: 240,
              difficulty: "beginner",
              category: "learning_strategies",
              tags: [
                "adaptive learning",
                "cognitive support",
                "memory techniques",
              ],
              rating: 4.7,
              reviews: 201,
              enrolled: 890,
              thumbnail: "/api/placeholder/300/200",
              isEnrolled: true,
              progress: 25,
              lastAccessed: new Date(
                Date.now() - 24 * 60 * 60 * 1000
              ).toISOString(),
              estimatedCompletion: new Date(
                Date.now() + 14 * 24 * 60 * 60 * 1000
              ).toISOString(),
              accessibility: {
                hasTranscripts: true,
                hasAudioDescription: false,
                hasCaptions: true,
                supportsScreenReader: true,
                keyboardNavigable: true,
                highContrast: true,
              },
              lessons: [
                {
                  id: "lesson_3_1",
                  title: "Understanding Your Learning Style",
                  duration: 30,
                  type: "quiz",
                  completed: true,
                  transcript: false,
                  captions: false,
                },
                {
                  id: "lesson_3_2",
                  title: "Memory Enhancement Techniques",
                  duration: 45,
                  type: "audio",
                  completed: false,
                  transcript: true,
                  captions: false,
                  current: true,
                },
              ],
            },
          ],
          progress: {
            course_1: {
              completion: 65,
              timeSpent: 312, // minutes
              lessonsCompleted: 2,
              totalLessons: 8,
              lastAccessed: new Date().toISOString(),
              streak: 7, // days
              averageScore: 85,
              certificateEarned: false,
            },
            course_3: {
              completion: 25,
              timeSpent: 75,
              lessonsCompleted: 1,
              totalLessons: 6,
              lastAccessed: new Date(
                Date.now() - 24 * 60 * 60 * 1000
              ).toISOString(),
              streak: 3,
              averageScore: 92,
              certificateEarned: false,
            },
          },
          achievements: [
            {
              id: "achievement_1",
              name: "First Steps",
              description: "Completed your first lesson",
              icon: "star",
              earnedDate: "2024-01-15T10:30:00Z",
              category: "milestone",
              points: 10,
            },
            {
              id: "achievement_2",
              name: "Accessibility Advocate",
              description: "Completed accessibility fundamentals course",
              icon: "accessibility",
              earnedDate: null, // not earned yet
              category: "course_completion",
              points: 100,
              progress: 65,
            },
            {
              id: "achievement_3",
              name: "Week Warrior",
              description: "Maintained a 7-day learning streak",
              icon: "target",
              earnedDate: "2024-03-01T09:15:00Z",
              category: "streak",
              points: 50,
            },
          ],
          bookmarks: [
            {
              id: "bookmark_1",
              courseId: "course_1",
              lessonId: "lesson_1_3",
              title: "WCAG Guidelines Overview",
              timestamp: 1234, // seconds into lesson
              note: "Important section about color contrast requirements",
              createdAt: new Date().toISOString(),
            },
          ],
          notes: [
            {
              id: "note_1",
              courseId: "course_1",
              lessonId: "lesson_1_2",
              title: "Screen Reader Navigation",
              content:
                "Key shortcuts: H for headings, 1-6 for heading levels, Tab for interactive elements",
              timestamp: 890,
              createdAt: new Date().toISOString(),
              lastModified: new Date().toISOString(),
              tags: ["shortcuts", "navigation"],
            },
          ],
          preferences: {
            playbackSpeed: 1.0,
            autoplay: false,
            captions: true,
            transcripts: true,
            audioDescription: true,
            notifications: true,
            reminderTime: "19:00",
            studyGoal: 30, // minutes per day
            preferredFormat: "video",
            theme: "dark",
            fontSize: "large",
          },
        };

        setLearningData(mockData);
      } catch (error) {
        console.error("Failed to load learning data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadLearningData();
  }, []);

  return { learningData, loading, setLearningData };
};

// Course Card Component
const CourseCard = ({ course, onEnroll, onContinue, onSpeak }) => {
  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: "#27ae60",
      intermediate: "#f39c12",
      advanced: "#e74c3c",
    };
    return colors[difficulty] || colors.beginner;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      accessibility: Accessibility,
      assistive_tech: Settings,
      learning_strategies: Brain,
      technology: Monitor,
      communication: MessageSquare,
    };
    return icons[category] || BookOpen;
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const CategoryIcon = getCategoryIcon(course.category);

  return (
    <motion.div
      className={`course-card ${course.isEnrolled ? "enrolled" : ""}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="course-thumbnail">
        <img src={course.thumbnail} alt="" className="thumbnail-image" />
        <div className="course-overlay">
          {course.isEnrolled && (
            <div className="progress-overlay">
              <div className="progress-circle">
                <svg className="progress-ring" width="60" height="60">
                  <circle
                    className="progress-ring-background"
                    cx="30"
                    cy="30"
                    r="25"
                  />
                  <circle
                    className="progress-ring-progress"
                    cx="30"
                    cy="30"
                    r="25"
                    strokeDasharray={`${(157 * course.progress) / 100} 157`}
                  />
                </svg>
                <span className="progress-text">{course.progress}%</span>
              </div>
            </div>
          )}
          <div className="course-actions">
            <button
              className="course-action-btn"
              onClick={() => onSpeak(course)}
              aria-label={`Read ${course.title} details aloud`}
            >
              <Volume2 size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="course-content">
        <div className="course-header">
          <div className="course-meta">
            <CategoryIcon size={14} />
            <span className="course-category">
              {course.category.replace("_", " ")}
            </span>
            <span
              className="course-difficulty"
              style={{ color: getDifficultyColor(course.difficulty) }}
            >
              {course.difficulty}
            </span>
          </div>
          <div className="course-rating">
            <Star size={14} fill="currentColor" />
            <span>{course.rating}</span>
            <span className="review-count">({course.reviews})</span>
          </div>
        </div>

        <h3 className="course-title">{course.title}</h3>
        <p className="course-description">{course.description}</p>

        <div className="course-details">
          <div className="course-info">
            <div className="info-item">
              <User size={14} />
              <span>{course.instructor}</span>
            </div>
            <div className="info-item">
              <Clock size={14} />
              <span>{formatDuration(course.duration)}</span>
            </div>
            <div className="info-item">
              <Users size={14} />
              <span>{course.enrolled.toLocaleString()} enrolled</span>
            </div>
          </div>

          <div className="accessibility-features">
            <h4>Accessibility Features:</h4>
            <div className="features-list">
              {course.accessibility.hasTranscripts && (
                <span className="feature-tag">
                  <FileText size={12} />
                  Transcripts
                </span>
              )}
              {course.accessibility.hasCaptions && (
                <span className="feature-tag">
                  <Subtitles size={12} />
                  Captions
                </span>
              )}
              {course.accessibility.hasAudioDescription && (
                <span className="feature-tag">
                  <Headphones size={12} />
                  Audio Description
                </span>
              )}
              {course.accessibility.supportsScreenReader && (
                <span className="feature-tag">
                  <Speaker size={12} />
                  Screen Reader
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="course-tags">
          {course.tags.map((tag) => (
            <span key={tag} className="course-tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="course-footer">
          {course.isEnrolled ? (
            <div className="enrolled-actions">
              <div className="progress-info">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <span className="progress-label">
                  {course.progress}% complete
                </span>
              </div>
              <button
                className="continue-btn"
                onClick={() => onContinue(course)}
                aria-label={`Continue ${course.title}`}
              >
                <Play size={16} />
                Continue Learning
              </button>
            </div>
          ) : (
            <button
              className="enroll-btn"
              onClick={() => onEnroll(course)}
              aria-label={`Enroll in ${course.title}`}
            >
              <Plus size={16} />
              Enroll Now
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Video Player Component
const AccessibleVideoPlayer = ({
  lesson,
  onProgress,
  onComplete,
  onBookmark,
  onNote,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showCaptions, setShowCaptions] = useState(true);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const videoRef = useRef(null);
  const transcriptRef = useRef(null);

  const handlePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const handleSeek = useCallback((newTime) => {
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  }, []);

  const handleVolumeChange = useCallback((newVolume) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  }, []);

  const handlePlaybackRateChange = useCallback((newRate) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = newRate;
      setPlaybackRate(newRate);
    }
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Keyboard shortcuts for video player
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.closest(".video-player")) {
        switch (e.key) {
          case " ":
            e.preventDefault();
            handlePlayPause();
            break;
          case "ArrowLeft":
            e.preventDefault();
            handleSeek(Math.max(0, currentTime - 10));
            break;
          case "ArrowRight":
            e.preventDefault();
            handleSeek(Math.min(duration, currentTime + 10));
            break;
          case "ArrowUp":
            e.preventDefault();
            handleVolumeChange(Math.min(1, volume + 0.1));
            break;
          case "ArrowDown":
            e.preventDefault();
            handleVolumeChange(Math.max(0, volume - 0.1));
            break;
          case "c":
            e.preventDefault();
            setShowCaptions(!showCaptions);
            break;
          case "t":
            e.preventDefault();
            setShowTranscript(!showTranscript);
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    handlePlayPause,
    handleSeek,
    handleVolumeChange,
    currentTime,
    duration,
    volume,
    showCaptions,
    showTranscript,
  ]);

  return (
    <div
      className="video-player-container"
      role="region"
      aria-label="Video player"
    >
      <div className="video-wrapper">
        <video
          ref={videoRef}
          className="video-element"
          onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
          onDurationChange={(e) => setDuration(e.target.duration)}
          onEnded={() => {
            setIsPlaying(false);
            if (onComplete) onComplete();
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          controls={false}
          aria-label={lesson.title}
        >
          <source src={`/api/video/${lesson.id}`} type="video/mp4" />
          {showCaptions && lesson.captions && (
            <track
              kind="captions"
              src={`/api/captions/${lesson.id}`}
              srcLang="en"
              label="English"
              default
            />
          )}
          <p>
            Your browser doesn't support video.{" "}
            <a href={`/api/video/${lesson.id}`}>Download the video</a>.
          </p>
        </video>

        {/* Video overlay controls */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              className="video-controls-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                className="play-pause-overlay"
                onClick={handlePlayPause}
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <Pause size={48} /> : <Play size={48} />}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Video controls */}
      <div
        className="video-controls"
        role="toolbar"
        aria-label="Video controls"
      >
        <div className="primary-controls">
          <button
            className="control-btn"
            onClick={handlePlayPause}
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>

          <button
            className="control-btn"
            onClick={() => handleSeek(Math.max(0, currentTime - 10))}
            aria-label="Rewind 10 seconds"
          >
            <SkipBack size={20} />
          </button>

          <button
            className="control-btn"
            onClick={() => handleSeek(Math.min(duration, currentTime + 10))}
            aria-label="Forward 10 seconds"
          >
            <SkipForward size={20} />
          </button>

          <div className="time-display">
            <span className="current-time">{formatTime(currentTime)}</span>
            <span className="time-separator">/</span>
            <span className="total-time">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="progress-container">
          <input
            type="range"
            className="progress-slider"
            min="0"
            max={duration}
            value={currentTime}
            onChange={(e) => handleSeek(parseFloat(e.target.value))}
            aria-label="Seek video position"
          />
          <div className="progress-buffer" style={{ width: "100%" }} />
          <div
            className="progress-played"
            style={{
              width: `${duration ? (currentTime / duration) * 100 : 0}%`,
            }}
          />
        </div>

        <div className="secondary-controls">
          <div className="volume-control">
            <button
              className="control-btn"
              onClick={() => handleVolumeChange(volume === 0 ? 1 : 0)}
              aria-label={volume === 0 ? "Unmute" : "Mute"}
            >
              {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <input
              type="range"
              className="volume-slider"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              aria-label="Volume"
            />
          </div>

          <div className="playback-rate-control">
            <select
              value={playbackRate}
              onChange={(e) =>
                handlePlaybackRateChange(parseFloat(e.target.value))
              }
              className="playback-rate-select"
              aria-label="Playback speed"
            >
              <option value={0.5}>0.5x</option>
              <option value={0.75}>0.75x</option>
              <option value={1}>1x</option>
              <option value={1.25}>1.25x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>
          </div>

          <button
            className={`control-btn ${showCaptions ? "active" : ""}`}
            onClick={() => setShowCaptions(!showCaptions)}
            aria-pressed={showCaptions}
            aria-label={showCaptions ? "Hide captions" : "Show captions"}
            title="Toggle captions (C)"
          >
            <Subtitles size={18} />
          </button>

          <button
            className={`control-btn ${showTranscript ? "active" : ""}`}
            onClick={() => setShowTranscript(!showTranscript)}
            aria-pressed={showTranscript}
            aria-label={showTranscript ? "Hide transcript" : "Show transcript"}
            title="Toggle transcript (T)"
          >
            <FileText size={18} />
          </button>

          <button
            className="control-btn"
            onClick={() => onBookmark(currentTime)}
            aria-label="Bookmark this position"
            title="Bookmark (B)"
          >
            <Bookmark size={18} />
          </button>

          <button
            className="control-btn"
            onClick={() => onNote(currentTime)}
            aria-label="Add note at this position"
            title="Add note (N)"
          >
            <Edit3 size={18} />
          </button>

          <button
            className="control-btn"
            onClick={() => {
              if (videoRef.current.requestFullscreen) {
                videoRef.current.requestFullscreen();
              }
            }}
            aria-label="Enter fullscreen"
            title="Fullscreen (F)"
          >
            <Maximize2 size={18} />
          </button>
        </div>
      </div>

      {/* Transcript Panel */}
      <AnimatePresence>
        {showTranscript && (
          <motion.div
            className="transcript-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            role="region"
            aria-label="Video transcript"
          >
            <div className="transcript-header">
              <h3>Transcript</h3>
              <button
                className="transcript-close"
                onClick={() => setShowTranscript(false)}
                aria-label="Close transcript"
              >
                <X size={16} />
              </button>
            </div>
            <div ref={transcriptRef} className="transcript-content">
              <p className="transcript-text">
                This is where the interactive transcript would appear,
                synchronized with the video playback. Users can click on any
                sentence to jump to that part of the video.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Progress Dashboard Component
const ProgressDashboard = ({ progress, achievements, onAnnounce }) => {
  const totalProgress = useMemo(() => {
    const progressValues = Object.values(progress);
    if (progressValues.length === 0) return 0;

    const total = progressValues.reduce((sum, p) => sum + p.completion, 0);
    return Math.round(total / progressValues.length);
  }, [progress]);

  const totalTimeSpent = useMemo(() => {
    return Object.values(progress).reduce((sum, p) => sum + p.timeSpent, 0);
  }, [progress]);

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getStreakColor = (streak) => {
    if (streak >= 30) return "#27ae60";
    if (streak >= 7) return "#f39c12";
    return "#3498db";
  };

  return (
    <motion.div
      className="progress-dashboard"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="dashboard-header">
        <h2>Your Learning Progress</h2>
        <button
          className="speak-progress-btn"
          onClick={() => {
            const progressText = `Your overall learning progress is ${totalProgress} percent. You've spent ${formatTime(
              totalTimeSpent
            )} learning and earned ${
              achievements.filter((a) => a.earnedDate).length
            } achievements.`;
            onAnnounce(progressText);
          }}
          aria-label="Read progress summary aloud"
        >
          <Volume2 size={16} />
        </button>
      </div>

      <div className="progress-overview">
        <div className="progress-card overall-progress">
          <div className="progress-icon">
            <BarChart3 size={32} />
          </div>
          <div className="progress-info">
            <h3>Overall Progress</h3>
            <div className="progress-circle-large">
              <svg width="80" height="80">
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  className="progress-background"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  className="progress-foreground"
                  strokeDasharray={`${(220 * totalProgress) / 100} 220`}
                />
              </svg>
              <span className="progress-percentage">{totalProgress}%</span>
            </div>
          </div>
        </div>

        <div className="progress-card time-spent">
          <div className="progress-icon">
            <Clock size={32} />
          </div>
          <div className="progress-info">
            <h3>Time Spent Learning</h3>
            <div className="stat-value">{formatTime(totalTimeSpent)}</div>
            <div className="stat-label">Total study time</div>
          </div>
        </div>

        <div className="progress-card achievements-earned">
          <div className="progress-icon">
            <Award size={32} />
          </div>
          <div className="progress-info">
            <h3>Achievements</h3>
            <div className="stat-value">
              {achievements.filter((a) => a.earnedDate).length}
            </div>
            <div className="stat-label">of {achievements.length} earned</div>
          </div>
        </div>

        <div className="progress-card learning-streak">
          <div className="progress-icon">
            <Target size={32} />
          </div>
          <div className="progress-info">
            <h3>Learning Streak</h3>
            <div className="stat-value" style={{ color: getStreakColor(7) }}>
              7 days
            </div>
            <div className="stat-label">Current streak</div>
          </div>
        </div>
      </div>

      <div className="course-progress-list">
        <h3>Course Progress</h3>
        <div className="course-progress-items">
          {Object.entries(progress).map(([courseId, courseProgress]) => (
            <div key={courseId} className="course-progress-item">
              <div className="course-progress-header">
                <h4>Course Progress</h4>
                <span className="progress-percentage">
                  {courseProgress.completion}%
                </span>
              </div>
              <div className="course-progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${courseProgress.completion}%` }}
                />
              </div>
              <div className="course-progress-details">
                <span>
                  {courseProgress.lessonsCompleted} of{" "}
                  {courseProgress.totalLessons} lessons
                </span>
                <span>Avg. Score: {courseProgress.averageScore}%</span>
                <span>Time: {formatTime(courseProgress.timeSpent)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="achievements-showcase">
        <h3>Achievements</h3>
        <div className="achievements-grid">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              className={`achievement-badge ${
                achievement.earnedDate ? "earned" : "locked"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="badge-icon">
                {achievement.icon === "star" && <Star size={24} />}
                {achievement.icon === "accessibility" && (
                  <Accessibility size={24} />
                )}
                {achievement.icon === "target" && <Target size={24} />}
              </div>
              <div className="badge-content">
                <h4>{achievement.name}</h4>
                <p>{achievement.description}</p>
                {achievement.earnedDate ? (
                  <time className="earned-date">
                    Earned{" "}
                    {new Date(achievement.earnedDate).toLocaleDateString()}
                  </time>
                ) : achievement.progress !== undefined ? (
                  <div className="achievement-progress">
                    <div className="progress-bar-small">
                      <div
                        className="progress-fill-small"
                        style={{ width: `${achievement.progress}%` }}
                      />
                    </div>
                    <span>{achievement.progress}% complete</span>
                  </div>
                ) : (
                  <span className="locked-text">Locked</span>
                )}
              </div>
              <div className="badge-points">
                <span>{achievement.points} pts</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Main Learning Hub Component
const LearningHub = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("courses");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [announcement, setAnnouncement] = useState("");
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  // Hooks
  const { learningData, loading } = useLearningData();

  // Refs
  const searchInputRef = useRef(null);

  // Tabs configuration
  const tabs = useMemo(
    () => [
      { id: "courses", label: "Courses", icon: BookOpen, color: "blue" },
      { id: "progress", label: "Progress", icon: BarChart3, color: "green" },
      { id: "bookmarks", label: "Bookmarks", icon: Bookmark, color: "purple" },
      { id: "notes", label: "Notes", icon: Edit3, color: "orange" },
      {
        id: "achievements",
        label: "Achievements",
        icon: Award,
        color: "yellow",
      },
    ],
    []
  );

  // Announcement function
  const announce = useCallback((message) => {
    setAnnouncement(message);
    setTimeout(() => setAnnouncement(""), 5000);
  }, []);

  // Handle course enrollment
  const handleEnrollCourse = useCallback(
    (course) => {
      announce(`Enrolled in ${course.title}. You can now start learning!`);
      // In a real app, this would make an API call
    },
    [announce]
  );

  // Handle continue learning
  const handleContinueLearning = useCallback(
    (course) => {
      const currentLesson =
        course.lessons.find((lesson) => lesson.current) || course.lessons[0];
      if (currentLesson) {
        setSelectedCourse(course);
        setSelectedLesson(currentLesson);
        setShowVideoPlayer(true);
        announce(`Starting lesson: ${currentLesson.title}`);
      }
    },
    [announce]
  );

  // Handle course details speaking
  const handleSpeakCourse = useCallback(
    (course) => {
      const details = `
      ${course.title} by ${course.instructor}.
      Duration: ${Math.floor(course.duration / 60)} hours.
      Difficulty: ${course.difficulty}.
      Rating: ${course.rating} out of 5 with ${course.reviews} reviews.
      ${course.enrolled.toLocaleString()} students enrolled.
      ${
        course.isEnrolled
          ? `You are ${course.progress}% complete.`
          : "Click to enroll."
      }
    `;
      announce(details);
    },
    [announce]
  );

  // Filter courses
  const filteredCourses = useMemo(() => {
    let filtered = learningData.courses;

    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          course.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    if (filterCategory !== "all") {
      filtered = filtered.filter(
        (course) => course.category === filterCategory
      );
    }

    return filtered;
  }, [learningData.courses, searchQuery, filterCategory]);

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
        setSelectedLesson(null);
        announce("Video player closed");
      }
    };

    const announceHelp = () => {
      const helpText = `
        Learning Hub shortcuts:
        Alt+1-5 to switch between tabs,
        Alt+S to search,
        Alt+H for help,
        Escape to close video player,
        Tab to navigate between elements.
      `;
      announce(helpText);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [tabs, announce, showVideoPlayer]);

  if (loading) {
    return (
      <div className="learning-hub-loading" role="status" aria-live="polite">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="loading-spinner"
        >
          <BookOpen size={48} />
        </motion.div>
        <p>Loading your learning content...</p>
      </div>
    );
  }

  return (
    <div className="learning-hub-container">
      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* Skip navigation */}
      <a href="#learning-content" className="skip-link">
        Skip to learning content
      </a>

      {/* Header */}
      <header className="learning-header" role="banner">
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
            <h1 className="page-title">Learning Hub</h1>
          </div>

          <div className="header-center">
            <div className="search-container">
              <Search className="search-icon" size={16} />
              <input
                ref={searchInputRef}
                type="search"
                placeholder="Search courses, lessons, notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                aria-label="Search learning content"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="category-filter"
              aria-label="Filter by category"
            >
              <option value="all">All Categories</option>
              <option value="accessibility">Accessibility</option>
              <option value="assistive_tech">Assistive Technology</option>
              <option value="learning_strategies">Learning Strategies</option>
              <option value="technology">Technology</option>
            </select>
          </div>

          <div className="header-right">
            <div className="learning-stats">
              <div className="stat-item">
                <BookOpen size={16} />
                <span>
                  {learningData.courses.filter((c) => c.isEnrolled).length}{" "}
                  Enrolled
                </span>
              </div>
              <div className="stat-item">
                <Award size={16} />
                <span>
                  {learningData.achievements.filter((a) => a.earnedDate).length}{" "}
                  Earned
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="learning-main">
        {/* Navigation tabs */}
        <nav
          className="learning-nav"
          role="navigation"
          aria-label="Learning sections"
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
          id="learning-content"
          className="learning-content"
          role="main"
          aria-label="Learning content"
        >
          <AnimatePresence mode="wait">
            {activeTab === "courses" && (
              <motion.div
                key="courses"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                role="tabpanel"
                id="courses-panel"
                aria-labelledby="courses-tab"
                className="courses-panel"
              >
                <div className="courses-grid">
                  {filteredCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      onEnroll={handleEnrollCourse}
                      onContinue={handleContinueLearning}
                      onSpeak={handleSpeakCourse}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "progress" && (
              <motion.div
                key="progress"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                role="tabpanel"
                id="progress-panel"
                aria-labelledby="progress-tab"
                className="progress-panel"
              >
                <ProgressDashboard
                  progress={learningData.progress}
                  achievements={learningData.achievements}
                  onAnnounce={announce}
                />
              </motion.div>
            )}

            {/* Other tabs would be implemented similarly */}
          </AnimatePresence>
        </div>
      </main>

      {/* Video Player Modal */}
      <AnimatePresence>
        {showVideoPlayer && selectedLesson && (
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
              aria-labelledby="lesson-title"
            >
              <div className="video-modal-header">
                <h2 id="lesson-title">{selectedLesson.title}</h2>
                <button
                  className="modal-close"
                  onClick={() => setShowVideoPlayer(false)}
                  aria-label="Close video player"
                >
                  <X size={20} />
                </button>
              </div>

              <AccessibleVideoPlayer
                lesson={selectedLesson}
                onProgress={(time) => console.log("Progress:", time)}
                onComplete={() => announce("Lesson completed!")}
                onBookmark={(time) =>
                  announce(
                    `Bookmarked at ${Math.floor(time / 60)}:${Math.floor(
                      time % 60
                    )
                      .toString()
                      .padStart(2, "0")}`
                  )
                }
                onNote={(time) =>
                  announce(
                    `Note added at ${Math.floor(time / 60)}:${Math.floor(
                      time % 60
                    )
                      .toString()
                      .padStart(2, "0")}`
                  )
                }
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help panel */}
      <div className="help-panel-learning" role="complementary">
        <details>
          <summary>Learning Hub Help</summary>
          <div className="help-content">
            <h3>Navigation</h3>
            <ul>
              <li>
                <kbd>Alt</kbd> + <kbd>1-5</kbd> - Switch between tabs
              </li>
              <li>
                <kbd>Alt</kbd> + <kbd>S</kbd> - Search courses
              </li>
              <li>
                <kbd>Alt</kbd> + <kbd>H</kbd> - Help
              </li>
              <li>
                <kbd>Esc</kbd> - Close video player
              </li>
            </ul>

            <h3>Video Player Shortcuts</h3>
            <ul>
              <li>
                <kbd>Space</kbd> - Play/Pause
              </li>
              <li>
                <kbd>←</kbd> / <kbd>→</kbd> - Seek backward/forward
              </li>
              <li>
                <kbd>↑</kbd> / <kbd>↓</kbd> - Volume up/down
              </li>
              <li>
                <kbd>C</kbd> - Toggle captions
              </li>
              <li>
                <kbd>T</kbd> - Toggle transcript
              </li>
              <li>
                <kbd>F</kbd> - Fullscreen
              </li>
            </ul>
          </div>
        </details>
      </div>
    </div>
  );
};

export default LearningHub;
