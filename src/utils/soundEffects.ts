/**
 * Sound Effects Utility
 * Uses Web Audio API to generate sound effects
 */

class SoundEffects {
  private audioContext: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      this.audioContext = new AudioContext();
    }
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.3) {
    if (!this.audioContext || this.isMuted) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // Click sound for buttons
  playClick() {
    this.playTone(800, 0.05, 'sine', 0.2);
  }

  // Success sound when answer is correct
  playSuccess() {
    if (!this.audioContext || this.isMuted) return;
    
    // Play a chord
    this.playTone(523.25, 0.1, 'sine', 0.3); // C
    setTimeout(() => this.playTone(659.25, 0.1, 'sine', 0.3), 50); // E
    setTimeout(() => this.playTone(783.99, 0.15, 'sine', 0.3), 100); // G
  }

  // Error sound when answer is wrong
  playError() {
    this.playTone(200, 0.2, 'sawtooth', 0.2);
  }

  // Completion sound
  playComplete() {
    if (!this.audioContext || this.isMuted) return;
    
    // Play ascending notes
    const notes = [523.25, 587.33, 659.25, 783.99];
    notes.forEach((freq, index) => {
      setTimeout(() => this.playTone(freq, 0.15, 'sine', 0.25), index * 100);
    });
  }

  // Navigation sound
  playNavigate() {
    this.playTone(440, 0.08, 'sine', 0.15);
  }

  // Hover sound
  playHover() {
    this.playTone(600, 0.03, 'sine', 0.1);
  }

  // Skip sound
  playSkip() {
    this.playTone(350, 0.1, 'triangle', 0.15);
  }

  // Timer tick (for countdown)
  playTick() {
    this.playTone(1000, 0.02, 'square', 0.05);
  }

  // Warning sound
  playWarning() {
    this.playTone(300, 0.15, 'square', 0.2);
  }

  // Celebration sound for high scores
  playCelebration() {
    if (!this.audioContext || this.isMuted) return;
    
    // Play multiple ascending tones
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, index) => {
      setTimeout(() => this.playTone(freq, 0.12, 'sine', 0.2), index * 80);
    });
  }

  // Toggle mute
  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  // Get mute status
  isMutedStatus() {
    return this.isMuted;
  }
}

// Export singleton instance
export const soundEffects = new SoundEffects();
