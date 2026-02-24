import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GAME_CONFIG from '../config/gameConfig';

const USERS_COLLECTION = 'users';
const PROGRESS_COLLECTION = 'progress';
const LEADERBOARD_COLLECTION = 'leaderboard';

const GameService = {
  /**
   * Save the player's game progress to Firestore and cache locally.
   * @param {string} uid
   * @param {object} progressData  { stageResults: {[stageNum]: {stars, score, completed}}, totalPoints, totalStars, highestStage }
   */
  saveProgress: async (uid, progressData) => {
    const ref = firestore()
      .collection(USERS_COLLECTION)
      .doc(uid)
      .collection(PROGRESS_COLLECTION)
      .doc('gameProgress');

    await ref.set(
      {
        ...progressData,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    // Cache locally
    await AsyncStorage.setItem(
      GAME_CONFIG.STORAGE_KEYS.USER_PROGRESS,
      JSON.stringify({ uid, ...progressData }),
    );
  },

  /**
   * Load game progress – try Firestore first, fall back to local cache.
   */
  loadProgress: async (uid) => {
    try {
      const doc = await firestore()
        .collection(USERS_COLLECTION)
        .doc(uid)
        .collection(PROGRESS_COLLECTION)
        .doc('gameProgress')
        .get();

      if (doc.exists) {
        const data = doc.data();
        await AsyncStorage.setItem(
          GAME_CONFIG.STORAGE_KEYS.USER_PROGRESS,
          JSON.stringify({ uid, ...data }),
        );
        return data;
      }
    } catch {
      // Fall back to local cache on network error
    }

    try {
      const cached = await AsyncStorage.getItem(GAME_CONFIG.STORAGE_KEYS.USER_PROGRESS);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.uid === uid) return parsed;
      }
    } catch { /* ignore */ }

    // Default progress for a new player
    return {
      stageResults: {},
      totalPoints: 0,
      totalStars: 0,
      highestStage: 1,
    };
  },

  /**
   * Save the result of a completed stage game session.
   */
  saveGameResult: async (uid, { stage, score, totalQuestions, stars, pointsEarned, timeTaken }) => {
    const resultData = {
      stage,
      score,
      totalQuestions,
      stars,
      pointsEarned,
      timeTaken,
      playedAt: firestore.FieldValue.serverTimestamp(),
    };

    // Save to game-results sub-collection
    await firestore()
      .collection(USERS_COLLECTION)
      .doc(uid)
      .collection('gameResults')
      .add(resultData);

    // Update user-level stats
    const progressRef = firestore()
      .collection(USERS_COLLECTION)
      .doc(uid)
      .collection(PROGRESS_COLLECTION)
      .doc('gameProgress');

    await firestore().runTransaction(async (transaction) => {
      const progressDoc = await transaction.get(progressRef);
      const existing = progressDoc.exists ? progressDoc.data() : {};
      const stageResults = existing.stageResults || {};
      const prev = stageResults[stage] || { stars: 0, score: 0 };

      // Keep best result per stage
      const newStars = Math.max(prev.stars, stars);
      const newScore = Math.max(prev.score, score);
      const updatedStageResults = {
        ...stageResults,
        [stage]: { stars: newStars, score: newScore, completed: true },
      };

      const totalStars = Object.values(updatedStageResults).reduce((sum, r) => sum + r.stars, 0);
      const highestStage = Math.max(existing.highestStage || 1, stage + 1);

      transaction.set(
        progressRef,
        {
          stageResults: updatedStageResults,
          totalPoints: (existing.totalPoints || 0) + pointsEarned,
          totalStars,
          highestStage,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        },
        { merge: true },
      );
    });
  },

  /**
   * Update the Realtime Database leaderboard entry for this user.
   */
  updateLeaderboard: async (uid, displayName, totalPoints, totalStars) => {
    await database()
      .ref(`${LEADERBOARD_COLLECTION}/${uid}`)
      .set({
        uid,
        displayName,
        totalPoints,
        totalStars,
        updatedAt: database.ServerValue.TIMESTAMP,
      });
  },

  /**
   * Fetch the top-N leaderboard entries from Realtime Database.
   * Falls back to cached data on failure.
   */
  getLeaderboard: async (limit = GAME_CONFIG.LEADERBOARD_LIMIT) => {
    try {
      const snapshot = await database()
        .ref(LEADERBOARD_COLLECTION)
        .orderByChild('totalPoints')
        .limitToLast(limit)
        .once('value');

      const data = snapshot.val();
      if (!data) return [];

      const entries = Object.values(data).sort((a, b) => b.totalPoints - a.totalPoints);

      await AsyncStorage.setItem(
        GAME_CONFIG.STORAGE_KEYS.CACHED_LEADERBOARD,
        JSON.stringify(entries),
      );

      return entries;
    } catch {
      try {
        const cached = await AsyncStorage.getItem(GAME_CONFIG.STORAGE_KEYS.CACHED_LEADERBOARD);
        return cached ? JSON.parse(cached) : [];
      } catch {
        return [];
      }
    }
  },
};

export default GameService;
