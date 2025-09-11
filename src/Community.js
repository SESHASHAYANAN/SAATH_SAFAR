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
  Users,
  MessageSquare,
  Heart,
  Share2,
  Bookmark,
  Star,
  Award,
  Target,
  TrendingUp,
  Clock,
  User,
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
  Search,
  Filter,
  Home,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Settings,
  Bell,
  Globe,
  Accessibility,
  Shield,
  Camera,
  Upload,
  Download,
  Copy,
  ExternalLink,
  Flag,
  Tag,
  Archive,
  Folder,
  File,
  Calendar,
  Timer,
  Stopwatch,
  AlarmClock,
  History,
  Phone,
  Mail,
  MapPin,
  Link2,
  Image,
  Video,
  Music,
  Paperclip,
  ThumbsUp,
  ThumbsDown,
  Reply,
  Forward,
  MoreHorizontal,
  Zap,
  Brain,
  Monitor,
  Smartphone,
  Tablet,
  Watch,
  Headphones,
  Speaker,
} from "lucide-react";
import "./Community.css";

// Custom hooks for community data
const useCommunityData = () => {
  const [communityData, setCommunityData] = useState({
    posts: [],
    groups: [],
    events: [],
    members: [],
    discussions: [],
    resources: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCommunityData = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Mock community data
        const mockData = {
          posts: [
            {
              id: "post_1",
              author: {
                id: "user_1",
                name: "Sarah Johnson",
                avatar: "/api/placeholder/40/40",
                title: "Accessibility Advocate",
                verified: true,
                badges: ["expert", "helper"],
              },
              title: "New Voice Recognition Features Coming Soon!",
              content:
                "I'm excited to announce that we're working on enhanced voice recognition features that will make our platform even more accessible. These improvements include better accuracy for different accents and support for multiple languages.",
              type: "announcement",
              timestamp: new Date().toISOString(),
              likes: 45,
              comments: 12,
              shares: 8,
              bookmarks: 15,
              tags: ["voice-recognition", "accessibility", "announcement"],
              attachments: [],
              isLiked: false,
              isBookmarked: true,
              accessibility: {
                hasAltText: true,
                hasAudioDescription: false,
                readingLevel: "intermediate",
              },
              engagement: {
                views: 234,
                uniqueViews: 189,
                avgReadTime: 45,
              },
            },
            {
              id: "post_2",
              author: {
                id: "user_2",
                name: "Mike Chen",
                avatar: "/api/placeholder/40/40",
                title: "Screen Reader User",
                verified: false,
                badges: ["contributor"],
              },
              title: "Tips for Better Screen Reader Navigation",
              content:
                "After years of using screen readers, I've discovered some navigation techniques that really speed up browsing. Here are my top 5 tips that have made a huge difference in my daily computer use.",
              type: "tips",
              timestamp: new Date(Date.now() - 3600000).toISOString(),
              likes: 89,
              comments: 23,
              shares: 34,
              bookmarks: 56,
              tags: ["screen-reader", "navigation", "tips", "productivity"],
              attachments: [
                {
                  id: "attach_1",
                  type: "document",
                  name: "screen_reader_shortcuts.pdf",
                  size: "245KB",
                  url: "/api/attachments/screen_reader_shortcuts.pdf",
                },
              ],
              isLiked: true,
              isBookmarked: false,
              accessibility: {
                hasAltText: true,
                hasAudioDescription: false,
                readingLevel: "beginner",
              },
              engagement: {
                views: 567,
                uniqueViews: 445,
                avgReadTime: 120,
              },
            },
            {
              id: "post_3",
              author: {
                id: "user_3",
                name: "Emma Rodriguez",
                avatar: "/api/placeholder/40/40",
                title: "UX Designer",
                verified: true,
                badges: ["designer", "moderator"],
              },
              title: "Inclusive Design Workshop - March 15th",
              content:
                "Join us for a hands-on workshop on inclusive design principles. We'll cover color accessibility, typography choices, and creating user interfaces that work for everyone. Limited spots available!",
              type: "event",
              timestamp: new Date(Date.now() - 7200000).toISOString(),
              likes: 67,
              comments: 18,
              shares: 29,
              bookmarks: 42,
              tags: ["workshop", "inclusive-design", "ux", "event"],
              attachments: [
                {
                  id: "attach_2",
                  type: "image",
                  name: "workshop_flyer.jpg",
                  size: "1.2MB",
                  url: "/api/attachments/workshop_flyer.jpg",
                  altText:
                    "Workshop flyer showing date, time, and registration information",
                },
              ],
              isLiked: false,
              isBookmarked: true,
              accessibility: {
                hasAltText: true,
                hasAudioDescription: false,
                readingLevel: "intermediate",
              },
              engagement: {
                views: 345,
                uniqueViews: 287,
                avgReadTime: 60,
              },
              eventDetails: {
                date: new Date(
                  Date.now() + 10 * 24 * 60 * 60 * 1000
                ).toISOString(),
                location: "Online via Zoom",
                capacity: 50,
                registered: 34,
                cost: "Free",
              },
            },
          ],
          groups: [
            {
              id: "group_1",
              name: "Screen Reader Users",
              description:
                "A supportive community for screen reader users to share tips, troubleshoot issues, and discuss the latest accessibility technologies.",
              members: 1234,
              category: "assistive-technology",
              privacy: "public",
              image: "/api/placeholder/100/100",
              moderators: ["user_1", "user_4"],
              created: "2023-01-15T10:30:00Z",
              lastActivity: new Date().toISOString(),
              tags: ["screen-reader", "NVDA", "JAWS", "VoiceOver"],
              isMember: true,
              memberRole: "member",
              notifications: true,
              stats: {
                posts: 456,
                activeMembers: 234,
                weeklyPosts: 23,
              },
            },
            {
              id: "group_2",
              name: "Voice Control Community",
              description:
                "For users of voice control software like Dragon NaturallySpeaking, Voice Access, and other speech recognition tools.",
              members: 678,
              category: "assistive-technology",
              privacy: "public",
              image: "/api/placeholder/100/100",
              moderators: ["user_2"],
              created: "2023-03-20T14:15:00Z",
              lastActivity: new Date(Date.now() - 1800000).toISOString(),
              tags: ["voice-control", "dragon", "speech-recognition"],
              isMember: false,
              memberRole: null,
              notifications: false,
              stats: {
                posts: 234,
                activeMembers: 145,
                weeklyPosts: 12,
              },
            },
            {
              id: "group_3",
              name: "Accessibility Professionals",
              description:
                "A network for accessibility professionals, including auditors, developers, designers, and consultants working in the accessibility field.",
              members: 2345,
              category: "professional",
              privacy: "public",
              image: "/api/placeholder/100/100",
              moderators: ["user_3", "user_5"],
              created: "2022-11-08T09:45:00Z",
              lastActivity: new Date(Date.now() - 3600000).toISOString(),
              tags: ["professional", "WCAG", "auditing", "development"],
              isMember: true,
              memberRole: "contributor",
              notifications: true,
              stats: {
                posts: 789,
                activeMembers: 456,
                weeklyPosts: 45,
              },
            },
          ],
          events: [
            {
              id: "event_1",
              title: "Global Accessibility Awareness Day",
              description:
                "Join millions worldwide in raising awareness about digital accessibility and inclusion.",
              date: new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000
              ).toISOString(),
              endDate: new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000
              ).toISOString(),
              type: "awareness",
              location: "Global - Virtual and In-Person",
              organizer: {
                name: "GAAD Foundation",
                avatar: "/api/placeholder/40/40",
              },
              attendees: 15678,
              maxAttendees: null,
              cost: "Free",
              tags: ["awareness", "global", "education"],
              isAttending: true,
              isInterested: false,
              accessibility: {
                signLanguage: true,
                captions: true,
                audioDescription: true,
                materials: "provided",
              },
            },
            {
              id: "event_2",
              title: "Assistive Technology Showcase",
              description:
                "Explore the latest assistive technologies and meet the innovators behind them.",
              date: new Date(
                Date.now() + 15 * 24 * 60 * 60 * 1000
              ).toISOString(),
              endDate: new Date(
                Date.now() + 15 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000
              ).toISOString(),
              type: "conference",
              location: "San Francisco Convention Center",
              organizer: {
                name: "AT Innovation Hub",
                avatar: "/api/placeholder/40/40",
              },
              attendees: 234,
              maxAttendees: 500,
              cost: "$75",
              tags: ["technology", "conference", "innovation"],
              isAttending: false,
              isInterested: true,
              accessibility: {
                signLanguage: true,
                captions: true,
                audioDescription: true,
                materials: "digital",
              },
            },
          ],
          members: [
            {
              id: "user_1",
              name: "Sarah Johnson",
              title: "Accessibility Advocate",
              avatar: "/api/placeholder/60/60",
              location: "San Francisco, CA",
              joinDate: "2023-01-15T10:30:00Z",
              lastActive: new Date().toISOString(),
              badges: ["expert", "helper", "verified"],
              stats: {
                posts: 156,
                comments: 567,
                likes: 2345,
                followers: 890,
                following: 234,
              },
              interests: [
                "voice-recognition",
                "screen-readers",
                "mobile-accessibility",
              ],
              isFollowing: false,
              isOnline: true,
            },
          ],
          discussions: [
            {
              id: "discussion_1",
              title: "Best practices for alt text on complex images",
              author: {
                id: "user_4",
                name: "Alex Kim",
                avatar: "/api/placeholder/40/40",
              },
              category: "accessibility-tips",
              replies: 23,
              views: 456,
              lastActivity: new Date(Date.now() - 1800000).toISOString(),
              tags: ["alt-text", "images", "wcag"],
              isPinned: false,
              isResolved: false,
              difficulty: "intermediate",
            },
          ],
          resources: [
            {
              id: "resource_1",
              title: "WCAG 2.1 Quick Reference Guide",
              description:
                "A comprehensive guide to Web Content Accessibility Guidelines 2.1 with practical examples.",
              type: "guide",
              format: "PDF",
              size: "2.1MB",
              downloads: 1234,
              rating: 4.8,
              author: {
                name: "Accessibility Team",
                avatar: "/api/placeholder/40/40",
              },
              uploadDate: "2024-01-15T10:30:00Z",
              tags: ["wcag", "guidelines", "reference"],
              isBookmarked: true,
              license: "Creative Commons",
            },
          ],
        };

        setCommunityData(mockData);
      } catch (error) {
        console.error("Failed to load community data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCommunityData();
  }, []);

  return { communityData, loading, setCommunityData };
};

