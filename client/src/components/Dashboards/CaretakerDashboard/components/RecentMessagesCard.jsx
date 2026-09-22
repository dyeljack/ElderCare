import React, { useState } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';

export function RecentMessagesCard({
  messages,
  onSendMessage,
  onSelectPatientById,
  isDarkMode,
}) {
  const [showAllModal, setShowAllModal] = useState(false);
  const [activeReplyMessage, setActiveReplyMessage] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleSend = () => {
    if (activeReplyMessage && replyText.trim()) {
      onSendMessage(activeReplyMessage.senderName, replyText);
      setReplyText('');
      setActiveReplyMessage(null);
    }
  };

  return (
    <>
      <div
        id="recent-messages-card"
        className={`rounded-3xl p-6 border transition-all ${
          isDarkMode
            ? 'bg-slate-900 border-slate-800 text-slate-100 shadow-xl'
            : 'bg-white border-slate-200/90 text-slate-800 shadow-xs'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold tracking-tight font-heading">Recent Messages</h3>
          <button
            id="view-all-messages-btn"
            onClick={() => setShowAllModal(true)}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="space-y-3">
          {messages.slice(0, 3).map((msg) => (
            <div
              key={msg.id}
              id={`msg-item-${msg.id}`}
              onClick={() => setActiveReplyMessage(msg)}
              className={`p-3 rounded-2xl flex items-start gap-3 transition-all cursor-pointer border ${
                isDarkMode
                  ? 'bg-slate-800/40 border-slate-800 hover:bg-slate-800/80'
                  : 'bg-slate-50/50 border-slate-200/70 hover:bg-blue-50/60 hover:border-blue-200/80'
              }`}
            >
              <img
                src={msg.avatar}
                alt={msg.senderName}
                className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-200 dark:border-slate-700"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                    {msg.senderName}
                  </p>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                    {msg.unread && (
                      <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                    )}
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-1">
                  {msg.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Thread / Reply Modal */}
      {(showAllModal || activeReplyMessage) && (
        <div
          id="messages-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div
            className={`w-full max-w-lg rounded-3xl p-6 shadow-2xl border ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold">
                    {activeReplyMessage ? `Conversation: ${activeReplyMessage.senderName}` : 'Family & Care Team Messages'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {activeReplyMessage ? activeReplyMessage.senderRole : `${messages.length} Total communications`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowAllModal(false);
                  setActiveReplyMessage(null);
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Message History */}
            <div className="my-4 max-h-72 overflow-y-auto space-y-3 pr-1">
              {(activeReplyMessage ? [activeReplyMessage] : messages).map((m) => (
                <div
                  key={m.id}
                  className={`p-3.5 rounded-2xl border ${
                    isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <img src={m.avatar} alt={m.senderName} className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-xs font-bold">{m.senderName}</span>
                    <span className="text-[10px] text-slate-400">({m.senderRole}) • {m.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pl-8">
                    {m.message}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Reply Form */}
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex gap-2">
                <input
                  id="reply-message-input"
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={
                    activeReplyMessage
                      ? `Reply to ${activeReplyMessage.senderName}...`
                      : 'Type a message to family or supervisor...'
                  }
                  className={`flex-1 px-4 py-2.5 text-xs rounded-xl border outline-hidden ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                />
                <button
                  id="send-reply-btn"
                  onClick={handleSend}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
