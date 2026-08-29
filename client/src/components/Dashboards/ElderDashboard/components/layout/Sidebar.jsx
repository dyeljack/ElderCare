import React from 'react';
import {
  LayoutGrid,
  Activity,
  Calendar,
  Stethoscope,
  Users,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  Sun,
  Moon,
  X,
  PhoneCall
} from 'lucide-react';
import { useElderCare } from '../../context/ElderCareContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function Sidebar({ isOpen, onClose }) {
  const { activeTab, setActiveTab, showToast, setIsEmergencyModalOpen } = useElderCare();
  const { isDark, toggleTheme } = useTheme();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'health', label: 'Health', icon: Activity },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'caretakers', label: 'Caretakers', icon: Stethoscope },
    { id: 'family', label: 'Family', icon: Users },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (onClose) onClose();
  };

  const handleEmergencyTrigger = () => {
    setIsEmergencyModalOpen(true);
    if (onClose) onClose();
  };

  const handleLogout = () => {
    showToast('Logged out of ElderCare Connect session.');
  };

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 bottom-0 z-50 w-64 theme-bg-sidebar border-r theme-border flex flex-col justify-between p-5 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="flex items-start justify-between mb-8 pt-1">
            <div>
              <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-blue-200 tracking-tight leading-snug">
                ElderCare<br />Connect
              </h1>
              <p className="text-xxs font-serif italic text-slate-700 dark:text-slate-600 mt-1">
                Compassionate Care
              </p>
            </div>
            {/* Close button for mobile drawers */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              aria-label="Close Sidebar"
            >
              <X className="w-9 h-9" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-base transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 font-medium'
                  }`}
                >
                  <Icon className={`w-10 h-10 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="pt-5 border-t theme-border space-y-2">
          {/* Prominent Emergency Button in Sidebar */}
          <button
            onClick={handleEmergencyTrigger}
            className="w-full flex items-center justify-between p-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-xl font-bold text-sm shadow-md shadow-red-600/20 transition-all transform active:scale-98 cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <PhoneCall className="w-4 h-4 text-white animate-pulse" />
              <span>Call for Help</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full font-bold">
              SOS
            </span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm font-medium cursor-pointer"
            title="Toggle Light / Dark theme"
          >
            <span className="flex items-center gap-3">
              {isDark ? <Moon className="w-9 h-9 text-blue-400" /> : <Sun className="w-9 h-9 text-amber-500" />}
              <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700/80 border theme-border text-slate-600 dark:text-slate-300 font-semibold">
              {isDark ? 'On' : 'Off'}
            </span>
          </button>

          {/* Help Center */}
          <button
            onClick={() => handleNavClick('help')}
            className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm transition-colors cursor-pointer ${
              activeTab === 'help'
                ? 'bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 font-medium'
            }`}
          >
            <HelpCircle className="w-9 h-9 text-slate-500 dark:text-slate-400" />
            <span>Help Center</span>
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl font-semibold text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
          >
            <LogOut className="w-9 h-9 text-red-600 dark:text-red-400" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
