import React, { useState } from 'react';
import { UserPlus, X } from 'lucide-react';

export function AddPatientModal({
  isOpen,
  onClose,
  onAddPatient,
  isDarkMode,
}) {
  const [name, setName] = useState('');
  const [age, setAge] = useState(75);
  const [gender, setGender] = useState('Female');
  const [roomOrAddress, setRoomOrAddress] = useState('');
  const [primaryCondition, setPrimaryCondition] = useState('');
  const [allergies, setAllergies] = useState('Penicillin');
  const [doctorName, setDoctorName] = useState('Dr. Robert Vance, MD');
  const [doctorPhone, setDoctorPhone] = useState('+1 (555) 443-1290');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [carePlanNotes, setCarePlanNotes] = useState('Daily vitals and morning medication checkup.');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newPatient = {
      id: `p-${Date.now()}`,
      name,
      age: Number(age),
      gender,
      roomOrAddress: roomOrAddress || 'Senior Care Wing, Apt 4A',
      avatar: gender === 'Male' 
        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256'
        : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256',
      bloodType: 'O+',
      primaryCondition: primaryCondition || 'Hypertension & Mobility Support',
      conditions: [primaryCondition || 'Hypertension'],
      allergies: allergies.split(',').map((s) => s.trim()).filter(Boolean),
      primaryDoctor: {
        name: doctorName,
        specialty: 'Geriatric Medicine',
        phone: doctorPhone,
        clinic: 'Saint Jude Senior Pavilion',
      },
      emergencyContacts: [
        {
          name: contactName || 'Family Contact',
          relation: 'Primary Care Proxy',
          phone: contactPhone || '+1 (555) 890-4321',
          isPrimary: true,
        },
      ],
      carePlanNotes,
      dietaryRestrictions: ['Low Sodium'],
      mobilityLevel: 'Assisted Walking',
      assignedCaregiver: 'Jessica Reynolds, RN',
      currentMood: 'good',
      overallAdherenceRate: 95,
    };

    onAddPatient(newPatient);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        className={`w-full max-w-lg rounded-3xl p-6 shadow-2xl border max-h-[90vh] overflow-y-auto ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold">Register New Elderly Patient</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Add to caregiver roster and schedule</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="my-4 space-y-3.5 text-xs">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Patient Full Name</label>
              <input
                id="patient-full-name-input"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Mrs. Dorothy Miller"
                className={`w-full p-2.5 rounded-xl border ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Age</label>
              <input
                id="patient-age-input"
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className={`w-full p-2.5 rounded-xl border ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Room or Home Address</label>
            <input
              id="patient-address-input"
              type="text"
              required
              value={roomOrAddress}
              onChange={(e) => setRoomOrAddress(e.target.value)}
              placeholder="e.g. Room 304, Oakwood Manor / 128 Maplewood Rd"
              className={`w-full p-2.5 rounded-xl border ${
                isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
              }`}
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Primary Diagnosis / Condition</label>
            <input
              id="patient-condition-input"
              type="text"
              value={primaryCondition}
              onChange={(e) => setPrimaryCondition(e.target.value)}
              placeholder="e.g. Hypertension & Post-Hip Replacement"
              className={`w-full p-2.5 rounded-xl border ${
                isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
              }`}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Emergency Contact Name</label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="e.g. John Miller (Son)"
                className={`w-full p-2.5 rounded-xl border ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Contact Phone</label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className={`w-full p-2.5 rounded-xl border ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Care Plan Directives</label>
            <textarea
              rows={2}
              value={carePlanNotes}
              onChange={(e) => setCarePlanNotes(e.target.value)}
              className={`w-full p-2.5 rounded-xl border ${
                isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
              }`}
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
            >
              Register Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
