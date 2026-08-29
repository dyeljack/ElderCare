/**
 * Utility functions for formatting dates, times, temperatures, and status messages.
 */

/**
 * Formats a 24-hour time string or Date object into 12-hour AM/PM string.
 * @param {string|Date} timeInput - e.g. "09:00" or Date object
 * @returns {string} - e.g. "09:00 AM"
 */
export function formatTime12Hour(timeInput) {
  if (!timeInput) return '';
  if (timeInput instanceof Date) {
    return timeInput.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  }
  const parts = timeInput.split(':');
  if (parts.length < 2) return timeInput;
  let hours = parseInt(parts[0], 10);
  const minutes = parts[1];
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const strHours = hours < 10 ? `0${hours}` : `${hours}`;
  return `${strHours}:${minutes} ${ampm}`;
}

/**
 * Formats temperature in Fahrenheit with degree symbol.
 * @param {number} tempF 
 * @returns {string} - e.g. "72°F"
 */
export function formatTemperature(tempF) {
  if (typeof tempF !== 'number') return '72°F';
  return `${Math.round(tempF)}°F`;
}

/**
 * Capitalizes first letter of each word in a string.
 * @param {string} str 
 * @returns {string}
 */
export function capitalizeWords(str = '') {
  return str.replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Formats remaining medications text badge.
 * @param {number} count 
 * @returns {string} - e.g. "2 REMAINING TODAY" or "ALL COMPLETED TODAY"
 */
export function formatMedicationBadgeText(count) {
  if (count <= 0) return 'ALL COMPLETED TODAY';
  if (count === 1) return '1 REMAINING TODAY';
  return `${count} REMAINING TODAY`;
}
