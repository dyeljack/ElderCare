/**
 * Utility functions for ElderCare Connect health vitals, medication statuses, and schedule evaluations.
 */

/**
 * Assesses blood pressure category based on systolic and diastolic values.
 * @param {number} systolic 
 * @param {number} diastolic 
 * @returns {{ label: string, statusClass: string, severity: string }}
 */
export function getBloodPressureCategory(systolic, diastolic) {
  if (systolic < 120 && diastolic < 80) {
    return { label: 'NORMAL', statusClass: 'normal', severity: 'low' };
  } else if (systolic <= 139 || diastolic <= 89) {
    return { label: 'SLIGHTLY HIGH', statusClass: 'warning', severity: 'medium' };
  } else if (systolic >= 140 || diastolic >= 90) {
    return { label: 'HIGH', statusClass: 'danger', severity: 'high' };
  }
  return { label: 'UNKNOWN', statusClass: 'neutral', severity: 'none' };
}

/**
 * Assesses heart rate resting status for seniors.
 * @param {number} bpm 
 * @returns {{ label: string, statusClass: string }}
 */
export function getHeartRateCategory(bpm) {
  if (bpm >= 60 && bpm <= 100) {
    return { label: 'NORMAL', statusClass: 'normal' };
  } else if (bpm < 60) {
    return { label: 'LOW', statusClass: 'warning' };
  } else {
    return { label: 'ELEVATED', statusClass: 'danger' };
  }
}

/**
 * Assesses blood sugar levels (fasting / pre-meal mg/dL).
 * @param {number} level 
 * @returns {{ label: string, statusClass: string }}
 */
export function getBloodSugarCategory(level) {
  if (level >= 70 && level <= 110) {
    return { label: 'NORMAL', statusClass: 'normal' };
  } else if (level < 70) {
    return { label: 'LOW SUGAR', statusClass: 'warning' };
  } else {
    return { label: 'HIGH SUGAR', statusClass: 'danger' };
  }
}

/**
 * Calculates remaining untaken medications for today.
 * @param {Array<{ id: string, taken: boolean }>} medications 
 * @returns {number}
 */
export function getRemainingMedicationsCount(medications = []) {
  return medications.filter(med => !med.taken).length;
}

/**
 * Removes a medication from the list by ID.
 * @param {Array<{ id: string }>} medications 
 * @param {string} id 
 * @returns {Array<{ id: string }>}
 */
export function removeMedicationById(medications = [], id) {
  return medications.filter(med => med.id !== id);
}

/**
 * Removes a schedule event from the list by ID.
 * @param {Array<{ id: string }>} schedule 
 * @param {string} id 
 * @returns {Array<{ id: string }>}
 */
export function removeScheduleEventById(schedule = [], id) {
  return schedule.filter(item => item.id !== id);
}

/**
 * Parses and matches voice assistant text commands to action intents.
 * @param {string} commandText 
 * @returns {{ action: string, payload?: string, response: string }}
 */
export function processVoiceCommand(commandText = '') {
  const text = commandText.trim().toLowerCase();
  
  if (text.includes('call my daughter') || text.includes('call daughter') || text.includes('call emily')) {
    return {
      action: 'CALL_FAMILY',
      payload: 'Emily (Daughter)',
      response: 'Initiating video call with Emily...'
    };
  }
  
  if (text.includes('remind') || text.includes('medication') || text.includes('pills')) {
    return {
      action: 'CHECK_MEDS',
      response: 'You have 1 medication remaining today: Heart Medication at 09:00 AM.'
    };
  }

  if (text.includes('help') || text.includes('emergency') || text.includes('doctor')) {
    return {
      action: 'TRIGGER_SOS',
      response: 'Opening emergency assistance panel. Contacting primary caretaker...'
    };
  }

  return {
    action: 'UNKNOWN',
    response: `I heard "${commandText}". Try asking "Call my daughter" or "Remind me about my medication".`
  };
}
