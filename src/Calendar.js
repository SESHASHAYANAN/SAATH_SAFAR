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
  Calendar,
  Clock,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Settings,
  Bell,
  Globe,
  MapPin,
  Users,
  User,
  Video,
  Phone,
  Mail,
  Link2,
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
  Eye,
  EyeOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Accessibility,
  Heart,
  Star,
  Download,
  Upload,
  Copy,
  ExternalLink,
  Share2,
  Bookmark,
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
  Image,
  Video as VideoIcon,
  Music,
  Paperclip,
  Monitor,
  Smartphone,
  Tablet,
  Watch,
  Headphones,
  Speaker,
  Target,
  Award,
  TrendingUp,
  BarChart3,
  Activity,
  Zap,
  Brain,
  Shield,
  Database,
  CloudDownload,
  CloudUpload,
  Repeat,
  RotateCcw,
} from "lucide-react";
import "./Calendar.css";

// Custom hooks for calendar data
const useCalendarData = () => {
  const [calendarData, setCalendarData] = useState({
    events: [],
    reminders: [],
    appointments: [],
    preferences: {},
    notifications: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCalendarData = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Mock calendar data
        const mockData = {
          events: [
            {
              id: "event_1",
              title: "Ophthalmology Appointment",
              description: "Lucentis injection and vision examination",
              startTime: new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000
              ).toISOString(),
              endTime: new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000
              ).toISOString(),
              type: "medical",
              location: "Eye Care Center, Suite 400",
              address: "123 Medical Plaza, Suite 400",
              attendees: [
                {
                  name: "Dr. Sarah Johnson",
                  email: "dr.johnson@eyecare.com",
                  role: "organizer",
                },
              ],
              reminders: [
                { time: 24 * 60, method: "email" },
                { time: 2 * 60, method: "notification" },
              ],
              recurrence: null,
              status: "confirmed",
              priority: "high",
              accessibility: {
                transportation: "arranged",
                parking: "accessible",
                signLanguage: false,
                assistiveListening: true,
                materials: "large_print",
              },
              preparation: [
                "Bring insurance cards",
                "List of current medications",
                "Wear comfortable clothes",
              ],
              cost: {
                amount: 25.0,
                currency: "USD",
                covered: true,
                copay: true,
              },
              contact: {
                phone: "(555) 123-4567",
                email: "appointments@eyecare.com",
              },
              notes: "Monthly Lucentis injection. Arrive 15 minutes early.",
              attachments: [],
            },
            {
              id: "event_2",
              title: "Physical Therapy Session",
              description: "Hand and wrist mobility exercises",
              startTime: new Date(
                Date.now() + 3 * 24 * 60 * 60 * 1000
              ).toISOString(),
              endTime: new Date(
                Date.now() + 3 * 24 * 60 * 60 * 1000 + 45 * 60 * 1000
              ).toISOString(),
              type: "medical",
              location: "Rehab Center",
              address: "456 Wellness Drive",
              attendees: [
                {
                  name: "Mike Thompson, PT",
                  email: "mike@rehabcenter.com",
                  role: "therapist",
                },
              ],
              reminders: [{ time: 4 * 60, method: "notification" }],
              recurrence: {
                frequency: "weekly",
                interval: 1,
                daysOfWeek: ["Tuesday"],
                endDate: new Date(
                  Date.now() + 90 * 24 * 60 * 60 * 1000
                ).toISOString(),
              },
              status: "confirmed",
              priority: "medium",
              accessibility: {
                transportation: "family",
                parking: "accessible",
                signLanguage: false,
                assistiveListening: false,
                materials: "standard",
              },
              preparation: [
                "Wear comfortable workout clothes",
                "Bring exercise log",
                "Bring water bottle",
              ],
              cost: {
                amount: 40.0,
                currency: "USD",
                covered: true,
                copay: true,
              },
              contact: {
                phone: "(555) 987-6543",
                email: "therapy@rehabcenter.com",
              },
              notes:
                "Working on grip strength and flexibility. Bring exercise band.",
              attachments: [],
            },
            {
              id: "event_3",
              title: "Global Accessibility Awareness Day",
              description:
                "Virtual conference on digital accessibility and inclusion",
              startTime: new Date(
                Date.now() + 21 * 24 * 60 * 60 * 1000
              ).toISOString(),
              endTime: new Date(
                Date.now() + 21 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000
              ).toISOString(),
              type: "conference",
              location: "Online Event",
              address: "Virtual - Zoom Platform",
              attendees: [],
              reminders: [
                { time: 24 * 60, method: "email" },
                { time: 60, method: "notification" },
              ],
              recurrence: {
                frequency: "yearly",
                interval: 1,
                endDate: null,
              },
              status: "registered",
              priority: "medium",
              accessibility: {
                transportation: "none_needed",
                parking: "none_needed",
                signLanguage: true,
                assistiveListening: true,
                materials: "digital",
                captions: true,
                audioDescription: true,
              },
              preparation: [
                "Test Zoom connection",
                "Download conference materials",
                "Prepare questions for Q&A",
              ],
              cost: {
                amount: 0,
                currency: "USD",
                covered: false,
                copay: false,
              },
              contact: {
                phone: "(800) GAAD-2024",
                email: "info@gaad.org",
              },
              notes:
                "Free virtual event. Multiple accessibility features available.",
              attachments: [
                {
                  id: "attach_1",
                  name: "conference_agenda.pdf",
                  size: "2.1MB",
                  type: "document",
                },
              ],
            },
            {
              id: "event_4",
              title: "Medication Reminder: Lucentis",
              description: "Monthly Lucentis injection due",
              startTime: new Date(
                Date.now() + 24 * 60 * 60 * 1000
              ).toISOString(),
              endTime: new Date(
                Date.now() + 24 * 60 * 60 * 1000 + 15 * 60 * 1000
              ).toISOString(),
              type: "medication",
              location: "Personal Reminder",
              address: null,
              attendees: [],
              reminders: [
                { time: 60, method: "notification" },
                { time: 30, method: "alarm" },
              ],
              recurrence: {
                frequency: "monthly",
                interval: 1,
                endDate: null,
              },
              status: "active",
              priority: "high",
              accessibility: null,
              preparation: [
                "Call doctor to schedule injection",
                "Check insurance coverage",
                "Arrange transportation",
              ],
              cost: null,
              contact: {
                phone: "(555) 123-4567",
                email: "dr.johnson@eyecare.com",
              },
              notes: "Schedule appointment 1-2 weeks in advance.",
              attachments: [],
            },
            {
              id: "event_5",
              title: "Weekly Check-in Call with Family",
              description: "Regular family video call",
              startTime: new Date(
                Date.now() + 2 * 24 * 60 * 60 * 1000
              ).toISOString(),
              endTime: new Date(
                Date.now() + 2 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000
              ).toISOString(),
              type: "personal",
              location: "Video Call - Zoom",
              address: null,
              attendees: [
                {
                  name: "Jane Doe",
                  email: "jane@example.com",
                  role: "family",
                },
                {
                  name: "Tom Doe",
                  email: "tom@example.com",
                  role: "family",
                },
              ],
              reminders: [{ time: 15, method: "notification" }],
              recurrence: {
                frequency: "weekly",
                interval: 1,
                daysOfWeek: ["Sunday"],
                endDate: null,
              },
              status: "confirmed",
              priority: "low",
              accessibility: {
                transportation: "none_needed",
                parking: "none_needed",
                signLanguage: false,
                assistiveListening: false,
                materials: "none",
                captions: true,
              },
              preparation: ["Test video connection", "Prepare family updates"],
              cost: null,
              contact: null,
              notes: "Regular family time. Sometimes includes extended family.",
              attachments: [],
            },
          ],
          preferences: {
            defaultView: "month",
            timeFormat: "12h",
            weekStart: "sunday",
            workingHours: {
              start: "09:00",
              end: "17:00",
            },
            notifications: {
              email: true,
              browser: true,
              sound: true,
              vibration: true,
            },
            accessibility: {
              highContrast: false,
              largeText: false,
              screenReader: true,
              keyboardNavigation: true,
              reducedMotion: false,
            },
            privacy: {
              shareAvailability: false,
              publicProfile: false,
            },
            integration: {
              googleCalendar: false,
              outlookCalendar: false,
              appleCalendar: false,
            },
          },
          notifications: [
            {
              id: "notif_1",
              eventId: "event_4",
              title: "Medication Reminder",
              message: "Lucentis injection appointment needed",
              type: "medication",
              scheduledTime: new Date(
                Date.now() + 24 * 60 * 60 * 1000
              ).toISOString(),
              status: "pending",
              methods: ["notification", "email"],
              priority: "high",
            },
          ],
        };

        setCalendarData(mockData);
      } catch (error) {
        console.error("Failed to load calendar data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCalendarData();
  }, []);

  return { calendarData, loading, setCalendarData };
};

