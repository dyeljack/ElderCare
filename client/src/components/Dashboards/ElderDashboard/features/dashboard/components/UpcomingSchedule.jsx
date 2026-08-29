import React from 'react';
import { Calendar, Plus, Trash2 } from 'lucide-react';
import { useElderCare } from '../../../context/ElderCareContext.jsx';

export default function UpcomingSchedule() {
  const { schedule, addScheduleEvent, deleteScheduleEvent } = useElderCare();

  const handleAddQuickEvent = () => {
    const title = prompt('Enter appointment title:', 'Doctor Follow-up');
    if (title) {
      addScheduleEvent({
        time: '04:00 PM',
        title,
        subtitle: 'Scheduled via dashboard',
      });
    }
  };

  return (
    <div className="theme-bg-card border theme-border rounded-3xl p-6 lg:p-7 shadow-xs space-y-6 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b theme-border">
        <div className="flex items-center gap-2.5">
          <Calendar className="w-9 h-9 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xl lg:text-2xl font-serif font-bold theme-text-heading">
            Upcoming
          </h3>
        </div>

        <button
          onClick={handleAddQuickEvent}
          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Add Appointment"
          aria-label="Add Appointment"
        >
          <Plus className="w-9 h-9" />
        </button>
      </div>

      {/* Timeline List */}
      {schedule.length === 0 ? (
        <div className="py-8 text-center my-auto">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No upcoming events or appointments.
          </p>
          <button
            onClick={handleAddQuickEvent}
            className="mt-3 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            + Add an event
          </button>
        </div>
      ) : (
        <div className="relative pl-6 space-y-6 my-auto">
          {/* Vertical line connecting nodes */}
          <div className="absolute left-[9px] top-6 bottom-6 w-0.5 bg-slate-150 dark:bg-slate-700" />

          {schedule.map((item) => (
            <div key={item.id} className="relative group flex items-start justify-between gap-2">
              {/* Dot indicator */}
              <span
                className="absolute -left-[5px] top-5 w-2 h-2 rounded-full border-1 border-white dark:border-slate-900 shadow-xs transition-transform group-hover:scale-125"
                style={{ backgroundColor: item.dotColor }}
              />

              <div className="pr-2">
                {/* Time */}
                <span className="text-xs font-semibold text-blue-700 dark:text-blue-400 block font-mono">
                  {item.time}
                </span>

                {/* Title */}
                <h4 className="text-base font-serif font-bold theme-text-heading mt-0.5">
                  {item.title}
                </h4>

                {/* Subtitle */}
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {item.subtitle}
                </p>
              </div>

              {/* Delete event button */}
              <button
                onClick={() => deleteScheduleEvent(item.id)}
                className="opacity-80 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all shrink-0"
                title={`Delete ${item.title}`}
                aria-label={`Delete ${item.title}`}
              >
                <Trash2 className="w-9 h-9" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="pt-2 text-center">
        <button
          onClick={handleAddQuickEvent}
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          + Add New Event
        </button>
      </div>
    </div>
  );
}
