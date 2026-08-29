import React from 'react';
import { Sun, PhoneCall, ShieldAlert } from 'lucide-react';
import { useElderCare } from '../../../context/ElderCareContext.jsx';

export default function GreetingCard() {
  const { setIsEmergencyModalOpen } = useElderCare();

  return (
    <div className="theme-bg-card border theme-border rounded-3xl p-6 lg:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-all">
      <div>
        <h2 className="text-3xl lg:text-4xl font-serif font-bold theme-text-heading tracking-tight">
          Good Morning,<br />
          Arthur
        </h2>
        <div className="mt-3.5 inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 px-3.5 py-1.5 rounded-full border border-amber-200/60 dark:border-amber-900/40 font-medium text-sm">
          <Sun className="w-9 h-9 text-amber-500 shrink-0" />
          <span>72°F — Sunny Day</span>
        </div>
      </div>

      <button
        onClick={() => setIsEmergencyModalOpen(true)}
        className="w-full sm:w-auto flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-base lg:text-lg px-7 py-4 rounded-2xl shadow-lg shadow-red-600/30 ring-2 ring-red-400/40 hover:ring-red-400 transition-all transform hover:-translate-y-0.5 active:scale-98 cursor-pointer group"
      >
        <div className="p-2 bg-white/20 rounded-xl group-hover:scale-110 transition-transform">
          <PhoneCall className="w-9 h-9 text-white" />
        </div>
        <div className="text-left">
          <span className="text-xs uppercase tracking-wider block text-red-100 font-semibold">Emergency</span>
          <span className="leading-tight text-lg font-bold">Call for Help</span>
        </div>
      </button>
    </div>
  );
}
