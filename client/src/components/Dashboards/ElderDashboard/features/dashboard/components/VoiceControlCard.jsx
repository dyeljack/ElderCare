import React from 'react';
import { Mic } from 'lucide-react';
import { useElderCare } from '../../../context/ElderCareContext.jsx';

export default function VoiceControlCard() {
  const { setIsVoiceModalOpen } = useElderCare();

  return (
    <div
      onClick={() => setIsVoiceModalOpen(true)}
      className="bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-3xl p-6 lg:p-8 flex flex-col items-center justify-center text-center shadow-md shadow-blue-600/20 cursor-pointer transition-all transform hover:-translate-y-0.5 active:scale-98 group h-full min-h-[200px]"
    >
      <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform">
        <Mic className="w-9 h-9 text-white" />
      </div>

      <h3 className="text-2xl font-bold font-serif mb-2 tracking-tight">
        Voice Control
      </h3>

      <p className="text-blue-100 font-mono text-xs tracking-wide bg-black/15 px-3 py-1.5 rounded-full border border-white/20">
        "Call my daughter" or "Remind me..."
      </p>
    </div>
  );
}
