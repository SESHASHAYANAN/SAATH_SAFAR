import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, Phone, MapPin, Calendar, Edit3, Save, X, Check,
  Camera, Upload, Download, Trash2, Eye, EyeOff, Lock, Unlock,
  Shield, Bell, Globe, Accessibility, Heart, Activity, BarChart3,
  Settings, Home, ChevronLeft, ChevronRight, ChevronDown, ChevronUp,
  Star, Award, Target, TrendingUp, Clock, Users, MessageSquare,
  BookOpen, Zap, Brain, Sparkles, AlertTriangle, Info, HelpCircle,
  RefreshCw, Share2, Copy, ExternalLink, Plus, Minus, Volume2,
  VolumeX, Mic, MicOff, Sun, Moon, Contrast, Type, MousePointer,
  Keyboard, Monitor, Headphones, Speaker, Gamepad2, Wifi, Battery
} from 'lucide-react';
import './Profile.css';

// Custom hooks for profile management
const useProfileData = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockProfile = {
          id: 'user_12345',
          personalInfo: {
            firstName: 'John',
            lastName: 'Doe',
            email: localStorage.getItem('userEmail') || 'john.doe@example.com',
            phone: '+1 (555) 123-4567',
            dateOfBirth: '1985-06-15',
            address: {
              street: '123 Main Street',
              city: 'San Francisco',
              state: 'CA',
              zipCode: '94105',
              country: 'United States'
            },
            profilePicture: '/api/placeholder/150/150',
            bio: 'Accessibility advocate and technology enthusiast passionate about inclusive design.',
            website: 'https://johndoe.example.com',
            socialMedia: {
              twitter: '@johndoe',
              linkedin: 'linkedin.com/in/johndoe',
              github: 'github.com/johndoe'
            }
          },
          accessibilityProfile: {
            primaryDisability: 'visual_impairment',
            assistiveTechnologies: ['screen_reader', 'magnification', 'voice_control'],
            preferredInteractionMethods: ['keyboard', 'voice', 'gesture'],
            cognitiveSupport: {
              needsSimplification: true,
              prefersAudio: true,
              requiresMoreTime: true,
              benefitsFromReminders: true
            },
            physicalSupport: {
              mobilityLimitations: false,
              fineDexterityIssues: true,
              strengthLimitations: false,
              fatigueManagement: true
            },
            sensorySupport: {
              visualImpairment: 'partial',
              hearingImpairment: 'none',
              colorBlindness: 'protanopia',
              lightSensitivity: true,
              soundSensitivity: false
            }
          },
          preferences: {
            accessibility: {
              fontSize: 'large',
              contrast: 'high',
              colorScheme: 'dark',
              motionReduced: true,
              screenReader: true,
              keyboardNavigation: true,
              voiceCommands: true,
              textToSpeech: true,
              captions: true,
              signLanguage: false,
              magnification: 200,
              speechRate: 1.2,
              brailleDotSize: 'medium'
            },
            communication: {
              preferredLanguage: 'en-US',
              alternativeLanguages: ['es-ES', 'fr-FR'],
              communicationStyle: 'detailed',
              notificationFrequency: 'important_only',
              reminderType: 'audio_visual',
              feedbackType: 'immediate'
            },
            privacy: {
              profileVisibility: 'friends_only',
              shareUsageData: true,
              allowPersonalization: true,
              dataRetention: '2_years',
              marketingOptIn: false,
              researchParticipation: true
            },
            interface: {
              theme: 'auto',
              layout: 'grid',
              sidebarPosition: 'left',
              toolbarVisible: true,
              breadcrumbsVisible: true,
              shortcutsVisible: true,
              animationsEnabled: false,
              soundEffectsEnabled: true
            }
          },
          healthData: {
            conditions: [
              {
                name: 'Macular Degeneration',
                severity: 'moderate',
                diagnosisDate: '2018-03-15',
                treatment: 'medication_therapy',
                impact: 'high'
              },
              {
                name: 'Arthritis',
                severity: 'mild',
                diagnosisDate: '2020-11-08',
                treatment: 'physical_therapy',
                impact: 'low'
              }
            ],
            medications: [
              {
                name: 'Lucentis',
                dosage: '0.5mg',
                frequency: 'monthly',
                purpose: 'macular_degeneration',
                sideEffects: ['injection_site_reaction']
              }
            ],
            emergencyContacts: [
              {
                name: 'Jane Doe',
                relationship: 'spouse',
                phone: '+1 (555) 987-6543',
                email: 'jane.doe@example.com',
                isPrimary: true
              },
              {
                name: 'Dr. Smith',
                relationship: 'doctor',
                phone: '+1 (555) 456-7890',
                email: 'dr.smith@medical.com',
                isPrimary: false
              }
            ]
          },
          statistics: {
            accountCreated: '2023-01-15T10:30:00Z',
            lastLogin: new Date().toISOString(),
            totalSessions: 127,
            totalTimeSpent: 14520, // minutes
            aiInteractions: 89,
            accessibilityScore: 92,
            featuresUsed: 15,
            helpRequestsCount: 3,
            settingsChangesCount: 23,
            feedbackSubmitted: 7
          },
          achievements: [
            {
              id: 'accessibility_advocate',
              name: 'Accessibility Advocate',
              description: 'Helped improve 5+ accessibility features',
              earnedDate: '2024-03-20T14:15:00Z',
              icon: 'accessibility',
              level: 'gold'
            },
            {
              id: 'ai_explorer',
              name: 'AI Explorer',
              description: 'Had 50+ conversations with AI assistant',
              earnedDate: '2024-02-14T09:22:00Z',
              icon: 'brain',
              level: 'silver'
            },
            {
              id: 'community_helper',
              name: 'Community Helper',
              description: 'Provided support to 10+ community members',
              earnedDate: '2024-01-30T16:45:00Z',
              icon: 'users',
              level: 'bronze'
            }
          ]
        };
        
        setProfile(mockProfile);
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const saveProfile = useCallback(async (updatedProfile) => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProfile(updatedProfile);
      setLastSaved(new Date());
      return true;
    } catch (error) {
      console.error('Failed to save profile:', error);
      return false;
    } finally {
      setSaving(false);
    }
  }, []);

  const exportProfile = useCallback(async () => {
    if (!profile) return null;
    
    const exportData = {
      ...profile,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `profile_${profile.id}_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    return exportFileDefaultName;
  }, [profile]);

  return {
    profile,
    setProfile,
    loading,
    saving,
    lastSaved,
    saveProfile,
    exportProfile
  };
};

const useAccessibilitySettings = () => {
  const [settings, setSettings] = useState({
    fontSize: 'medium',
    contrast: 'normal',
    motionReduced: false,
    screenReader: false,
    keyboardNavigation: true,
    voiceCommands: false,
    textToSpeech: false,
    highContrast: false,
    largeText: false,
    colorBlind: false,
    dyslexiaMode: false,
    darkMode: false
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibilitySettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const updateSetting = useCallback((key, value) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      localStorage.setItem('accessibilitySettings', JSON.stringify(newSettings));
      return newSettings;
    });
  }, []);

  return { settings, updateSetting };
};

// Component for editing personal information
const PersonalInfoEditor = ({ personalInfo, onSave, onCancel, saving }) => {
  const [editedInfo, setEditedInfo] = useState(personalInfo);
  const [errors, setErrors] = useState({});

  const validateField = useCallback((field, value) => {
    switch (field) {
      case 'email':
        return /\S+@\S+\.\S+/.test(value) ? '' : 'Please enter a valid email address';
      case 'phone':
        return /^\+?[\d\s\-\(\)]+$/.test(value) ? '' : 'Please enter a valid phone number';
      case 'firstName':
      case 'lastName':
        return value.trim().length > 0 ? '' : 'This field is required';
      default:
        return '';
    }
  }, []);

  const handleInputChange = useCallback((field, value) => {
    setEditedInfo(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    const error = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  }, [validateField]);

  const handleAddressChange = useCallback((field, value) => {
    setEditedInfo(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  }, []);

  const handleSocialMediaChange = useCallback((platform, value) => {
    setEditedInfo(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    // Validate all required fields
    const newErrors = {};
    ['firstName', 'lastName', 'email', 'phone'].forEach(field => {
      const error = validateField(field, editedInfo[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length === 0) {
      onSave(editedInfo);
    } else {
      setErrors(newErrors);
    }
  }, [editedInfo, validateField, onSave]);

  return (
    <motion.div
      className="personal-info-editor"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">
                First Name <span className="required">*</span>
              </label>
              <input
                id="firstName"
                type="text"
                value={editedInfo.firstName}
                onChange={e => handleInputChange('firstName', e.target.value)}
                className={errors.firstName ? 'error' : ''}
                required
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="lastName">
                Last Name <span className="required">*</span>
              </label>
              <input
                id="lastName"
                type="text"
                value={editedInfo.lastName}
                onChange={e => handleInputChange('lastName', e.target.value)}
                className={errors.lastName ? 'error' : ''}
                required
              />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">
                Email Address <span className="required">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={editedInfo.email}
                onChange={e => handleInputChange('email', e.target.value)}
                className={errors.email ? 'error' : ''}
                required
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="phone">
                Phone Number <span className="required">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={editedInfo.phone}
                onChange={e => handleInputChange('phone', e.target.value)}
                className={errors.phone ? 'error' : ''}
                required
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              id="dateOfBirth"
              type="date"
              value={editedInfo.dateOfBirth}
              onChange={e => handleInputChange('dateOfBirth', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              value={editedInfo.bio}
              onChange={e => handleInputChange('bio', e.target.value)}
              rows={4}
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="url"
              value={editedInfo.website}
              onChange={e => handleInputChange('website', e.target.value)}
              placeholder="https://yourwebsite.com"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Address</h3>
          <div className="form-group">
            <label htmlFor="street">Street Address</label>
            <input
              id="street"
              type="text"
              value={editedInfo.address.street}
              onChange={e => handleAddressChange('street', e.target.value)}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                value={editedInfo.address.city}
                onChange={e => handleAddressChange('city', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                id="state"
                type="text"
                value={editedInfo.address.state}
                onChange={e => handleAddressChange('state', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="zipCode">ZIP Code</label>
              <input
                id="zipCode"
                type="text"
                value={editedInfo.address.zipCode}
                onChange={e => handleAddressChange('zipCode', e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <select
              id="country"
              value={editedInfo.address.country}
              onChange={e => handleAddressChange('country', e.target.value)}
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-section">
          <h3>Social Media</h3>
          <div className="form-group">
            <label htmlFor="twitter">Twitter</label>
            <input
              id="twitter"
              type="text"
              value={editedInfo.socialMedia.twitter}
              onChange={e => handleSocialMediaChange('twitter', e.target.value)}
              placeholder="@username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="linkedin">LinkedIn</label>
            <input
              id="linkedin"
              type="url"
              value={editedInfo.socialMedia.linkedin}
              onChange={e => handleSocialMediaChange('linkedin', e.target.value)}
              placeholder="linkedin.com/in/username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="github">GitHub</label>
            <input
              id="github"
              type="url"
              value={editedInfo.socialMedia.github}
              onChange={e => handleSocialMediaChange('github', e.target.value)}
              placeholder="github.com/username"
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={onCancel}
            disabled={saving}
          >
            <X size={16} />
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={saving}
          >
            {saving ? (
              <>
                <RefreshCw className="spin" size={16} />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

// Accessibility Profile Editor Component
const AccessibilityProfileEditor = ({ accessibilityProfile, onSave, onCancel, saving }) => {
  const [editedProfile, setEditedProfile] = useState(accessibilityProfile);

  const handleInputChange = useCallback((section, field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  }, []);

  const handleArrayChange = useCallback((field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onSave(editedProfile);
  }, [editedProfile, onSave]);

  const assistiveTechOptions = [
    { value: 'screen_reader', label: 'Screen Reader' },
    { value: 'magnification', label: 'Screen Magnification' },
    { value: 'voice_control', label: 'Voice Control' },
    { value: 'eye_tracking', label: 'Eye Tracking' },
    { value: 'switch_control', label: 'Switch Control' },
    { value: 'keyboard_alternatives', label: 'Keyboard Alternatives' },
    { value: 'braille_display', label: 'Braille Display' },
    { value: 'hearing_aids', label: 'Hearing Aids' }
  ];

  const interactionMethods = [
    { value: 'keyboard', label: 'Keyboard' },
    { value: 'mouse', label: 'Mouse' },
    { value: 'touch', label: 'Touch' },
    { value: 'voice', label: 'Voice' },
    { value: 'gesture', label: 'Gesture' },
    { value: 'eye_gaze', label: 'Eye Gaze' },
    { value: 'switch', label: 'Switch Control' }
  ];

  return (
    <motion.div
      className="accessibility-profile-editor"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-section">
          <h3>Primary Information</h3>
          <div className="form-group">
            <label htmlFor="primaryDisability">Primary Disability</label>
            <select
              id="primaryDisability"
              value={editedProfile.primaryDisability}
              onChange={e => handleInputChange('', 'primaryDisability', e.target.value)}
            >
              <option value="">Select...</option>
              <option value="visual_impairment">Visual Impairment</option>
              <option value="hearing_impairment">Hearing Impairment</option>
              <option value="motor_impairment">Motor Impairment</option>
              <option value="cognitive_impairment">Cognitive Impairment</option>
              <option value="speech_impairment">Speech Impairment</option>
              <option value="multiple_disabilities">Multiple Disabilities</option>
              <option value="temporary_disability">Temporary Disability</option>
            </select>
          </div>

          <div className="form-group">
            <label>Assistive Technologies Used</label>
            <div className="checkbox-group">
              {assistiveTechOptions.map(option => (
                <label key={option.value} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={editedProfile.assistiveTechnologies.includes(option.value)}
                    onChange={e => {
                      const currentTech = editedProfile.assistiveTechnologies;
                      if (e.target.checked) {
                        handleArrayChange('assistiveTechnologies', [...currentTech, option.value]);
                      } else {
                        handleArrayChange('assistiveTechnologies', currentTech.filter(t => t !== option.value));
                      }
                    }}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Preferred Interaction Methods</label>
            <div className="checkbox-group">
              {interactionMethods.map(method => (
                <label key={method.value} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={editedProfile.preferredInteractionMethods.includes(method.value)}
                    onChange={e => {
                      const currentMethods = editedProfile.preferredInteractionMethods;
                      if (e.target.checked) {
                        handleArrayChange('preferredInteractionMethods', [...currentMethods, method.value]);
                      } else {
                        handleArrayChange('preferredInteractionMethods', currentMethods.filter(m => m !== method.value));
                      }
                    }}
                  />
                  <span>{method.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Cognitive Support Needs</h3>
          <div className="toggle-group">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={editedProfile.cognitiveSupport.needsSimplification}
                onChange={e => handleInputChange('cognitiveSupport', 'needsSimplification', e.target.checked)}
              />
              <span>Needs simplified language and instructions</span>
            </label>
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={editedProfile.cognitiveSupport.prefersAudio}
                onChange={e => handleInputChange('cognitiveSupport', 'prefersAudio', e.target.checked)}
              />
              <span>Prefers audio content over text</span>
            </label>
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={editedProfile.cognitiveSupport.requiresMoreTime}
                onChange={e => handleInputChange('cognitiveSupport', 'requiresMoreTime', e.target.checked)}
              />
              <span>Requires more time for tasks</span>
            </label>
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={editedProfile.cognitiveSupport.benefitsFromReminders}
                onChange={e => handleInputChange('cognitiveSupport', 'benefitsFromReminders', e.target.checked)}
              />
              <span>Benefits from reminders and prompts</span>
            </label>
          </div>
        </div>

        <div className="form-section">
          <h3>Physical Support Needs</h3>
          <div className="toggle-group">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={editedProfile.physicalSupport.mobilityLimitations}
                onChange={e => handleInputChange('physicalSupport', 'mobilityLimitations', e.target.checked)}
              />
              <span>Has mobility limitations</span>
            </label>
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={editedProfile.physicalSupport.fineDexterityIssues}
                onChange={e => handleInputChange('physicalSupport', 'fineDexterityIssues', e.target.checked)}
              />
              <span>Has fine motor/dexterity issues</span>
            </label>
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={editedProfile.physicalSupport.strengthLimitations}
                onChange={e => handleInputChange('physicalSupport', 'strengthLimitations', e.target.checked)}
              />
              <span>Has strength limitations</span>
            </label>
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={editedProfile.physicalSupport.fatigueManagement}
                onChange={e => handleInputChange('physicalSupport', 'fatigueManagement', e.target.checked)}
              />
              <span>Needs fatigue management support</span>
            </label>
          </div>
        </div>

        <div className="form-section">
          <h3>Sensory Support Needs</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="visualImpairment">Visual Impairment</label>
              <select
                id="visualImpairment"
                value={editedProfile.sensorySupport.visualImpairment}
                onChange={e => handleInputChange('sensorySupport', 'visualImpairment', e.target.value)}
              >
                <option value="none">None</option>
                <option value="mild">Mild</option>
                <option value="partial">Partial</option>
                <option value="severe">Severe</option>
                <option value="total">Total</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="hearingImpairment">Hearing Impairment</label>
              <select
                id="hearingImpairment"
                value={editedProfile.sensorySupport.hearingImpairment}
                onChange={e => handleInputChange('sensorySupport', 'hearingImpairment', e.target.value)}
              >
                <option value="none">None</option>
                <option value="mild">Mild</option>
                <option value="moderate">Moderate</option>
                <option value="severe">Severe</option>
                <option value="profound">Profound</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="colorBlindness">Color Blindness</label>
              <select
                id="colorBlindness"
                value={editedProfile.sensorySupport.colorBlindness}
                onChange={e => handleInputChange('sensorySupport', 'colorBlindness', e.target.value)}
              >
                <option value="none">None</option>
                <option value="protanopia">Protanopia (Red-blind)</option>
                <option value="deuteranopia">Deuteranopia (Green-blind)</option>
                <option value="tritanopia">Tritanopia (Blue-blind)</option>
                <option value="achromatopsia">Achromatopsia (Complete)</option>
              </select>
            </div>
          </div>

          <div className="toggle-group">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={editedProfile.sensorySupport.lightSensitivity}
                onChange={e => handleInputChange('sensorySupport', 'lightSensitivity', e.target.checked)}
              />
              <span>Light sensitivity</span>
            </label>
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={editedProfile.sensorySupport.soundSensitivity}
                onChange={e => handleInputChange('sensorySupport', 'soundSensitivity', e.target.checked)}
              />
              <span>Sound sensitivity</span>
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={onCancel}
            disabled={saving}
          >
            <X size={16} />
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={saving}
          >
            {saving ? (
              <>
                <RefreshCw className="spin" size={16} />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

// Statistics Component
const ProfileStatistics = ({ statistics, achievements }) => {
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAchievementIcon = (iconType) => {
    switch (iconType) {
      case 'accessibility': return <Accessibility size={24} />;
      case 'brain': return <Brain size={24} />;
      case 'users': return <Users size={24} />;
      default: return <Star size={24} />;
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'gold': return '#FFD700';
      case 'silver': return '#C0C0C0';
      case 'bronze': return '#CD7F32';
      default: return '#888';
    }
  };

  return (
    <div className="profile-statistics">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Calendar size={24} />
          </div>
          <div className="stat-content">
            <h3>Member Since</h3>
            <p>{formatDate(statistics.accountCreated)}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Activity size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Sessions</h3>
            <p>{statistics.totalSessions}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <h3>Time Spent</h3>
            <p>{formatDuration(statistics.totalTimeSpent)}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <MessageSquare size={24} />
          </div>
          <div className="stat-content">
            <h3>AI Interactions</h3>
            <p>{statistics.aiInteractions}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Accessibility size={24} />
          </div>
          <div className="stat-content">
            <h3>Accessibility Score</h3>
            <p>{statistics.accessibilityScore}%</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Zap size={24} />
          </div>
          <div className="stat-content">
            <h3>Features Used</h3>
            <p>{statistics.featuresUsed}</p>
          </div>
        </div>
      </div>

      <div className="achievements-section">
        <h3>Achievements</h3>
        <div className="achievements-grid">
          {achievements.map(achievement => (
            <motion.div
              key={achievement.id}
              className={`achievement-card ${achievement.level}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div 
                className="achievement-icon"
                style={{ color: getLevelColor(achievement.level) }}
              >
                {getAchievementIcon(achievement.icon)}
              </div>
              <div className="achievement-content">
                <h4>{achievement.name}</h4>
                <p>{achievement.description}</p>
                <time>{formatDate(achievement.earnedDate)}</time>
              </div>
              <div className={`achievement-badge ${achievement.level}`}>
                {achievement.level}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Profile Component
const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [editingPersonalInfo, setEditingPersonalInfo] = useState(false);
  const [editingAccessibility, setEditingAccessibility] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [profilePictureFile, setProfilePictureFile] = useState(null);

  // Hooks
  const { profile, setProfile, loading, saving, lastSaved, saveProfile, exportProfile } = useProfileData();
  const { settings, updateSetting } = useAccessibilitySettings();

  // Refs
  const fileInputRef = useRef(null);
  const mainContentRef = useRef(null);

  // Announcement function
  const announce = useCallback((message) => {
    setAnnouncement(message);
    setTimeout(() => setAnnouncement(''), 5000);
  }, []);

  // Handle profile picture upload
  const handleProfilePictureUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        announce('Profile picture must be smaller than 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        announce('Please select a valid image file');
        return;
      }

      setProfilePictureFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            profilePicture: e.target.result
          }
        }));
      };
      reader.readAsDataURL(file);
      
      announce('Profile picture updated. Don\'t forget to save your changes.');
    }
  }, [announce, setProfile]);

  // Handle save personal info
  const handleSavePersonalInfo = useCallback(async (updatedPersonalInfo) => {
    const updatedProfile = {
      ...profile,
      personalInfo: updatedPersonalInfo
    };
    
    const success = await saveProfile(updatedProfile);
    if (success) {
      setEditingPersonalInfo(false);
      announce('Personal information saved successfully');
    } else {
      announce('Failed to save personal information. Please try again.');
    }
  }, [profile, saveProfile, announce]);

  // Handle save accessibility profile
  const handleSaveAccessibilityProfile = useCallback(async (updatedAccessibilityProfile) => {
    const updatedProfile = {
      ...profile,
      accessibilityProfile: updatedAccessibilityProfile
    };
    
    const success = await saveProfile(updatedProfile);
    if (success) {
      setEditingAccessibility(false);
      announce('Accessibility profile saved successfully');
    } else {
      announce('Failed to save accessibility profile. Please try again.');
    }
  }, [profile, saveProfile, announce]);

  // Handle export profile
  const handleExportProfile = useCallback(async () => {
    announce('Exporting profile data...');
    const filename = await exportProfile();
    if (filename) {
      announce(`Profile exported successfully as ${filename}`);
    } else {
      announce('Failed to export profile data');
    }
  }, [exportProfile, announce]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            setActiveTab('overview');
            break;
          case '2':
            e.preventDefault();
            setActiveTab('personal');
            break;
          case '3':
            e.preventDefault();
            setActiveTab('accessibility');
            break;
          case '4':
            e.preventDefault();
            setActiveTab('health');
            break;
          case '5':
            e.preventDefault();
            setActiveTab('statistics');
            break;
          case 'e':
            e.preventDefault();
            if (activeTab === 'personal') {
              setEditingPersonalInfo(true);
            } else if (activeTab === 'accessibility') {
              setEditingAccessibility(true);
            }
            break;
          case 'x':
            e.preventDefault();
            handleExportProfile();
            break;
          case 'h':
            e.preventDefault();
            announceHelp();
            break;
        }
      } else if (e.key === 'Escape') {
        setEditingPersonalInfo(false);
        setEditingAccessibility(false);
      }
    };

    const announceHelp = () => {
      const helpText = `
        Profile page keyboard shortcuts:
        Alt+1-5: Navigate between tabs
        Alt+E: Edit current section
        Alt+X: Export profile data
        Alt+H: Help
        Escape: Cancel editing
      `;
      announce(helpText);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, handleExportProfile, announce]);

  if (loading) {
    return (
      <div className="profile-loading" role="status" aria-live="polite">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="loading-spinner"
        >
          <RefreshCw size={48} />
        </motion.div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-error" role="alert">
        <AlertTriangle size={48} />
        <h2>Unable to Load Profile</h2>
        <p>There was an error loading your profile data. Please try refreshing the page.</p>
        <button onClick={() => window.location.reload()} className="btn-primary">
          <RefreshCw size={16} />
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div className={`profile-container ${settings.highContrast ? 'high-contrast' : ''} ${settings.largeText ? 'large-text' : ''} ${settings.dyslexiaMode ? 'dyslexia-font' : ''} ${settings.darkMode ? 'dark-mode' : ''}`}>
      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* Skip navigation */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Header */}
      <header className="profile-header" role="banner">
        <div className="header-content">
          <div className="header-left">
            <button
              className="back-button"
              onClick={() => navigate('/dashboard')}
              aria-label="Back to dashboard"
            >
              <ChevronLeft size={20} />
              <span>Back</span>
            </button>
            <h1 className="page-title">My Profile</h1>
          </div>

          <div className="header-right">
            <button
              className="header-button"
              onClick={handleExportProfile}
              aria-label="Export profile data"
              title="Alt+X"
            >
              <Download size={20} />
              <span>Export</span>
            </button>
            
            {lastSaved && (
              <div className="last-saved" role="status">
                <Check size={16} />
                <span>Saved {lastSaved.toLocaleTimeString()}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main id="main-content" className="profile-main" role="main">
        {/* Profile header card */}
        <div className="profile-header-card">
          <div className="profile-picture-section">
            <div className="profile-picture-container">
              <img
                src={profile.personalInfo.profilePicture}
                alt={`${profile.personalInfo.firstName} ${profile.personalInfo.lastName}`}
                className="profile-picture"
              />
              <button
                className="profile-picture-edit"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Change profile picture"
              >
                <Camera size={16} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleProfilePictureUpload}
                className="sr-only"
              />
            </div>
          </div>
          
          <div className="profile-header-info">
            <h2 className="profile-name">
              {profile.personalInfo.firstName} {profile.personalInfo.lastName}
            </h2>
            <p className="profile-email">{profile.personalInfo.email}</p>
            {profile.personalInfo.bio && (
              <p className="profile-bio">{profile.personalInfo.bio}</p>
            )}
            <div className="profile-meta">
              <span className="meta-item">
                <Calendar size={14} />
                Member since {new Date(profile.statistics.accountCreated).toLocaleDateString()}
              </span>
              <span className="meta-item">
                <Activity size={14} />
                {profile.statistics.accessibilityScore}% Accessibility Score
              </span>
            </div>
          </div>
        </div>

        {/* Navigation tabs */}
        <nav className="profile-tabs" role="tablist">
          <button
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
            role="tab"
            aria-selected={activeTab === 'overview'}
            aria-controls="overview-panel"
            id="overview-tab"
          >
            <Eye size={16} />
            Overview
          </button>
          <button
            className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
            role="tab"
            aria-selected={activeTab === 'personal'}
            aria-controls="personal-panel"
            id="personal-tab"
          >
            <User size={16} />
            Personal Info
          </button>
          <button
            className={`tab-button ${activeTab === 'accessibility' ? 'active' : ''}`}
            onClick={() => setActiveTab('accessibility')}
            role="tab"
            aria-selected={activeTab === 'accessibility'}
            aria-controls="accessibility-panel"
            id="accessibility-tab"
          >
            <Accessibility size={16} />
            Accessibility
          </button>
          <button
            className={`tab-button ${activeTab === 'health' ? 'active' : ''}`}
            onClick={() => setActiveTab('health')}
            role="tab"
            aria-selected={activeTab === 'health'}
            aria-controls="health-panel"
            id="health-tab"
          >
            <Heart size={16} />
            Health
          </button>
          <button
            className={`tab-button ${activeTab === 'statistics' ? 'active' : ''}`}
            onClick={() => setActiveTab('statistics')}
            role="tab"
            aria-selected={activeTab === 'statistics'}
            aria-controls="statistics-panel"
            id="statistics-tab"
          >
            <BarChart3 size={16} />
            Statistics
          </button>
        </nav>

        {/* Tab content */}
        <div className="profile-content">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="tab-panel"
                role="tabpanel"
                id="overview-panel"
                aria-labelledby="overview-tab"
              >
                <div className="overview-grid">
                  <div className="overview-card">
                    <h3>Quick Stats</h3>
                    <div className="quick-stats">
                      <div className="quick-stat">
                        <span className="stat-value">{profile.statistics.totalSessions}</span>
                        <span className="stat-label">Sessions</span>
                      </div>
                      <div className="quick-stat">
                        <span className="stat-value">{profile.statistics.aiInteractions}</span>
                        <span className="stat-label">AI Chats</span>
                      </div>
                      <div className="quick-stat">
                        <span className="stat-value">{profile.statistics.accessibilityScore}%</span>
                        <span className="stat-label">A11y Score</span>
                      </div>
                    </div>
                  </div>

                  <div className="overview-card">
                    <h3>Accessibility at a Glance</h3>
                    <div className="accessibility-summary">
                      <div className="summary-item">
                        <span className="summary-label">Primary Need:</span>
                        <span className="summary-value">
                          {profile.accessibilityProfile.primaryDisability.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Assistive Tech:</span>
                        <span className="summary-value">
                          {profile.accessibilityProfile.assistiveTechnologies.length} tools
                        </span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Interaction Methods:</span>
                        <span className="summary-value">
                          {profile.accessibilityProfile.preferredInteractionMethods.join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="overview-card">
                    <h3>Recent Activity</h3>
                    <div className="activity-summary">
                      <div className="activity-item">
                        <Clock size={16} />
                        <span>Last login: {new Date(profile.statistics.lastLogin).toLocaleDateString()}</span>
                      </div>
                      <div className="activity-item">
                        <Settings size={16} />
                        <span>{profile.statistics.settingsChangesCount} settings changes</span>
                      </div>
                      <div className="activity-item">
                        <MessageSquare size={16} />
                        <span>{profile.statistics.feedbackSubmitted} feedback submissions</span>
                      </div>
                    </div>
                  </div>

                  <div className="overview-card">
                    <h3>Latest Achievement</h3>
                    {profile.achievements.length > 0 && (
                      <div className="latest-achievement">
                        <div className="achievement-icon">
                          {profile.achievements[0].icon === 'accessibility' && <Accessibility size={24} />}
                          {profile.achievements[0].icon === 'brain' && <Brain size={24} />}
                          {profile.achievements[0].icon === 'users' && <Users size={24} />}
                        </div>
                        <div className="achievement-info">
                          <h4>{profile.achievements[0].name}</h4>
                          <p>{profile.achievements[0].description}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'personal' && (
              <motion.div
                key="personal"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="tab-panel"
                role="tabpanel"
                id="personal-panel"
                aria-labelledby="personal-tab"
              >
                {editingPersonalInfo ? (
                  <PersonalInfoEditor
                    personalInfo={profile.personalInfo}
                    onSave={handleSavePersonalInfo}
                    onCancel={() => setEditingPersonalInfo(false)}
                    saving={saving}
                  />
                ) : (
                  <div className="personal-info-display">
                    <div className="section-header">
                      <h2>Personal Information</h2>
                      <button
                        className="btn-primary"
                        onClick={() => setEditingPersonalInfo(true)}
                        aria-label="Edit personal information"
                      >
                        <Edit3 size={16} />
                        Edit
                      </button>
                    </div>

                    <div className="info-grid">
                      <div className="info-section">
                        <h3>Basic Information</h3>
                        <div className="info-group">
                          <div className="info-item">
                            <span className="info-label">Full Name:</span>
                            <span className="info-value">
                              {profile.personalInfo.firstName} {profile.personalInfo.lastName}
                            </span>
                          </div>
                          <div className="info-item">
                            <span className="info-label">Email:</span>
                            <span className="info-value">{profile.personalInfo.email}</span>
                          </div>
                          <div className="info-item">
                            <span className="info-label">Phone:</span>
                            <span className="info-value">{profile.personalInfo.phone}</span>
                          </div>
                          <div className="info-item">
                            <span className="info-label">Date of Birth:</span>
                            <span className="info-value">
                              {new Date(profile.personalInfo.dateOfBirth).toLocaleDateString()}
                            </span>
                          </div>
                          {profile.personalInfo.website && (
                            <div className="info-item">
                              <span className="info-label">Website:</span>
                              <a 
                                href={profile.personalInfo.website} 
                                className="info-link"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {profile.personalInfo.website}
                                <ExternalLink size={14} />
                              </a>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="info-section">
                        <h3>Address</h3>
                        <div className="info-group">
                          <div className="address-display">
                            <p>{profile.personalInfo.address.street}</p>
                            <p>
                              {profile.personalInfo.address.city}, {profile.personalInfo.address.state} {profile.personalInfo.address.zipCode}
                            </p>
                            <p>{profile.personalInfo.address.country}</p>
                          </div>
                        </div>
                      </div>

                      {Object.values(profile.personalInfo.socialMedia).some(value => value) && (
                        <div className="info-section">
                          <h3>Social Media</h3>
                          <div className="info-group">
                            {profile.personalInfo.socialMedia.twitter && (
                              <div className="info-item">
                                <span className="info-label">Twitter:</span>
                                <span className="info-value">{profile.personalInfo.socialMedia.twitter}</span>
                              </div>
                            )}
                            {profile.personalInfo.socialMedia.linkedin && (
                              <div className="info-item">
                                <span className="info-label">LinkedIn:</span>
                                <a 
                                  href={`https://${profile.personalInfo.socialMedia.linkedin}`}
                                  className="info-link"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {profile.personalInfo.socialMedia.linkedin}
                                  <ExternalLink size={14} />
                                </a>
                              </div>
                            )}
                            {profile.personalInfo.socialMedia.github && (
                              <div className="info-item">
                                <span className="info-label">GitHub:</span>
                                <a 
                                  href={`https://${profile.personalInfo.socialMedia.github}`}
                                  className="info-link"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {profile.personalInfo.socialMedia.github}
                                  <ExternalLink size={14} />
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {profile.personalInfo.bio && (
                        <div className="info-section bio-section">
                          <h3>Bio</h3>
                          <p className="bio-text">{profile.personalInfo.bio}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'accessibility' && (
              <motion.div
                key="accessibility"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="tab-panel"
                role="tabpanel"
                id="accessibility-panel"
                aria-labelledby="accessibility-tab"
              >
                {editingAccessibility ? (
                  <AccessibilityProfileEditor
                    accessibilityProfile={profile.accessibilityProfile}
                    onSave={handleSaveAccessibilityProfile}
                    onCancel={() => setEditingAccessibility(false)}
                    saving={saving}
                  />
                ) : (
                  <div className="accessibility-profile-display">
                    <div className="section-header">
                      <h2>Accessibility Profile</h2>
                      <button
                        className="btn-primary"
                        onClick={() => setEditingAccessibility(true)}
                        aria-label="Edit accessibility profile"
                      >
                        <Edit3 size={16} />
                        Edit
                      </button>
                    </div>

                    <div className="accessibility-grid">
                      <div className="accessibility-section">
                        <h3>Primary Information</h3>
                        <div className="accessibility-group">
                          <div className="accessibility-item">
                            <span className="accessibility-label">Primary Disability:</span>
                            <span className="accessibility-value">
                              {profile.accessibilityProfile.primaryDisability.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>
                          <div className="accessibility-item">
                            <span className="accessibility-label">Assistive Technologies:</span>
                            <div className="tech-list">
                              {profile.accessibilityProfile.assistiveTechnologies.map(tech => (
                                <span key={tech} className="tech-tag">
                                  {tech.replace('_', ' ').toUpperCase()}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="accessibility-item">
                            <span className="accessibility-label">Preferred Interaction Methods:</span>
                            <div className="method-list">
                              {profile.accessibilityProfile.preferredInteractionMethods.map(method => (
                                <span key={method} className="method-tag">
                                  {method.toUpperCase()}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="accessibility-section">
                        <h3>Cognitive Support</h3>
                        <div className="support-grid">
                          <div className={`support-item ${profile.accessibilityProfile.cognitiveSupport.needsSimplification ? 'enabled' : 'disabled'}`}>
                            <div className="support-icon">
                              {profile.accessibilityProfile.cognitiveSupport.needsSimplification ? <Check size={16} /> : <X size={16} />}
                            </div>
                            <span>Needs Simplification</span>
                          </div>
                          <div className={`support-item ${profile.accessibilityProfile.cognitiveSupport.prefersAudio ? 'enabled' : 'disabled'}`}>
                            <div className="support-icon">
                              {profile.accessibilityProfile.cognitiveSupport.prefersAudio ? <Check size={16} /> : <X size={16} />}
                            </div>
                            <span>Prefers Audio</span>
                          </div>
                          <div className={`support-item ${profile.accessibilityProfile.cognitiveSupport.requiresMoreTime ? 'enabled' : 'disabled'}`}>
                            <div className="support-icon">
                              {profile.accessibilityProfile.cognitiveSupport.requiresMoreTime ? <Check size={16} /> : <X size={16} />}
                            </div>
                            <span>Requires More Time</span>
                          </div>
                          <div className={`support-item ${profile.accessibilityProfile.cognitiveSupport.benefitsFromReminders ? 'enabled' : 'disabled'}`}>
                            <div className="support-icon">
                              {profile.accessibilityProfile.cognitiveSupport.benefitsFromReminders ? <Check size={16} /> : <X size={16} />}
                            </div>
                            <span>Benefits from Reminders</span>
                          </div>
                        </div>
                      </div>

                      <div className="accessibility-section">
                        <h3>Physical Support</h3>
                        <div className="support-grid">
                          <div className={`support-item ${profile.accessibilityProfile.physicalSupport.mobilityLimitations ? 'enabled' : 'disabled'}`}>
                            <div className="support-icon">
                              {profile.accessibilityProfile.physicalSupport.mobilityLimitations ? <Check size={16} /> : <X size={16} />}
                            </div>
                            <span>Mobility Limitations</span>
                          </div>
                          <div className={`support-item ${profile.accessibilityProfile.physicalSupport.fineDexterityIssues ? 'enabled' : 'disabled'}`}>
                            <div className="support-icon">
                              {profile.accessibilityProfile.physicalSupport.fineDexterityIssues ? <Check size={16} /> : <X size={16} />}
                            </div>
                            <span>Fine Dexterity Issues</span>
                          </div>
                          <div className={`support-item ${profile.accessibilityProfile.physicalSupport.strengthLimitations ? 'enabled' : 'disabled'}`}>
                            <div className="support-icon">
                              {profile.accessibilityProfile.physicalSupport.strengthLimitations ? <Check size={16} /> : <X size={16} />}
                            </div>
                            <span>Strength Limitations</span>
                          </div>
                          <div className={`support-item ${profile.accessibilityProfile.physicalSupport.fatigueManagement ? 'enabled' : 'disabled'}`}>
                            <div className="support-icon">
                              {profile.accessibilityProfile.physicalSupport.fatigueManagement ? <Check size={16} /> : <X size={16} />}
                            </div>
                            <span>Fatigue Management</span>
                          </div>
                        </div>
                      </div>

                      <div className="accessibility-section">
                        <h3>Sensory Support</h3>
                        <div className="sensory-grid">
                          <div className="sensory-item">
                            <span className="sensory-label">Visual Impairment:</span>
                            <span className={`sensory-value ${profile.accessibilityProfile.sensorySupport.visualImpairment !== 'none' ? 'has-impairment' : ''}`}>
                              {profile.accessibilityProfile.sensorySupport.visualImpairment.toUpperCase()}
                            </span>
                          </div>
                          <div className="sensory-item">
                            <span className="sensory-label">Hearing Impairment:</span>
                            <span className={`sensory-value ${profile.accessibilityProfile.sensorySupport.hearingImpairment !== 'none' ? 'has-impairment' : ''}`}>
                              {profile.accessibilityProfile.sensorySupport.hearingImpairment.toUpperCase()}
                            </span>
                          </div>
                          <div className="sensory-item">
                            <span className="sensory-label">Color Blindness:</span>
                            <span className={`sensory-value ${profile.accessibilityProfile.sensorySupport.colorBlindness !== 'none' ? 'has-impairment' : ''}`}>
                              {profile.accessibilityProfile.sensorySupport.colorBlindness.toUpperCase()}
                            </span>
                          </div>
                          <div className="sensory-item">
                            <span className="sensory-label">Light Sensitivity:</span>
                            <span className={`sensory-value ${profile.accessibilityProfile.sensorySupport.lightSensitivity ? 'has-sensitivity' : ''}`}>
                              {profile.accessibilityProfile.sensorySupport.lightSensitivity ? 'YES' : 'NO'}
                            </span>
                          </div>
                          <div className="sensory-item">
                            <span className="sensory-label">Sound Sensitivity:</span>
                            <span className={`sensory-value ${profile.accessibilityProfile.sensorySupport.soundSensitivity ? 'has-sensitivity' : ''}`}>
                              {profile.accessibilityProfile.sensorySupport.soundSensitivity ? 'YES' : 'NO'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'health' && (
              <motion.div
                key="health"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="tab-panel"
                role="tabpanel"
                id="health-panel"
                aria-labelledby="health-tab"
              >
                <div className="health-profile">
                  <div className="section-header">
                    <h2>Health Information</h2>
                    <div className="health-disclaimer">
                      <Info size={16} />
                      <span>This information is private and secure</span>
                    </div>
                  </div>

                  <div className="health-grid">
                    <div className="health-section">
                      <h3>Medical Conditions</h3>
                      <div className="conditions-list">
                        {profile.healthData.conditions.map((condition, index) => (
                          <div key={index} className="condition-card">
                            <div className="condition-header">
                              <h4>{condition.name}</h4>
                              <span className={`severity-badge ${condition.severity}`}>
                                {condition.severity.toUpperCase()}
                              </span>
                            </div>
                            <div className="condition-details">
                              <div className="condition-detail">
                                <span className="detail-label">Diagnosed:</span>
                                <span className="detail-value">
                                  {new Date(condition.diagnosisDate).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="condition-detail">
                                <span className="detail-label">Treatment:</span>
                                <span className="detail-value">
                                  {condition.treatment.replace('_', ' ').toUpperCase()}
                                </span>
                              </div>
                              <div className="condition-detail">
                                <span className="detail-label">Impact:</span>
                                <span className={`detail-value impact-${condition.impact}`}>
                                  {condition.impact.toUpperCase()}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="health-section">
                      <h3>Medications</h3>
                      <div className="medications-list">
                        {profile.healthData.medications.map((medication, index) => (
                          <div key={index} className="medication-card">
                            <div className="medication-header">
                              <h4>{medication.name}</h4>
                              <span className="dosage">{medication.dosage}</span>
                            </div>
                            <div className="medication-details">
                              <div className="medication-detail">
                                <span className="detail-label">Frequency:</span>
                                <span className="detail-value">{medication.frequency}</span>
                              </div>
                              <div className="medication-detail">
                                <span className="detail-label">Purpose:</span>
                                <span className="detail-value">
                                  {medication.purpose.replace('_', ' ').toUpperCase()}
                                </span>
                              </div>
                              {medication.sideEffects.length > 0 && (
                                <div className="medication-detail">
                                  <span className="detail-label">Side Effects:</span>
                                  <div className="side-effects">
                                    {medication.sideEffects.map((effect, idx) => (
                                      <span key={idx} className="side-effect-tag">
                                        {effect.replace('_', ' ')}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="health-section">
                      <h3>Emergency Contacts</h3>
                      <div className="contacts-list">
                        {profile.healthData.emergencyContacts.map((contact, index) => (
                          <div key={index} className={`contact-card ${contact.isPrimary ? 'primary' : ''}`}>
                            <div className="contact-header">
                              <h4>{contact.name}</h4>
                              {contact.isPrimary && (
                                <span className="primary-badge">PRIMARY</span>
                              )}
                            </div>
                            <div className="contact-details">
                              <div className="contact-detail">
                                <Phone size={14} />
                                <span>{contact.phone}</span>
                              </div>
                              <div className="contact-detail">
                                <Mail size={14} />
                                <span>{contact.email}</span>
                              </div>
                              <div className="contact-detail">
                                <User size={14} />
                                <span>{contact.relationship.toUpperCase()}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'statistics' && (
              <motion.div
                key="statistics"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="tab-panel"
                role="tabpanel"
                id="statistics-panel"
                aria-labelledby="statistics-tab"
              >
                <ProfileStatistics 
                  statistics={profile.statistics}
                  achievements={profile.achievements}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Help panel */}
      <div className="help-panel-profile" role="complementary">
        <details>
          <summary>Help & Shortcuts</summary>
          <div className="help-content">
            <h3>Navigation</h3>
            <ul>
              <li><kbd>Alt</kbd> + <kbd>1-5</kbd> - Switch between tabs</li>
              <li><kbd>Alt</kbd> + <kbd>E</kbd> - Edit current section</li>
              <li><kbd>Alt</kbd> + <kbd>X</kbd> - Export profile data</li>
              <li><kbd>Esc</kbd> - Cancel editing</li>
              <li><kbd>Alt</kbd> + <kbd>H</kbd> - Help</li>
            </ul>
            
            <h3>Tips</h3>
            <ul>
              <li>Your profile picture should be under 5MB</li>
              <li>Accessibility settings are automatically saved</li>
              <li>Export your data anytime for backup</li>
              <li>Emergency contacts are securely encrypted</li>
            </ul>
          </div>
        </details>
      </div>
    </div>
  );
};

export default Profile;