// Post Component
const PostCard = ({
  post,
  onLike,
  onBookmark,
  onShare,
  onComment,
  onSpeak,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - postTime) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    } else {
      return "Just now";
    }
  };

  const getPostTypeIcon = (type) => {
    const icons = {
      announcement: Bell,
      tips: Info,
      event: Calendar,
      question: HelpCircle,
      discussion: MessageSquare,
    };
    return icons[type] || MessageSquare;
  };

  const getPostTypeColor = (type) => {
    const colors = {
      announcement: "#e74c3c",
      tips: "#3498db",
      event: "#9b59b6",
      question: "#f39c12",
      discussion: "#27ae60",
    };
    return colors[type] || "#95a5a6";
  };

  const TypeIcon = getPostTypeIcon(post.type);

  const handleSpeakPost = useCallback(() => {
    const postText = `
      Post by ${post.author.name}, ${post.author.title}.
      Posted ${formatTimestamp(post.timestamp)}.
      Title: ${post.title}.
      Content: ${post.content}.
      ${post.likes} likes, ${post.comments} comments, ${post.shares} shares.
    `;
    onSpeak(postText);
  }, [post, onSpeak]);

  return (
    <motion.article
      className={`post-card ${post.type}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      role="article"
      aria-labelledby={`post-title-${post.id}`}
    >
      <div className="post-header">
        <div className="author-info">
          <img
            src={post.author.avatar}
            alt=""
            className="author-avatar"
            aria-hidden="true"
          />
          <div className="author-details">
            <div className="author-name">
              <span>{post.author.name}</span>
              {post.author.verified && (
                <Check
                  size={14}
                  className="verified-badge"
                  aria-label="Verified user"
                />
              )}
            </div>
            <div className="author-title">{post.author.title}</div>
            <time
              className="post-timestamp"
              dateTime={post.timestamp}
              title={new Date(post.timestamp).toLocaleString()}
            >
              {formatTimestamp(post.timestamp)}
            </time>
          </div>
        </div>

        <div className="post-meta">
          <div
            className="post-type"
            style={{ color: getPostTypeColor(post.type) }}
            title={`Post type: ${post.type}`}
          >
            <TypeIcon size={16} />
            <span className="sr-only">{post.type} post</span>
          </div>

          <div className="post-actions-menu">
            <button
              className="post-menu-btn"
              aria-label="Post options"
              aria-haspopup="true"
            >
              <MoreHorizontal size={16} />
            </button>

            <button
              className="post-speak-btn"
              onClick={handleSpeakPost}
              aria-label="Read post aloud"
              title="Read post aloud"
            >
              <Volume2 size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="post-content">
        <h2 id={`post-title-${post.id}`} className="post-title">
          {post.title}
        </h2>

        <div className="post-body">
          <p>{post.content}</p>
        </div>

        {post.attachments && post.attachments.length > 0 && (
          <div className="post-attachments">
            <h3 className="attachments-title">Attachments:</h3>
            <div className="attachments-list">
              {post.attachments.map((attachment) => (
                <div key={attachment.id} className="attachment-item">
                  <div className="attachment-icon">
                    {attachment.type === "document" && <FileText size={16} />}
                    {attachment.type === "image" && <Image size={16} />}
                    {attachment.type === "video" && <Video size={16} />}
                    {attachment.type === "audio" && <Music size={16} />}
                  </div>
                  <div className="attachment-details">
                    <span className="attachment-name">{attachment.name}</span>
                    <span className="attachment-size">{attachment.size}</span>
                    {attachment.altText && (
                      <span
                        className="attachment-alt"
                        title="Alt text provided"
                      >
                        <Accessibility size={12} />
                        Has description
                      </span>
                    )}
                  </div>
                  <button
                    className="attachment-download"
                    aria-label={`Download ${attachment.name}`}
                  >
                    <Download size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="post-tags">
            {post.tags.map((tag) => (
              <button
                key={tag}
                className="post-tag"
                onClick={() => {
                  /* Handle tag click */
                }}
                aria-label={`View posts tagged with ${tag}`}
              >
                <Tag size={12} />
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="post-engagement">
        <div className="engagement-stats">
          <span className="stat-item">
            <Eye size={14} />
            {post.engagement.views} views
          </span>
          <span className="stat-item">
            <Clock size={14} />
            {post.engagement.avgReadTime}s avg read
          </span>
        </div>

        <div className="engagement-actions">
          <button
            className={`engagement-btn ${post.isLiked ? "active" : ""}`}
            onClick={() => onLike(post.id, !post.isLiked)}
            aria-pressed={post.isLiked}
            aria-label={`${post.isLiked ? "Unlike" : "Like"} this post. ${
              post.likes
            } likes`}
          >
            <Heart size={16} fill={post.isLiked ? "currentColor" : "none"} />
            <span>{post.likes}</span>
          </button>

          <button
            className="engagement-btn"
            onClick={() => setShowComments(!showComments)}
            aria-expanded={showComments}
            aria-label={`${showComments ? "Hide" : "Show"} comments. ${
              post.comments
            } comments`}
          >
            <MessageSquare size={16} />
            <span>{post.comments}</span>
          </button>

          <button
            className="engagement-btn"
            onClick={() => onShare(post.id)}
            aria-label={`Share this post. ${post.shares} shares`}
          >
            <Share2 size={16} />
            <span>{post.shares}</span>
          </button>

          <button
            className={`engagement-btn ${post.isBookmarked ? "active" : ""}`}
            onClick={() => onBookmark(post.id, !post.isBookmarked)}
            aria-pressed={post.isBookmarked}
            aria-label={`${
              post.isBookmarked ? "Remove bookmark" : "Bookmark"
            } this post. ${post.bookmarks} bookmarks`}
          >
            <Bookmark
              size={16}
              fill={post.isBookmarked ? "currentColor" : "none"}
            />
            <span>{post.bookmarks}</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            className="comments-section"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            role="region"
            aria-label="Comments"
          >
            <div className="comment-composer">
              <div className="composer-input">
                <label htmlFor={`comment-${post.id}`} className="sr-only">
                  Add a comment
                </label>
                <textarea
                  id={`comment-${post.id}`}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a thoughtful comment..."
                  className="comment-input"
                  rows={2}
                />
                <button
                  className="comment-submit"
                  onClick={() => {
                    if (newComment.trim()) {
                      onComment(post.id, newComment);
                      setNewComment("");
                    }
                  }}
                  disabled={!newComment.trim()}
                  aria-label="Post comment"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>

            <div className="comments-list" role="list">
              <div className="comment-placeholder">
                <MessageSquare size={24} />
                <p>Comments will appear here. Be the first to comment!</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Event Details for Event Posts */}
      {post.type === "event" && post.eventDetails && (
        <div className="event-details">
          <h3>Event Details</h3>
          <div className="event-info">
            <div className="event-info-item">
              <Calendar size={16} />
              <span>
                {new Date(post.eventDetails.date).toLocaleDateString()}
              </span>
            </div>
            <div className="event-info-item">
              <MapPin size={16} />
              <span>{post.eventDetails.location}</span>
            </div>
            <div className="event-info-item">
              <Users size={16} />
              <span>
                {post.eventDetails.registered} / {post.eventDetails.capacity}{" "}
                registered
              </span>
            </div>
            <div className="event-info-item">
              <Tag size={16} />
              <span>{post.eventDetails.cost}</span>
            </div>
          </div>
        </div>
      )}
    </motion.article>
  );
};

// Group Card Component
const GroupCard = ({ group, onJoin, onLeave, onSpeak }) => {
  const handleSpeakGroup = useCallback(() => {
    const groupText = `
      Group: ${group.name}.
      ${group.description}
      ${group.members.toLocaleString()} members.
      Category: ${group.category.replace("-", " ")}.
      ${group.isMember ? "You are a member." : "You are not a member yet."}
    `;
    onSpeak(groupText);
  }, [group, onSpeak]);

  return (
    <motion.div
      className={`group-card ${group.isMember ? "member" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="group-header">
        <img
          src={group.image}
          alt=""
          className="group-image"
          aria-hidden="true"
        />
        <div className="group-overlay">
          {group.isMember && (
            <div className="member-badge">
              <Check size={16} />
              <span>Member</span>
            </div>
          )}
        </div>
      </div>

      <div className="group-content">
        <div className="group-title-section">
          <h3 className="group-name">{group.name}</h3>
          <button
            className="group-speak-btn"
            onClick={handleSpeakGroup}
            aria-label={`Read ${group.name} details aloud`}
          >
            <Volume2 size={16} />
          </button>
        </div>

        <p className="group-description">{group.description}</p>

        <div className="group-stats">
          <div className="stat-item">
            <Users size={14} />
            <span>{group.members.toLocaleString()} members</span>
          </div>
          <div className="stat-item">
            <MessageSquare size={14} />
            <span>{group.stats.weeklyPosts} posts/week</span>
          </div>
          <div className="stat-item">
            <Activity size={14} />
            <span>{group.stats.activeMembers} active</span>
          </div>
        </div>

        <div className="group-tags">
          {group.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="group-tag">
              {tag}
            </span>
          ))}
          {group.tags.length > 3 && (
            <span className="group-tag more">
              +{group.tags.length - 3} more
            </span>
          )}
        </div>

        <div className="group-footer">
          <div className="group-meta">
            <span className="group-category">
              {group.category.replace("-", " ")}
            </span>
            <span className="group-privacy">{group.privacy}</span>
          </div>

          <div className="group-actions">
            {group.isMember ? (
              <div className="member-actions">
                <button
                  className="group-btn secondary"
                  onClick={() => onLeave(group.id)}
                  aria-label={`Leave ${group.name} group`}
                >
                  <X size={16} />
                  Leave
                </button>
                {group.notifications && (
                  <button
                    className="group-btn notification-btn active"
                    aria-label="Notifications enabled"
                    title="You'll receive notifications from this group"
                  >
                    <Bell size={16} />
                  </button>
                )}
              </div>
            ) : (
              <button
                className="group-btn primary"
                onClick={() => onJoin(group.id)}
                aria-label={`Join ${group.name} group`}
              >
                <Plus size={16} />
                Join Group
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Community Component
const Community = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("feed");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [announcement, setAnnouncement] = useState("");
  const [showCreatePost, setShowCreatePost] = useState(false);

  // Hooks
  const { communityData, loading } = useCommunityData();

  // Refs
  const searchInputRef = useRef(null);

  // Tabs configuration
  const tabs = useMemo(
    () => [
      { id: "feed", label: "Feed", icon: MessageSquare, color: "blue" },
      { id: "groups", label: "Groups", icon: Users, color: "green" },
      { id: "events", label: "Events", icon: Calendar, color: "purple" },
      { id: "members", label: "Members", icon: User, color: "orange" },
      { id: "resources", label: "Resources", icon: Archive, color: "cyan" },
    ],
    []
  );

  // Announcement function
  const announce = useCallback((message) => {
    setAnnouncement(message);
    setTimeout(() => setAnnouncement(""), 5000);
  }, []);

  // Handle post interactions
  const handleLikePost = useCallback(
    (postId, liked) => {
      announce(liked ? "Post liked" : "Like removed");
      // In real app, make API call
    },
    [announce]
  );

  const handleBookmarkPost = useCallback(
    (postId, bookmarked) => {
      announce(bookmarked ? "Post bookmarked" : "Bookmark removed");
      // In real app, make API call
    },
    [announce]
  );

  const handleSharePost = useCallback(
    (postId) => {
      // In real app, open share dialog
      announce("Post shared");
    },
    [announce]
  );

  const handleCommentPost = useCallback(
    (postId, comment) => {
      announce("Comment posted");
      // In real app, make API call
    },
    [announce]
  );

  const handleJoinGroup = useCallback(
    (groupId) => {
      announce("Successfully joined group");
      // In real app, make API call
    },
    [announce]
  );

  const handleLeaveGroup = useCallback(
    (groupId) => {
      announce("Left group");
      // In real app, make API call
    },
    [announce]
  );

  // Filter posts
  const filteredPosts = useMemo(() => {
    let filtered = communityData.posts;

    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    if (filterType !== "all") {
      filtered = filtered.filter((post) => post.type === filterType);
    }

    return filtered;
  }, [communityData.posts, searchQuery, filterType]);

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
        } else if (e.key === "n") {
          e.preventDefault();
          setShowCreatePost(true);
        } else if (e.key === "h") {
          e.preventDefault();
          announceHelp();
        }
      } else if (e.key === "Escape" && showCreatePost) {
        setShowCreatePost(false);
      }
    };

    const announceHelp = () => {
      const helpText = `
        Community shortcuts:
        Alt+1-5 to switch between sections,
        Alt+S to search,
        Alt+N to create new post,
        Alt+H for help,
        Tab to navigate between elements.
      `;
      announce(helpText);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [tabs, announce, showCreatePost]);

  if (loading) {
    return (
      <div className="community-loading" role="status" aria-live="polite">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="loading-spinner"
        >
          <Users size={48} />
        </motion.div>
        <p>Loading community content...</p>
      </div>
    );
  }

  return (
    <div className="community-container">
      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* Skip navigation */}
      <a href="#community-content" className="skip-link">
        Skip to community content
      </a>

      {/* Header */}
      <header className="community-header" role="banner">
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
            <h1 className="page-title">Community</h1>
          </div>

          <div className="header-center">
            <div className="search-container">
              <Search className="search-icon" size={16} />
              <input
                ref={searchInputRef}
                type="search"
                placeholder="Search posts, groups, people..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                aria-label="Search community content"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select"
              aria-label="Filter content type"
            >
              <option value="all">All Posts</option>
              <option value="announcement">Announcements</option>
              <option value="tips">Tips & Advice</option>
              <option value="event">Events</option>
              <option value="question">Questions</option>
              <option value="discussion">Discussions</option>
            </select>
          </div>

          <div className="header-right">
            <button
              className="create-post-btn"
              onClick={() => setShowCreatePost(true)}
              aria-label="Create new post"
              title="Alt+N"
            >
              <Plus size={16} />
              <span>New Post</span>
            </button>

            <div className="community-stats">
              <div className="stat-item">
                <Users size={16} />
                <span>{communityData.members.length}+ members</span>
              </div>
              <div className="stat-item">
                <MessageSquare size={16} />
                <span>{communityData.posts.length} posts</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="community-main">
        {/* Navigation tabs */}
        <nav
          className="community-nav"
          role="navigation"
          aria-label="Community sections"
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
          id="community-content"
          className="community-content"
          role="main"
          aria-label="Community content"
        >
          <AnimatePresence mode="wait">
            {activeTab === "feed" && (
              <motion.div
                key="feed"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                role="tabpanel"
                id="feed-panel"
                aria-labelledby="feed-tab"
                className="feed-panel"
              >
                <div className="posts-feed">
                  {filteredPosts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onLike={handleLikePost}
                      onBookmark={handleBookmarkPost}
                      onShare={handleSharePost}
                      onComment={handleCommentPost}
                      onSpeak={announce}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "groups" && (
              <motion.div
                key="groups"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                role="tabpanel"
                id="groups-panel"
                aria-labelledby="groups-tab"
                className="groups-panel"
              >
                <div className="groups-grid">
                  {communityData.groups.map((group) => (
                    <GroupCard
                      key={group.id}
                      group={group}
                      onJoin={handleJoinGroup}
                      onLeave={handleLeaveGroup}
                      onSpeak={announce}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Other tabs would be implemented similarly */}
          </AnimatePresence>
        </div>
      </main>

      {/* Help panel */}
      <div className="help-panel-community" role="complementary">
        <details>
          <summary>Community Help</summary>
          <div className="help-content">
            <h3>Navigation</h3>
            <ul>
              <li>
                <kbd>Alt</kbd> + <kbd>1-5</kbd> - Switch between tabs
              </li>
              <li>
                <kbd>Alt</kbd> + <kbd>S</kbd> - Search community
              </li>
              <li>
                <kbd>Alt</kbd> + <kbd>N</kbd> - Create new post
              </li>
              <li>
                <kbd>Alt</kbd> + <kbd>H</kbd> - Help
              </li>
            </ul>

            <h3>Community Guidelines</h3>
            <ul>
              <li>Be respectful and inclusive</li>
              <li>Share knowledge and experiences</li>
              <li>Help others learn and grow</li>
              <li>Report inappropriate content</li>
            </ul>
          </div>
        </details>
      </div>
    </div>
  );
};

export default Community;
