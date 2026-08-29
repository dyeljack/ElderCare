import { describe, it, expect } from 'vitest';
import {
  getBloodPressureCategory,
  getHeartRateCategory,
  getBloodSugarCategory,
  getRemainingMedicationsCount,
  removeMedicationById,
  removeScheduleEventById,
  processVoiceCommand
} from './healthUtils.js';

describe('healthUtils', () => {
  describe('getBloodPressureCategory', () => {
    it('returns NORMAL for systolic < 120 and diastolic < 80', () => {
      const result = getBloodPressureCategory(118, 78);
      expect(result.label).toBe('NORMAL');
      expect(result.statusClass).toBe('normal');
    });

    it('returns SLIGHTLY HIGH for systolic 135 and diastolic 85 (matching image)', () => {
      const result = getBloodPressureCategory(135, 85);
      expect(result.label).toBe('SLIGHTLY HIGH');
      expect(result.statusClass).toBe('warning');
    });

    it('returns HIGH for elevated values >= 140/90', () => {
      const result = getBloodPressureCategory(145, 92);
      expect(result.label).toBe('HIGH');
      expect(result.statusClass).toBe('danger');
    });
  });

  describe('getHeartRateCategory', () => {
    it('returns NORMAL for resting HR between 60 and 100', () => {
      expect(getHeartRateCategory(72).label).toBe('NORMAL');
    });

    it('returns LOW for HR < 60', () => {
      expect(getHeartRateCategory(52).label).toBe('LOW');
    });

    it('returns ELEVATED for HR > 100', () => {
      expect(getHeartRateCategory(110).label).toBe('ELEVATED');
    });
  });

  describe('getBloodSugarCategory', () => {
    it('returns NORMAL for fasting levels 70-110 mg/dL', () => {
      expect(getBloodSugarCategory(98).label).toBe('NORMAL');
    });

    it('returns LOW SUGAR for levels < 70', () => {
      expect(getBloodSugarCategory(65).label).toBe('LOW SUGAR');
    });

    it('returns HIGH SUGAR for levels > 110', () => {
      expect(getBloodSugarCategory(130).label).toBe('HIGH SUGAR');
    });
  });

  describe('getRemainingMedicationsCount', () => {
    it('counts untaken medications correctly', () => {
      const list = [
        { id: '1', name: 'Heart Medication', taken: false },
        { id: '2', name: 'Blood Pressure Pill', taken: true },
        { id: '3', name: 'Vitamin D', taken: false }
      ];
      expect(getRemainingMedicationsCount(list)).toBe(2);
    });

    it('returns 0 when all medications are taken', () => {
      const list = [
        { id: '1', name: 'Heart Med', taken: true }
      ];
      expect(getRemainingMedicationsCount(list)).toBe(0);
    });
  });

  describe('removeMedicationById', () => {
    it('removes medication with specified id', () => {
      const list = [
        { id: 'med-1', name: 'Heart Medication' },
        { id: 'med-2', name: 'Blood Pressure Pill' }
      ];
      const updated = removeMedicationById(list, 'med-1');
      expect(updated).toHaveLength(1);
      expect(updated[0].id).toBe('med-2');
    });

    it('returns same list if id is not found', () => {
      const list = [{ id: 'med-1', name: 'Heart Medication' }];
      const updated = removeMedicationById(list, 'med-999');
      expect(updated).toHaveLength(1);
    });
  });

  describe('removeScheduleEventById', () => {
    it('removes schedule item with specified id', () => {
      const list = [
        { id: 'sch-1', title: 'Nurse visit' },
        { id: 'sch-2', title: 'Walk in the park' }
      ];
      const updated = removeScheduleEventById(list, 'sch-1');
      expect(updated).toHaveLength(1);
      expect(updated[0].id).toBe('sch-2');
    });
  });

  describe('processVoiceCommand', () => {
    it('recognizes call family command', () => {
      const result = processVoiceCommand('Call my daughter');
      expect(result.action).toBe('CALL_FAMILY');
      expect(result.payload).toContain('Emily');
    });

    it('recognizes medication check command', () => {
      const result = processVoiceCommand('Remind me about pills');
      expect(result.action).toBe('CHECK_MEDS');
    });

    it('handles unknown prompt gracefully', () => {
      const result = processVoiceCommand('What is the recipe for pancakes');
      expect(result.action).toBe('UNKNOWN');
    });
  });
});
