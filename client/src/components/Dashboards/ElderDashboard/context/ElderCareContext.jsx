import React, { createContext, useContext, useState } from 'react';

const ElderCareContext = createContext();

const initialMedications = [
  {
    id: 'med-1',
    time: '09:00 AM',
    name: 'Heart Medication',
    instruction: 'Take 1 tablet with water after breakfast',
    taken: false,
    takenTime: null,
  },
  {
    id: 'med-2',
    time: '07:00 AM',
    name: 'Blood Pressure Pill',
    instruction: 'Completed at 7:05 AM',
    taken: true,
    takenTime: '7:05 AM',
  },
];

const initialSchedule = [
  {
    id: 'sch-1',
    time: '11:30 AM',
    title: 'Nurse visit: Maria',
    subtitle: 'Regular health checkup',
    color: 'bg-blue-600',
    dotColor: '#2563eb',
  },
  {
    id: 'sch-2',
    time: '02:00 PM',
    title: 'Walk in the park',
    subtitle: 'Caregiver scheduled',
    color: 'bg-amber-700',
    dotColor: '#b45309',
  },
  {
    id: 'sch-3',
    time: '06:00 PM',
    title: 'Video call with Emily',
    subtitle: 'Family catch-up',
    color: 'bg-teal-600',
    dotColor: '#0d9488',
  },
];

const initialVitals = {
  heartRate: {
    value: 72,
    unit: 'BPM',
    status: 'NORMAL',
    history: [68, 70, 72, 75, 78, 72],
  },
  bloodPressure: {
    systolic: 135,
    diastolic: 85,
    formatted: '135/85',
    unit: 'mmHg',
    status: 'SLIGHTLY HIGH',
    lastMeasured: 'Last measured: 2 hours ago',
  },
  bloodSugar: {
    value: 98,
    unit: 'mg/dL',
    status: 'NORMAL',
    note: 'Trending stable today',
  },
};

export function ElderCareProvider({ children }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [medications, setMedications] = useState(initialMedications);
  const [schedule, setSchedule] = useState(initialSchedule);
  const [vitals, setVitals] = useState(initialVitals);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isLogVitalModalOpen, setIsLogVitalModalOpen] = useState(false);
  const [isAddMedModalOpen, setIsAddMedModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'Medication Reminder', desc: 'Heart medication due at 9:00 AM', read: false, time: '10 mins ago' },
    { id: '2', title: 'Schedule Update', desc: 'Maria confirmed Nurse Visit for 11:30 AM', read: false, time: '1 hour ago' },
  ]);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const toggleMedicationTaken = (id) => {
    setMedications((prev) =>
      prev.map((med) => {
        if (med.id === id) {
          const newTaken = !med.taken;
          const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const updatedMed = {
            ...med,
            taken: newTaken,
            takenTime: newTaken ? nowTime : null,
            instruction: newTaken ? `Completed at ${nowTime}` : 'Take 1 tablet with water after breakfast',
          };
          if (newTaken) {
            showToast(`Marked "${med.name}" as taken!`);
          } else {
            showToast(`Reset status for "${med.name}"`);
          }
          return updatedMed;
        }
        return med;
      })
    );
  };

  const addMedication = (newMed) => {
    const created = {
      id: `med-${Date.now()}`,
      time: newMed.time || '12:00 PM',
      name: newMed.name,
      instruction: newMed.instruction || 'Take as prescribed by doctor',
      taken: false,
    };
    setMedications((prev) => [...prev, created]);
    showToast(`Added medication: ${newMed.name}`);
  };

  const deleteMedication = (id) => {
    const target = medications.find((m) => m.id === id);
    setMedications((prev) => prev.filter((m) => m.id !== id));
    if (target) {
      showToast(`Removed medication: ${target.name}`);
    }
  };

  const updateVital = (type, data) => {
    setVitals((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        ...data,
      },
    }));
    showToast(`Updated ${type} reading successfully`);
  };

  const addScheduleEvent = (event) => {
    const created = {
      id: `sch-${Date.now()}`,
      time: event.time || '03:00 PM',
      title: event.title,
      subtitle: event.subtitle || 'Scheduled activity',
      color: 'bg-blue-600',
      dotColor: '#2563eb',
    };
    setSchedule((prev) => [...prev, created]);
    showToast(`Scheduled event: ${event.title}`);
  };

  const deleteScheduleEvent = (id) => {
    const target = schedule.find((s) => s.id === id);
    setSchedule((prev) => prev.filter((s) => s.id !== id));
    if (target) {
      showToast(`Removed event: ${target.title}`);
    }
  };

  const remainingMedCount = medications.filter((m) => !m.taken).length;

  return (
    <ElderCareContext.Provider
      value={{
        activeTab,
        setActiveTab,
        medications,
        schedule,
        vitals,
        remainingMedCount,
        toggleMedicationTaken,
        addMedication,
        deleteMedication,
        updateVital,
        addScheduleEvent,
        deleteScheduleEvent,
        isEmergencyModalOpen,
        setIsEmergencyModalOpen,
        isVoiceModalOpen,
        setIsVoiceModalOpen,
        isLogVitalModalOpen,
        setIsLogVitalModalOpen,
        isAddMedModalOpen,
        setIsAddMedModalOpen,
        notifications,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </ElderCareContext.Provider>
  );
}

export function useElderCare() {
  const context = useContext(ElderCareContext);
  if (!context) {
    throw new Error('useElderCare must be used within an ElderCareProvider');
  }
  return context;
}
