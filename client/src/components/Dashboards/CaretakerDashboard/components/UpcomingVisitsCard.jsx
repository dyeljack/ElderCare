import React, { useState } from 'react';
import { User, Play, Trash2, Plus, CalendarPlus, X } from 'lucide-react';

export function UpcomingVisitsCard({
  visits,
  patients,
  onStartVisit,
  onDeleteVisit,
  onAddVisit,
  isDarkMode,
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Form states for new visit
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || '');
  const [visitDate, setVisitDate] = useState('Today, Oct 24');
  const [startTime, setStartTime] = useState('02:00 PM');
  const [endTime, setEndTime] = useState('03:00 PM');
  const [eta, setEta] = useState('30 mins');
  const [purpose, setPurpose] = useState('Medication & Wellness Check');

  const upcomingList = visits.filter((v) => v.status === 'upcoming');

  const handleCreateVisit = (e) => {
    e.preventDefault();
    const patient = patients.find((p) => p.id === selectedPatientId);
    if (!patient) return;

    onAddVisit({
      patientId: patient.id,
      patientName: patient.name,
      patientAddress: patient.roomOrAddress,
      patientAvatar: patient.avatar,
      date: visitDate,
      startTime,
      endTime,
      eta,
      purpose,
      status: 'upcoming',
      caregiverName: 'Jessica Reynolds, RN',
      checklist: [
        { id: `chk-${Date.now()}-1`, text: 'Check Vitals (BP, Glucose, Pulse)', done: false },
        { id: `chk-${Date.now()}-2`, text: 'Administer Scheduled Medication', done: false },
      ],
    });

    setShowAddModal(false);
  };

  return (
    <>
      <div
        id="upcoming-visits-card"
        className={`rounded-3xl p-6 border transition-all ${
          isDarkMode
            ? 'bg-slate-900 border-slate-800 text-slate-100 shadow-xl'
            : 'bg-white border-slate-200/90 text-slate-800 shadow-xs'
        }`}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold tracking-tight font-heading">Upcoming Visits</h3>
            <span className="text-xs bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold px-2.5 py-0.5 rounded-full">
              {upcomingList.length} scheduled
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-400">Today, Oct 24</span>
            <button
              id="schedule-visit-btn"
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-800/60 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Visit</span>
            </button>
          </div>
        </div>

        {/* Visits Timeline List */}
        <div className="space-y-4">
          {upcomingList.length > 0 ? (
            upcomingList.map((v) => (
              <div
                key={v.id}
                id={`upcoming-visit-item-${v.id}`}
                className="relative flex items-start sm:items-center justify-between gap-4"
              >
                {/* Timeline icon */}
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/20 overflow-hidden border border-blue-200 dark:border-blue-700">
                    {v.patientAvatar ? (
                      <img
                        src={v.patientAvatar}
                        alt={v.patientName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                  </div>

                  {/* Visit details box */}
                  <div className="flex-1 min-w-0 p-4 rounded-2xl border bg-slate-50/50 dark:bg-slate-800/80 border-slate-200/90 dark:border-slate-700/80 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-white transition-all shadow-2xs">
                    <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-bold text-blue-700 dark:text-blue-300">
                        {v.startTime} - {v.endTime}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400">
                        {v.date}
                      </span>
                    </div>

                    <h4 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight truncate font-heading">
                      {v.patientName}
                    </h4>

                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        ETA: <strong className="text-blue-600 dark:text-blue-400 font-bold">{v.eta}</strong>
                      </span>
                      <span className="text-slate-300 dark:text-slate-600">•</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {v.purpose}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons: Start Visit & Delete Visit */}
                <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
                  <button
                    id={`start-visit-btn-${v.id}`}
                    onClick={() => onStartVisit(v.id)}
                    className="px-5 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20 transition-all transform active:scale-95 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Start Visit</span>
                  </button>

                  {/* Delete Option with Confirmation */}
                  <button
                    id={`delete-visit-btn-${v.id}`}
                    onClick={() => setDeleteConfirmId(v.id)}
                    title="Cancel / Delete this scheduled visit"
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-red-600 hover:border-red-200 dark:hover:border-red-800/60 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-xs text-slate-400 border border-dashed rounded-2xl border-slate-200 dark:border-slate-800">
              No upcoming visits remaining for today.
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div
          id="delete-visit-confirmation-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div
            className={`w-full max-w-sm rounded-3xl p-6 shadow-2xl border ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3 mb-3 text-red-600">
              <div className="p-2.5 rounded-2xl bg-red-100 dark:bg-red-950/80">
                <Trash2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold">Cancel Scheduled Visit?</h4>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
              Are you sure you want to remove this visit from your schedule? The patient and agency dispatcher will be notified of the cancellation.
            </p>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700"
              >
                Keep Visit
              </button>
              <button
                id="confirm-delete-visit-btn"
                type="button"
                onClick={() => {
                  onDeleteVisit(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-xs"
              >
                Yes, Delete Visit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Schedule New Visit Modal */}
      {showAddModal && (
        <div
          id="schedule-new-visit-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div
            className={`w-full max-w-lg rounded-3xl p-6 shadow-2xl border ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600">
                  <CalendarPlus className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold">Schedule Upcoming Care Visit</h4>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateVisit} className="my-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Select Patient
                </label>
                <select
                  id="new-visit-patient-select"
                  value={selectedPatientId}
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.roomOrAddress})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Date</label>
                  <input
                    id="new-visit-date-input"
                    type="text"
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    placeholder="e.g. Today, Oct 24"
                    className={`w-full p-2.5 rounded-xl border ${
                      isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Estimated Travel ETA</label>
                  <input
                    id="new-visit-eta-input"
                    type="text"
                    value={eta}
                    onChange={(e) => setEta(e.target.value)}
                    placeholder="e.g. 15 mins"
                    className={`w-full p-2.5 rounded-xl border ${
                      isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Start Time</label>
                  <input
                    id="new-visit-start-input"
                    type="text"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    placeholder="11:30 AM"
                    className={`w-full p-2.5 rounded-xl border ${
                      isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">End Time</label>
                  <input
                    id="new-visit-end-input"
                    type="text"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    placeholder="12:30 PM"
                    className={`w-full p-2.5 rounded-xl border ${
                      isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Visit Purpose & Care Goal
                </label>
                <input
                  id="new-visit-purpose-input"
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="e.g. Physical Therapy Support, Post-Op Checkup"
                  className={`w-full p-2.5 rounded-xl border ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700"
                >
                  Cancel
                </button>
                <button
                  id="submit-new-visit-btn"
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
                >
                  Confirm & Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
