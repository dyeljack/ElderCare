import React, { useState, useEffect } from 'react';
import { 
  initialCaregiver, 
  initialEmergencyAlerts, 
  initialMedications, 
  initialMessages, 
  initialMoodVitalLogs, 
  initialPatients, 
  initialReminders, 
  initialVisits 
} from './data/mockData.js';
import { Sidebar } from './components/Sidebar.jsx';
import { Header } from './components/Header.jsx';
import { EmergencyBanner } from './components/EmergencyBanner.jsx';
import { ActiveVisitCard } from './components/ActiveVisitCard.jsx';
import { PerformanceMetricsCard } from './components/PerformanceMetricsCard.jsx';
import { RecentMessagesCard } from './components/RecentMessagesCard.jsx';
import { UpcomingVisitsCard } from './components/UpcomingVisitsCard.jsx';
import { PatientDetailView } from './components/PatientDetailView.jsx';
import { HealthAnalyticsView } from './components/HealthAnalyticsView.jsx';
import { PatientsListView } from './components/PatientsListView.jsx';
import { CaregiversView } from './components/CaregiversView.jsx';
import { AppointmentsView } from './components/AppointmentsView.jsx';
import { PatientSOSModal } from './components/PatientSOSModal.jsx';
import { AddMedicationModal } from './components/AddMedicationModal.jsx';
import { LogMoodVitalsModal } from './components/LogMoodVitalsModal.jsx';
import { AddPatientModal } from './components/AddPatientModal.jsx';
import { audioService } from './utils/audio.js';

