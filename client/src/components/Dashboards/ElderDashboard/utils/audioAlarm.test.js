import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { startEmergencyAlarm, stopEmergencyAlarm, isAlarmActive } from './audioAlarm.js';

describe('audioAlarm utility', () => {
  beforeEach(() => {
    class MockAudioContext {
      constructor() {
        this.state = 'running';
        this.currentTime = 0;
        this.destination = {};
      }
      createOscillator() {
        return {
          type: 'sine',
          frequency: { setValueAtTime: vi.fn() },
          connect: vi.fn(),
          start: vi.fn(),
          stop: vi.fn(),
          disconnect: vi.fn(),
        };
      }
      createGain() {
        return {
          gain: {
            value: 0.18,
            setValueAtTime: vi.fn(),
            exponentialRampToValueAtTime: vi.fn(),
          },
          connect: vi.fn(),
          disconnect: vi.fn(),
        };
      }
      resume() {
        return Promise.resolve();
      }
    }

    globalThis.AudioContext = MockAudioContext;
    if (typeof window !== 'undefined') {
      window.AudioContext = MockAudioContext;
    }
  });

  afterEach(() => {
    stopEmergencyAlarm();
  });

  it('starts emergency alarm successfully', () => {
    const started = startEmergencyAlarm();
    expect(started).toBe(true);
    expect(isAlarmActive()).toBe(true);
  });

  it('stops emergency alarm cleanly', () => {
    startEmergencyAlarm();
    const stopped = stopEmergencyAlarm();
    expect(stopped).toBe(true);
    expect(isAlarmActive()).toBe(false);
  });
});
