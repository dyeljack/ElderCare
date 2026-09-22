import React, { useState } from 'react';
import { Asterisk, PhoneCall, ShieldAlert, CheckCircle, X, UserCheck } from 'lucide-react';

export function EmergencyBanner({
  alert,
  onRespond,
  onResolve,
  isDarkMode,
}) {
  const [showModal, setShowModal] = useState(false);
  const [resolveNotes, setResolveNotes] = useState('');
  const [isCallingEmergency, setIsCallingEmergency] = useState(false);

  if (!alert || alert.status === 'resolved') {
    return null;
  }

  const handleRespondClick = () => {
    onRespond(alert.id);
    setShowModal(true);
  };

  const handleCompleteResolve = () => {
    onResolve(alert.id, resolveNotes || 'Caregiver on site. Patient stable and safe.');
    setShowModal(false);
  };

  return (
    <>
      {/* Top Banner exactly styled as in the UI screenshot */}
      <div
        id="emergency-alert-banner"
        className={`w-full rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border transition-all ${
          isDarkMode
            ? 'bg-red-950/40 border-red-800/80 text-red-100 shadow-lg shadow-red-950/30'
            : 'bg-rose-50 border-rose-200 text-rose-950 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-4">
          {/* Medical / Star of Life red icon circle */}
          <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-rose-600/30 animate-pulse">
            <Asterisk className="w-7 h-7 stroke-[3]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold tracking-tight text-rose-950 dark:text-red-200 font-heading">
                Emergency Alert
              </h3>
              {alert.status === 'responding' && (
                <span className="text-[11px] font-bold uppercase bg-amber-100 text-amber-900 border border-amber-200 dark:bg-amber-900/60 dark:text-amber-200 px-2.5 py-0.5 rounded-full">
                  Responder En Route
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm font-medium text-rose-800 dark:text-red-300 mt-0.5">
              SOS Signal: <strong>{alert.patientName}</strong> ({alert.roomOrAddress}) — {alert.type}
            </p>
          </div>
        </div>

        <button
          id="sos-respond-now-btn"
          onClick={handleRespondClick}
          className="px-6 py-2.5 rounded-xl font-bold text-xs tracking-wider bg-rose-600 hover:bg-rose-700 text-white shadow-sm shadow-rose-600/30 transition-all transform active:scale-95 text-center cursor-pointer shrink-0 uppercase"
        >
          {alert.status === 'responding' ? 'MANAGE RESPONSE' : 'RESPOND NOW'}
        </button>
      </div>

      {/* Emergency Management Modal */}
      {showModal && (
        <div
          id="emergency-response-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div
            className={`w-full max-w-lg rounded-3xl p-6 shadow-2xl border ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-red-100 dark:bg-red-950 text-red-600">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Active Emergency Response</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Triggered {alert.timestamp}</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-5 space-y-4 text-sm">
              <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50">
                <p className="text-xs font-bold uppercase text-red-600 dark:text-red-400 tracking-wider">Patient & Location</p>
                <p className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1">{alert.patientName}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{alert.roomOrAddress}</p>
                <p className="text-xs text-red-700 dark:text-red-300 font-semibold mt-2">
                  Event: {alert.type} • Severity: {alert.severity.toUpperCase()}
                </p>
                {alert.notes && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">"{alert.notes}"</p>}
              </div>

              {/* Action protocols */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  id="call-paramedics-btn"
                  onClick={() => {
                    setIsCallingEmergency(true);
                    setTimeout(() => {
                      alert('Simulated: Emergency 911 dispatch connected for Room 402.');
                      setIsCallingEmergency(false);
                    }, 1200);
                  }}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-colors"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{isCallingEmergency ? 'Dialing 911...' : 'Call 911 Dispatch'}</span>
                </button>

                <button
                  id="notify-family-btn"
                  onClick={() => alert('Automated SMS & Phone broadcast sent to primary emergency contacts.')}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  <UserCheck className="w-4 h-4 text-blue-600" />
                  <span>Alert Family Contact</span>
                </button>
              </div>

              {/* Caretaker resolution log */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Resolution / Status Notes
                </label>
                <textarea
                  id="emergency-resolve-notes"
                  rows={2}
                  value={resolveNotes}
                  onChange={(e) => setResolveNotes(e.target.value)}
                  placeholder="e.g. Caregiver attended immediately, patient assisted back to chair with no injury..."
                  className={`w-full p-3 text-xs rounded-xl border outline-hidden ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700"
              >
                Close
              </button>
              <button
                id="resolve-emergency-btn"
                onClick={handleCompleteResolve}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-green-600 hover:bg-green-700 text-white shadow-sm transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Mark Alert Resolved</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