export default function App() {
  // Theme state with local persistence
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('eldercare_theme');
      if (saved) return saved === 'dark';
    }
    return false;
  });

  // Main Data States with localStorage persistence
  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem('eldercare_patients');
    return saved ? JSON.parse(saved) : initialPatients;
  });

  const [medications, setMedications] = useState(() => {
    const saved = localStorage.getItem('eldercare_medications');
    return saved ? JSON.parse(saved) : initialMedications;
  });

  const [visits, setVisits] = useState(() => {
    const saved = localStorage.getItem('eldercare_visits');
    return saved ? JSON.parse(saved) : initialVisits;
  });

  const [moodVitalLogs, setMoodVitalLogs] = useState(() => {
    const saved = localStorage.getItem('eldercare_logs');
    return saved ? JSON.parse(saved) : initialMoodVitalLogs;
  });

  const [emergencyAlert, setEmergencyAlert] = useState(() => {
    const saved = localStorage.getItem('eldercare_emergency');
    return saved ? JSON.parse(saved) : initialEmergencyAlerts[0];
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('eldercare_messages');
    return saved ? JSON.parse(saved) : initialMessages;
  });

  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem('eldercare_reminders');
    return saved ? JSON.parse(saved) : initialReminders;
  });

  const [caregiver] = useState(initialCaregiver);

  // Navigation & View states
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPatientId, setSelectedPatientId] = useState(initialPatients[0].id);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Modals
  const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);
  const [sosDefaultPatient, setSosDefaultPatient] = useState(undefined);
  const [isAddMedModalOpen, setIsAddMedModalOpen] = useState(false);
  const [isLogVitalsModalOpen, setIsLogVitalsModalOpen] = useState(false);
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [activeToast, setActiveToast] = useState(null);

  // Sync dark class on document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('eldercare_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('eldercare_theme', 'light');
    }
  }, [isDarkMode]);

  // Persist data states
  useEffect(() => {
    localStorage.setItem('eldercare_patients', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('eldercare_medications', JSON.stringify(medications));
  }, [medications]);

  useEffect(() => {
    localStorage.setItem('eldercare_visits', JSON.stringify(visits));
  }, [visits]);

  useEffect(() => {
    localStorage.setItem('eldercare_logs', JSON.stringify(moodVitalLogs));
  }, [moodVitalLogs]);

  useEffect(() => {
    localStorage.setItem('eldercare_emergency', JSON.stringify(emergencyAlert));
  }, [emergencyAlert]);

  useEffect(() => {
    localStorage.setItem('eldercare_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('eldercare_reminders', JSON.stringify(reminders));
  }, [reminders]);

  const showToast = (message, type = 'success') => {
    setActiveToast({ message, type });
    setTimeout(() => setActiveToast(null), 3500);
  };

  // Find active visit and patient for the in-progress card
  const activeVisit = visits.find((v) => v.status === 'in_progress') || null;
  const activeVisitPatient = activeVisit 
    ? patients.find((p) => p.id === activeVisit.patientId) || null 
    : patients.find((p) => p.id === 'p-1') || null;

  const currentPatient = patients.find((p) => p.id === selectedPatientId) || patients[0];

  // Actions
  const handleToggleMedication = (medId) => {
    setMedications((prev) =>
      prev.map((med) => {
        if (med.id === medId) {
          const nextTaken = !med.takenToday;
          const timeNow = nextTaken
            ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : undefined;
          if (nextTaken) {
            audioService.playReminderChime();
            showToast(`${med.name} marked administered.`);
          }
          return {
            ...med,
            takenToday: nextTaken,
            takenTime: timeNow,
          };
        }
        return med;
      })
    );
  };

  const handleStartVisit = (visitId) => {
    setVisits((prev) =>
      prev.map((v) => {
        if (v.id === visitId) {
          return { ...v, status: 'in_progress' };
        }
        return v;
      })
    );
    const targetVisit = visits.find((v) => v.id === visitId);
    if (targetVisit) {
      showToast(`Started care visit for ${targetVisit.patientName}.`);
    }
  };

  const handleDeleteVisit = (visitId) => {
    setVisits((prev) => prev.filter((v) => v.id !== visitId));
    showToast('Scheduled visit removed from itinerary.');
  };

  const handleAddVisit = (newVisitData) => {
    const newVisit = {
      ...newVisitData,
      id: `v-${Date.now()}`,
    };
    setVisits((prev) => [newVisit, ...prev]);
    showToast(`Visit scheduled for ${newVisit.patientName}.`);
  };

  const handleCompleteVisit = (notes, mood) => {
    if (!activeVisit) return;
    setVisits((prev) =>
      prev.map((v) => (v.id === activeVisit.id ? { ...v, status: 'completed', notes } : v))
    );

    // If mood was selected, log a mood entry automatically
    if (mood && activeVisitPatient) {
      const now = new Date();
      const newLog = {
        id: `log-${Date.now()}`,
        patientId: activeVisitPatient.id,
        date: now.toISOString().slice(0, 10),
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mood,
        moodScore: mood === 'great' ? 5 : mood === 'good' ? 4 : mood === 'neutral' ? 3 : 2,
        vitals: {
          bloodPressureSystolic: 120,
          bloodPressureDiastolic: 80,
          heartRate: 74,
          bloodSugar: 115,
          oxygenLevel: 98,
          temperature: 98.6,
          sleepHours: 7,
          painLevel: 1,
        },
        notes: notes || 'Visit completed successfully. Medication and checkup documented.',
        recordedBy: caregiver.name,
      };

      setMoodVitalLogs((prev) => ({
        ...prev,
        [activeVisitPatient.id]: [...(prev[activeVisitPatient.id] || []), newLog],
      }));
    }

    showToast(`Visit for ${activeVisit.patientName} marked complete!`);
  };

  const handleReportIssue = (issue) => {
    showToast(`Concern logged: "${issue.slice(0, 35)}..."`, 'warning');
  };

  const handleRespondEmergency = (alertId) => {
    if (emergencyAlert && emergencyAlert.id === alertId) {
      setEmergencyAlert({
        ...emergencyAlert,
        status: 'responding',
        responder: caregiver.name,
      });
      showToast('Response active: Caregiver dispatched.', 'info');
    }
  };

  const handleResolveEmergency = (alertId, notes) => {
    if (emergencyAlert && emergencyAlert.id === alertId) {
      setEmergencyAlert(null);
      showToast('Emergency alert resolved and filed in incident logs.');
    }
  };

  const handleTriggerPatientSOS = (newAlertData) => {
    const now = new Date();
    const newAlert = {
      ...newAlertData,
      id: `sos-${Date.now()}`,
      timestamp: `Today at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      timeAgo: 'Just now',
      status: 'active',
    };
    setEmergencyAlert(newAlert);
    showToast(`🚨 CRITICAL: SOS Signal received from ${newAlert.patientName}!`, 'warning');
  };

  const handleSendMessage = (senderName, text) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      senderName: caregiver.name,
      senderRole: 'Primary Caregiver RN',
      avatar: caregiver.avatar,
      message: text,
      timestamp: 'Just now',
      unread: false,
    };
    setMessages((prev) => [newMsg, ...prev]);
    showToast(`Reply sent to ${senderName}.`);
  };

  const handleDismissReminder = (remId) => {
    setReminders((prev) => prev.filter((r) => r.id !== remId));
    showToast('Reminder completed.');
  };

  const handleSaveMedication = (newMedData) => {
    const newMed = {
      ...newMedData,
      id: `med-${Date.now()}`,
      takenToday: false,
    };
    setMedications((prev) => [...prev, newMed]);
    showToast(`Added ${newMed.name} to care schedule.`);
  };

  const handleSaveVitalLog = (newLogData) => {
    const newLog = {
      ...newLogData,
      id: `log-${Date.now()}`,
    };
    setMoodVitalLogs((prev) => ({
      ...prev,
      [newLog.patientId]: [...(prev[newLog.patientId] || []), newLog],
    }));

    // Update patient current mood
    setPatients((prev) =>
      prev.map((p) => (p.id === newLog.patientId ? { ...p, currentMood: newLog.mood } : p))
    );

    showToast(`Vital log and ${newLog.mood} mood recorded.`);
  };

  const handleAddNewPatient = (newPatient) => {
    setPatients((prev) => [...prev, newPatient]);
    setMoodVitalLogs((prev) => ({
      ...prev,
      [newPatient.id]: [],
    }));
    setSelectedPatientId(newPatient.id);
    setActiveTab('patient_detail');
    showToast(`Patient ${newPatient.name} registered.`);
  };

  return (
    <div
      className={`min-h-screen flex transition-colors duration-200 ${
        isDarkMode ? 'bg-[#0B1120] text-slate-100' : 'bg-[#F8FAFC] text-slate-800'
      }`}
    >
      {/* Toast Notification Alert */}
      {activeToast && (
        <div
          id="app-toast"
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-xl border text-xs font-bold flex items-center gap-2.5 transition-all transform animate-bounce ${
            activeToast.type === 'warning'
              ? 'bg-red-600 text-white border-red-500'
              : activeToast.type === 'info'
              ? 'bg-blue-600 text-white border-blue-500'
              : 'bg-emerald-600 text-white border-emerald-500'
          }`}
        >
          <span>{activeToast.message}</span>
        </div>
      )}

      {/* Main Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedPatientId={selectedPatientId}
        setSelectedPatientId={setSelectedPatientId}
        patients={patients}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onOpenSOSModal={() => {
          setSosDefaultPatient(currentPatient);
          setIsSOSModalOpen(true);
        }}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header
          activeTab={activeTab}
          patients={patients}
          selectedPatient={currentPatient}
          onSelectPatient={(pId) => {
            setSelectedPatientId(pId);
            setActiveTab('patient_detail');
          }}
          caregiver={caregiver}
          reminders={reminders}
          onDismissReminder={handleDismissReminder}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          onOpenSOSModal={() => {
            setSosDefaultPatient(currentPatient);
            setIsSOSModalOpen(true);
          }}
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          activeAlertCount={emergencyAlert && emergencyAlert.status !== 'resolved' ? 1 : 0}
        />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Top Emergency Warning Banner */}
          <EmergencyBanner
            alert={emergencyAlert}
            onRespond={handleRespondEmergency}
            onResolve={handleResolveEmergency}
            isDarkMode={isDarkMode}
          />

          {/* VIEW 1: Main Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* 2-Column Split: Active Visit on Left, Performance & Messages on Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column (7 cols): Active Visit In Progress */}
                <div className="lg:col-span-7">
                  <ActiveVisitCard
                    visit={activeVisit}
                    patient={activeVisitPatient}
                    medications={medications}
                    onToggleMedication={handleToggleMedication}
                    onCompleteVisit={handleCompleteVisit}
                    onReportIssue={handleReportIssue}
                    onOpenLogVitals={() => {
                      if (activeVisitPatient) {
                        setSelectedPatientId(activeVisitPatient.id);
                        setIsLogVitalsModalOpen(true);
                      }
                    }}
                    isDarkMode={isDarkMode}
                  />
                </div>

                {/* Right Column (5 cols): Performance Metrics & Recent Messages */}
                <div className="lg:col-span-5 space-y-6">
                  <PerformanceMetricsCard
                    caregiver={caregiver}
                    isDarkMode={isDarkMode}
                  />

                  <RecentMessagesCard
                    messages={messages}
                    onSendMessage={handleSendMessage}
                    onSelectPatientById={(pId) => {
                      setSelectedPatientId(pId);
                      setActiveTab('patient_detail');
                    }}
                    isDarkMode={isDarkMode}
                  />
                </div>
              </div>

              {/* Bottom Full-Width Section: Upcoming Visits with Delete Option */}
              <UpcomingVisitsCard
                visits={visits}
                patients={patients}
                onStartVisit={handleStartVisit}
                onDeleteVisit={handleDeleteVisit}
                onAddVisit={handleAddVisit}
                isDarkMode={isDarkMode}
              />
            </div>
          )}

          {/* VIEW 2: Patient Dedicated Detail Page */}
          {activeTab === 'patient_detail' && (
            <PatientDetailView
              patient={currentPatient}
              medications={medications}
              logs={moodVitalLogs[currentPatient.id] || []}
              onToggleMedication={handleToggleMedication}
              onAddMedication={() => setIsAddMedModalOpen(true)}
              onLogMoodVitals={() => setIsLogVitalsModalOpen(true)}
              onOpenSOSModalForPatient={(p) => {
                setSosDefaultPatient(p);
                setIsSOSModalOpen(true);
              }}
              isDarkMode={isDarkMode}
            />
          )}

          {/* VIEW 3: Health & Visual Wellness Analytics */}
          {activeTab === 'health' && (
            <HealthAnalyticsView
              patients={patients}
              medications={medications}
              logsMap={moodVitalLogs}
              isDarkMode={isDarkMode}
            />
          )}

          {/* VIEW 4: Appointments & Caretaker Itinerary */}
          {activeTab === 'appointments' && (
            <AppointmentsView
              visits={visits}
              patients={patients}
              onStartVisit={handleStartVisit}
              onDeleteVisit={handleDeleteVisit}
              onOpenScheduleModal={() => {
                const upcoming = document.getElementById('schedule-visit-btn');
                if (upcoming) upcoming.click();
              }}
              isDarkMode={isDarkMode}
            />
          )}

          {/* VIEW 5: Caregivers & Team Roster */}
          {activeTab === 'caretakers' && (
            <CaregiversView
              currentCaregiver={caregiver}
              isDarkMode={isDarkMode}
            />
          )}

          {/* VIEW 6: Patients & Family Directory */}
          {activeTab === 'family' && (
            <PatientsListView
              patients={patients}
              medications={medications}
              logsMap={moodVitalLogs}
              onSelectPatient={(pId) => {
                setSelectedPatientId(pId);
                setActiveTab('patient_detail');
              }}
              onOpenAddPatient={() => setIsAddPatientModalOpen(true)}
              isDarkMode={isDarkMode}
            />
          )}
        </main>
      </div>

      {/* MODALS */}
      {/* Patient SOS Simulator Modal */}
      <PatientSOSModal
        isOpen={isSOSModalOpen}
        onClose={() => setIsSOSModalOpen(false)}
        patients={patients}
        defaultPatient={sosDefaultPatient}
        onTriggerAlert={handleTriggerPatientSOS}
        isDarkMode={isDarkMode}
      />

      {/* Add Medication Modal */}
      <AddMedicationModal
        isOpen={isAddMedModalOpen}
        onClose={() => setIsAddMedModalOpen(false)}
        patient={currentPatient}
        onSaveMedication={handleSaveMedication}
        isDarkMode={isDarkMode}
      />

      {/* Log Mood & Vitals Modal */}
      <LogMoodVitalsModal
        isOpen={isLogVitalsModalOpen}
        onClose={() => setIsLogVitalsModalOpen(false)}
        patient={currentPatient}
        onSaveLog={handleSaveVitalLog}
        isDarkMode={isDarkMode}
      />

      {/* Add New Patient Modal */}
      <AddPatientModal
        isOpen={isAddPatientModalOpen}
        onClose={() => setIsAddPatientModalOpen(false)}
        onAddPatient={handleAddNewPatient}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
