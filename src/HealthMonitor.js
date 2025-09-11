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
  Heart,
  Activity,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  Plus,
  Edit3,
  Save,
  X,
  Check,
  AlertTriangle,
  Info,
  Pill,
  Thermometer,
  Droplets,
  Zap,
  Brain,
  Eye,
  Ear,
  Accessibility,
  Shield,
  Bell,
  Home,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Loader,
  BarChart3,
  LineChart,
  PieChart,
  Target,
  Award,
  Star,
  Bookmark,
  Share2,
  Copy,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  User,
  Camera,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Settings,
  HelpCircle,
  AlertCircle,
  CheckCircle,
  XCircle,
  Minus,
  ArrowUp,
  ArrowDown,
  Maximize2,
  Minimize2,
  RotateCcw,
  Database,
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
  Monitor,
  Smartphone,
  Tablet,
  Watch,
  Stethoscope,
  Syringe,
  Bandage,
} from "lucide-react";
import "./HealthMonitor.css";

// Custom hooks for health data management
const useHealthData = () => {
  const [healthData, setHealthData] = useState({
    vitals: [],
    medications: [],
    symptoms: [],
    appointments: [],
    emergencyContacts: [],
    healthConditions: [],
    measurements: [],
    reminders: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadHealthData = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Mock health data
        const mockData = {
          vitals: [
            {
              id: "vital_1",
              type: "blood_pressure",
              systolic: 120,
              diastolic: 80,
              unit: "mmHg",
              timestamp: new Date().toISOString(),
              notes: "Morning reading, feeling normal",
              source: "manual",
              deviceId: null,
            },
            {
              id: "vital_2",
              type: "heart_rate",
              value: 72,
              unit: "bpm",
              timestamp: new Date(Date.now() - 3600000).toISOString(),
              notes: "Resting heart rate",
              source: "device",
              deviceId: "fitbit_123",
            },
            {
              id: "vital_3",
              type: "temperature",
              value: 98.6,
              unit: "°F",
              timestamp: new Date(Date.now() - 7200000).toISOString(),
              notes: "Normal body temperature",
              source: "manual",
              deviceId: null,
            },
            {
              id: "vital_4",
              type: "weight",
              value: 165,
              unit: "lbs",
              timestamp: new Date(Date.now() - 86400000).toISOString(),
              notes: "Weekly weigh-in",
              source: "scale",
              deviceId: "scale_456",
            },
            {
              id: "vital_5",
              type: "blood_sugar",
              value: 95,
              unit: "mg/dL",
              timestamp: new Date(Date.now() - 10800000).toISOString(),
              notes: "Fasting glucose level",
              source: "glucometer",
              deviceId: "glucometer_789",
            },
          ],
          medications: [
            {
              id: "med_1",
              name: "Lucentis",
              genericName: "ranibizumab",
              dosage: "0.5mg",
              frequency: "monthly",
              route: "injection",
              prescriber: "Dr. Smith",
              startDate: "2023-01-15",
              endDate: null,
              purpose: "Macular degeneration treatment",
              sideEffects: ["injection site reaction", "eye irritation"],
              instructions: "Administered by healthcare provider",
              refillsRemaining: 5,
              pharmacy: "MainStreet Pharmacy",
              lastTaken: new Date(Date.now() - 2592000000).toISOString(),
              nextDue: new Date(Date.now() + 86400000).toISOString(),
              adherence: 95,
              cost: 2500.0,
              insurance: "covered",
              priority: "high",
              category: "prescription",
            },
            {
              id: "med_2",
              name: "Ibuprofen",
              genericName: "ibuprofen",
              dosage: "200mg",
              frequency: "as_needed",
              route: "oral",
              prescriber: "Over-the-counter",
              startDate: "2024-01-01",
              endDate: null,
              purpose: "Pain and inflammation relief",
              sideEffects: ["stomach upset", "drowsiness"],
              instructions: "Take with food, max 3 per day",
              refillsRemaining: null,
              pharmacy: "Local Pharmacy",
              lastTaken: new Date(Date.now() - 3600000).toISOString(),
              nextDue: null,
              adherence: 88,
              cost: 8.99,
              insurance: "not_covered",
              priority: "low",
              category: "otc",
            },
          ],
          symptoms: [
            {
              id: "symptom_1",
              name: "Blurred Vision",
              severity: 7,
              description: "Difficulty focusing on text and objects",
              timestamp: new Date().toISOString(),
              duration: 240, // minutes
              triggers: ["bright light", "screen time"],
              location: "both eyes",
              frequency: "daily",
              impact: "high",
              medications_taken: ["Lucentis"],
              notes: "Worse in the morning, improves with rest",
              photos: [],
              category: "vision",
              status: "ongoing",
            },
            {
              id: "symptom_2",
              name: "Joint Stiffness",
              severity: 4,
              description: "Stiffness in hands and wrists",
              timestamp: new Date(Date.now() - 3600000).toISOString(),
              duration: 60,
              triggers: ["cold weather", "prolonged typing"],
              location: "hands, wrists",
              frequency: "morning",
              impact: "moderate",
              medications_taken: ["Ibuprofen"],
              notes: "Usually resolves after warming up",
              photos: [],
              category: "musculoskeletal",
              status: "resolved",
            },
          ],
          appointments: [
            {
              id: "appt_1",
              title: "Ophthalmology Follow-up",
              provider: "Dr. Sarah Johnson",
              specialty: "Ophthalmology",
              date: new Date(Date.now() + 604800000).toISOString(),
              duration: 60,
              type: "follow-up",
              location: "Eye Care Center",
              address: "123 Medical Plaza, Suite 400",
              phone: "(555) 123-4567",
              purpose: "Lucentis injection and vision check",
              preparation: [
                "Bring insurance cards",
                "List current medications",
              ],
              transportation: "arranged",
              reminder: {
                enabled: true,
                timing: [24, 2], // hours before
                methods: ["email", "phone"],
              },
              accessibility: {
                parking: "accessible",
                entrance: "accessible",
                restroom: "accessible",
                signLanguage: false,
                assistiveListening: true,
              },
              insurance: {
                provider: "Blue Cross",
                copay: 25.0,
                preauth: "approved",
              },
              status: "scheduled",
              priority: "high",
            },
            {
              id: "appt_2",
              title: "Physical Therapy",
              provider: "Mike Thompson, PT",
              specialty: "Physical Therapy",
              date: new Date(Date.now() + 259200000).toISOString(),
              duration: 45,
              type: "therapy",
              location: "Rehab Center",
              address: "456 Wellness Drive",
              phone: "(555) 987-6543",
              purpose: "Hand and wrist mobility exercises",
              preparation: ["Wear comfortable clothes", "Bring exercise log"],
              transportation: "family",
              reminder: {
                enabled: true,
                timing: [4], // hours before
                methods: ["text"],
              },
              accessibility: {
                parking: "accessible",
                entrance: "accessible",
                restroom: "accessible",
                signLanguage: false,
                assistiveListening: false,
              },
              insurance: {
                provider: "Blue Cross",
                copay: 40.0,
                preauth: "pending",
              },
              status: "scheduled",
              priority: "medium",
            },
          ],
          emergencyContacts: [
            {
              id: "emergency_1",
              name: "Jane Doe",
              relationship: "spouse",
              phone: "(555) 987-6543",
              email: "jane.doe@example.com",
              address: "123 Main Street, City, ST 12345",
              isPrimary: true,
              medicalProxy: true,
              notes: "Has copy of medical directives",
            },
            {
              id: "emergency_2",
              name: "Dr. Sarah Johnson",
              relationship: "ophthalmologist",
              phone: "(555) 123-4567",
              email: "sarah.johnson@eyecare.com",
              address: "123 Medical Plaza, Suite 400",
              isPrimary: false,
              medicalProxy: false,
              notes: "Primary eye doctor, emergency contact for vision issues",
            },
          ],
          healthConditions: [
            {
              id: "condition_1",
              name: "Age-related Macular Degeneration",
              type: "chronic",
              severity: "moderate",
              diagnosisDate: "2023-01-15",
              icd10: "H35.30",
              description:
                "Progressive deterioration of the macula causing central vision loss",
              symptoms: [
                "blurred vision",
                "difficulty reading",
                "distorted vision",
              ],
              treatments: ["Lucentis injections", "nutritional supplements"],
              medications: ["Lucentis"],
              lifestyle: ["UV protection", "healthy diet", "regular exercise"],
              monitoring: "monthly eye exams",
              prognosis: "stable with treatment",
              resources: ["AMD Foundation", "Vision support groups"],
              accommodations: [
                "screen magnification",
                "high contrast displays",
              ],
              notes: "Responds well to anti-VEGF treatment",
              lastUpdate: new Date().toISOString(),
            },
            {
              id: "condition_2",
              name: "Osteoarthritis",
              type: "chronic",
              severity: "mild",
              diagnosisDate: "2020-11-08",
              icd10: "M19.90",
              description: "Joint inflammation and cartilage breakdown",
              symptoms: ["joint stiffness", "pain", "reduced mobility"],
              treatments: ["physical therapy", "anti-inflammatory medications"],
              medications: ["Ibuprofen"],
              lifestyle: [
                "regular exercise",
                "weight management",
                "heat therapy",
              ],
              monitoring: "annual check-ups",
              prognosis: "manageable with lifestyle changes",
              resources: ["Arthritis Foundation", "Physical therapy clinics"],
              accommodations: ["ergonomic tools", "voice recognition software"],
              notes: "Primarily affects hands and wrists",
              lastUpdate: new Date().toISOString(),
            },
          ],
          measurements: [
            {
              id: "measure_1",
              type: "vision_acuity",
              value: "20/80",
              eye: "both",
              corrected: true,
              timestamp: new Date(Date.now() - 2592000000).toISOString(),
              provider: "Dr. Johnson",
              notes: "Stable since last visit",
            },
            {
              id: "measure_2",
              type: "grip_strength",
              value: 25,
              unit: "kg",
              hand: "right",
              timestamp: new Date(Date.now() - 604800000).toISOString(),
              provider: "Mike Thompson, PT",
              notes: "Improved from last session",
            },
          ],
          reminders: [
            {
              id: "reminder_1",
              title: "Take Lucentis injection appointment",
              type: "appointment",
              datetime: new Date(Date.now() + 82800000).toISOString(),
              recurring: false,
              priority: "high",
              completed: false,
              methods: ["notification", "email"],
              snoozeOptions: [15, 30, 60], // minutes
              notes: "Bring insurance cards and medication list",
            },
            {
              id: "reminder_2",
              title: "Record morning blood pressure",
              type: "measurement",
              datetime: new Date(Date.now() + 36000000).toISOString(),
              recurring: true,
              recurringPattern: "daily",
              priority: "medium",
              completed: false,
              methods: ["notification"],
              snoozeOptions: [10, 30],
              notes: "Take 3 readings and record average",
            },
          ],
        };

        setHealthData(mockData);
      } catch (error) {
        console.error("Failed to load health data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHealthData();
  }, []);

  const saveHealthData = useCallback(async (newData) => {
    setSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setHealthData(newData);
      return true;
    } catch (error) {
      console.error("Failed to save health data:", error);
      return false;
    } finally {
      setSaving(false);
    }
  }, []);

  const addEntry = useCallback((category, entry) => {
    setHealthData((prev) => ({
      ...prev,
      [category]: [
        ...prev[category],
        { ...entry, id: `${category}_${Date.now()}` },
      ],
    }));
  }, []);

  const updateEntry = useCallback((category, entryId, updates) => {
    setHealthData((prev) => ({
      ...prev,
      [category]: prev[category].map((item) =>
        item.id === entryId ? { ...item, ...updates } : item
      ),
    }));
  }, []);

  const deleteEntry = useCallback((category, entryId) => {
    setHealthData((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item.id !== entryId),
    }));
  }, []);

  return {
    healthData,
    loading,
    saving,
    saveHealthData,
    addEntry,
    updateEntry,
    deleteEntry,
  };
};

