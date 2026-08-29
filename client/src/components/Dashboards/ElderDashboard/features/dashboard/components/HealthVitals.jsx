import React from 'react';
import { Activity, Heart, Droplets, Plus } from 'lucide-react';
import { useElderCare } from '../../../context/ElderCareContext.jsx';

export default function HealthVitals() {
  const { vitals, setIsLogVitalModalOpen } = useElderCare();

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Activity className="w-9 h-9 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xl lg:text-2xl font-serif font-bold theme-text-heading">
            Health Vitals
          </h3>
        </div>

        <button
          onClick={() => setIsLogVitalModalOpen(true)}
          className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 px-3 py-1.5 rounded-lg transition-colors"
        >
          <Plus className="w-9 h-9" />
          <span>Log Reading</span>
        </button>
      </div>

      {/* Grid of 3 Vitals Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Heart Rate */}
        <div
          onClick={() => setIsLogVitalModalOpen(true)}
          className="theme-bg-card border theme-border rounded-2xl p-5 hover:border-blue-300 dark:hover:border-blue-700 transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400">
                <Heart className="w-9 h-9 text-rose-500 fill-rose-100 dark:fill-rose-900/30" />
              </div>
              <span className="text-[11px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-800/60 uppercase">
                {vitals.heartRate.status}
              </span>
            </div>

            <p className="text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
              Heart Rate
            </p>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-serif font-bold theme-text-heading">
                {vitals.heartRate.value}
              </span>
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                {vitals.heartRate.unit}
              </span>
            </div>
          </div>

          {/* Mini Bar Chart Graphic */}
          <div className="flex items-end gap-1.5 h-7 mt-5">
            <div className="w-1/4 h-3 bg-rose-200 dark:bg-rose-900/50 rounded-xs" />
            <div className="w-1/4 h-4 bg-rose-300 dark:bg-rose-800/60 rounded-xs" />
            <div className="w-1/4 h-7 bg-rose-500 dark:bg-rose-600 rounded-xs" />
            <div className="w-1/4 h-6 bg-rose-600 dark:bg-rose-700 rounded-xs" />
          </div>
        </div>

        {/* Card 2: Blood Pressure */}
        <div
          onClick={() => setIsLogVitalModalOpen(true)}
          className="theme-bg-card border theme-border rounded-2xl p-5 hover:border-blue-300 dark:hover:border-blue-700 transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
                <Activity className="w-9 h-9 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-[11px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/70 dark:border-amber-800/60 uppercase">
                {vitals.bloodPressure.status}
              </span>
            </div>

            <p className="text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
              Blood Pressure
            </p>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-serif font-bold theme-text-heading">
                {vitals.bloodPressure.formatted}
              </span>
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                {vitals.bloodPressure.unit}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-5">
            {vitals.bloodPressure.lastMeasured}
          </p>
        </div>

        {/* Card 3: Blood Sugar */}
        <div
          onClick={() => setIsLogVitalModalOpen(true)}
          className="theme-bg-card border theme-border rounded-2xl p-5 hover:border-blue-300 dark:hover:border-blue-700 transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400">
                <Droplets className="w-9 h-9 text-teal-600 dark:text-teal-400" />
              </div>
              <span className="text-[11px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-800/60 uppercase">
                {vitals.bloodSugar.status}
              </span>
            </div>

            <p className="text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
              Blood Sugar
            </p>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-serif font-bold theme-text-heading">
                {vitals.bloodSugar.value}
              </span>
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                {vitals.bloodSugar.unit}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-5">
            {vitals.bloodSugar.note}
          </p>
        </div>
      </div>
    </div>
  );
}
