// Game configuration constants
const GAME_CONFIG = {
  // Stage settings
  TOTAL_STAGES: 50,
  QUESTIONS_PER_STAGE: 20,
  TOTAL_QUESTIONS: 1000,

  // Timer settings (seconds)
  QUESTION_TIME_LIMIT: 30,
  BONUS_TIME_THRESHOLD: 15, // seconds remaining to earn bonus points

  // Scoring
  POINTS_EASY: 10,
  POINTS_MEDIUM: 20,
  POINTS_HARD: 30,
  BONUS_POINTS_FAST_ANSWER: 5,

  // Stars thresholds (percentage correct)
  STARS_THREE_THRESHOLD: 0.9, // 90% → 3 stars
  STARS_TWO_THRESHOLD: 0.7,   // 70% → 2 stars
  STARS_ONE_THRESHOLD: 0.5,   // 50% → 1 star

  // Difficulty distribution per stage group
  DIFFICULTY_STAGES_EASY: [1, 10],    // stages 1–10
  DIFFICULTY_STAGES_MEDIUM: [11, 30], // stages 11–30
  DIFFICULTY_STAGES_HARD: [31, 50],   // stages 31–50

  // Leaderboard
  LEADERBOARD_LIMIT: 10,

  // Sound files (must be placed in android/app/src/main/res/raw & ios bundle)
  SOUNDS: {
    BACKGROUND_MUSIC: 'background_music.mp3',
    CORRECT_ANSWER: 'correct.mp3',
    WRONG_ANSWER: 'wrong.mp3',
    LEVEL_COMPLETE: 'level_complete.mp3',
    BUTTON_CLICK: 'button_click.mp3',
    COUNTDOWN: 'countdown.mp3',
  },

  // Animation durations (ms)
  ANSWER_FEEDBACK_DURATION: 700,
  SPLASH_DISPLAY_DURATION: 3000,
  TRANSITION_DURATION: 400,

  // AsyncStorage keys
  STORAGE_KEYS: {
    USER_PROGRESS: '@kids_quiz_progress',
    SETTINGS: '@kids_quiz_settings',
    CACHED_LEADERBOARD: '@kids_quiz_leaderboard',
  },

  // Categories
  CATEGORIES: {
    ANIMALS: 'الحيوانات',
    PLANTS: 'النباتات',
    SCIENCE: 'العلوم',
    MATH: 'الرياضيات',
    GEOGRAPHY: 'الجغرافيا',
    HISTORY: 'التاريخ',
    LANGUAGES: 'اللغات',
    SPORTS: 'الرياضة',
    ARTS: 'الفنون',
    GENERAL: 'معلومات عامة',
  },
};

export default GAME_CONFIG;
