import React, { useState } from 'react';
import { Mic, X, Volume2, Sparkles, Send } from 'lucide-react';
import { useElderCare } from '../../context/ElderCareContext.jsx';
import { processVoiceCommand } from '../../utils/healthUtils.js';

export default function VoiceAssistantModal() {
  const { isVoiceModalOpen, setIsVoiceModalOpen, setIsEmergencyModalOpen, showToast } = useElderCare();
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('Listening... Speak a command like "Call my daughter" or "Remind me about my medication".');
  const [isListening, setIsListening] = useState(false);

  if (!isVoiceModalOpen) return null;

  const handleCommand = (text) => {
    const commandText = text || query;
    if (!commandText.trim()) return;

    setIsListening(true);
    setResponse(`Processing: "${commandText}"...`);

    setTimeout(() => {
      const result = processVoiceCommand(commandText);
      setIsListening(false);
      setResponse(result.response);

      if (result.action === 'CALL_FAMILY') {
        showToast('Initiating call with Emily...');
      } else if (result.action === 'TRIGGER_SOS') {
        setTimeout(() => {
          setIsVoiceModalOpen(false);
          setIsEmergencyModalOpen(true);
        }, 800);
      }
    }, 600);
  };

  const samplePrompts = [
    'Call my daughter',
    'Remind me about my medication',
    'Emergency help',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="theme-bg-card border theme-border rounded-3xl p-6 lg:p-8 max-w-lg w-full shadow-2xl space-y-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600 rounded-2xl text-white">
              <Mic className="w-9 h-9" />
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold theme-text-heading">
                Voice Control
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ElderCare Speech Assistant
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsVoiceModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-9 h-9" />
          </button>
        </div>

        {/* Pulse Visualizer */}
        <div className="flex flex-col items-center justify-center p-8 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-100 dark:border-blue-900/50 space-y-4">
          <div className="relative">
            <button
              onClick={() => handleCommand('Remind me about my medication')}
              className={`w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg transition-transform ${
                isListening ? 'scale-110 animate-ping' : 'hover:scale-105'
              }`}
            >
              <Mic className="w-10 h-10" />
            </button>
          </div>
          <p className="text-center font-medium text-sm text-blue-900 dark:text-blue-200">
            {response}
          </p>
        </div>

        {/* Sample Voice Quick Buttons */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
            Try saying or clicking:
          </label>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => {
                  setQuery(prompt);
                  handleCommand(prompt);
                }}
                className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-300 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                <span>"{prompt}"</span>
              </button>
            ))}
          </div>
        </div>

        {/* Manual Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCommand();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type voice query here..."
            className="flex-1 px-4 py-3 rounded-xl border theme-border theme-bg-card theme-text-heading text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md"
          >
            <Send className="w-9 h-9" />
          </button>
        </form>
      </div>
    </div>
  );
}
