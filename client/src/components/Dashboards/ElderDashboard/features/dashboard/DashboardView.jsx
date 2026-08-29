import React from 'react';
import GreetingCard from './components/GreetingCard.jsx';
import VoiceControlCard from './components/VoiceControlCard.jsx';
import MedicationTracker from './components/MedicationTracker.jsx';
import UpcomingSchedule from './components/UpcomingSchedule.jsx';
import HealthVitals from './components/HealthVitals.jsx';

export default function DashboardView() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Grid: Greeting Card & Voice Control Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2">
          <GreetingCard />
        </div>
        <div className="lg:col-span-1">
          <VoiceControlCard />
        </div>
      </div>

      {/* Middle Grid: Daily Medications & Upcoming Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2">
          <MedicationTracker />
        </div>
        <div className="lg:col-span-1">
          <UpcomingSchedule />
        </div>
      </div>

      {/* Bottom Grid: Health Vitals */}
      <div>
        <HealthVitals />
      </div>
    </div>
  );
}
