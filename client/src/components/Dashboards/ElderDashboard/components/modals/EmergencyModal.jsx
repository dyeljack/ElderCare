import React, { useEffect, useState } from 'react';
import { 
  Phone, 
  AlertTriangle, 
  X, 
  ShieldAlert, 
  Volume2, 
  VolumeX, 
  MapPin, 
  HeartPulse, 
  Building2, 
  UserCheck, 
  Copy, 
  Check, 
  Activity,
  Ambulance
} from 'lucide-react';
import { useElderCare } from '../../context/ElderCareContext.jsx';
import { startEmergencyAlarm, stopEmergencyAlarm, isAlarmActive } from '../../utils/audioAlarm.js';

export default function EmergencyModal() {
  const { isEmergencyModalOpen, setIsEmergencyModalOpen, showToast } = useElderCare();
  const [alarmPlaying, setAlarmPlaying] = useState(true);
  const [copied, setCopied] = useState(false);

  // Trigger siren alarm automatically when modal opens, stop when closed
  useEffect(() => {
    if (isEmergencyModalOpen) {
      startEmergencyAlarm();
      setAlarmPlaying(true);
    } else {
      stopEmergencyAlarm();
      setAlarmPlaying(false);
    }

    return () => {
      stopEmergencyAlarm();
    };
  }, [isEmergencyModalOpen]);

  if (!isEmergencyModalOpen) return null;

  const handleToggleAlarm = () => {
    if (alarmPlaying) {
      stopEmergencyAlarm();
      setAlarmPlaying(false);
      showToast('Audible alarm muted');
    } else {
      startEmergencyAlarm();
      setAlarmPlaying(true);
      showToast('Audible siren resumed');
    }
  };

  const handleClose = () => {
    stopEmergencyAlarm();
    setAlarmPlaying(false);
    setIsEmergencyModalOpen(false);
    showToast('Emergency alert dismissed');
  };

  const handleCall = (contactName, number) => {
    showToast(`Connecting emergency call to ${contactName} (${number})...`);
    // Attempt standard tel protocol link
    window.location.href = `tel:${number.replace(/[^0-9]/g, '')}`;
  };

  const handleCopyMedicalInfo = () => {
    const info = `EMERGENCY MEDICAL PROFILE:
Patient: Arthur Vance (Age 76)
Location: 742 Evergreen Terrace, Apt 4B (Gate #4290)
Blood Type: O+ | Allergies: Penicillin, Sulfa
Conditions: Hypertension, Post-Cardiac Recovery
Caretaker: Nurse Maria Santos (555-0192)
Emergency Contact: Emily Vance (555-0188)`;

    navigator.clipboard?.writeText(info);
    setCopied(true);
    showToast('Medical info & address copied to clipboard');
    setTimeout(() => setCopied(false), 2500);
  };

  const localEmergencyContacts = [
    {
      category: 'Immediate Emergency Services',
      items: [
        {
          id: '100',
          name: '100 Emergency Dispatch',
          role: 'Police • Fire • Paramedics',
          number: '100',
          priority: true,
          actionColor: 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white',
          tag: 'FASTEST DISPATCH',
          tagColor: 'bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300'
        },
        {
          id: 'hospital-er',
          name: 'St. Jude Senior Medical Center',
          role: '24/7 Geriatric Emergency Room • 1.2 mi (4 min ETA)',
          number: '(555) 019-9911',
          priority: false,
          actionColor: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white',
          tag: '24/7 HOSPITAL ER',
          tagColor: 'bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300'
        },
        {
          id: 'ambulance',
          name: 'Metro Paramedic Rapid Response',
          role: 'Direct Ambulance & Mobile Medical Unit',
          number: '(555) 014-4321',
          priority: false,
          actionColor: 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white',
          tag: 'AMBULANCE',
          tagColor: 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300'
        },
        {
          id: 'poison-control',
          name: 'National Poison & Toxin Helpline',
          role: 'Accidental Overdose or Chemical Ingestion',
          number: '1-800-222-1222',
          priority: false,
          actionColor: 'bg-slate-700 hover:bg-slate-800 active:bg-slate-900 text-white',
          tag: 'TOXICOLOGY',
          tagColor: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
        }
      ]
    },
    {
      category: 'Primary Caregiver & Family Contacts',
      items: [
        {
          id: 'nurse',
          name: 'Nurse Maria Santos, RN',
          role: 'Primary On-Duty Caretaker (Currently On-Call)',
          number: '555-0192',
          priority: false,
          actionColor: 'bg-teal-600 hover:bg-teal-700 text-white',
          tag: 'CARETAKER',
          tagColor: 'bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-200'
        },
        {
          id: 'emily',
          name: 'Emily Vance (Daughter)',
          role: 'Family Emergency Healthcare Proxy',
          number: '555-0188',
          priority: false,
          actionColor: 'bg-emerald-600 hover:bg-emerald-700 text-white',
          tag: 'FAMILY PROXY',
          tagColor: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200'
        }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div className="theme-bg-card border-2 border-red-500 rounded-3xl p-5 sm:p-7 max-w-2xl w-full shadow-2xl space-y-5 my-auto max-h-[92vh] overflow-y-auto">
        
        {/* Header with Siren Indicator */}
        <div className="flex items-start justify-between gap-4 border-b theme-border pb-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-red-100 dark:bg-red-950/80 rounded-2xl text-red-600 shrink-0 relative">
              <ShieldAlert className="w-9 h-9 animate-pulse text-red-600" />
              {alarmPlaying && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-600 rounded-full animate-ping" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-serif font-bold text-red-600 dark:text-red-400 leading-tight">
                  Emergency Assistance
                </h3>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 animate-pulse">
                  Active Alert
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Audible alarm triggered • Local emergency responders & contacts ready
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close emergency modal"
          >
            <X className="w-9 h-9" />
          </button>
        </div>

        {/* Alarm Siren Control Banner */}
        <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
          alarmPlaying 
            ? 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-800/80 text-red-900 dark:text-red-200' 
            : 'bg-slate-100 dark:bg-slate-800/70 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl shrink-0 ${alarmPlaying ? 'bg-red-200 dark:bg-red-900 text-red-700' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
              {alarmPlaying ? <Volume2 className="w-9 h-9 animate-bounce" /> : <VolumeX className="w-9 h-9" />}
            </div>
            <div>
              <p className="text-sm font-bold">
                {alarmPlaying ? '🔊 Audible Siren is Sounding' : '🔇 Audible Siren Muted'}
              </p>
              <p className="text-xs opacity-80">
                {alarmPlaying ? 'Synthesizing two-tone audible alarm for nearby assistance' : 'Alarm audio paused. Responders still accessible below.'}
              </p>
            </div>
          </div>

          <button
            onClick={handleToggleAlarm}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
              alarmPlaying 
                ? 'bg-red-600 hover:bg-red-700 text-white shadow-sm' 
                : 'bg-slate-700 hover:bg-slate-800 text-white'
            }`}
          >
            {alarmPlaying ? 'Silence Siren' : 'Resume Siren'}
          </button>
        </div>

        {/* Patient Emergency Flash Card / Location Box */}
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2 font-bold text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-9 h-9 text-amber-700 dark:text-amber-400" />
              <span>Arthur Vance • 742 Evergreen Terrace, Apt 4B</span>
            </div>
            <button
              onClick={handleCopyMedicalInfo}
              className="flex items-center gap-1 bg-amber-200/80 dark:bg-amber-900 hover:bg-amber-300 text-amber-900 dark:text-amber-100 px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-9 h-9" /> : <Copy className="w-9 h-9" />}
              <span>{copied ? 'Copied' : 'Copy for Dispatch'}</span>
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] opacity-90">
            <span><strong>Blood:</strong> O+</span>
            {/* <span>•</span> */}
            <span><strong>Allergies:</strong> Penicillin, Sulfa</span>
            {/* <span>•</span> */}
            <span><strong>Medical:</strong> Hypertension, Post-Cardiac</span>
            {/* <span>•</span> */}
            <span><strong>Gate Code:</strong> #4290</span>
          </div>
        </div>

        {/* Local Emergency Contacts List */}
        <div className="space-y-4">
          {localEmergencyContacts.map((section, idx) => (
            <div key={idx} className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
                {section.category}
              </h4>
              <div className="space-y-2">
                {section.items.map((contact) => (
                  <div
                    key={contact.id}
                    className={`p-3.5 rounded-2xl border theme-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                      contact.priority 
                        ? 'bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-900/60' 
                        : 'theme-bg-card hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-base theme-text-heading">
                          {contact.name}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${contact.tagColor}`}>
                          {contact.tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {contact.role}
                      </p>
                      <p className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                        {contact.number}
                      </p>
                    </div>

                    <button
                      onClick={() => handleCall(contact.name, contact.number)}
                      className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all transform active:scale-95 cursor-pointer shrink-0 ${contact.actionColor}`}
                    >
                      <Phone className="w-9 h-9" />
                      <span>Call {contact.number}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="pt-2 border-t theme-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400 text-center sm:text-left">
            In life-threatening situations, dial <strong>911</strong> immediately.
          </p>
          <button
            onClick={handleClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl border theme-border font-semibold text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-center"
          >
            Cancel Alert / False Alarm
          </button>
        </div>

      </div>
    </div>
  );
}
