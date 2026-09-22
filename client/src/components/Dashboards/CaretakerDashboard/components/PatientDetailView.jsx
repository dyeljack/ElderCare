import React, { useState } from 'react';
import { 
  Pill, 
  Activity, 
  FileDown, 
  Plus, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Phone, 
  UserCheck, 
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { exportPatientClinicalReport } from '../utils/pdfExport.js';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  LineChart, 
  Line, 
  BarChart, 
  Bar 
} from 'recharts';

export function PatientDetailView({
  patient,
  medications,
  logs,
  onToggleMedication,
  onAddMedication,
  onLogMoodVitals,
  onOpenSOSModalForPatient,
  isDarkMode,
}) {
  const [activeSubTab, setActiveSubTab] = useState('medications');
  const [isExporting, setIsExporting] = useState(false);

  const patientMeds = medications.filter((m) => m.patientId === patient.id);
  const patientLogs = logs.filter((l) => l.patientId === patient.id);

  const handleExportPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      try {
        exportPatientClinicalReport(patient, patientMeds, patientLogs);
      } catch (err) {
        console.error('PDF generation error', err);
        window.print();
      }
      setIsExporting(false);
    }, 400);
  };

  const chartData = patientLogs.map((l) => ({
    date: l.date.slice(5), // MM-DD
    fullDate: l.date,
    systolic: l.vitals.bloodPressureSystolic,
    diastolic: l.vitals.bloodPressureDiastolic,
    glucose: l.vitals.bloodSugar,
    pulse: l.vitals.heartRate,
    oxygen: l.vitals.oxygenLevel,
    sleep: l.vitals.sleepHours,
    moodScore: l.moodScore,
    pain: l.vitals.painLevel,
    mood: l.mood,
  }));

  const getMoodEmoji = (mood) => {
    switch (mood) {
      case 'great': return '😄 Great';
      case 'good': return '🙂 Good';
      case 'neutral': return '😐 Neutral';
      case 'anxious': return '😰 Anxious';
      case 'sad': return '😔 Low';
      case 'pain': return '😣 In Pain';
      default: return '🙂 Good';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Patient Hero Profile Card */}
      <div
        id="patient-profile-hero"
        className={`rounded-3xl p-6 sm:p-8 border transition-all ${
          isDarkMode
            ? 'bg-slate-900 border-slate-800 text-white shadow-xl'
            : 'bg-white border-slate-200/90 text-slate-900 shadow-xs'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Avatar & Core Bio */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={patient.avatar}
                alt={patient.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-4 border-blue-600/30 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-600 text-white shadow-xs">
                {patient.bloodType}
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading">
                  {patient.name}
                </h2>
                <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
                  {patient.age} yrs • {patient.gender}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                {patient.roomOrAddress}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-2.5">
                <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300">
                  Primary: <strong>{patient.primaryCondition}</strong>
                </span>
                <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 font-semibold text-emerald-800 dark:text-emerald-300">
                  Adherence: <strong>{patient.overallAdherenceRate}%</strong>
                </span>
                <span className="text-xs px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/60 font-semibold text-amber-800 dark:text-amber-300">
                  Mood: <strong>{getMoodEmoji(patient.currentMood)}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              id="export-pdf-report-btn"
              onClick={handleExportPDF}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-all cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-blue-600" />
              <span>{isExporting ? 'Generating PDF...' : 'Export Clinical PDF'}</span>
            </button>

            <button
              id="patient-log-vitals-btn"
              onClick={() => onLogMoodVitals(patient.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all cursor-pointer"
            >
              <Activity className="w-4 h-4" />
              <span>Log Mood & Vitals</span>
            </button>

            <button
              id="patient-sos-trigger-btn"
              onClick={() => onOpenSOSModalForPatient(patient)}
              className="p-2.5 rounded-xl bg-red-100 dark:bg-red-950 text-red-600 hover:bg-red-200 dark:hover:bg-red-900 border border-red-200 dark:border-red-800 transition-colors"
              title="Test Patient SOS Panic Alarm"
            >
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-2 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 overflow-x-auto">
          {[
            { id: 'medications', label: 'Medication Schedule', icon: Pill, count: patientMeds.length },
            { id: 'vitals_mood', label: 'Mood & Vital Records', icon: Activity, count: patientLogs.length },
            { id: 'analytics', label: 'Wellness Trends & Charts', icon: Sparkles },
            { id: 'care_plan', label: 'Care Plan & Emergency Info', icon: UserCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`patient-tab-${tab.id}`}
                onClick={() => setActiveSubTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                    isActive ? 'bg-blue-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Medication Schedule */}
      {activeSubTab === 'medications' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white font-heading">
                Daily Medication Regimen
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Track compliance, administration times, and doctor dosage instructions.
              </p>
            </div>
            <button
              id="add-medication-btn"
              onClick={() => onAddMedication(patient.id)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Medication</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patientMeds.map((med) => (
              <div
                key={med.id}
                id={`patient-med-card-${med.id}`}
                className={`p-5 rounded-2xl border transition-all ${
                  med.takenToday
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60'
                    : isDarkMode
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${
                      med.takenToday
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    }`}>
                      <Pill className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {med.name} <span className="text-xs font-semibold text-slate-500">({med.dosage})</span>
                      </h4>
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {med.category} • {med.frequency}
                      </span>
                    </div>
                  </div>

                  {/* Mark as Taken Toggle */}
                  <button
                    id={`toggle-med-taken-${med.id}`}
                    onClick={() => onToggleMedication(med.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      med.takenToday
                        ? 'bg-emerald-600 text-white shadow-xs hover:bg-emerald-700'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:text-blue-600'
                    }`}
                  >
                    {med.takenToday ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Administered</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-3.5 h-3.5" />
                        <span>Mark Given</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Scheduled:
                    </span>
                    <strong className="text-slate-700 dark:text-slate-200">{med.scheduleTime}</strong>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                    <strong>Instructions:</strong> {med.instructions}
                  </p>
                  {med.takenToday && med.takenTime && (
                    <p className="text-emerald-700 dark:text-emerald-400 font-medium text-[11px]">
                      Recorded at {med.takenTime} by Jessica Reynolds, RN
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Vitals & Mood Logs */}
      {activeSubTab === 'vitals_mood' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white font-heading">
                Vital Signs & Mood Log History
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Daily clinical assessments, emotional state, and care observations.
              </p>
            </div>
            <button
              id="log-vitals-btn-subtab"
              onClick={() => onLogMoodVitals(patient.id)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record New Entry</span>
            </button>
          </div>

          <div
            id="vitals-table-wrapper"
            className={`rounded-3xl border overflow-hidden ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className={`border-b ${isDarkMode ? 'bg-slate-800/80 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                  <tr>
                    <th className="p-4 font-bold">Date & Time</th>
                    <th className="p-4 font-bold">Observed Mood</th>
                    <th className="p-4 font-bold">Blood Pressure</th>
                    <th className="p-4 font-bold">Heart Rate</th>
                    <th className="p-4 font-bold">Blood Glucose</th>
                    <th className="p-4 font-bold">SpO2</th>
                    <th className="p-4 font-bold">Sleep</th>
                    <th className="p-4 font-bold">Pain</th>
                    <th className="p-4 font-bold">Caregiver Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {patientLogs.slice().reverse().map((log) => (
                    <tr key={log.id} className="hover:bg-blue-50/40 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="p-4 font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                        {log.date} <span className="text-[10px] text-slate-400 font-normal">{log.time}</span>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 whitespace-nowrap">
                          {getMoodEmoji(log.mood)}
                        </span>
                      </td>
                      <td className="p-4 font-mono font-bold text-slate-800 dark:text-slate-200">
                        {log.vitals.bloodPressureSystolic}/{log.vitals.bloodPressureDiastolic} <span className="text-[10px] font-normal text-slate-400">mmHg</span>
                      </td>
                      <td className="p-4 font-mono text-slate-800 dark:text-slate-200">
                        {log.vitals.heartRate} <span className="text-[10px] text-slate-400">bpm</span>
                      </td>
                      <td className="p-4 font-mono text-slate-800 dark:text-slate-200">
                        {log.vitals.bloodSugar} <span className="text-[10px] text-slate-400">mg/dL</span>
                      </td>
                      <td className="p-4 font-mono text-slate-800 dark:text-slate-200">
                        {log.vitals.oxygenLevel}%
                      </td>
                      <td className="p-4 text-slate-700 dark:text-slate-300">
                        {log.vitals.sleepHours} hrs
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          log.vitals.painLevel > 4
                            ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                            : 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
                        }`}>
                          {log.vitals.painLevel}/10
                        </span>
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-400 max-w-xs truncate" title={log.notes}>
                        {log.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Visual Analytics & Wellness Trends */}
      {activeSubTab === 'analytics' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white font-heading">
              Visual Analytics for {patient.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              14-day trend trajectories across blood pressure, glycemic response, mood stability, and sleep.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart 1: Blood Pressure Trends */}
            <div
              id="bp-chart-card"
              className={`p-6 rounded-3xl border ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-sm font-bold">Blood Pressure (Systolic / Diastolic)</h4>
                  <p className="text-[11px] text-slate-400">Target Range: &lt;130 / &lt;85 mmHg</p>
                </div>
                <span className="text-xs bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold px-2 py-0.5 rounded-full">
                  14 Days
                </span>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis domain={[60, 160]} tick={{ fontSize: 10 }} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
                        borderColor: isDarkMode ? '#334155' : '#e2e8f0',
                        borderRadius: '12px',
                        fontSize: '11px',
                      }}
                    />
                    <Line type="monotone" dataKey="systolic" name="Systolic (mmHg)" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="diastolic" name="Diastolic (mmHg)" stroke="#059669" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Blood Sugar / Glycemic Trends */}
            <div
              id="glucose-chart-card"
              className={`p-6 rounded-3xl border ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-sm font-bold">Blood Sugar Levels (mg/dL)</h4>
                  <p className="text-[11px] text-slate-400">Target Range: 90 - 140 mg/dL</p>
                </div>
                <span className="text-xs bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 font-bold px-2 py-0.5 rounded-full">
                  Glycemic
                </span>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis domain={[70, 160]} tick={{ fontSize: 10 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
                        borderColor: isDarkMode ? '#334155' : '#e2e8f0',
                        borderRadius: '12px',
                        fontSize: '11px',
                      }}
                    />
                    <Area type="monotone" dataKey="glucose" name="Glucose (mg/dL)" stroke="#D97706" fill="#FDE68A" fillOpacity={0.4} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 3: Mood Score & Sleep Correlation */}
            <div
              id="mood-sleep-chart-card"
              className={`p-6 rounded-3xl border lg:col-span-2 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-sm font-bold">Mood Wellbeing Score (1-5) & Sleep Duration (hrs)</h4>
                  <p className="text-[11px] text-slate-400">Correlation between restorative sleep and positive emotional state</p>
                </div>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis domain={[0, 10]} tick={{ fontSize: 10 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
                        borderColor: isDarkMode ? '#334155' : '#e2e8f0',
                        borderRadius: '12px',
                        fontSize: '11px',
                      }}
                    />
                    <Bar dataKey="sleep" name="Sleep (Hours)" fill="#818CF8" radius={[6, 6, 0, 0]} />
                    <Line type="monotone" dataKey="moodScore" name="Mood Score (1-5)" stroke="#EC4899" strokeWidth={3} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Care Plan & Emergency Info */}
      {activeSubTab === 'care_plan' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Primary Doctor & Clinic */}
          <div
            className={`p-6 rounded-3xl border ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <h4 className="text-base font-bold mb-4 font-heading">Primary Care Physician</h4>
            <div className="space-y-2 text-xs">
              <p className="text-sm font-bold text-slate-900 dark:text-white">{patient.primaryDoctor.name}</p>
              <p className="text-blue-600 font-semibold">{patient.primaryDoctor.specialty}</p>
              <p className="text-slate-500 dark:text-slate-400">{patient.primaryDoctor.clinic}</p>
              <p className="text-slate-600 dark:text-slate-300 flex items-center gap-1.5 pt-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{patient.primaryDoctor.phone}</span>
              </p>
            </div>
          </div>

          {/* Emergency Family Contacts */}
          <div
            className={`p-6 rounded-3xl border ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <h4 className="text-base font-bold mb-4 font-heading">Designated Emergency Contacts</h4>
            <div className="space-y-3">
              {patient.emergencyContacts.map((contact, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-slate-100">{contact.name}</span>
                    {contact.isPrimary && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                        Primary Contact
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">{contact.relation}</p>
                  <p className="text-slate-700 dark:text-slate-300 font-mono mt-1">{contact.phone}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Directives & Dietary Restrictions */}
          <div
            className={`p-6 rounded-3xl border md:col-span-2 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <h4 className="text-base font-bold mb-3 font-heading">Clinical Directives & Dietary Restrictions</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {patient.carePlanNotes}
            </p>
            <div className="flex flex-wrap gap-2">
              {patient.dietaryRestrictions.map((diet, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                >
                  🥗 {diet}
                </span>
              ))}
              {patient.allergies.map((all, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-red-50 text-red-800 dark:bg-red-950/60 dark:text-red-300 border border-red-200 dark:border-red-800"
                >
                  ⚠️ Allergy: {all}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
