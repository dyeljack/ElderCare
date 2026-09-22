import React from 'react';
import { Star, Phone, Mail } from 'lucide-react';

export function CaregiversView({
  currentCaregiver,
  isDarkMode,
}) {
  const careTeam = [
    currentCaregiver,
    {
      id: 'cg-2',
      name: 'Michael Torres, LPN',
      role: 'Geriatric Rehabilitation Assistant',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=256',
      monthlyRating: 4.8,
      visitsDoneThisMonth: 21,
      monthlyEarnings: 3100.00,
      phone: '+1 (555) 345-6781',
      email: 'michael.t@eldercareconnect.org',
      agency: 'ElderCare Connect Health Services',
    },
    {
      id: 'cg-3',
      name: 'Dr. Clara Hernandez, MD',
      role: 'Supervising Clinical Neurologist',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=256',
      monthlyRating: 5.0,
      visitsDoneThisMonth: 16,
      monthlyEarnings: 5400.00,
      phone: '+1 (555) 789-1234',
      email: 'dr.hernandez@eldercareconnect.org',
      agency: 'Oakwood Neurological & ElderCare',
    },
    {
      id: 'cg-4',
      name: 'Amina Diallo, CNA',
      role: 'Certified Nursing Assistant & Memory Support',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
      monthlyRating: 4.9,
      visitsDoneThisMonth: 28,
      monthlyEarnings: 3650.00,
      phone: '+1 (555) 456-7892',
      email: 'amina.diallo@eldercareconnect.org',
      agency: 'ElderCare Connect Health Services',
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight font-heading text-slate-900 dark:text-white">
          Care Team & Caregivers Roster
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Supervisory registered nurses, certified nursing assistants, and on-call specialist network.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {careTeam.map((member) => {
          const isMe = member.id === currentCaregiver.id;
          return (
            <div
              key={member.id}
              className={`p-6 rounded-3xl border transition-all ${
                isMe
                  ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/30 dark:bg-blue-950/20'
                  : isDarkMode
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start gap-4">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
                      {member.name}
                    </h3>
                    {isMe && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-600 text-white">
                        YOU
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-0.5">
                    {member.role}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {member.agency}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 my-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Rating</span>
                  <p className="font-bold text-amber-600 dark:text-amber-400 flex items-center justify-center gap-0.5">
                    <Star className="w-3.5 h-3.5 fill-current" /> {member.monthlyRating}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Visits</span>
                  <p className="font-bold text-slate-800 dark:text-slate-200">{member.visitsDoneThisMonth}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Status</span>
                  <p className="font-bold text-emerald-600 dark:text-emerald-400">Active</p>
                </div>
              </div>

              <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono">{member.phone}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{member.email}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
