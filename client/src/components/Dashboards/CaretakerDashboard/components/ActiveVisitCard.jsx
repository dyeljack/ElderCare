import React, { useState, useEffect } from 'react';
import { MapPin, Pill, CheckCircle, Activity, AlertCircle, Clock } from 'lucide-react';

export function ActiveVisitCard({
  visit,
  patient,
  medications,
  onToggleMedication,
  onCompleteVisit,
  onReportIssue,
  onOpenLogVitals,
  isDarkMode,
}) {
  const [elapsedSeconds, setElapsedSeconds] = useState(1512); // ~25:12 as shown in screenshot
  const [notes, setNotes] = useState('');
  const [selectedMood, setSelectedMood] = useState('good');
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [issueText, setIssueText] = useState('');

  // Live timer ticking up
  useEffect(() => {
    if (!visit || visit.status !== 'in_progress') return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [visit]);

  const formatElapsed = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!visit || !patient) {
    return (
      <div
        id="no-active-visit-card"
        className={`p-8 rounded-3xl border text-center ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
        }`}
      >
        <Clock className="w-12 h-12 mx-auto mb-3 text-blue-500 opacity-60" />
        <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">No Visit Currently In Progress</h4>
        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
          Select an upcoming visit below to start a care session with live timer, medicine checklist, and notes.
        </p>
      </div>
    );
  }

  const patientMeds = medications.filter((m) => m.patientId === patient.id);

  const handleComplete = () => {
    onCompleteVisit(notes, selectedMood);
  };

  const handleSendIssue = () => {
    if (issueText.trim()) {
      onReportIssue(issueText);
      setShowIssueModal(false);
      setIssueText('');
    }
  };

  return (
    <div
      id="active-visit-container"
      className={`rounded-3xl p-6 border transition-all ${
        isDarkMode
          ? 'bg-slate-900 border-slate-800 text-slate-100 shadow-xl'
          : 'bg-white border-slate-200/90 text-slate-800 shadow-xs'
      }`}
    >
      {/* Top Status & Elapsed Time Row */}
      <div className="flex items-center justify-between mb-4">
        <span
          id="visit-in-progress-badge"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50"
        >
          <span className="w-9 h-9 rounded-full bg-emerald-500 animate-pulse" />
          VISIT IN PROGRESS
        </span>

        {/* Elapsed Time Display Badge */}
        <div
          id="elapsed-time-box"
          className="px-4 py-2 rounded-2xl bg-blue-50/80 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/50 text-center"
        >
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-300">
            ELAPSED TIME
          </p>
          <p className="text-2xl font-black text-blue-900 dark:text-blue-200 tracking-tight font-mono leading-none mt-0.5">
            {formatElapsed(elapsedSeconds)}
          </p>
        </div>
      </div>

      {/* Patient Name and Address */}
      <div className="mb-5">
        <h3 id="active-patient-name" className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white font-heading">
          {patient.name}
        </h3>
        <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
          <MapPin className="w-9 h-9 text-slate-400 shrink-0" />
          <span>{patient.roomOrAddress}</span>
        </p>
      </div>

      {/* Medicine Checklist Sub-Card */}
      <div
        id="active-medicine-checklist"
        className={`p-4.5 rounded-2xl border mb-5 transition-colors ${
          isDarkMode
            ? 'bg-slate-800/50 border-slate-700/80'
            : 'bg-slate-50/70 border-slate-200/90'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300">
              <Pill className="w-9 h-9" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Medicine Checklist</h4>
          </div>
          <span className="text-[11px] font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
            {patientMeds.filter((m) => m.takenToday).length} / {patientMeds.length} Taken
          </span>
        </div>

        <div className="space-y-2.5">
          {patientMeds.length > 0 ? (
            patientMeds.map((med) => (
              <label
                key={med.id}
                id={`med-check-${med.id}`}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border transition-all ${
                  med.takenToday
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 text-slate-900 dark:text-slate-100'
                    : 'bg-white dark:bg-slate-800/90 border-slate-200/90 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-blue-300 shadow-2xs'
                }`}
              >
                <input
                  type="checkbox"
                  checked={med.takenToday}
                  onChange={() => onToggleMedication(med.id)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                    med.takenToday
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700'
                  }`}
                >
                  {med.takenToday ? <CheckCircle className="w-3.5 h-3.5 stroke-[3]" /> : null}
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`text-xs font-bold ${med.takenToday ? 'line-through text-slate-500 dark:text-slate-400' : 'text-slate-900 dark:text-slate-100'}`}>
                    {med.name} {med.dosage} <span className="text-[11px] font-normal text-slate-500 dark:text-slate-400">({med.category})</span>
                  </span>
                  <span className="block text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {med.scheduleTime} • {med.instructions}
                  </span>
                </div>
                {med.takenToday && med.takenTime && (
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded-md shrink-0">
                    ✓ {med.takenTime}
                  </span>
                )}
              </label>
            ))
          ) : (
            <p className="text-xs text-slate-400 py-2">No medications scheduled for this patient today.</p>
          )}
        </div>
      </div>

      {/* Visit Notes & Health Form */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-bold text-slate-900 dark:text-slate-100">
            Visit Notes & Health Form
          </label>
          <button
            type="button"
            onClick={onOpenLogVitals}
            className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            <Activity className="w-9 h-9" />
            <span>Record Vitals</span>
          </button>
        </div>

        <textarea
          id="visit-notes-textarea"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Record vitals, mood, and any concerns..."
          className={`w-full p-3.5 text-xs sm:text-sm rounded-2xl border transition-all outline-hidden resize-y ${
            isDarkMode
              ? 'bg-slate-800/80 border-slate-700 text-slate-100 placeholder-slate-500 focus:border-blue-500'
              : 'bg-slate-50/60 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10'
          }`}
        />

        {/* Quick Mood Selector for this visit */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Observed Mood:</span>
          {['great', 'good', 'neutral', 'anxious', 'sad'].map((mood) => {
            const isSelected = selectedMood === mood;
            const moodEmojis = {
              great: '😄 Great',
              good: '🙂 Good',
              neutral: '😐 Neutral',
              anxious: '😰 Anxious',
              sad: '😔 Low',
              pain: '😣 Pain',
            };
            return (
              <button
                key={mood}
                type="button"
                id={`mood-btn-${mood}`}
                onClick={() => setSelectedMood(mood)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                {moodEmojis[mood]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Buttons: Complete Visit & Report Issue */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          id="complete-visit-btn"
          type="button"
          onClick={handleComplete}
          className="sm:col-span-2 py-3 px-6 rounded-2xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all transform active:scale-98 text-center cursor-pointer"
        >
          Complete Visit
        </button>

        <button
          id="report-issue-btn"
          type="button"
          onClick={() => setShowIssueModal(true)}
          className={`py-3 px-4 rounded-2xl font-bold text-sm border transition-all text-center cursor-pointer ${
            isDarkMode
              ? 'border-slate-700 hover:bg-slate-800 text-slate-200'
              : 'border-slate-300 hover:bg-slate-100 text-slate-700'
          }`}
        >
          Report Issue
        </button>
      </div>

      {/* Report Issue Modal */}
      {showIssueModal && (
        <div
          id="report-issue-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div
            className={`w-full max-w-md rounded-3xl p-6 shadow-2xl border ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600">
                <AlertCircle className="w-9 h-9" />
              </div>
              <div>
                <h4 className="text-base font-bold">Report Clinical / Visit Concern</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">For {patient.name}</p>
              </div>
            </div>

            <textarea
              id="report-issue-input"
              rows={3}
              value={issueText}
              onChange={(e) => setIssueText(e.target.value)}
              placeholder="Detail any medication refusal, dizziness, skin redness, or equipment issue..."
              className={`w-full p-3 text-xs rounded-xl border mb-4 outline-hidden ${
                isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
              }`}
            />

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowIssueModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSendIssue}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xs"
              >
                Log Concern
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
