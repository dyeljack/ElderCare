import React, { useState } from 'react';
import { Clock, MapPin, Play, Trash2, Plus, CheckCircle2 } from 'lucide-react';

export function AppointmentsView({
  visits,
  patients,
  onStartVisit,
  onDeleteVisit,
  onOpenScheduleModal,
  isDarkMode,
}) {
  const [filter, setFilter] = useState('all');

  const filteredVisits = visits.filter((v) => {
    if (filter === 'all') return true;
    return v.status === filter;
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight font-heading text-slate-900 dark:text-white">
            Appointments & Caretaker Itinerary
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Upcoming home visits, medication administration sessions, and completed logs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Filter Tabs */}
          <div className="flex rounded-xl p-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold">
            {['all', 'upcoming', 'completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                  filter === tab
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenScheduleModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Visit</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredVisits.length > 0 ? (
          filteredVisits.map((v) => (
            <div
              key={v.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                v.status === 'in_progress'
                  ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/20 dark:bg-blue-950/20'
                  : isDarkMode
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start gap-4">
                <img
                  src={v.patientAvatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256'}
                  alt={v.patientName}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-blue-500 shrink-0"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{v.patientName}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      v.status === 'in_progress'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : v.status === 'completed'
                        ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300'
                    }`}>
                      {v.status.replace('_', ' ')}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{v.patientAddress}</span>
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                    <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                      <Clock className="w-3.5 h-3.5" />
                      {v.date} • {v.startTime} - {v.endTime}
                    </span>
                    <span>•</span>
                    <span className="text-slate-500 dark:text-slate-400">{v.purpose}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 self-end md:self-center">
                {v.status === 'upcoming' && (
                  <button
                    onClick={() => onStartVisit(v.id)}
                    className="px-4 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-xs flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Start Visit</span>
                  </button>
                )}

                {v.status === 'in_progress' && (
                  <span className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300">
                    Session In Progress
                  </span>
                )}

                {v.status === 'completed' && (
                  <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Completed</span>
                  </span>
                )}

                {/* Delete option */}
                <button
                  onClick={() => {
                    if (confirm(`Delete / remove appointment for ${v.patientName}?`)) {
                      onDeleteVisit(v.id);
                    }
                  }}
                  title="Delete Appointment"
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-slate-400 border border-dashed rounded-3xl border-slate-200 dark:border-slate-800">
            No appointments found for the selected filter.
          </div>
        )}
      </div>
    </div>
  );
}
