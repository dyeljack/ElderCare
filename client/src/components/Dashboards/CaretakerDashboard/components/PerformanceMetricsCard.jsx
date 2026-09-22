import React, { useState } from 'react';
import { Star, CheckCircle2, CreditCard, TrendingUp, X } from 'lucide-react';

export function PerformanceMetricsCard({
  caregiver,
  isDarkMode,
}) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div
        id="performance-metrics-card"
        className={`rounded-3xl p-6 border transition-all ${
          isDarkMode
            ? 'bg-slate-900 border-slate-800 text-slate-100 shadow-xl'
            : 'bg-white border-slate-200/90 text-slate-800 shadow-xs'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold tracking-tight font-heading">Performance Metrics</h3>
          <button
            onClick={() => setShowDetails(true)}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 cursor-pointer"
          >
            Details
          </button>
        </div>

        {/* Top 2 Metric Boxes */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* Monthly Rating Box */}
          <div
            id="metric-monthly-rating"
            className={`p-4 rounded-2xl text-center border transition-colors ${
              isDarkMode
                ? 'bg-blue-950/30 border-blue-900/50'
                : 'bg-blue-50/60 border-blue-100 text-slate-900'
            }`}
          >
            <div className="flex justify-center mb-1">
              <Star className="w-5 h-5 fill-blue-600 text-blue-600" />
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none font-heading">
              {caregiver.monthlyRating.toFixed(1)}
            </p>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
              MONTHLY RATING
            </p>
          </div>

          {/* Visits Done Box */}
          <div
            id="metric-visits-done"
            className={`p-4 rounded-2xl text-center border transition-colors ${
              isDarkMode
                ? 'bg-emerald-950/30 border-emerald-900/50'
                : 'bg-emerald-50/60 border-emerald-100 text-slate-900'
            }`}
          >
            <div className="flex justify-center mb-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none font-heading">
              {caregiver.visitsDoneThisMonth}
            </p>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
              VISITS DONE
            </p>
          </div>
        </div>

        {/* Bottom Monthly Earnings Box */}
        <div
          id="metric-monthly-earnings"
          className={`p-4 rounded-2xl flex items-center justify-between border transition-colors ${
            isDarkMode
              ? 'bg-slate-800/40 border-slate-700/80'
              : 'bg-slate-50/80 border-slate-200/80'
          }`}
        >
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              MONTHLY EARNINGS
            </p>
            <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mt-0.5 font-mono">
              ${caregiver.monthlyEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <button
            onClick={() => setShowDetails(true)}
            title="View Payout Breakdown"
            className="p-2.5 rounded-xl bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300 transition-colors cursor-pointer"
          >
            <CreditCard className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Performance & Earnings Modal */}
      {showDetails && (
        <div
          id="performance-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div
            className={`w-full max-w-md rounded-3xl p-6 shadow-2xl border ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold">Caregiver Summary & Earnings</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{caregiver.name}</p>
                </div>
              </div>
              <button
                onClick={() => setShowDetails(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-5 space-y-3.5 text-xs">
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Hourly Base Rate</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">$42.50 / hr</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Completed Visits (This Month)</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{caregiver.visitsDoneThisMonth} sessions</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Average Patient Rating</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">★ {caregiver.monthlyRating} / 5.0</span>
              </div>
              <div className="flex justify-between items-center p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60">
                <span className="text-blue-900 dark:text-blue-200 font-bold">Total Disbursed & Pending</span>
                <span className="text-base font-black text-blue-700 dark:text-blue-400">
                  ${caregiver.monthlyEarnings.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowDetails(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
