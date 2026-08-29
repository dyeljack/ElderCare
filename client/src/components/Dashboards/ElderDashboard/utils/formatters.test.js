import { describe, it, expect } from 'vitest';
import {
  formatTime12Hour,
  formatTemperature,
  capitalizeWords,
  formatMedicationBadgeText
} from './formatters.js';

describe('formatters', () => {
  describe('formatTime12Hour', () => {
    it('formats 09:00 to 09:00 AM', () => {
      expect(formatTime12Hour('09:00')).toBe('09:00 AM');
    });

    it('formats 14:30 to 02:30 PM', () => {
      expect(formatTime12Hour('14:30')).toBe('02:30 PM');
    });

    it('formats 00:15 to 12:15 AM', () => {
      expect(formatTime12Hour('00:15')).toBe('12:15 AM');
    });
  });

  describe('formatTemperature', () => {
    it('formats numbers to Fahrenheit string', () => {
      expect(formatTemperature(72)).toBe('72°F');
      expect(formatTemperature(71.8)).toBe('72°F');
    });
  });

  describe('capitalizeWords', () => {
    it('capitalizes word titles', () => {
      expect(capitalizeWords('walk in the park')).toBe('Walk In The Park');
    });
  });

  describe('formatMedicationBadgeText', () => {
    it('formats remaining count badge', () => {
      expect(formatMedicationBadgeText(2)).toBe('2 REMAINING TODAY');
      expect(formatMedicationBadgeText(1)).toBe('1 REMAINING TODAY');
      expect(formatMedicationBadgeText(0)).toBe('ALL COMPLETED TODAY');
    });
  });
});
