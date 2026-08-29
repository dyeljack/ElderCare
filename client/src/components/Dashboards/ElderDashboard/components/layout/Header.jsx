import React, { useState } from 'react';
import { Bell, Settings, Menu, Sun, Moon, PhoneCall, ShieldAlert } from 'lucide-react';
import { useElderCare } from '../../context/ElderCareContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function Header({ onOpenMobileMenu }) {
  const { activeTab, setActiveTab, notifications, setIsEmergencyModalOpen } = useElderCare();
  const { isDark, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);

  const topNavTabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'health', label: 'Health' },
    { id: 'family', label: 'Family' },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="theme-bg-sidebar border-b theme-border px-4 lg:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
      {/* Left side: Mobile menu toggle + Top horizontal tabs */}
      <div className="flex items-center gap-4 lg:gap-8">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
          aria-label="Open mobile menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        <nav className="flex items-center gap-6 lg:gap-8">
          {topNavTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative font-serif text-sm lg:text-base font-semibold py-1 transition-colors cursor-pointer ${
                  isActive
                    ? 'text-blue-700 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute " />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Right side controls: Call for Help, Dark Mode, Notifications, Settings, Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 lg:gap-4">
        {/* Prominent Emergency 'Call for Help' Button */}
        <button
          onClick={() => setIsEmergencyModalOpen(true)}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs sm:text-sm px-3.5 sm:px-4 py-2 rounded-xl shadow-md shadow-red-600/30 transition-all transform active:scale-95 cursor-pointer ring-2 ring-red-400/50 hover:ring-red-400 animate-pulse"
          title="Trigger Emergency Siren & Local Contacts"
          aria-label="Call for Help emergency assistance"
        >
          <PhoneCall className="w-10 h-10 shrink-0" />
          <span className="tracking-tight whitespace-nowrap">Call for Help</span>
        </button>

        {/* Dark Mode Quick Switcher */}
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-9 h-9 text-amber-400" /> : <Moon className="w-10 h-10 text-slate-600" />}
        </button>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-9 h-9" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-600 rounded-full ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 theme-bg-card border theme-border rounded-2xl shadow-xl p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b theme-border mb-3">
                <h4 className="font-semibold text-sm theme-text-heading">Notifications</h4>
                <span className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium px-2 py-0.5 rounded-full">
                  {notifications.length} New
                </span>
              </div>
              <div className="space-y-2.5 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1">
                    <div className="flex justify-between font-semibold theme-text-heading">
                      <span>{n.title}</span>
                      <span className="text-slate-400">{n.time}</span>
                    </div>
                    <p className="theme-text-muted">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Settings Button */}
        <button
          onClick={() => setActiveTab('settings')}
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
          aria-label="Settings"
        >
          <Settings className="w-9 h-9" />
        </button>

        {/* Profile Avatar */}
        <div
          onClick={() => setActiveTab('settings')}
          className="flex items-center gap-2 cursor-pointer group"
          title="Arthur's Profile"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-600/30 dark:ring-blue-400/40 group-hover:ring-blue-600 transition-all">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
              alt="Arthur"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
