import React from 'react';
import { FileDown, ChevronRight, Plus, MapPin } from 'lucide-react';
import { exportPatientClinicalReport } from '../utils/pdfExport.js';

export function PatientsListView({
  patients,
  medications,
  logsMap,
  onSelectPatient,
  onOpenAddPatient,
  isDarkMode,
}) {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight font-heading text-slate-900 dark:text-white">
            Patients & Family Contacts Directory
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Assigned caseload, authorized family proxies, primary physicians, and quick clinical access.
          </p>
        </div>

        <button
          id="add-new-patient-btn"
          onClick={onOpenAddPatient}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Patient</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {patients.map((patient) => {
          const patientMeds = medications.filter((m) => m.patientId === patient.id);
          const patientLogs = logsMap[patient.id] || [];

          return (
            <div
              key={patient.id}
              id={`patient-card-${patient.id}`}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between hover:shadow-lg ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div>
                {/* Header Profile */}
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={patient.avatar}
                    alt={patient.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-blue-500/40 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
                      {patient.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{patient.roomOrAddress}</span>
                    </p>
                    <span className="inline-block mt-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                      {patient.age}y • {patient.mobilityLevel}
                    </span>
                  </div>
                </div>

                {/* Condition & Adherence */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1.5 mb-4">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Diagnosis:</span>
                    <strong className="text-slate-800 dark:text-slate-200 truncate max-w-[160px]">
                      {patient.primaryCondition}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Med Compliance:</span>
                    <strong className="text-emerald-600 dark:text-emerald-400">
                      {patient.overallAdherenceRate}%
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Active Meds:</span>
                    <strong className="text-blue-600 dark:text-blue-400">
                      {patientMeds.length} Prescriptions
                    </strong>
                  </div>
                </div>

                {/* Primary Family Contact */}
                <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1 mb-4">
                  <p className="font-bold text-slate-700 dark:text-slate-300 text-[11px] uppercase tracking-wider">
                    Primary Family Contact
                  </p>
                  <p className="font-semibold text-slate-900 dark:text-slate-200">
                    {patient.emergencyContacts[0]?.name} ({patient.emergencyContacts[0]?.relation})
                  </p>
                  <p className="font-mono text-slate-500 dark:text-slate-400 text-[11px]">
                    {patient.emergencyContacts[0]?.phone}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  id={`btn-open-patient-${patient.id}`}
                  onClick={() => onSelectPatient(patient.id)}
                  className="flex-1 py-2.5 px-3 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <span>Open Patient Page</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  id={`btn-export-pdf-${patient.id}`}
                  onClick={() => exportPatientClinicalReport(patient, patientMeds, patientLogs)}
                  title="Export Clinical PDF Report"
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <FileDown className="w-4 h-4 text-blue-600" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