// Vital Signs Chart Component
const VitalSignsChart = ({ vitals, type, onAnnounce }) => {
  const chartData = useMemo(() => {
    return vitals
      .filter((vital) => vital.type === type)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      .slice(-7); // Last 7 readings
  }, [vitals, type]);

  const getVitalInfo = (type) => {
    const vitalTypes = {
      blood_pressure: {
        name: "Blood Pressure",
        unit: "mmHg",
        normalRange: "Below 120/80",
        icon: Heart,
        color: "#e74c3c",
      },
      heart_rate: {
        name: "Heart Rate",
        unit: "bpm",
        normalRange: "60-100 bpm",
        icon: Activity,
        color: "#3498db",
      },
      temperature: {
        name: "Temperature",
        unit: "°F",
        normalRange: "97-99°F",
        icon: Thermometer,
        color: "#f39c12",
      },
      weight: {
        name: "Weight",
        unit: "lbs",
        normalRange: "Varies",
        icon: Target,
        color: "#9b59b6",
      },
      blood_sugar: {
        name: "Blood Sugar",
        unit: "mg/dL",
        normalRange: "80-130 mg/dL",
        icon: Droplets,
        color: "#27ae60",
      },
    };
    return (
      vitalTypes[type] || {
        name: type,
        unit: "",
        normalRange: "",
        icon: Activity,
        color: "#95a5a6",
      }
    );
  };

  const vitalInfo = getVitalInfo(type);
  const Icon = vitalInfo.icon;

  const calculateTrend = () => {
    if (chartData.length < 2) return null;

    const latest = chartData[chartData.length - 1];
    const previous = chartData[chartData.length - 2];

    let latestValue, previousValue;

    if (type === "blood_pressure") {
      latestValue = latest.systolic;
      previousValue = previous.systolic;
    } else {
      latestValue = latest.value;
      previousValue = previous.value;
    }

    const change = latestValue - previousValue;
    const percentChange = (change / previousValue) * 100;

    return {
      direction: change > 0 ? "up" : change < 0 ? "down" : "stable",
      change: Math.abs(change),
      percentChange: Math.abs(percentChange),
    };
  };

  const trend = calculateTrend();
  const latestReading = chartData[chartData.length - 1];

  const handleChartSpeak = useCallback(() => {
    if (!latestReading) return;

    let valueText;
    if (type === "blood_pressure") {
      valueText = `${latestReading.systolic} over ${latestReading.diastolic}`;
    } else {
      valueText = `${latestReading.value} ${vitalInfo.unit}`;
    }

    const trendText = trend
      ? `with a ${
          trend.direction === "up"
            ? "rising"
            : trend.direction === "down"
            ? "falling"
            : "stable"
        } trend`
      : "";

    const message = `Latest ${vitalInfo.name} reading: ${valueText} ${trendText}. Normal range is ${vitalInfo.normalRange}.`;
    onAnnounce(message);
  }, [latestReading, type, vitalInfo, trend, onAnnounce]);

  if (!chartData.length) {
    return (
      <div className="vital-chart-empty">
        <Icon size={32} />
        <h3>{vitalInfo.name}</h3>
        <p>No data available</p>
      </div>
    );
  }

  return (
    <motion.div
      className="vital-chart-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="vital-chart-header">
        <div className="vital-info">
          <Icon size={24} style={{ color: vitalInfo.color }} />
          <div>
            <h3>{vitalInfo.name}</h3>
            <p className="normal-range">Normal: {vitalInfo.normalRange}</p>
          </div>
        </div>
        <div className="vital-actions">
          <button
            className="chart-action-btn"
            onClick={handleChartSpeak}
            aria-label={`Read ${vitalInfo.name} data aloud`}
          >
            <Volume2 size={16} />
          </button>
        </div>
      </div>

      <div className="vital-current">
        <div className="current-value">
          {type === "blood_pressure" ? (
            <span>
              {latestReading.systolic}/{latestReading.diastolic}
            </span>
          ) : (
            <span>{latestReading.value}</span>
          )}
          <span className="unit">{vitalInfo.unit}</span>
        </div>
        {trend && (
          <div className={`trend ${trend.direction}`}>
            {trend.direction === "up" && <TrendingUp size={16} />}
            {trend.direction === "down" && <TrendingDown size={16} />}
            {trend.direction === "stable" && <Target size={16} />}
            <span>{trend.percentChange.toFixed(1)}%</span>
          </div>
        )}
      </div>

      <div
        className="vital-mini-chart"
        aria-label={`${vitalInfo.name} trend chart`}
      >
        <div className="chart-points">
          {chartData.map((reading, index) => {
            const value =
              type === "blood_pressure" ? reading.systolic : reading.value;
            const maxValue = Math.max(
              ...chartData.map((r) =>
                type === "blood_pressure" ? r.systolic : r.value
              )
            );
            const minValue = Math.min(
              ...chartData.map((r) =>
                type === "blood_pressure" ? r.systolic : r.value
              )
            );
            const range = maxValue - minValue || 1;
            const height = ((value - minValue) / range) * 60 + 10; // 10-70% height

            return (
              <div
                key={reading.id}
                className="chart-point"
                style={{
                  height: `${height}%`,
                  backgroundColor: vitalInfo.color,
                }}
                title={`${new Date(
                  reading.timestamp
                ).toLocaleDateString()}: ${value} ${vitalInfo.unit}`}
              />
            );
          })}
        </div>
      </div>

      <div className="vital-timestamp">
        Last reading: {new Date(latestReading.timestamp).toLocaleString()}
      </div>
    </motion.div>
  );
};

