import React from 'react';
import { Activity, Heart, Droplets, ShieldCheck, Plus } from 'lucide-react';
import { useElderCare } from '../../context/ElderCareContext.jsx';

export default function HealthView() {
  const { vitals, setIsLogVitalModalOpen } = useElderCare();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold theme-text-heading">
            Health Overview & Vitals History
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time biometric tracking for Arthur
          </p>
        </div>
        <button
          onClick={() => setIsLogVitalModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md self-start sm:self-auto"
        >
          <Plus className="w-9 h-9" />
          <span>Log New Vital</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="theme-bg-card border theme-border rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-rose-50 dark:bg-rose-950/60 rounded-2xl text-rose-600 dark:text-rose-400">
              <Heart className="w-9 h-9 fill-rose-100 text-rose-500" />
            </div>
            <span className="text-xs font-mono font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-800/60 px-3 py-1 rounded-full uppercase">
              {vitals.heartRate.status}
            </span>
          </div>
          <h3 className="text-base font-semibold theme-text-heading">Heart Rate Monitor</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-serif font-bold theme-text-heading">
              {vitals.heartRate.value}
            </span>
            <span className="text-sm font-semibold text-slate-500">BPM</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Resting rate within healthy target range for age 76.</p>
        </div>

        <div className="theme-bg-card border theme-border rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/60 rounded-2xl text-blue-600 dark:text-blue-400">
              <Activity className="w-9 h-9" />
            </div>
            <span className="text-xs font-mono font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/70 dark:border-amber-800/60 px-3 py-1 rounded-full uppercase">
              {vitals.bloodPressure.status}
            </span>
          </div>
          <h3 className="text-base font-semibold theme-text-heading">Blood Pressure</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-serif font-bold theme-text-heading">
              {vitals.bloodPressure.formatted}
            </span>
            <span className="text-sm font-semibold text-slate-500">mmHg</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">{vitals.bloodPressure.lastMeasured}</p>
        </div>

        <div className="theme-bg-card border theme-border rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-teal-50 dark:bg-teal-950/60 rounded-2xl text-teal-600 dark:text-teal-400">
              <Droplets className="w-9 h-9" />
            </div>
            <span className="text-xs font-mono font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-800/60 px-3 py-1 rounded-full uppercase">
              {vitals.bloodSugar.status}
            </span>
          </div>
          <h3 className="text-base font-semibold theme-text-heading">Blood Sugar (Glucose)</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-serif font-bold theme-text-heading">
              {vitals.bloodSugar.value}
            </span>
            <span className="text-sm font-semibold text-slate-500">mg/dL</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">{vitals.bloodSugar.note}</p>
        </div>
      </div>

      <div className="theme-bg-card border theme-border rounded-3xl p-6 shadow-xs">
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="w-9 h-9 text-teal-600" />
          <h3 className="text-xl font-serif font-bold theme-text-heading">Doctor's Health Notes</h3>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Arthur is maintaining stable cardiac function. Blood pressure is slightly elevated in the morning, which aligns with mild posture changes after waking up. Hydration level is good. Next routine checkup scheduled for Thursday.
        </p>
      </div>
    </div>
  );
}
