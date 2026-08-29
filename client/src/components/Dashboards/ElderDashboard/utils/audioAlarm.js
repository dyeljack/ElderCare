/**
 * Web Audio API synthesizer for the emergency audible siren/alarm.
 * Generates an oscillating two-tone emergency alarm without external sound files.
 */

let audioCtx = null;
let sirenOscillator = null;
let lfoOscillator = null;
let gainNode = null;
let isPlaying = false;

function getAudioContextClass() {
  if (typeof window !== 'undefined') {
    return window.AudioContext || window.webkitAudioContext;
  }
  if (typeof globalThis !== 'undefined') {
    return globalThis.AudioContext || globalThis.webkitAudioContext;
  }
  return null;
}

export function startEmergencyAlarm() {
  if (isPlaying) return true;

  try {
    const AudioContextClass = getAudioContextClass();
    if (!AudioContextClass) {
      console.warn('Web Audio API is not supported in this environment.');
      return false;
    }

    if (!audioCtx || audioCtx.state === 'closed') {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended' && typeof audioCtx.resume === 'function') {
      audioCtx.resume();
    }

    // Main carrier oscillator (Siren tone)
    sirenOscillator = audioCtx.createOscillator();
    sirenOscillator.type = 'sawtooth';
    if (sirenOscillator.frequency && sirenOscillator.frequency.setValueAtTime) {
      sirenOscillator.frequency.setValueAtTime(750, audioCtx.currentTime || 0);
    }

    // Low frequency oscillator (LFO) to modulate pitch between 650Hz and 950Hz
    lfoOscillator = audioCtx.createOscillator();
    lfoOscillator.type = 'sine';
    if (lfoOscillator.frequency && lfoOscillator.frequency.setValueAtTime) {
      lfoOscillator.frequency.setValueAtTime(2.5, audioCtx.currentTime || 0);
    }

    const lfoGain = audioCtx.createGain();
    if (lfoGain.gain && lfoGain.gain.setValueAtTime) {
      lfoGain.gain.setValueAtTime(180, audioCtx.currentTime || 0);
    }

    // Master gain node
    gainNode = audioCtx.createGain();
    if (gainNode.gain && gainNode.gain.setValueAtTime) {
      gainNode.gain.setValueAtTime(0.18, audioCtx.currentTime || 0);
    }

    // Connect LFO to Siren pitch
    if (lfoOscillator.connect && sirenOscillator.frequency) {
      lfoOscillator.connect(lfoGain);
      lfoGain.connect(sirenOscillator.frequency);
    }

    // Connect Siren to Master Gain and Output
    if (sirenOscillator.connect && gainNode.connect && audioCtx.destination) {
      sirenOscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
    }

    if (sirenOscillator.start) sirenOscillator.start();
    if (lfoOscillator.start) lfoOscillator.start();

    isPlaying = true;
    return true;
  } catch (error) {
    console.error('Failed to trigger emergency audible alarm:', error);
    return false;
  }
}

export function stopEmergencyAlarm() {
  if (!isPlaying) return false;

  try {
    if (gainNode && audioCtx && gainNode.gain) {
      if (gainNode.gain.setValueAtTime && gainNode.gain.exponentialRampToValueAtTime) {
        gainNode.gain.setValueAtTime(gainNode.gain.value || 0.18, audioCtx.currentTime || 0);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, (audioCtx.currentTime || 0) + 0.08);
      }
    }

    if (sirenOscillator) {
      try { if (sirenOscillator.stop) sirenOscillator.stop(); } catch (e) {}
      if (sirenOscillator.disconnect) sirenOscillator.disconnect();
      sirenOscillator = null;
    }
    if (lfoOscillator) {
      try { if (lfoOscillator.stop) lfoOscillator.stop(); } catch (e) {}
      if (lfoOscillator.disconnect) lfoOscillator.disconnect();
      lfoOscillator = null;
    }
    if (gainNode) {
      if (gainNode.disconnect) gainNode.disconnect();
      gainNode = null;
    }
    isPlaying = false;
    return true;
  } catch (error) {
    console.error('Error stopping emergency alarm:', error);
    isPlaying = false;
    return false;
  }
}

export function isAlarmActive() {
  return isPlaying;
}
