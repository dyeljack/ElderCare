import React from 'react';
import { Users, Video, MessageSquare, HeartHandshake } from 'lucide-react';
import { useElderCare } from '../../context/ElderCareContext.jsx';

export default function FamilyView() {
  const { showToast } = useElderCare();

  const familyMembers = [
    {
      id: 'f1',
      name: 'Emily Arthur (Daughter)',
      location: 'Seattle, WA',
      status: 'Available for video call',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    },
    {
      id: 'f2',
      name: 'Michael Arthur (Son)',
      location: 'San Francisco, CA',
      status: 'Visited yesterday at 4:30 PM',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-3xl font-serif font-bold theme-text-heading">
          Family Network
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Stay connected with family members and emergency contacts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {familyMembers.map((member) => (
          <div
            key={member.id}
            className="theme-bg-card border theme-border rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-teal-500/30 shrink-0"
              />
              <div>
                <h3 className="text-xl font-serif font-bold theme-text-heading">
                  {member.name}
                </h3>
                <p className="text-xs text-slate-500">{member.location}</p>
                <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 mt-1">
                  {member.status}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => showToast(`Starting video call with ${member.name}...`)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold text-sm shadow-sm"
              >
                <Video className="w-9 h-9" />
                <span>Video Call</span>
              </button>
              <button
                onClick={() => showToast(`Opened chat with ${member.name}`)}
                className="p-2.5 border theme-border rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Send Message"
              >
                <MessageSquare className="w-9 h-9" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
