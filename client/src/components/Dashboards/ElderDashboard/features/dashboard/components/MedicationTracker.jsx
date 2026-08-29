import React from 'react';
import { Pill, Clock, Check, Plus, Trash2 } from 'lucide-react';
import { useElderCare } from '../../../context/ElderCareContext.jsx';
import { formatMedicationBadgeText } from '../../../utils/formatters.js';

export default function MedicationTracker() {
  const {
    medications,
    toggleMedicationTaken,
    deleteMedication,
    remainingMedCount,
    setIsAddMedModalOpen
  } = useElderCare();

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Pill className="w-9 h-9 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xl lg:text-2xl font-serif font-bold theme-text-heading">
            Daily Medications
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold tracking-wider text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border theme-border px-3 py-1.5 rounded-full uppercase">
            {formatMedicationBadgeText(remainingMedCount)}
          </span>
          <button
            onClick={() => setIsAddMedModalOpen(true)}
            className="p-1.5 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors cursor-pointer"
            title="Add Medication"
            aria-label="Add Medication"
          >
            <Plus className="w-9 h-9" />
          </button>
        </div>
      </div>

      {/* Medication List */}
      <div className="space-y-3.5">
        {medications.length === 0 ? (
          <div className="theme-bg-card border theme-border rounded-2xl p-8 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No medications scheduled for today.
            </p>
            <button
              onClick={() => setIsAddMedModalOpen(true)}
              className="mt-3 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              + Add a medication
            </button>
          </div>
        ) : (
          medications.map((med) => {
            return (
              <div
                key={med.id}
                className={`theme-bg-card border theme-border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                  med.taken ? 'opacity-85' : 'shadow-xs'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Icon Box */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                      med.taken
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                        : 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                    }`}
                  >
                    {med.taken ? <Check className="w-9 h-9" /> : <Clock className="w-9 h-9" />}
                  </div>

                  {/* Info */}
                  <div>
                    <span
                      className={`text-sm font-semibold block mb-0.5 ${
                        med.taken
                          ? 'text-slate-400 line-through'
                          : 'text-blue-600 dark:text-blue-400'
                      }`}
                    >
                      {med.time}
                    </span>
                    <h4
                      className={`text-xl font-serif font-bold ${
                        med.taken
                          ? 'text-slate-400 dark:text-slate-500 line-through'
                          : 'theme-text-heading'
                      }`}
                    >
                      {med.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {med.instruction}
                    </p>
                  </div>
                </div>

                {/* Actions: Taken button & Delete button */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  {med.taken ? (
                    <button
                      onClick={() => toggleMedicationTaken(med.id)}
                      className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 font-semibold text-sm px-4 py-2 rounded-xl cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors"
                    >
                      <Check className="w-9 h-9 text-emerald-600 dark:text-emerald-400" />
                      <span>Taken</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleMedicationTaken(med.id)}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-sm shadow-blue-600/20 transition-all transform active:scale-95 cursor-pointer"
                    >
                      <Check className="w-9 h-9 text-white" />
                      <span>Mark Taken</span>
                    </button>
                  )}

                  <button
                    onClick={() => deleteMedication(med.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                    title={`Delete ${med.name}`}
                    aria-label={`Delete ${med.name}`}
                  >
                    <Trash2 className="w-9 h-9" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
