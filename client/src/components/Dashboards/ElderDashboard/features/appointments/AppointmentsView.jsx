import React from 'react';
import { Calendar, Plus, UserCheck, Trash2 } from 'lucide-react';
import { useElderCare } from '../../context/ElderCareContext.jsx';

export default function AppointmentsView() {
  const { schedule, addScheduleEvent, deleteScheduleEvent } = useElderCare();

  const handleAdd = () => {
    const title = prompt('Appointment title:', 'Physical Therapy');
    if (title) {
      addScheduleEvent({ title, time: '10:00 AM', subtitle: 'Scheduled' });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold theme-text-heading">
            Appointments & Caregiver Schedule
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage upcoming nurse visits, family video calls, and therapy sessions
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-9 h-9" />
          <span>New Appointment</span>
        </button>
      </div>

      <div className="space-y-4">
        {schedule.length === 0 ? (
          <div className="theme-bg-card border theme-border rounded-2xl p-8 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No appointments scheduled yet.
            </p>
            <button
              onClick={handleAdd}
              className="mt-3 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              + Create an appointment
            </button>
          </div>
        ) : (
          schedule.map((item) => (
            <div
              key={item.id}
              className="theme-bg-card border theme-border rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-white font-bold"
                  style={{ backgroundColor: item.dotColor }}
                >
                  <Calendar className="w-9 h-9" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 block">
                    {item.time}
                  </span>
                  <h4 className="text-lg font-serif font-bold theme-text-heading">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <div className="flex items-center gap-2 text-xs font-semibold px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  <UserCheck className="w-8 h-8 text-teal-600" />
                  <span>Confirmed</span>
                </div>
                <button
                  onClick={() => deleteScheduleEvent(item.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                  title={`Delete ${item.title}`}
                  aria-label={`Delete ${item.title}`}
                >
                  <Trash2 className="w-8 h-8" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
