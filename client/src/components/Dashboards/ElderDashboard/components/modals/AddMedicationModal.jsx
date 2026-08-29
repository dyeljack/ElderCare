import React, { useState } from 'react';
import { Pill, X } from 'lucide-react';
import { useElderCare } from '../../context/ElderCareContext.jsx';

export default function AddMedicationModal() {
  const { isAddMedModalOpen, setIsAddMedModalOpen, addMedication } = useElderCare();

  const [name, setName] = useState('');
  const [time, setTime] = useState('01:00 PM');
  const [instruction, setInstruction] = useState('Take 1 tablet after lunch');

  if (!isAddMedModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    addMedication({
      name,
      time,
      instruction,
    });

    setName('');
    setIsAddMedModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="theme-bg-card border theme-border rounded-3xl p-6 lg:p-8 max-w-md w-full shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-950 text-blue-600 rounded-2xl">
              <Pill className="w-9 h-9" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold theme-text-heading">
                Add Medication
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                New daily prescription or supplement
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAddMedModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-9 h-9" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium theme-text-heading block mb-1">
              Medication Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Calcium & Vitamin D"
              className="w-full px-4 py-3 rounded-xl border theme-border theme-bg-card theme-text-heading text-sm"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium theme-text-heading block mb-1">
              Scheduled Time
            </label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g. 02:00 PM"
              className="w-full px-4 py-3 rounded-xl border theme-border theme-bg-card theme-text-heading text-sm"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium theme-text-heading block mb-1">
              Dosage & Instructions
            </label>
            <input
              type="text"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="e.g. Take 1 tablet with food"
              className="w-full px-4 py-3 rounded-xl border theme-border theme-bg-card theme-text-heading text-sm"
              required
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsAddMedModalOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-md"
            >
              Add Medication
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
