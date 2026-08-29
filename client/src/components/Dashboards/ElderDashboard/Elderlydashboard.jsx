import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { ElderCareProvider, useElderCare } from './context/ElderCareContext.jsx';
import Sidebar from './components/layout/Sidebar.jsx';
import Header from './components/layout/Header.jsx';
import DashboardView from './features/dashboard/DashboardView.jsx';
import HealthView from './features/health/HealthView.jsx';
import AppointmentsView from './features/appointments/AppointmentsView.jsx';
import CaretakersView from './features/caretakers/CaretakersView.jsx';
import FamilyView from './features/family/FamilyView.jsx';
import BillingView from './features/billing/BillingView.jsx';
import SettingsView from './features/settings/SettingsView.jsx';
import EmergencyModal from './components/modals/EmergencyModal.jsx';
import VoiceAssistantModal from './components/modals/VoiceAssistantModal.jsx';
import LogVitalModal from './components/modals/LogVitalModal.jsx';
import AddMedicationModal from './components/modals/AddMedicationModal.jsx';
import { CheckCircle, AlertCircle } from 'lucide-react';

function MainLayout() {
  const { activeTab, toastMessage } = useElderCare();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'health':
        return <HealthView />;
      case 'appointments':
        return <AppointmentsView />;
      case 'caretakers':
        return <CaretakersView />;
      case 'family':
        return <FamilyView />;
      case 'billing':
        return <BillingView />;
      case 'settings':
      case 'help':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen theme-bg-app flex flex-col lg:flex-row font-sans transition-colors duration-200">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Right Content Panel */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Bar */}
        <Header onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        {/* Dynamic Feature Page View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Global Interactive Modals */}
      <EmergencyModal />
      <VoiceAssistantModal />
      <LogVitalModal />
      <AddMedicationModal />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700/50 animate-bounce">
          <CheckCircle className="w-5 h-5 text-teal-400 dark:text-teal-600 shrink-0" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ElderCareProvider>
        <MainLayout />
      </ElderCareProvider>
    </ThemeProvider>
  );
}