// Calendar View Component
const CalendarView = ({
  events,
  currentDate,
  onDateChange,
  onEventClick,
  view = "month",
}) => {
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getEventsForDate = (date) => {
    if (!date) return [];

    return events.filter((event) => {
      const eventDate = new Date(event.startTime);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const getEventTypeColor = (type) => {
    const colors = {
      medical: "#e74c3c",
      medication: "#f39c12",
      conference: "#9b59b6",
      personal: "#27ae60",
      work: "#3498db",
      other: "#95a5a6",
    };
    return colors[type] || colors.other;
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const days = getDaysInMonth(selectedDate);

  const goToPreviousMonth = () => {
    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() - 1,
      1
    );
    setSelectedDate(newDate);
    onDateChange(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      1
    );
    setSelectedDate(newDate);
    onDateChange(newDate);
  };

  const goToToday = () => {
    const today = new Date();
    setSelectedDate(today);
    onDateChange(today);
  };

  return (
    <div className="calendar-view" role="grid" aria-label="Calendar">
      <div className="calendar-header">
        <div className="calendar-navigation">
          <button
            className="nav-btn"
            onClick={goToPreviousMonth}
            aria-label="Previous month"
          >
            <ChevronLeft size={20} />
          </button>

          <h2 className="calendar-title">
            {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          </h2>

          <button
            className="nav-btn"
            onClick={goToNextMonth}
            aria-label="Next month"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <button
          className="today-btn"
          onClick={goToToday}
          aria-label="Go to today"
        >
          Today
        </button>
      </div>

      <div className="calendar-grid">
        {/* Day headers */}
        <div className="calendar-row calendar-header-row" role="row">
          {dayNames.map((dayName) => (
            <div
              key={dayName}
              className="calendar-cell calendar-day-header"
              role="columnheader"
            >
              <span className="day-name-full">{dayName}</span>
              <span className="day-name-short">{dayName.substr(0, 1)}</span>
            </div>
          ))}
        </div>

        {/* Calendar days */}
        {Array.from({ length: Math.ceil(days.length / 7) }).map(
          (_, weekIndex) => (
            <div key={weekIndex} className="calendar-row" role="row">
              {days
                .slice(weekIndex * 7, (weekIndex + 1) * 7)
                .map((date, dayIndex) => {
                  const dayEvents = date ? getEventsForDate(date) : [];
                  const isToday =
                    date &&
                    date.getDate() === new Date().getDate() &&
                    date.getMonth() === new Date().getMonth() &&
                    date.getFullYear() === new Date().getFullYear();
                  const isCurrentMonth =
                    date && date.getMonth() === selectedDate.getMonth();

                  return (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`calendar-cell calendar-day ${
                        date ? "" : "empty"
                      } ${isToday ? "today" : ""} ${
                        isCurrentMonth ? "current-month" : "other-month"
                      }`}
                      role="gridcell"
                      tabIndex={date ? 0 : -1}
                      aria-label={
                        date
                          ? `${date.getDate()} ${
                              monthNames[date.getMonth()]
                            } ${date.getFullYear()}, ${dayEvents.length} events`
                          : "Empty cell"
                      }
                      onClick={() => date && onDateChange(date)}
                      onKeyDown={(e) => {
                        if ((e.key === "Enter" || e.key === " ") && date) {
                          e.preventDefault();
                          onDateChange(date);
                        }
                      }}
                    >
                      {date && (
                        <>
                          <div className="day-number">{date.getDate()}</div>

                          {dayEvents.length > 0 && (
                            <div className="day-events">
                              {dayEvents.slice(0, 3).map((event) => (
                                <div
                                  key={event.id}
                                  className="day-event"
                                  style={{
                                    backgroundColor: getEventTypeColor(
                                      event.type
                                    ),
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onEventClick(event);
                                  }}
                                  title={event.title}
                                >
                                  <span className="event-title">
                                    {event.title}
                                  </span>
                                  <span className="event-time">
                                    {new Date(
                                      event.startTime
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </span>
                                </div>
                              ))}

                              {dayEvents.length > 3 && (
                                <div className="day-event more-events">
                                  +{dayEvents.length - 3} more
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
            </div>
          )
        )}
      </div>
    </div>
  );
};

// Event Details Modal Component
const EventDetailsModal = ({
  event,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onSpeak,
}) => {
  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatDuration = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationMs = end - start;
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getEventTypeIcon = (type) => {
    const icons = {
      medical: Heart,
      medication: Clock,
      conference: Users,
      personal: User,
      work: Monitor,
      other: Calendar,
    };
    return icons[type] || icons.other;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: "#e74c3c",
      medium: "#f39c12",
      low: "#27ae60",
    };
    return colors[priority] || colors.low;
  };

  const handleSpeakEvent = useCallback(() => {
    if (!event) return;

    const eventText = `
      Event: ${event.title}.
      ${event.description}
      Date and time: ${formatDateTime(event.startTime)} to ${formatDateTime(
      event.endTime
    )}.
      Duration: ${formatDuration(event.startTime, event.endTime)}.
      Location: ${event.location || "No location specified"}.
      Type: ${event.type}.
      Priority: ${event.priority}.
      Status: ${event.status}.
      ${event.notes ? `Notes: ${event.notes}` : ""}
    `;
    onSpeak(eventText);
  }, [event, onSpeak]);

  if (!isOpen || !event) return null;

  const TypeIcon = getEventTypeIcon(event.type);

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="event-details-modal"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-labelledby="event-title"
          aria-describedby="event-description"
        >
          <div className="modal-header">
            <div className="event-title-section">
              <div
                className="event-type-icon"
                style={{ color: getPriorityColor(event.priority) }}
              >
                <TypeIcon size={24} />
              </div>
              <div>
                <h2 id="event-title">{event.title}</h2>
                <div className="event-meta">
                  <span className={`event-type ${event.type}`}>
                    {event.type}
                  </span>
                  <span className={`event-priority ${event.priority}`}>
                    {event.priority} priority
                  </span>
                  <span className={`event-status ${event.status}`}>
                    {event.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="modal-action-btn"
                onClick={handleSpeakEvent}
                aria-label="Read event details aloud"
              >
                <Volume2 size={16} />
              </button>
              <button
                className="modal-action-btn"
                onClick={() => onEdit(event)}
                aria-label="Edit event"
              >
                <Edit3 size={16} />
              </button>
              <button
                className="modal-close"
                onClick={onClose}
                aria-label="Close event details"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="modal-content">
            <div id="event-description" className="event-description">
              {event.description}
            </div>

            <div className="event-details-grid">
              <div className="detail-section">
                <h3>Date & Time</h3>
                <div className="detail-items">
                  <div className="detail-item">
                    <Calendar size={16} />
                    <div>
                      <span className="detail-label">Start:</span>
                      <span className="detail-value">
                        {formatDateTime(event.startTime)}
                      </span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <Clock size={16} />
                    <div>
                      <span className="detail-label">End:</span>
                      <span className="detail-value">
                        {formatDateTime(event.endTime)}
                      </span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <Timer size={16} />
                    <div>
                      <span className="detail-label">Duration:</span>
                      <span className="detail-value">
                        {formatDuration(event.startTime, event.endTime)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {event.location && (
                <div className="detail-section">
                  <h3>Location</h3>
                  <div className="detail-items">
                    <div className="detail-item">
                      <MapPin size={16} />
                      <div>
                        <span className="detail-value">{event.location}</span>
                        {event.address && (
                          <span className="detail-address">
                            {event.address}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {event.attendees && event.attendees.length > 0 && (
                <div className="detail-section">
                  <h3>Attendees</h3>
                  <div className="attendees-list">
                    {event.attendees.map((attendee, index) => (
                      <div key={index} className="attendee-item">
                        <User size={16} />
                        <div>
                          <span className="attendee-name">{attendee.name}</span>
                          <span className="attendee-role">{attendee.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {event.reminders && event.reminders.length > 0 && (
                <div className="detail-section">
                  <h3>Reminders</h3>
                  <div className="reminders-list">
                    {event.reminders.map((reminder, index) => (
                      <div key={index} className="reminder-item">
                        <Bell size={16} />
                        <div>
                          <span className="reminder-time">
                            {reminder.time >= 60
                              ? `${Math.floor(reminder.time / 60)} hour${
                                  Math.floor(reminder.time / 60) > 1 ? "s" : ""
                                }`
                              : `${reminder.time} minute${
                                  reminder.time > 1 ? "s" : ""
                                }`}{" "}
                            before
                          </span>
                          <span className="reminder-method">
                            via {reminder.method}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {event.accessibility && (
                <div className="detail-section">
                  <h3>Accessibility Information</h3>
                  <div className="accessibility-info">
                    {event.accessibility.transportation && (
                      <div className="accessibility-item">
                        <span className="accessibility-label">
                          Transportation:
                        </span>
                        <span className="accessibility-value">
                          {event.accessibility.transportation}
                        </span>
                      </div>
                    )}
                    {event.accessibility.parking && (
                      <div className="accessibility-item">
                        <span className="accessibility-label">Parking:</span>
                        <span className="accessibility-value">
                          {event.accessibility.parking}
                        </span>
                      </div>
                    )}
                    {event.accessibility.signLanguage && (
                      <div className="accessibility-item">
                        <Check size={16} className="accessibility-check" />
                        <span>Sign language interpretation available</span>
                      </div>
                    )}
                    {event.accessibility.assistiveListening && (
                      <div className="accessibility-item">
                        <Check size={16} className="accessibility-check" />
                        <span>Assistive listening devices available</span>
                      </div>
                    )}
                    {event.accessibility.captions && (
                      <div className="accessibility-item">
                        <Check size={16} className="accessibility-check" />
                        <span>Closed captions provided</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {event.preparation && event.preparation.length > 0 && (
                <div className="detail-section">
                  <h3>Preparation</h3>
                  <ul className="preparation-list">
                    {event.preparation.map((item, index) => (
                      <li key={index} className="preparation-item">
                        <Check size={14} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {event.cost && (
                <div className="detail-section">
                  <h3>Cost Information</h3>
                  <div className="cost-info">
                    <div className="cost-amount">
                      ${event.cost.amount.toFixed(2)} {event.cost.currency}
                    </div>
                    {event.cost.covered && (
                      <div className="cost-coverage">
                        <Check size={16} className="coverage-check" />
                        Insurance coverage available
                      </div>
                    )}
                    {event.cost.copay && (
                      <div className="cost-note">Copay required</div>
                    )}
                  </div>
                </div>
              )}

              {event.contact && (
                <div className="detail-section">
                  <h3>Contact Information</h3>
                  <div className="contact-info">
                    {event.contact.phone && (
                      <div className="contact-item">
                        <Phone size={16} />
                        <a href={`tel:${event.contact.phone}`}>
                          {event.contact.phone}
                        </a>
                      </div>
                    )}
                    {event.contact.email && (
                      <div className="contact-item">
                        <Mail size={16} />
                        <a href={`mailto:${event.contact.email}`}>
                          {event.contact.email}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {event.notes && (
                <div className="detail-section">
                  <h3>Notes</h3>
                  <div className="event-notes">{event.notes}</div>
                </div>
              )}

              {event.attachments && event.attachments.length > 0 && (
                <div className="detail-section">
                  <h3>Attachments</h3>
                  <div className="attachments-list">
                    {event.attachments.map((attachment) => (
                      <div key={attachment.id} className="attachment-item">
                        <File size={16} />
                        <div className="attachment-details">
                          <span className="attachment-name">
                            {attachment.name}
                          </span>
                          <span className="attachment-size">
                            {attachment.size}
                          </span>
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
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn-secondary" onClick={() => onEdit(event)}>
              <Edit3 size={16} />
              Edit Event
            </button>
            <button className="btn-danger" onClick={() => onDelete(event.id)}>
              <Trash2 size={16} />
              Delete Event
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Calendars = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [calendarView, setCalendarView] = useState("month");
  const [announcement, setAnnouncement] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Hooks
  const { calendarData, loading } = useCalendarData();

  // Refs
  const searchInputRef = useRef(null);

  // Announcement function
  const announce = useCallback((message) => {
    setAnnouncement(message);
    setTimeout(() => setAnnouncement(""), 5000);
  }, []);

  // Handle event selection
  const handleEventClick = useCallback(
    (event) => {
      setSelectedEvent(event);
      setShowEventDetails(true);
      announce(`Selected event: ${event.title}`);
    },
    [announce]
  );

  // Handle date change
  const handleDateChange = useCallback(
    (date) => {
      setCurrentDate(date);
      const eventsOnDate = calendarData.events.filter((event) => {
        const eventDate = new Date(event.startTime);
        return (
          eventDate.getDate() === date.getDate() &&
          eventDate.getMonth() === date.getMonth() &&
          eventDate.getFullYear() === date.getFullYear()
        );
      });

      if (eventsOnDate.length > 0) {
        announce(
          `${eventsOnDate.length} event${
            eventsOnDate.length > 1 ? "s" : ""
          } on ${date.toLocaleDateString()}`
        );
      } else {
        announce(`No events on ${date.toLocaleDateString()}`);
      }
    },
    [calendarData.events, announce]
  );

  // Filter events
  const filteredEvents = useMemo(() => {
    let filtered = calendarData.events;

    if (searchQuery) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterType !== "all") {
      filtered = filtered.filter((event) => event.type === filterType);
    }

    return filtered;
  }, [calendarData.events, searchQuery, filterType]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey) {
        switch (e.key) {
          case "n":
            e.preventDefault();
            setShowCreateEvent(true);
            break;
          case "s":
            e.preventDefault();
            searchInputRef.current?.focus();
            break;
          case "t":
            e.preventDefault();
            setCurrentDate(new Date());
            announce("Navigated to today");
            break;
          case "h":
            e.preventDefault();
            announceHelp();
            break;
        }
      } else if (e.key === "Escape") {
        if (showEventDetails) {
          setShowEventDetails(false);
          setSelectedEvent(null);
        } else if (showCreateEvent) {
          setShowCreateEvent(false);
        }
      }
    };

    const announceHelp = () => {
      const helpText = `
        Calendar shortcuts:
        Alt+N to create new event,
        Alt+S to search events,
        Alt+T to go to today,
        Alt+H for help,
        Arrow keys to navigate calendar,
        Enter to select date,
        Escape to close dialogs.
      `;
      announce(helpText);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showEventDetails, showCreateEvent, announce]);

  if (loading) {
    return (
      <div className="calendar-loading" role="status" aria-live="polite">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="loading-spinner"
        >
          <Calendar size={48} />
        </motion.div>
        <p>Loading your calendar...</p>
      </div>
    );
  }

  return (
    <div className="calendar-container">
      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* Skip navigation */}
      <a href="#calendar-content" className="skip-link">
        Skip to calendar content
      </a>

      {/* Header */}
      <header className="calendar-header" role="banner">
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
            <h1 className="page-title">Calendar & Events</h1>
          </div>

          <div className="header-center">
            <div className="search-container">
              <Search className="search-icon" size={16} />
              <input
                ref={searchInputRef}
                type="search"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                aria-label="Search calendar events"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select"
              aria-label="Filter events by type"
            >
              <option value="all">All Events</option>
              <option value="medical">Medical</option>
              <option value="medication">Medication</option>
              <option value="conference">Conference</option>
              <option value="personal">Personal</option>
              <option value="work">Work</option>
            </select>
          </div>

          <div className="header-right">
            <div className="view-controls">
              <button
                className={`view-btn ${
                  calendarView === "month" ? "active" : ""
                }`}
                onClick={() => setCalendarView("month")}
                aria-pressed={calendarView === "month"}
                aria-label="Month view"
              >
                Month
              </button>
              <button
                className={`view-btn ${
                  calendarView === "week" ? "active" : ""
                }`}
                onClick={() => setCalendarView("week")}
                aria-pressed={calendarView === "week"}
                aria-label="Week view"
              >
                Week
              </button>
              <button
                className={`view-btn ${calendarView === "day" ? "active" : ""}`}
                onClick={() => setCalendarView("day")}
                aria-pressed={calendarView === "day"}
                aria-label="Day view"
              >
                Day
              </button>
            </div>

            <button
              className="create-event-btn"
              onClick={() => setShowCreateEvent(true)}
              aria-label="Create new event"
              title="Alt+N"
            >
              <Plus size={16} />
              <span>New Event</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main id="calendar-content" className="calendar-main" role="main">
        <CalendarView
          events={filteredEvents}
          currentDate={currentDate}
          onDateChange={handleDateChange}
          onEventClick={handleEventClick}
          view={calendarView}
        />

        {/* Upcoming events sidebar */}
        <aside
          className="upcoming-events"
          role="complementary"
          aria-label="Upcoming events"
        >
          <h2>Upcoming Events</h2>
          <div className="upcoming-list">
            {filteredEvents
              .filter((event) => new Date(event.startTime) > new Date())
              .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
              .slice(0, 5)
              .map((event) => (
                <motion.div
                  key={event.id}
                  className={`upcoming-event ${event.type}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => handleEventClick(event)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleEventClick(event);
                    }
                  }}
                >
                  <div className="upcoming-event-header">
                    <h3>{event.title}</h3>
                    <time dateTime={event.startTime}>
                      {new Date(event.startTime).toLocaleDateString()}
                    </time>
                  </div>
                  <div className="upcoming-event-details">
                    <div className="event-time">
                      <Clock size={14} />
                      {new Date(event.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    {event.location && (
                      <div className="event-location">
                        <MapPin size={14} />
                        {event.location}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
          </div>
        </aside>
      </main>

      {/* Event Details Modal */}
      <EventDetailsModal
        event={selectedEvent}
        isOpen={showEventDetails}
        onClose={() => {
          setShowEventDetails(false);
          setSelectedEvent(null);
        }}
        onEdit={(event) => {
          console.log("Edit event:", event);
          announce("Edit event functionality coming soon");
        }}
        onDelete={(eventId) => {
          console.log("Delete event:", eventId);
          announce("Delete event functionality coming soon");
        }}
        onSpeak={announce}
      />

      {/* Help panel */}
      <div className="help-panel-calendar" role="complementary">
        <details>
          <summary>Calendar Help</summary>
          <div className="help-content">
            <h3>Navigation</h3>
            <ul>
              <li>
                <kbd>Alt</kbd> + <kbd>N</kbd> - Create new event
              </li>
              <li>
                <kbd>Alt</kbd> + <kbd>S</kbd> - Search events
              </li>
              <li>
                <kbd>Alt</kbd> + <kbd>T</kbd> - Go to today
              </li>
              <li>
                <kbd>Alt</kbd> + <kbd>H</kbd> - Help
              </li>
              <li>
                <kbd>Arrow keys</kbd> - Navigate calendar
              </li>
              <li>
                <kbd>Enter</kbd> - Select date/event
              </li>
              <li>
                <kbd>Esc</kbd> - Close dialogs
              </li>
            </ul>

            <h3>Tips</h3>
            <ul>
              <li>Click on any date to see events for that day</li>
              <li>Use voice commands to navigate and create events</li>
              <li>Set reminders for important appointments</li>
              <li>Sync with external calendar services</li>
            </ul>
          </div>
        </details>
      </div>
    </div>
  );
};

export default Calendar;
