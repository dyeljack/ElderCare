import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, X } from 'lucide-react';
import { audioService } from '../utils/audio.js';

export function PatientSOSModal({
  isOpen,
  onClose,
  patients,
  defaultPatient,
  onTriggerAlert,
  isDarkMode,
}) {
  const [selectedPatientId, setSelectedPatientId] = useState(defaultPatient?.id || patients[0]?.id || '');
  const [emergencyType, setEmergencyType] = useState('Fall Detected');
  const [customNotes, setCustomNotes] = useState('');
  const [isTriggered, setIsTriggered] = useState(false);

  if (!isOpen) return null;

  const currentPatient = patients.find((p) => p.id === selectedPatientId) || patients[0];

  const handleTriggerSOS = () => {
    if (!currentPatient) return;

    // Play synthesized emergency chime
    audioService.playEmergencyAlarm();
    setIsTriggered(true);

    onTriggerAlert({
      patientId: currentPatient.id,
      patientName: currentPatient.name,
      roomOrAddress: currentPatient.roomOrAddress,
      type: emergencyType,
      severity: 'critical',
      notes: customNotes || `One-tap emergency beacon activated by patient (${emergencyType}). Immediate caretaker dispatched.`,
    });

    setTimeout(() => {
      setIsTriggered(false);
      onClose();
    }, 1500);
  };

  const emergencyOptions = [
    'Fall Detected',
    'Chest Pain',
    'Difficulty Breathing',
    'SOS Button Pressed',
    'Disorientation',
  ];

  return (
    <div
      id="patient-sos-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
    >
      <div
        className={`w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border transition-all ${
          isDarkMode ? 'bg-slate-900 border-red-900/60 text-white' : 'bg-white border-red-200 text-slate-900'
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-red-100 dark:bg-red-950 text-red-600 animate-pulse">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-red-600 dark:text-red-400 font-heading">
                One-Tap Patient SOS Trigger
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Simulates real-time hardware button or pendant emergency beacon
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isTriggered ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-300 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-black text-red-600 dark:text-red-400">SOS ALERT BROADCASTED!</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xs mx-auto">
              Assigned caregivers, 911 dispatch, and primary family contacts are being alerted now.
            </p>
          </div>
        ) : (
          <div className="my-6 space-y-5 text-xs">
            {/* Select Patient */}
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                Emergency Location / Patient
              </label>
              <select
                id="sos-patient-selector"
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className={`w-full p-3 rounded-xl border text-sm font-semibold ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                }`}
              >
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.roomOrAddress}
                  </option>
                ))}
              </select>
            </div>

            {/* Emergency Type Selector */}
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                Select Incident Type
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {emergencyOptions.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setEmergencyType(type)}
                    className={`p-3 rounded-xl font-bold text-left transition-all border ${
                      emergencyType === type
                        ? 'bg-red-500 text-white border-red-500 shadow-md'
                        : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-red-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Big One-Tap SOS Button */}
            <div className="pt-2 text-center">
              <button
                id="big-sos-trigger-action-btn"
                type="button"
                onClick={handleTriggerSOS}
                className="w-full py-5 rounded-3xl bg-red-600 hover:bg-red-700 text-white font-black text-lg tracking-wider uppercase shadow-xl shadow-red-600/40 hover:shadow-red-600/60 transition-all transform active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
              >
                <ShieldAlert className="w-7 h-7" />
                <span>TAP TO TRANSMIT SOS SIGNAL</span>
              </button>
              <p className="text-[11px] text-slate-400 mt-2">
                Triggers acoustic alarm, push notifications, and highlights the Caretaker Top Emergency Banner.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
