import React from 'react';
import { Settings, Moon, Sun, Bell, Shield, Volume2 } from 'lucide-react';
import { useElderCare } from '../../context/ElderCareContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function SettingsView() {
  const { showToast } = useElderCare();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-3xl font-serif font-bold theme-text-heading">
          Application & Preference Settings
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize display, theme mode, accessibility, and emergency alerts
        </p>
      </div>

      <div className="theme-bg-card border theme-border rounded-3xl p-6 shadow-xs space-y-6">
        {/* Theme Settings */}
        <div className="flex items-center justify-between pb-4 border-b theme-border">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 dark:bg-blue-950 rounded-xl text-blue-600">
              {isDark ? <Moon className="w-9 h-9 text-blue-400" /> : <Sun className="w-9 h-9 text-amber-500" />}
            </div>
            <div>
              <h4 className="font-semibold text-base theme-text-heading">Appearance Mode</h4>
              <p className="text-xs text-slate-500">Toggle between Light and Senior Dark Mode</p>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs"
          >
            {isDark ? 'Switch to Light' : 'Switch to Dark'}
          </button>
        </div>

        {/* Notifications Settings */}
        <div className="flex items-center justify-between pb-4 border-b theme-border">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-teal-100 dark:bg-teal-950 rounded-xl text-teal-600">
              <Bell className="w-9 h-9" />
            </div>
            <div>
              <h4 className="font-semibold text-base theme-text-heading">Medication Voice Alerts</h4>
              <p className="text-xs text-slate-500">Play spoken reminders at dosage times</p>
            </div>
          </div>

          <button
            onClick={() => showToast('Voice alerts enabled.')}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold"
          >
            Enabled
          </button>
        </div>

        {/* Emergency Contacts */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-100 dark:bg-red-950 rounded-xl text-red-600">
              <Shield className="w-9 h-9" />
            </div>
            <div>
              <h4 className="font-semibold text-base theme-text-heading">Emergency SOS Fast Dial</h4>
              <p className="text-xs text-slate-500">Nurse Maria (555-0192) & Daughter Emily</p>
            </div>
          </div>

          <button
            onClick={() => showToast('Emergency contacts saved.')}
            className="px-4 py-2 border theme-border text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Edit Contacts
          </button>
        </div>
      </div>
    </div>
  );
}
