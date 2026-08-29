import React from 'react';
import { Stethoscope, Phone, Mail, ShieldAlert, Star } from 'lucide-react';
import { useElderCare } from '../../context/ElderCareContext.jsx';

export default function CaretakersView() {
  const { showToast } = useElderCare();

  const caretakers = [
    {
      id: 'c1',
      name: 'Maria Santos, RN',
      role: 'Primary Registered Nurse',
      phone: '555-0192',
      email: 'maria.s@careconnect.com',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150',
      rating: '4.9',
      schedule: 'Mon, Wed, Fri (09:00 AM - 01:00 PM)',
    },
    {
      id: 'c2',
      name: 'David Miller',
      role: 'Physical Therapy Assistant',
      phone: '555-0144',
      email: 'david.m@careconnect.com',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150',
      rating: '4.8',
      schedule: 'Tue, Thu (02:00 PM - 04:00 PM)',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-3xl font-serif font-bold theme-text-heading">
          Assigned Caretakers & Medical Team
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Direct contact with Arthur's primary health professionals
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {caretakers.map((person) => (
          <div
            key={person.id}
            className="theme-bg-card border theme-border rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="flex items-start gap-4">
              <img
                src={person.avatar}
                alt={person.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-500/30 shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-serif font-bold theme-text-heading">
                    {person.name}
                  </h3>
                  <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                    <Star className="w-3 h-3 fill-amber-500" />
                    {person.rating}
                  </span>
                </div>
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                  {person.role}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Schedule: {person.schedule}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => showToast(`Calling ${person.name}...`)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm shadow-sm"
              >
                <Phone className="w-9 h-9" />
                <span>Call Nurse</span>
              </button>
              <button
                onClick={() => showToast(`Message sent to ${person.name}`)}
                className="p-2.5 border theme-border rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Send Email"
              >
                <Mail className="w-9 h-9" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
