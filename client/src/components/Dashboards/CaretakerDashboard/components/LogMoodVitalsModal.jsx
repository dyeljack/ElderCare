import React, { useState } from 'react';
import { Activity, X } from 'lucide-react';

export function LogMoodVitalsModal({
  isOpen,
  onClose,
  patient,
  onSaveLog,
  isDarkMode,
}) {
  const [mood, setMood] = useState('good');
  const [systolic, setSystolic] = useState(120);
  const [diastolic, setDiastolic] = useState(80);
  const [heartRate, setHeartRate] = useState(72);
  const [bloodSugar, setBloodSugar] = useState(110);
  const [oxygenLevel, setOxygenLevel] = useState(98);
  const [temperature, setTemperature] = useState(98.6);
  const [sleepHours, setSleepHours] = useState(7);
  const [painLevel, setPainLevel] = useState(1);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const moodScoreMap = {
    great: 5,
    good: 4,
    neutral: 3,
    anxious: 2,
    sad: 2,
    pain: 1,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10);
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    onSaveLog({
      patientId: patient.id,
      date: dateStr,
      time: timeStr,
      mood,
      moodScore: moodScoreMap[mood] || 3,
      vitals: {
        bloodPressureSystolic: Number(systolic),
        bloodPressureDiastolic: Number(diastolic),
        heartRate: Number(heartRate),
        bloodSugar: Number(bloodSugar),
        oxygenLevel: Number(oxygenLevel),
        temperature: Number(temperature),
        sleepHours: Number(sleepHours),
        painLevel: Number(painLevel),
      },
      notes: notes || 'Routine caregiver observation recorded.',
      recordedBy: 'Jessica Reynolds, RN',
    });

    onClose();
  };

  const moods = [
    { id: 'great', label: 'Great', icon: '😄' },
    { id: 'good', label: 'Good', icon: '🙂' },
    { id: 'neutral', label: 'Neutral', icon: '😐' },
    { id: 'anxious', label: 'Anxious', icon: '😰' },
    { id: 'sad', label: 'Low', icon: '😔' },
    { id: 'pain', label: 'In Pain', icon: '😣' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        className={`w-full max-w-lg rounded-3xl p-6 shadow-2xl border max-h-[90vh] overflow-y-auto ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold">Record Vitals & Mood Update</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">For {patient.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="my-4 space-y-4 text-xs">
          {/* Mood Selector */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
              Patient Emotional State & Mood
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {moods.map((m) => {
                const isSelected = mood === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMood(m.id)}
                    className={`p-2.5 rounded-xl flex flex-col items-center gap-1 border transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <span className="text-xl">{m.icon}</span>
                    <span className="text-[10px] font-bold">{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Blood Pressure & Heart Rate */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Systolic BP</label>
              <input
                id="vital-sys-input"
                type="number"
                value={systolic}
                onChange={(e) => setSystolic(Number(e.target.value))}
                className={`w-full p-2.5 rounded-xl border ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Diastolic BP</label>
              <input
                id="vital-dia-input"
                type="number"
                value={diastolic}
                onChange={(e) => setDiastolic(Number(e.target.value))}
                className={`w-full p-2.5 rounded-xl border ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Heart Rate (BPM)</label>
              <input
                id="vital-hr-input"
                type="number"
                value={heartRate}
                onChange={(e) => setHeartRate(Number(e.target.value))}
                className={`w-full p-2.5 rounded-xl border ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>
          </div>

          {/* Blood Glucose & Oxygen & Sleep */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Glucose (mg/dL)</label>
              <input
                id="vital-glucose-input"
                type="number"
                value={bloodSugar}
                onChange={(e) => setBloodSugar(Number(e.target.value))}
                className={`w-full p-2.5 rounded-xl border ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Oxygen SpO2 (%)</label>
              <input
                id="vital-spo2-input"
                type="number"
                value={oxygenLevel}
                onChange={(e) => setOxygenLevel(Number(e.target.value))}
                className={`w-full p-2.5 rounded-xl border ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Sleep (Hours)</label>
              <input
                id="vital-sleep-input"
                type="number"
                step="0.5"
                value={sleepHours}
                onChange={(e) => setSleepHours(Number(e.target.value))}
                className={`w-full p-2.5 rounded-xl border ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>
          </div>

          {/* Pain Scale Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Reported Pain Scale: <span className="text-blue-600 font-black">{painLevel} / 10</span>
              </label>
              <span className="text-[10px] text-slate-400">0 = No pain, 10 = Severe</span>
            </div>
            <input
              id="vital-pain-slider"
              type="range"
              min="0"
              max="10"
              value={painLevel}
              onChange={(e) => setPainLevel(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-blue-600"
            />
          </div>

          {/* Caregiver Observation Notes */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Caregiver Clinical Observations
            </label>
            <textarea
              id="vital-notes-input"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Appetite was good, slight ankle edema noted on left side..."
              className={`w-full p-2.5 rounded-xl border ${
                isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
              }`}
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700"
            >
              Cancel
            </button>
            <button
              id="submit-vitals-log-btn"
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
            >
              Save Vital Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
