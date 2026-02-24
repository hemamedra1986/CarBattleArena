import GAME_CONFIG from '../config/gameConfig';
import COLORS from '../constants/colors';

/**
 * Calculate the number of stars (0-3) based on the fraction of correct answers.
 * @param {number} correctCount
 * @param {number} totalQuestions
 * @returns {0|1|2|3}
 */
export const calculateStars = (correctCount, totalQuestions) => {
  if (totalQuestions === 0) return 0;
  const ratio = correctCount / totalQuestions;
  if (ratio >= GAME_CONFIG.STARS_THREE_THRESHOLD) return 3;
  if (ratio >= GAME_CONFIG.STARS_TWO_THRESHOLD) return 2;
  if (ratio >= GAME_CONFIG.STARS_ONE_THRESHOLD) return 1;
  return 0;
};

/**
 * Calculate total points earned in a game session.
 * @param {Array} answeredQuestions  Array of { question, isCorrect, timeRemaining }
 * @returns {number}
 */
export const calculatePoints = (answeredQuestions) => {
  return answeredQuestions.reduce((total, { question, isCorrect, timeRemaining }) => {
    if (!isCorrect) return total;
    let pts = question.points;
    if (timeRemaining >= GAME_CONFIG.BONUS_TIME_THRESHOLD) {
      pts += GAME_CONFIG.BONUS_POINTS_FAST_ANSWER;
    }
    return total + pts;
  }, 0);
};

/**
 * Fisher-Yates shuffle – returns a new shuffled array.
 * @param {Array} array
 * @returns {Array}
 */
export const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

/**
 * Format seconds as MM:SS string.
 * @param {number} seconds
 * @returns {string}
 */
export const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

/**
 * Return the color associated with a difficulty level.
 * @param {'easy'|'medium'|'hard'} difficulty
 * @returns {string}
 */
export const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'easy': return COLORS.difficultyEasy;
    case 'medium': return COLORS.difficultyMedium;
    case 'hard': return COLORS.difficultyHard;
    default: return COLORS.gray;
  }
};

/**
 * Return the Arabic label for a difficulty level.
 * @param {'easy'|'medium'|'hard'} difficulty
 * @returns {string}
 */
export const getDifficultyLabel = (difficulty) => {
  switch (difficulty) {
    case 'easy': return 'سهل';
    case 'medium': return 'متوسط';
    case 'hard': return 'صعب';
    default: return '';
  }
};

/**
 * Return the gradient colors for a stage card based on stage index.
 * @param {number} stage
 * @returns {string[]}
 */
export const getStageGradient = (stage) => {
  const idx = (stage - 1) % COLORS.stageColors.length;
  return COLORS.stageColors[idx];
};

/**
 * Determine the overall completion percentage across all 50 stages.
 * @param {object} stageResults  { [stageNum]: { stars, completed } }
 * @returns {number}  0–100
 */
export const getOverallProgress = (stageResults = {}) => {
  const completed = Object.values(stageResults).filter((r) => r.completed).length;
  return Math.round((completed / GAME_CONFIG.TOTAL_STAGES) * 100);
};

/**
 * Determine the medal color for a leaderboard position.
 * @param {number} rank  1-based
 * @returns {string}
 */
export const getMedalColor = (rank) => {
  switch (rank) {
    case 1: return COLORS.gold;
    case 2: return COLORS.silver;
    case 3: return COLORS.bronze;
    default: return COLORS.gray;
  }
};
