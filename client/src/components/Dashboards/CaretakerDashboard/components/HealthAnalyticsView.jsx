import React, { useState } from 'react';
import { 
  Activity, 
  Pill, 
  Heart, 
  Smile, 
  FileDown
} from 'lucide-react';
import { exportPatientClinicalReport } from '../utils/pdfExport.js';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export function HealthAnalyticsView({
  patients,
  medications,
  logsMap,
  isDarkMode,
}) {
  const [selectedPatientId, setSelectedPatientId] = useState('all');
  const [timeRange, setTimeRange] = useState('14d');

  const activePatient = patients.find((p) => p.id === selectedPatientId) || patients[0];
  const activeLogs = selectedPatientId === 'all' 
    ? (logsMap[patients[0]?.id] || [])
    : (logsMap[selectedPatientId] || []);

  const adherenceData = patients.map((p) => ({
    name: p.name.split(' ')[1] || p.name,
    fullName: p.name,
    adherence: p.overallAdherenceRate,
    condition: p.primaryCondition,
  }));

  const chartData = activeLogs.map((l) => ({
    date: l.date.slice(5),
    systolic: l.vitals.bloodPressureSystolic,
    diastolic: l.vitals.bloodPressureDiastolic,
    glucose: l.vitals.bloodSugar,
    pulse: l.vitals.heartRate,
    oxygen: l.vitals.oxygenLevel,
    sleep: l.vitals.sleepHours,
    moodScore: l.moodScore,
    pain: l.vitals.painLevel,
  }));

  const moodPieData = [
    { name: 'Great', value: 42, color: '#10B981' },
    { name: 'Good', value: 36, color: '#3B82F6' },
    { name: 'Neutral', value: 14, color: '#F59E0B' },
    { name: 'Anxious', value: 5, color: '#8B5CF6' },
    { name: 'Low / Pain', value: 3, color: '#EF4444' },
  ];

  const handleExportPDF = () => {
    const patientToExport = selectedPatientId === 'all' ? patients[0] : activePatient;
    const patientMeds = medications.filter((m) => m.patientId === patientToExport.id);
    const pLogs = logsMap[patientToExport.id] || [];
    exportPatientClinicalReport(patientToExport, patientMeds, pLogs);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header with Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight font-heading text-slate-900 dark:text-white">
            Clinical Wellness Analytics & Trends
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Multi-patient biometric monitoring, medication adherence indexes, and wellness trajectories.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Patient Selector */}
          <select
            id="analytics-patient-filter"
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border outline-hidden ${
              isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <option value="all">Cohort Overview (All Patients)</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          {/* Time Range Selector */}
          <div className="flex rounded-xl p-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold">
            {['7d', '14d', '30d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  timeRange === range
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Export PDF Button */}
          <button
            id="analytics-export-pdf-btn"
            onClick={handleExportPDF}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all cursor-pointer"
          >
            <FileDown className="w-4 h-4" />
            <span>Download Report</span>
          </button>
        </div>
      </div>

      {/* Metric Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-5 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
            <Pill className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Avg Adherence</span>
          </div>
          <p className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">92.4%</p>
          <p className="text-[11px] text-slate-400 mt-1">↑ 2.1% from previous week</p>
        </div>

        <div className={`p-5 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
            <Heart className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Blood Pressure Stability</span>
          </div>
          <p className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">124/81</p>
          <p className="text-[11px] text-slate-400 mt-1">Normotensive cohort mean</p>
        </div>

        <div className={`p-5 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-1">
            <Smile className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Mood Index</span>
          </div>
          <p className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">4.3 / 5.0</p>
          <p className="text-[11px] text-slate-400 mt-1">84% Positive emotional logs</p>
        </div>

        <div className={`p-5 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1">
            <Activity className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Active Patient Load</span>
          </div>
          <p className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">{patients.length}</p>
          <p className="text-[11px] text-slate-400 mt-1">100% Care plan coverage</p>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Adherence Rate Bar Chart */}
        <div
          id="patient-adherence-chart"
          className={`p-6 rounded-3xl border lg:col-span-2 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                Medication Adherence by Patient
              </h3>
              <p className="text-xs text-slate-400">Weekly compliance percentages across registered elders</p>
            </div>
            <span className="text-xs bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold px-2.5 py-0.5 rounded-full">
              Target: &gt;90%
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={adherenceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
                    borderColor: isDarkMode ? '#334155' : '#e2e8f0',
                    borderRadius: '12px',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="adherence" name="Adherence (%)" fill="#2563EB" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mood Distribution Pie Chart */}
        <div
          id="mood-pie-chart"
          className={`p-6 rounded-3xl border ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading mb-1">
            Mood Distribution Breakdown
          </h3>
          <p className="text-xs text-slate-400 mb-3">Overall emotional state proportions</p>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={moodPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {moodPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
                    borderColor: isDarkMode ? '#334155' : '#e2e8f0',
                    borderRadius: '12px',
                    fontSize: '11px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2 text-[11px]">
            {moodPieData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 dark:text-slate-400 font-medium">
                  {item.name}: <strong>{item.value}%</strong>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Vitals Trajectory Chart */}
        <div
          id="vital-trajectory-chart"
          className={`p-6 rounded-3xl border lg:col-span-3 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                Multi-Parameter Biometric Trajectory ({activePatient.name})
              </h3>
              <p className="text-xs text-slate-400">
                Synchronized tracking of Systolic BP, Glucose, and Pulse over the selected timeline
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="flex items-center gap-1.5 text-blue-600">
                <span className="w-3 h-0.5 bg-blue-600" /> Systolic BP (mmHg)
              </span>
              <span className="flex items-center gap-1.5 text-amber-500">
                <span className="w-3 h-0.5 bg-amber-500" /> Glucose (mg/dL)
              </span>
              <span className="flex items-center gap-1.5 text-rose-500">
                <span className="w-3 h-0.5 bg-rose-500" /> Pulse (bpm)
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis domain={[50, 160]} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
                    borderColor: isDarkMode ? '#334155' : '#e2e8f0',
                    borderRadius: '12px',
                    fontSize: '11px',
                  }}
                />
                <Line type="monotone" dataKey="systolic" name="Systolic BP" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="glucose" name="Glucose" stroke="#F59E0B" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="pulse" name="Pulse Rate" stroke="#F43F5E" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
