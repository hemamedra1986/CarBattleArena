// Child-friendly color palette
const COLORS = {
  // ── Primary brand ─────────────────────────────────────────────────────────
  primary: '#7C3AED',       // Deep purple
  primaryLight: '#A78BFA',
  primaryDark: '#5B21B6',

  // ── Accent / action ───────────────────────────────────────────────────────
  accent: '#F59E0B',        // Warm amber
  accentLight: '#FCD34D',
  accentDark: '#D97706',

  // ── Status ────────────────────────────────────────────────────────────────
  success: '#10B981',       // Green
  successLight: '#6EE7B7',
  error: '#EF4444',         // Red
  errorLight: '#FCA5A5',
  warning: '#F97316',       // Orange
  warningLight: '#FDBA74',

  // ── Neutral ───────────────────────────────────────────────────────────────
  white: '#FFFFFF',
  offWhite: '#F9FAFB',
  lightGray: '#E5E7EB',
  gray: '#9CA3AF',
  darkGray: '#4B5563',
  black: '#111827',

  // ── Backgrounds ───────────────────────────────────────────────────────────
  background: '#F3F4F6',
  cardBackground: '#FFFFFF',
  overlayDark: 'rgba(0,0,0,0.5)',

  // ── Gradients (start → end arrays used with LinearGradient) ──────────────
  gradientPurple: ['#7C3AED', '#4C1D95'],
  gradientBlue: ['#3B82F6', '#1E3A8A'],
  gradientOrange: ['#F97316', '#D97706'],
  gradientGreen: ['#10B981', '#065F46'],
  gradientPink: ['#EC4899', '#9D174D'],
  gradientYellow: ['#F59E0B', '#92400E'],
  gradientSplash: ['#6D28D9', '#1E40AF'],

  // ── Stage card colors (cycling) ───────────────────────────────────────────
  stageColors: [
    ['#7C3AED', '#4C1D95'],   // purple
    ['#3B82F6', '#1E3A8A'],   // blue
    ['#10B981', '#065F46'],   // green
    ['#F97316', '#D97706'],   // orange
    ['#EC4899', '#9D174D'],   // pink
    ['#EF4444', '#991B1B'],   // red
    ['#F59E0B', '#92400E'],   // amber
    ['#06B6D4', '#164E63'],   // cyan
    ['#8B5CF6', '#4C1D95'],   // violet
    ['#14B8A6', '#134E4A'],   // teal
  ],

  // ── Difficulty ────────────────────────────────────────────────────────────
  difficultyEasy: '#10B981',
  difficultyMedium: '#F59E0B',
  difficultyHard: '#EF4444',

  // ── Stars ─────────────────────────────────────────────────────────────────
  starFilled: '#F59E0B',
  starEmpty: '#D1D5DB',

  // ── Leaderboard medals ────────────────────────────────────────────────────
  gold: '#F59E0B',
  silver: '#9CA3AF',
  bronze: '#D97706',

  // ── Tab bar ───────────────────────────────────────────────────────────────
  tabActive: '#7C3AED',
  tabInactive: '#9CA3AF',
  tabBackground: '#FFFFFF',
};

export default COLORS;
