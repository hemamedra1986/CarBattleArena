import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GAME_CONFIG from '../config/gameConfig';

// Enable playback in silence mode (iOS)
Sound.setCategory('Playback');

const SETTINGS_KEY = GAME_CONFIG.STORAGE_KEYS.SETTINGS;

let backgroundMusic = null;
let isMuted = false;
let isMusicEnabled = true;
let isSoundEnabled = true;

// Cache for pre-loaded sound effects
const soundCache = {};

/**
 * Load a sound file. Returns a Promise that resolves with the Sound instance.
 */
const loadSound = (filename) =>
  new Promise((resolve, reject) => {
    if (soundCache[filename]) {
      resolve(soundCache[filename]);
      return;
    }
    const sound = new Sound(filename, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        reject(error);
        return;
      }
      soundCache[filename] = sound;
      resolve(sound);
    });
  });

const SoundService = {
  /**
   * Initialise settings from AsyncStorage.
   */
  init: async () => {
    try {
      const raw = await AsyncStorage.getItem(SETTINGS_KEY);
      if (raw) {
        const settings = JSON.parse(raw);
        isMuted = settings.isMuted ?? false;
        isMusicEnabled = settings.isMusicEnabled ?? true;
        isSoundEnabled = settings.isSoundEnabled ?? true;
      }
    } catch { /* ignore */ }
  },

  /**
   * Persist settings to AsyncStorage.
   */
  _saveSettings: async () => {
    try {
      await AsyncStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify({ isMuted, isMusicEnabled, isSoundEnabled }),
      );
    } catch { /* ignore */ }
  },

  // ── Background music ────────────────────────────────────────────────────

  playBackgroundMusic: () => {
    if (isMuted || !isMusicEnabled) return;
    if (backgroundMusic && backgroundMusic.isPlaying && backgroundMusic.isPlaying()) return;

    const filename = GAME_CONFIG.SOUNDS.BACKGROUND_MUSIC;
    const music = new Sound(filename, Sound.MAIN_BUNDLE, (error) => {
      if (error) return;
      music.setNumberOfLoops(-1); // loop indefinitely
      music.setVolume(0.4);
      music.play();
      backgroundMusic = music;
    });
  },

  stopBackgroundMusic: () => {
    if (backgroundMusic) {
      backgroundMusic.stop();
      backgroundMusic.release();
      backgroundMusic = null;
    }
  },

  pauseBackgroundMusic: () => {
    if (backgroundMusic) backgroundMusic.pause();
  },

  resumeBackgroundMusic: () => {
    if (backgroundMusic && isMusicEnabled && !isMuted) backgroundMusic.play();
  },

  // ── Sound effects ────────────────────────────────────────────────────────

  playCorrectSound: async () => {
    if (isMuted || !isSoundEnabled) return;
    try {
      const sound = await loadSound(GAME_CONFIG.SOUNDS.CORRECT_ANSWER);
      sound.stop(() => sound.play());
    } catch { /* ignore */ }
  },

  playWrongSound: async () => {
    if (isMuted || !isSoundEnabled) return;
    try {
      const sound = await loadSound(GAME_CONFIG.SOUNDS.WRONG_ANSWER);
      sound.stop(() => sound.play());
    } catch { /* ignore */ }
  },

  playLevelCompleteSound: async () => {
    if (isMuted || !isSoundEnabled) return;
    try {
      const sound = await loadSound(GAME_CONFIG.SOUNDS.LEVEL_COMPLETE);
      sound.stop(() => sound.play());
    } catch { /* ignore */ }
  },

  playButtonClick: async () => {
    if (isMuted || !isSoundEnabled) return;
    try {
      const sound = await loadSound(GAME_CONFIG.SOUNDS.BUTTON_CLICK);
      sound.stop(() => sound.play());
    } catch { /* ignore */ }
  },

  // ── Mute / unmute ────────────────────────────────────────────────────────

  toggleMute: async () => {
    isMuted = !isMuted;
    if (isMuted) {
      SoundService.pauseBackgroundMusic();
    } else if (isMusicEnabled) {
      SoundService.resumeBackgroundMusic();
    }
    await SoundService._saveSettings();
    return isMuted;
  },

  toggleMusic: async () => {
    isMusicEnabled = !isMusicEnabled;
    if (!isMusicEnabled) {
      SoundService.stopBackgroundMusic();
    } else if (!isMuted) {
      SoundService.playBackgroundMusic();
    }
    await SoundService._saveSettings();
    return isMusicEnabled;
  },

  toggleSoundEffects: async () => {
    isSoundEnabled = !isSoundEnabled;
    await SoundService._saveSettings();
    return isSoundEnabled;
  },

  // ── Getters ──────────────────────────────────────────────────────────────

  isMuted: () => isMuted,
  isMusicEnabled: () => isMusicEnabled,
  isSoundEnabled: () => isSoundEnabled,

  /**
   * Release all cached sounds (call on app unmount).
   */
  releaseAll: () => {
    SoundService.stopBackgroundMusic();
    Object.values(soundCache).forEach((s) => s.release());
    Object.keys(soundCache).forEach((k) => delete soundCache[k]);
  },
};

export default SoundService;
