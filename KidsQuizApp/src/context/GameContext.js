import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from '../services/AuthService';
import GameService from '../services/GameService';
import SoundService from '../services/SoundService';
import GAME_CONFIG from '../config/gameConfig';

// ── Context creation ──────────────────────────────────────────────────────────
const GameContext = createContext(null);

// ── Default state ─────────────────────────────────────────────────────────────
const DEFAULT_SETTINGS = {
  soundEnabled: true,
  musicEnabled: true,
  language: 'ar',
  difficulty: 'all',
};

const DEFAULT_PROGRESS = {
  stageResults: {},   // { [stageNum]: { stars, score, completed } }
  totalPoints: 0,
  totalStars: 0,
  highestStage: 1,    // first stage always unlocked
};

// ── Provider ──────────────────────────────────────────────────────────────────
export const GameProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(DEFAULT_PROGRESS);
  const [currentStage, setCurrentStage] = useState(1);
  const [score, setScore] = useState(0);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  // ── Auth listener ─────────────────────────────────────────────────────────
  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged(async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await loadUserProgress(firebaseUser.uid);
      } else {
        setProgress(DEFAULT_PROGRESS);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // ── Load settings from local storage on mount ─────────────────────────────
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const raw = await AsyncStorage.getItem(GAME_CONFIG.STORAGE_KEYS.SETTINGS);
        if (raw) {
          const saved = JSON.parse(raw);
          setSettings((prev) => ({ ...prev, ...saved }));
        }
      } catch { /* ignore */ }
    };
    loadSettings();
    SoundService.init();
  }, []);

  // ── Progress helpers ──────────────────────────────────────────────────────
  const loadUserProgress = async (uid) => {
    try {
      const data = await GameService.loadProgress(uid);
      setProgress(data);
    } catch { /* ignore */ }
  };

  const saveProgress = useCallback(
    async (newProgress) => {
      const merged = { ...progress, ...newProgress };
      setProgress(merged);
      if (user) {
        await GameService.saveProgress(user.uid, merged);
      }
    },
    [progress, user],
  );

  /**
   * Called after a game session ends.
   */
  const completeStage = useCallback(
    async ({ stage, correctCount, totalQuestions, pointsEarned, stars }) => {
      if (!user) return;

      await GameService.saveGameResult(user.uid, {
        stage,
        score: correctCount,
        totalQuestions,
        stars,
        pointsEarned,
        timeTaken: 0,
      });

      // Reload to get the merged server state
      await loadUserProgress(user.uid);

      // Update leaderboard using freshly-fetched progress from Firestore
      const freshProgress = await GameService.loadProgress(user.uid);
      await GameService.updateLeaderboard(
        user.uid,
        user.displayName || 'لاعب',
        freshProgress.totalPoints || 0,
        freshProgress.totalStars || 0,
      );
    },
    [user, progress],
  );

  // ── Settings helpers ──────────────────────────────────────────────────────
  const updateSettings = useCallback(async (newSettings) => {
    const merged = { ...settings, ...newSettings };
    setSettings(merged);
    try {
      await AsyncStorage.setItem(GAME_CONFIG.STORAGE_KEYS.SETTINGS, JSON.stringify(merged));
    } catch { /* ignore */ }

    // Sync sound services
    if ('soundEnabled' in newSettings) {
      if (!newSettings.soundEnabled) await SoundService.toggleSoundEffects();
      else if (!SoundService.isSoundEnabled()) await SoundService.toggleSoundEffects();
    }
    if ('musicEnabled' in newSettings) {
      if (!newSettings.musicEnabled) SoundService.stopBackgroundMusic();
      else SoundService.playBackgroundMusic();
    }
  }, [settings]);

  const isStageUnlocked = useCallback(
    (stage) => stage <= (progress.highestStage || 1),
    [progress.highestStage],
  );

  const getStageResult = useCallback(
    (stage) => progress.stageResults?.[stage] || null,
    [progress.stageResults],
  );

  const value = {
    // State
    user,
    progress,
    currentStage,
    score,
    settings,
    loading,
    // Setters
    setUser,
    setCurrentStage,
    setScore,
    // Helpers
    saveProgress,
    completeStage,
    updateSettings,
    isStageUnlocked,
    getStageResult,
    refreshProgress: () => user && loadUserProgress(user.uid),
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

// ── Hook ──────────────────────────────────────────────────────────────────────
export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within a GameProvider');
  return ctx;
};

export default GameContext;