// Medication Tracker Component
const MedicationTracker = ({ medications, onUpdate, onAnnounce }) => {
  const [selectedMed, setSelectedMed] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const upcomingMeds = useMemo(() => {
    const now = new Date();
    const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    return medications
      .filter((med) => {
        if (!med.nextDue) return false;
        const dueTime = new Date(med.nextDue);
        return dueTime >= now && dueTime <= next24Hours;
      })
      .sort((a, b) => new Date(a.nextDue) - new Date(b.nextDue));
  }, [medications]);

  const handleTakeMedication = useCallback(
    (medication) => {
      const now = new Date().toISOString();
      let nextDue = null;

      // Calculate next dose based on frequency
      if (medication.frequency !== "as_needed") {
        const frequencyMap = {
          daily: 24 * 60 * 60 * 1000,
          twice_daily: 12 * 60 * 60 * 1000,
          three_times_daily: 8 * 60 * 60 * 1000,
          four_times_daily: 6 * 60 * 60 * 1000,
          weekly: 7 * 24 * 60 * 60 * 1000,
          monthly: 30 * 24 * 60 * 60 * 1000,
        };

        const interval = frequencyMap[medication.frequency];
        if (interval) {
          nextDue = new Date(Date.now() + interval).toISOString();
        }
      }

      const updates = {
        lastTaken: now,
        nextDue: nextDue,
        adherence: Math.min(100, medication.adherence + 1),
      };

      onUpdate(medication.id, updates);
      onAnnounce(`Marked ${medication.name} as taken`);
    },
    [onUpdate, onAnnounce]
  );

  const getPriorityColor = (priority) => {
    const colors = {
      high: "#e74c3c",
      medium: "#f39c12",
      low: "#95a5a6",
    };
    return colors[priority] || colors.low;
  };

  const getAdherenceColor = (adherence) => {
    if (adherence >= 90) return "#27ae60";
    if (adherence >= 70) return "#f39c12";
    return "#e74c3c";
  };

  return (
    <motion.div
      className="medication-tracker"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="tracker-header">
        <h2>
          <Pill size={24} />
          Medication Tracker
        </h2>
        <button
          className="speak-upcoming-btn"
          onClick={() => {
            const upcomingText =
              upcomingMeds.length > 0
                ? `You have ${upcomingMeds.length} medication${
                    upcomingMeds.length > 1 ? "s" : ""
                  } due in the next 24 hours: ${upcomingMeds
                    .map((m) => m.name)
                    .join(", ")}`
                : "No medications due in the next 24 hours";
            onAnnounce(upcomingText);
          }}
          aria-label="Read upcoming medications aloud"
        >
          <Volume2 size={16} />
          Upcoming
        </button>
      </div>

      {upcomingMeds.length > 0 && (
        <div className="upcoming-medications">
          <h3>Due Next 24 Hours</h3>
          <div className="upcoming-list">
            {upcomingMeds.map((medication) => (
              <motion.div
                key={medication.id}
                className={`upcoming-med ${medication.priority}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="med-info">
                  <div className="med-name">
                    {medication.name}
                    <span className="med-dosage">{medication.dosage}</span>
                  </div>
                  <div className="med-due">
                    <Clock size={14} />
                    Due: {new Date(medication.nextDue).toLocaleString()}
                  </div>
                  <div className="med-purpose">{medication.purpose}</div>
                </div>
                <div className="med-actions">
                  <div
                    className="priority-indicator"
                    style={{
                      backgroundColor: getPriorityColor(medication.priority),
                    }}
                    title={`${medication.priority} priority`}
                  />
                  <button
                    className="take-med-btn"
                    onClick={() => handleTakeMedication(medication)}
                    aria-label={`Mark ${medication.name} as taken`}
                  >
                    <Check size={16} />
                    Taken
                  </button>
                  <button
                    className="med-details-btn"
                    onClick={() => {
                      setSelectedMed(medication);
                      setShowDetails(true);
                    }}
                    aria-label={`View details for ${medication.name}`}
                  >
                    <Info size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className="all-medications">
        <h3>All Medications</h3>
        <div className="medications-grid">
          {medications.map((medication) => (
            <motion.div
              key={medication.id}
              className={`medication-card ${medication.category}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="med-card-header">
                <div className="med-title">
                  <h4>{medication.name}</h4>
                  <span className="generic-name">{medication.genericName}</span>
                </div>
                <div className="med-status">
                  <div
                    className="priority-dot"
                    style={{
                      backgroundColor: getPriorityColor(medication.priority),
                    }}
                  />
                </div>
              </div>

              <div className="med-card-body">
                <div className="med-detail">
                  <strong>Dosage:</strong> {medication.dosage}
                </div>
                <div className="med-detail">
                  <strong>Frequency:</strong>{" "}
                  {medication.frequency.replace("_", " ")}
                </div>
                <div className="med-detail">
                  <strong>Purpose:</strong> {medication.purpose}
                </div>
                {medication.lastTaken && (
                  <div className="med-detail">
                    <strong>Last taken:</strong>{" "}
                    {new Date(medication.lastTaken).toLocaleString()}
                  </div>
                )}
              </div>

              <div className="med-card-footer">
                <div className="adherence-section">
                  <span className="adherence-label">Adherence:</span>
                  <div className="adherence-bar">
                    <div
                      className="adherence-fill"
                      style={{
                        width: `${medication.adherence}%`,
                        backgroundColor: getAdherenceColor(
                          medication.adherence
                        ),
                      }}
                    />
                  </div>
                  <span
                    className="adherence-percentage"
                    style={{ color: getAdherenceColor(medication.adherence) }}
                  >
                    {medication.adherence}%
                  </span>
                </div>

                <div className="med-card-actions">
                  <button
                    className="med-action-btn"
                    onClick={() => {
                      setSelectedMed(medication);
                      setShowDetails(true);
                    }}
                    aria-label={`View details for ${medication.name}`}
                  >
                    <Eye size={14} />
                  </button>
                  <button
                    className="med-action-btn"
                    onClick={() => handleTakeMedication(medication)}
                    aria-label={`Mark ${medication.name} as taken`}
                  >
                    <Check size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Medication Details Modal */}
      <AnimatePresence>
        {showDetails && selectedMed && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              className="medication-details-modal"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-labelledby="med-details-title"
              aria-describedby="med-details-content"
            >
              <div className="modal-header">
                <h2 id="med-details-title">{selectedMed.name}</h2>
                <button
                  className="modal-close"
                  onClick={() => setShowDetails(false)}
                  aria-label="Close medication details"
                >
                  <X size={20} />
                </button>
              </div>

              <div id="med-details-content" className="modal-content">
                <div className="med-details-grid">
                  <div className="detail-section">
                    <h3>Basic Information</h3>
                    <div className="detail-items">
                      <div className="detail-item">
                        <span className="detail-label">Generic Name:</span>
                        <span className="detail-value">
                          {selectedMed.genericName}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Dosage:</span>
                        <span className="detail-value">
                          {selectedMed.dosage}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Route:</span>
                        <span className="detail-value">
                          {selectedMed.route}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Frequency:</span>
                        <span className="detail-value">
                          {selectedMed.frequency.replace("_", " ")}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Prescriber:</span>
                        <span className="detail-value">
                          {selectedMed.prescriber}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h3>Treatment Information</h3>
                    <div className="detail-items">
                      <div className="detail-item">
                        <span className="detail-label">Purpose:</span>
                        <span className="detail-value">
                          {selectedMed.purpose}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Start Date:</span>
                        <span className="detail-value">
                          {new Date(selectedMed.startDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Instructions:</span>
                        <span className="detail-value">
                          {selectedMed.instructions}
                        </span>
                      </div>
                      {selectedMed.sideEffects.length > 0 && (
                        <div className="detail-item">
                          <span className="detail-label">Side Effects:</span>
                          <div className="side-effects-list">
                            {selectedMed.sideEffects.map((effect, index) => (
                              <span key={index} className="side-effect-tag">
                                {effect}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="detail-section">
                    <h3>Adherence & Tracking</h3>
                    <div className="detail-items">
                      <div className="detail-item">
                        <span className="detail-label">Adherence Rate:</span>
                        <div className="adherence-display">
                          <div className="adherence-bar-large">
                            <div
                              className="adherence-fill-large"
                              style={{
                                width: `${selectedMed.adherence}%`,
                                backgroundColor: getAdherenceColor(
                                  selectedMed.adherence
                                ),
                              }}
                            />
                          </div>
                          <span className="adherence-text">
                            {selectedMed.adherence}%
                          </span>
                        </div>
                      </div>
                      {selectedMed.lastTaken && (
                        <div className="detail-item">
                          <span className="detail-label">Last Taken:</span>
                          <span className="detail-value">
                            {new Date(selectedMed.lastTaken).toLocaleString()}
                          </span>
                        </div>
                      )}
                      {selectedMed.nextDue && (
                        <div className="detail-item">
                          <span className="detail-label">Next Due:</span>
                          <span className="detail-value">
                            {new Date(selectedMed.nextDue).toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="detail-section">
                    <h3>Pharmacy & Cost</h3>
                    <div className="detail-items">
                      <div className="detail-item">
                        <span className="detail-label">Pharmacy:</span>
                        <span className="detail-value">
                          {selectedMed.pharmacy}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Cost:</span>
                        <span className="detail-value">
                          ${selectedMed.cost.toFixed(2)}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Insurance:</span>
                        <span className="detail-value">
                          {selectedMed.insurance}
                        </span>
                      </div>
                      {selectedMed.refillsRemaining && (
                        <div className="detail-item">
                          <span className="detail-label">
                            Refills Remaining:
                          </span>
                          <span className="detail-value">
                            {selectedMed.refillsRemaining}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className="btn-secondary"
                  onClick={() => {
                    const medText = `${selectedMed.name}, ${
                      selectedMed.dosage
                    }, taken ${selectedMed.frequency.replace("_", " ")} for ${
                      selectedMed.purpose
                    }. Adherence rate is ${selectedMed.adherence} percent.`;
                    onAnnounce(medText);
                  }}
                >
                  <Volume2 size={16} />
                  Read Details
                </button>
                <button
                  className="btn-primary"
                  onClick={() => {
                    handleTakeMedication(selectedMed);
                    setShowDetails(false);
                  }}
                >
                  <Check size={16} />
                  Mark as Taken
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Symptom Logger Component
const SymptomLogger = ({ symptoms, onAdd, onUpdate, onAnnounce }) => {
  const [showAddSymptom, setShowAddSymptom] = useState(false);
  const [newSymptom, setNewSymptom] = useState({
    name: "",
    severity: 5,
    description: "",
    location: "",
    triggers: [],
    duration: 0,
    category: "general",
  });

  const symptomCategories = [
    { value: "general", label: "General" },
    { value: "vision", label: "Vision" },
    { value: "musculoskeletal", label: "Musculoskeletal" },
    { value: "neurological", label: "Neurological" },
    { value: "respiratory", label: "Respiratory" },
    { value: "cardiovascular", label: "Cardiovascular" },
    { value: "gastrointestinal", label: "Gastrointestinal" },
    { value: "psychological", label: "Psychological" },
  ];

  const handleAddSymptom = useCallback(
    (e) => {
      e.preventDefault();
      if (!newSymptom.name.trim()) return;

      const symptomData = {
        ...newSymptom,
        timestamp: new Date().toISOString(),
        frequency: "once", // default
        impact:
          newSymptom.severity > 7
            ? "high"
            : newSymptom.severity > 4
            ? "moderate"
            : "low",
        status: "ongoing",
        medications_taken: [],
        notes: newSymptom.description,
        photos: [],
      };

      onAdd("symptoms", symptomData);
      setNewSymptom({
        name: "",
        severity: 5,
        description: "",
        location: "",
        triggers: [],
        duration: 0,
        category: "general",
      });
      setShowAddSymptom(false);
      onAnnounce(`Symptom "${symptomData.name}" logged successfully`);
    },
    [newSymptom, onAdd, onAnnounce]
  );

  const getSeverityColor = (severity) => {
    if (severity <= 3) return "#27ae60";
    if (severity <= 6) return "#f39c12";
    return "#e74c3c";
  };

  const getSeverityLabel = (severity) => {
    if (severity <= 3) return "Mild";
    if (severity <= 6) return "Moderate";
    return "Severe";
  };

  const recentSymptoms = useMemo(() => {
    return symptoms
      .filter((symptom) => symptom.status === "ongoing")
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 5);
  }, [symptoms]);

  return (
    <motion.div
      className="symptom-logger"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="logger-header">
        <h2>
          <AlertTriangle size={24} />
          Symptom Tracker
        </h2>
        <button
          className="add-symptom-btn"
          onClick={() => setShowAddSymptom(true)}
          aria-label="Log new symptom"
        >
          <Plus size={16} />
          Log Symptom
        </button>
      </div>

      {recentSymptoms.length > 0 && (
        <div className="recent-symptoms">
          <h3>Current Symptoms</h3>
          <div className="symptoms-list">
            {recentSymptoms.map((symptom) => (
              <motion.div
                key={symptom.id}
                className="symptom-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="symptom-header">
                  <h4>{symptom.name}</h4>
                  <div className="symptom-meta">
                    <span
                      className="severity-badge"
                      style={{
                        backgroundColor: getSeverityColor(symptom.severity),
                      }}
                    >
                      {getSeverityLabel(symptom.severity)} ({symptom.severity}
                      /10)
                    </span>
                    <span className="symptom-category">{symptom.category}</span>
                  </div>
                </div>

                <div className="symptom-details">
                  <p className="symptom-description">{symptom.description}</p>
                  {symptom.location && (
                    <div className="symptom-location">
                      <MapPin size={14} />
                      <span>{symptom.location}</span>
                    </div>
                  )}
                  {symptom.duration > 0 && (
                    <div className="symptom-duration">
                      <Clock size={14} />
                      <span>
                        {Math.floor(symptom.duration / 60)}h{" "}
                        {symptom.duration % 60}m
                      </span>
                    </div>
                  )}
                  {symptom.triggers && symptom.triggers.length > 0 && (
                    <div className="symptom-triggers">
                      <strong>Triggers:</strong> {symptom.triggers.join(", ")}
                    </div>
                  )}
                </div>

                <div className="symptom-footer">
                  <div className="symptom-time">
                    <Calendar size={14} />
                    {new Date(symptom.timestamp).toLocaleString()}
                  </div>
                  <div className="symptom-actions">
                    <button
                      className="symptom-action-btn"
                      onClick={() => {
                        const symptomText = `Symptom: ${
                          symptom.name
                        }, severity ${
                          symptom.severity
                        } out of 10, ${getSeverityLabel(
                          symptom.severity
                        )} level. Description: ${
                          symptom.description
                        }. Logged at ${new Date(
                          symptom.timestamp
                        ).toLocaleString()}.`;
                        onAnnounce(symptomText);
                      }}
                      aria-label={`Read ${symptom.name} details aloud`}
                    >
                      <Volume2 size={14} />
                    </button>
                    <button
                      className="symptom-action-btn"
                      onClick={() => {
                        onUpdate("symptoms", symptom.id, {
                          status: "resolved",
                        });
                        onAnnounce(`Marked ${symptom.name} as resolved`);
                      }}
                      aria-label={`Mark ${symptom.name} as resolved`}
                    >
                      <Check size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Add Symptom Modal */}
      <AnimatePresence>
        {showAddSymptom && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddSymptom(false)}
          >
            <motion.div
              className="add-symptom-modal"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-labelledby="add-symptom-title"
            >
              <div className="modal-header">
                <h2 id="add-symptom-title">Log New Symptom</h2>
                <button
                  className="modal-close"
                  onClick={() => setShowAddSymptom(false)}
                  aria-label="Close add symptom form"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddSymptom} className="add-symptom-form">
                <div className="form-group">
                  <label htmlFor="symptom-name">
                    Symptom Name <span className="required">*</span>
                  </label>
                  <input
                    id="symptom-name"
                    type="text"
                    value={newSymptom.name}
                    onChange={(e) =>
                      setNewSymptom((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="e.g., Headache, Blurred vision, Joint pain"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="symptom-severity">Severity (1-10)</label>
                  <div className="severity-input">
                    <input
                      id="symptom-severity"
                      type="range"
                      min="1"
                      max="10"
                      value={newSymptom.severity}
                      onChange={(e) =>
                        setNewSymptom((prev) => ({
                          ...prev,
                          severity: parseInt(e.target.value),
                        }))
                      }
                    />
                    <div className="severity-display">
                      <span
                        className="severity-number"
                        style={{ color: getSeverityColor(newSymptom.severity) }}
                      >
                        {newSymptom.severity}
                      </span>
                      <span className="severity-label">
                        {getSeverityLabel(newSymptom.severity)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="symptom-category">Category</label>
                  <select
                    id="symptom-category"
                    value={newSymptom.category}
                    onChange={(e) =>
                      setNewSymptom((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                  >
                    {symptomCategories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="symptom-location">Location</label>
                  <input
                    id="symptom-location"
                    type="text"
                    value={newSymptom.location}
                    onChange={(e) =>
                      setNewSymptom((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    placeholder="e.g., Both eyes, Right hand, Lower back"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="symptom-description">Description</label>
                  <textarea
                    id="symptom-description"
                    value={newSymptom.description}
                    onChange={(e) =>
                      setNewSymptom((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Describe your symptom in detail..."
                    rows={3}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="symptom-duration">Duration (minutes)</label>
                  <input
                    id="symptom-duration"
                    type="number"
                    min="0"
                    value={newSymptom.duration}
                    onChange={(e) =>
                      setNewSymptom((prev) => ({
                        ...prev,
                        duration: parseInt(e.target.value) || 0,
                      }))
                    }
                    placeholder="How long have you been experiencing this?"
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setShowAddSymptom(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={!newSymptom.name.trim()}
                  >
                    <Plus size={16} />
                    Log Symptom
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Main Health Monitor Component
const HealthMonitor = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [announcement, setAnnouncement] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Hooks
  const { healthData, loading, saving, addEntry, updateEntry, deleteEntry } =
    useHealthData();

  // Refs
  const searchInputRef = useRef(null);

  // Announcement function
  const announce = useCallback((message) => {
    setAnnouncement(message);
    setTimeout(() => setAnnouncement(""), 5000);
  }, []);

  // Tabs configuration
  const tabs = useMemo(
    () => [
      { id: "overview", label: "Overview", icon: Activity, color: "blue" },
      { id: "vitals", label: "Vital Signs", icon: Heart, color: "red" },
      { id: "medications", label: "Medications", icon: Pill, color: "green" },
      {
        id: "symptoms",
        label: "Symptoms",
        icon: AlertTriangle,
        color: "orange",
      },
      {
        id: "appointments",
        label: "Appointments",
        icon: Calendar,
        color: "purple",
      },
      {
        id: "conditions",
        label: "Conditions",
        icon: FileText,
        color: "indigo",
      },
    ],
    []
  );

  // Handle medication update
  const handleMedicationUpdate = useCallback(
    (medicationId, updates) => {
      updateEntry("medications", medicationId, updates);
    },
    [updateEntry]
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey) {
        const tabIndex = parseInt(e.key) - 1;
        if (tabIndex >= 0 && tabIndex < tabs.length) {
          e.preventDefault();
          setActiveTab(tabs[tabIndex].id);
        } else if (e.key === "h") {
          e.preventDefault();
          announceHelp();
        } else if (e.key === "s") {
          e.preventDefault();
          searchInputRef.current?.focus();
        }
      }
    };

    const announceHelp = () => {
      const helpText = `
        Health Monitor navigation:
        Alt+1-6 to switch between tabs
        Alt+H for help
        Alt+S to search
        Tab to navigate between elements
      `;
      announce(helpText);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [tabs, announce]);

  if (loading) {
    return (
      <div className="health-monitor-loading" role="status" aria-live="polite">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="loading-spinner"
        >
          <Heart size={48} />
        </motion.div>
        <p>Loading your health data...</p>
      </div>
    );
  }

  return (
    <div className="health-monitor-container">
      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* Skip navigation */}
      <a href="#health-content" className="skip-link">
        Skip to health content
      </a>

      {/* Header */}
      <header className="health-header" role="banner">
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
            <h1 className="page-title">Health Monitor</h1>
          </div>

          <div className="header-center">
            <div className="search-container">
              <Search className="search-icon" size={16} />
              <input
                ref={searchInputRef}
                type="search"
                placeholder="Search health data..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                aria-label="Search health information"
              />
            </div>
          </div>

          <div className="header-right">
            <div className="health-summary">
              <div className="summary-stat">
                <Heart size={16} />
                <span>{healthData.vitals.length} Vitals</span>
              </div>
              <div className="summary-stat">
                <Pill size={16} />
                <span>{healthData.medications.length} Meds</span>
              </div>
              <div className="summary-stat">
                <Calendar size={16} />
                <span>{healthData.appointments.length} Appointments</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="health-main">
        {/* Navigation tabs */}
        <nav
          className="health-nav"
          role="navigation"
          aria-label="Health sections"
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
          id="health-content"
          className="health-content"
          role="main"
          aria-label="Health content"
        >
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                role="tabpanel"
                id="overview-panel"
                aria-labelledby="overview-tab"
                className="overview-panel"
              >
                <div className="overview-grid">
                  <div className="overview-section vital-signs-overview">
                    <h2>Latest Vital Signs</h2>
                    <div className="vitals-grid">
                      {[
                        "blood_pressure",
                        "heart_rate",
                        "temperature",
                        "weight",
                      ].map((vitalType) => (
                        <VitalSignsChart
                          key={vitalType}
                          vitals={healthData.vitals}
                          type={vitalType}
                          onAnnounce={announce}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="overview-section medications-overview">
                    <h2>Medication Overview</h2>
                    <MedicationTracker
                      medications={healthData.medications}
                      onUpdate={handleMedicationUpdate}
                      onAnnounce={announce}
                    />
                  </div>

                  <div className="overview-section symptoms-overview">
                    <h2>Recent Symptoms</h2>
                    <SymptomLogger
                      symptoms={healthData.symptoms}
                      onAdd={addEntry}
                      onUpdate={updateEntry}
                      onAnnounce={announce}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "vitals" && (
              <motion.div
                key="vitals"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                role="tabpanel"
                id="vitals-panel"
                aria-labelledby="vitals-tab"
                className="vitals-panel"
              >
                <div className="vitals-dashboard">
                  <h2>Vital Signs Dashboard</h2>
                  <div className="vitals-grid-expanded">
                    {[
                      "blood_pressure",
                      "heart_rate",
                      "temperature",
                      "weight",
                      "blood_sugar",
                    ].map((vitalType) => (
                      <VitalSignsChart
                        key={vitalType}
                        vitals={healthData.vitals}
                        type={vitalType}
                        onAnnounce={announce}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "medications" && (
              <motion.div
                key="medications"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                role="tabpanel"
                id="medications-panel"
                aria-labelledby="medications-tab"
                className="medications-panel"
              >
                <MedicationTracker
                  medications={healthData.medications}
                  onUpdate={handleMedicationUpdate}
                  onAnnounce={announce}
                />
              </motion.div>
            )}

            {activeTab === "symptoms" && (
              <motion.div
                key="symptoms"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                role="tabpanel"
                id="symptoms-panel"
                aria-labelledby="symptoms-tab"
                className="symptoms-panel"
              >
                <SymptomLogger
                  symptoms={healthData.symptoms}
                  onAdd={addEntry}
                  onUpdate={updateEntry}
                  onAnnounce={announce}
                />
              </motion.div>
            )}

            {/* Additional tabs would be implemented similarly */}
          </AnimatePresence>
        </div>
      </main>

      {/* Help panel */}
      <div className="help-panel-health" role="complementary">
        <details>
          <summary>Help & Navigation</summary>
          <div className="help-content">
            <h3>Keyboard Shortcuts</h3>
            <ul>
              <li>
                <kbd>Alt</kbd> + <kbd>1-6</kbd> - Switch between tabs
              </li>
              <li>
                <kbd>Alt</kbd> + <kbd>H</kbd> - Help
              </li>
              <li>
                <kbd>Alt</kbd> + <kbd>S</kbd> - Search
              </li>
              <li>
                <kbd>Tab</kbd> - Navigate between elements
              </li>
            </ul>

            <h3>Tips</h3>
            <ul>
              <li>Use voice commands to log symptoms quickly</li>
              <li>Set medication reminders for better adherence</li>
              <li>Track vital signs regularly for better health monitoring</li>
              <li>Emergency contacts are always accessible</li>
            </ul>
          </div>
        </details>
      </div>
    </div>
  );
};

export default HealthMonitor;
