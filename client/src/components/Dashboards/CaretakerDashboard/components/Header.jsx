import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Menu, 
  AlertCircle, 
  Check, 
  ShieldAlert
} from 'lucide-react';

export function Header({
  activeTab,
  patients,
  selectedPatient,
  onSelectPatient,
  caregiver,
  reminders,
  onDismissReminder,
  isDarkMode,
  setIsDarkMode,
  onOpenSOSModal,
  onToggleMobileSidebar,
  activeAlertCount,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const searchRef = useRef(null);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Filter patients by search query
  const filteredPatients = searchQuery.trim()
    ? patients.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.roomOrAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.primaryCondition.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard';
      case 'health':
        return 'Health & Analytics';
      case 'appointments':
        return 'Appointments & Visits';
      case 'caretakers':
        return 'Care Team & Roster';
      case 'family':
        return 'Patient Directory & Families';
      case 'patient_detail':
        return selectedPatient ? `${selectedPatient.name}` : 'Patient Profile';
      default:
        return 'ElderCare Connect';
    }
  };

  return (
    <header
      id="app-header"
      className={`sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b transition-colors ${
        isDarkMode
          ? 'bg-slate-900/90 backdrop-blur-md border-slate-800 text-white'
          : 'bg-white/90 backdrop-blur-md border-slate-200 text-slate-900'
      }`}
    >
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          id="mobile-sidebar-toggle"
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 -ml-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Open navigation menu"
        >
          <Menu className="w-9 h-9" />
        </button>

        <div>
          <h2 id="main-header-title" className="text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-400 font-heading">
            {getPageTitle()}
          </h2>
          {activeTab === 'patient_detail' && selectedPatient && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {selectedPatient.roomOrAddress} • Age: {selectedPatient.age} • Adherence: {selectedPatient.overallAdherenceRate}%
            </p>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Search Patients Input */}
        <div ref={searchRef} className="relative hidden sm:block w-64 md:w-80">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-9 h-9 text-slate-400" />
            <input
              id="patient-search-input"
              type="text"
              placeholder="       Search patients..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              className={`w-full pl-10 pr-4 py-2 text-sm rounded-full border transition-all outline-hidden ${
                isDarkMode
                  ? 'bg-slate-800/80 border-slate-700 text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                  : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
              }`}
            />
          </div>

          {/* Autocomplete Dropdown */}
          {isSearchOpen && searchQuery.trim() && (
            <div
              id="search-results-dropdown"
              className={`absolute top-full left-0 right-0 mt-2 py-2 rounded-2xl shadow-xl border max-h-80 overflow-y-auto z-50 ${
                isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
              }`}
            >
              {filteredPatients.length > 0 ? (
                filteredPatients.map((p) => (
                  <button
                    key={p.id}
                    id={`search-result-${p.id}`}
                    onClick={() => {
                      onSelectPatient(p.id);
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className={`w-full px-4 py-2.5 flex items-center gap-3 text-left transition-colors ${
                      isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-blue-50/60'
                    }`}
                  >
                    <img src={p.avatar} alt={p.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{p.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{p.roomOrAddress}</p>
                    </div>
                    <span className="text-[11px] font-medium bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full shrink-0">
                      {p.primaryCondition}
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-4 text-center text-xs text-slate-400">
                  No matching patients found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* SOS One-Tap Trigger Button for Testing & Patient Simulation */}
        <button
          id="header-sos-badge-btn"
          onClick={onOpenSOSModal}
          title="Simulate Patient SOS Panic Alarm"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-950/60 dark:text-red-300 dark:hover:bg-red-900/50 border border-red-300 dark:border-red-800 transition-all cursor-pointer shadow-xs"
        >
          <ShieldAlert className="w-9 h-9 text-red-600 animate-pulse" />
          <span className="hidden sm:inline">SOS Alarm</span>
        </button>

        {/* Automated Reminders & Notifications Dropdown */}
        <div ref={notifRef} className="relative">
          <button
            id="notifications-bell-btn"
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className={`relative p-2.5 rounded-full transition-colors ${
              isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'
            }`}
            aria-label="Automated medication reminders and alerts"
          >
            <Bell className="w-9 h-9" />
            {(reminders.length > 0 || activeAlertCount > 0) && (
              <span
                id="notif-badge"
                className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-blue-600 ring-2 ring-white dark:ring-slate-900 rounded-full"
              />
            )}
          </button>

          {isNotificationsOpen && (
            <div
              id="notifications-dropdown-menu"
              className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl shadow-xl border p-4 z-50 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Bell className="w-9 h-9 text-blue-600" />
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Automated Reminders</h4>
                </div>
                <span className="text-xs bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full font-semibold">
                  {reminders.length} Active
                </span>
              </div>

              <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto">
                {reminders.length > 0 ? (
                  reminders.map((rem) => (
                    <div
                      key={rem.id}
                      id={`reminder-item-${rem.id}`}
                      className={`p-3 rounded-xl border flex items-start gap-3 transition-colors ${
                        isDarkMode ? 'bg-slate-800/60 border-slate-700/80' : 'bg-slate-50 border-slate-200/80'
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 shrink-0">
                        <AlertCircle className="w-9 h-9" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">{rem.patientName}</p>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{rem.time}</span>
                        </div>
                        <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-0.5">{rem.title}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{rem.details}</p>
                      </div>
                      <button
                        id={`dismiss-rem-${rem.id}`}
                        onClick={() => onDismissReminder(rem.id)}
                        title="Mark Completed"
                        className="p-1 rounded-md text-slate-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-950/40"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-6 text-xs text-slate-400">No pending medication or visit reminders</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Caregiver Profile Avatar */}
        <div ref={profileRef} className="relative">
          <button
            id="caretaker-profile-btn"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2.5 p-1 rounded-full hover:ring-2 hover:ring-blue-500/30 transition-all"
            aria-label="Caregiver profile"
          >
            <img
              src={caregiver.avatar}
              alt={caregiver.name}
              className="w-9 h-9 rounded-full object-cover border-2 border-blue-600"
            />
          </button>

          {isProfileOpen && (
            <div
              id="caretaker-profile-dropdown"
              className={`absolute right-0 mt-2 w-64 rounded-2xl shadow-xl border p-4 z-50 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                <img src={caregiver.avatar} alt={caregiver.name} className="w-11 h-11 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{caregiver.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{caregiver.role}</p>
                </div>
              </div>
              <div className="py-2.5 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <p><strong>Agency:</strong> {caregiver.agency}</p>
                <p><strong>Phone:</strong> {caregiver.phone}</p>
                <p><strong>Rating:</strong> {caregiver.monthlyRating} / 5.0 ⭐</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
