import React, { useState } from 'react';
import { Activity, X, Heart, Droplets } from 'lucide-react';
import { useElderCare } from '../../context/ElderCareContext.jsx';
import { getBloodPressureCategory, getHeartRateCategory, getBloodSugarCategory } from '../../utils/healthUtils.js';

export default function LogVitalModal() {
  const { isLogVitalModalOpen, setIsLogVitalModalOpen, updateVital, showToast } = useElderCare();

  const [vitalType, setVitalType] = useState('heartRate');
  const [heartRate, setHeartRate] = useState(72);
  const [systolic, setSystolic] = useState(135);
  const [diastolic, setDiastolic] = useState(85);
  const [bloodSugar, setBloodSugar] = useState(98);

  if (!isLogVitalModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (vitalType === 'heartRate') {
      const cat = getHeartRateCategory(Number(heartRate));
      updateVital('heartRate', {
        value: Number(heartRate),
        status: cat.label,
      });
    } else if (vitalType === 'bloodPressure') {
      const cat = getBloodPressureCategory(Number(systolic), Number(diastolic));
      updateVital('bloodPressure', {
        systolic: Number(systolic),
        diastolic: Number(diastolic),
        formatted: `${systolic}/${diastolic}`,
        status: cat.label,
        lastMeasured: 'Last measured: Just now',
      });
    } else if (vitalType === 'bloodSugar') {
      const cat = getBloodSugarCategory(Number(bloodSugar));
      updateVital('bloodSugar', {
        value: Number(bloodSugar),
        status: cat.label,
        note: 'Updated just now',
      });
    }

    setIsLogVitalModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="theme-bg-card border theme-border rounded-3xl p-6 lg:p-8 max-w-md w-full shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-950 text-blue-600 rounded-2xl">
              <Activity className="w-9 h-9" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold theme-text-heading">
                Log Health Vital
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Record new health measurements for Arthur
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsLogVitalModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-9 h-9" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setVitalType('heartRate')}
            className={`py-2 rounded-lg flex items-center justify-center gap-1 transition-all ${
              vitalType === 'heartRate'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-red-500" />
            <span>Heart</span>
          </button>

          <button
            type="button"
            onClick={() => setVitalType('bloodPressure')}
            className={`py-2 rounded-lg flex items-center justify-center gap-1 transition-all ${
              vitalType === 'bloodPressure'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-blue-500" />
            <span>BP</span>
          </button>

          <button
            type="button"
            onClick={() => setVitalType('bloodSugar')}
            className={`py-2 rounded-lg flex items-center justify-center gap-1 transition-all ${
              vitalType === 'bloodSugar'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Droplets className="w-3.5 h-3.5 text-amber-500" />
            <span>Glucose</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {vitalType === 'heartRate' && (
            <div>
              <label className="text-sm font-medium theme-text-heading block mb-1">
                Resting Heart Rate (BPM)
              </label>
              <input
                type="number"
                value={heartRate}
                onChange={(e) => setHeartRate(e.target.value)}
                min="40"
                max="200"
                className="w-full px-4 py-3 rounded-xl border theme-border theme-bg-card theme-text-heading text-lg font-bold"
                required
              />
            </div>
          )}

          {vitalType === 'bloodPressure' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium theme-text-heading block mb-1">
                  Systolic (mmHg)
                </label>
                <input
                  type="number"
                  value={systolic}
                  onChange={(e) => setSystolic(e.target.value)}
                  min="70"
                  max="220"
                  className="w-full px-4 py-3 rounded-xl border theme-border theme-bg-card theme-text-heading text-lg font-bold"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium theme-text-heading block mb-1">
                  Diastolic (mmHg)
                </label>
                <input
                  type="number"
                  value={diastolic}
                  onChange={(e) => setDiastolic(e.target.value)}
                  min="40"
                  max="140"
                  className="w-full px-4 py-3 rounded-xl border theme-border theme-bg-card theme-text-heading text-lg font-bold"
                  required
                />
              </div>
            </div>
          )}

          {vitalType === 'bloodSugar' && (
            <div>
              <label className="text-sm font-medium theme-text-heading block mb-1">
                Fasting Blood Glucose (mg/dL)
              </label>
              <input
                type="number"
                value={bloodSugar}
                onChange={(e) => setBloodSugar(e.target.value)}
                min="40"
                max="400"
                className="w-full px-4 py-3 rounded-xl border theme-border theme-bg-card theme-text-heading text-lg font-bold"
                required
              />
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsLogVitalModalOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-md"
            >
              Save Vital
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
