import React from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  CalendarDays, 
  Users2, 
  HeartHandshake, 
  HelpCircle, 
  LogOut, 
  Moon, 
  Sun, 
  AlertTriangle,
  X
} from 'lucide-react';

export function Sidebar({
  activeTab,
  setActiveTab,
  selectedPatientId,
  setSelectedPatientId,
  patients,
  isDarkMode,
  setIsDarkMode,
  onOpenSOSModal,
  mobileOpen,
  setMobileOpen,
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'health', label: 'Health', icon: Activity },
    { id: 'appointments', label: 'Appointments', icon: CalendarDays },
    { id: 'caretakers', label: 'Caretakers', icon: HeartHandshake },
    { id: 'family', label: 'Family', icon: Users2 },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          id="mobile-backdrop"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      <aside
        id="app-sidebar"
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-64 flex flex-col justify-between transition-transform duration-300 ease-in-out border-r ${
          isDarkMode 
            ? 'bg-slate-900 border-slate-800 text-slate-200' 
            : 'bg-white border-slate-200 text-slate-700'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Top Branding */}
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div 
              id="brand-logo-btn"
              onClick={() => handleNavClick('dashboard')}
              className="cursor-pointer group"
            >
              <h1 className="text-2xl font-bold text-blue-600 tracking-tight leading-none group-hover:text-blue-700 transition-colors font-heading">
                ElderCare<br />Connect
              </h1>
              <p className="text-xs font-medium text-slate-400 mt-1">Compassionate Care</p>
            </div>
            <button
              id="close-mobile-sidebar"
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-15 h-15" />
            </button>
          </div>

          {/* Nav List */}
          <nav className="mt-8 space-y-1.5" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all text-left ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-semibold'
                      : isDarkMode
                      ? 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/70'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-9 h-9 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Patients Quick Switcher Section */}
          <div className="mt-7 pt-5 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2.5 px-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Assigned Patients</span>
              <span className="text-[11px] bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold px-1.5 py-0.5 rounded-md">
                {patients.length}
              </span>
            </div>
            <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
              {patients.map((p) => {
                const isSelected = activeTab === 'patient_detail' && selectedPatientId === p.id;
                return (
                  <button
                    key={p.id}
                    id={`sidebar-patient-btn-${p.id}`}
                    onClick={() => {
                      setSelectedPatientId(p.id);
                      setActiveTab('patient_detail');
                      setMobileOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all text-left truncate ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold border border-blue-200 dark:border-blue-800'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <img 
                      src={p.avatar} 
                      alt={p.name} 
                      className="w-15 h-15 rounded-full object-cover shrink-0" 
                    />
                    <span className="truncate">{p.name}</span>
                    <span className="ml-auto text-[10px] text-slate-400 shrink-0">{p.age}y</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-5 border-t border-slate-200 dark:border-slate-800 space-y-1.5">
          {/* Patient Emergency SOS Simulator Trigger */}
          <button
            id="sidebar-sos-sim-btn"
            onClick={onOpenSOSModal}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-300 dark:border-red-900/50 transition-colors"
          >
            <AlertTriangle className="w-9 h-9 text-red-600 dark:text-red-400 shrink-0" />
            <span className="truncate">Patient SOS Trigger</span>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            id="sidebar-theme-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              isDarkMode 
                ? 'text-slate-300 hover:bg-slate-800' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {isDarkMode ? (
              <>
                <Sun className="w-9 h-9 text-amber-400" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-9 h-9 text-slate-500" />
                <span>Dark Mode</span>
              </>
            )}
          </button>

          {/* Help Center */}
          <button
            id="sidebar-help-btn"
            onClick={() => alert('ElderCare Connect 24/7 Caregiver Support Line: 1-800-555-CARE\nCare protocol guides and emergency escalation handbook are available in the documents tab.')}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <HelpCircle className="w-9 h-9 text-slate-400" />
            <span>Help Center</span>
          </button>

          {/* Logout */}
          <button
            id="sidebar-logout-btn"
            onClick={() => {
              if (confirm('Are you sure you want to end your current caregiver shift and log out?')) {
                alert('Shift logged. Secure session ended.');
              }
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <LogOut className="w-9 h-9 text-slate-400" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
