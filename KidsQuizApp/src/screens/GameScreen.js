import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
  Alert,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useGame } from '../context/GameContext';
import AnswerButton from '../components/AnswerButton';
import ProgressBar from '../components/ProgressBar';
import SoundService from '../services/SoundService';
import { getQuestionsForStage } from '../data/questions';
import { calculateStars, calculatePoints, shuffleArray, formatTime } from '../utils/gameUtils';
import GAME_CONFIG from '../config/gameConfig';
import COLORS from '../constants/colors';
import STRINGS from '../constants/strings';

const { width } = Dimensions.get('window');
const TIME_LIMIT = GAME_CONFIG.QUESTION_TIME_LIMIT;

const GameScreen = ({ route, navigation }) => {
  const { stage } = route.params;
  const { completeStage, settings } = useGame();

  const [questions] = useState(() => {
    const qs = getQuestionsForStage(stage);
    return shuffleArray(qs).slice(0, GAME_CONFIG.QUESTIONS_PER_STAGE);
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [correctCount, setCorrectCount] = useState(0);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [answeredList, setAnsweredList] = useState([]);

  const timerRef = useRef(null);
  const questionRef = useRef(null);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  // ── Timer ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (answered) return;
    setTimeLeft(TIME_LIMIT);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  // ── Hardware back button ──────────────────────────────────────────────────
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      confirmExit();
      return true;
    });
    return () => sub.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirmExit = () => {
    Alert.alert('خروج من اللعبة', 'هل تريد الخروج؟ ستفقد تقدمك في هذه المرحلة.', [
      { text: STRINGS.CANCEL, style: 'cancel' },
      { text: STRINGS.OK, onPress: () => navigation.goBack() },
    ]);
  };

  // ── Handle answer selection ───────────────────────────────────────────────
  const handleAnswer = useCallback(
    (index) => {
      if (answered) return;
      clearInterval(timerRef.current);
      setSelectedIndex(index);
      setAnswered(true);

      const isCorrect = index === currentQuestion.correctAnswer;
      if (isCorrect) {
        SoundService.playCorrectSound();
        setCorrectCount((c) => c + 1);
        const pts = currentQuestion.points + (timeLeft >= GAME_CONFIG.BONUS_TIME_THRESHOLD ? GAME_CONFIG.BONUS_POINTS_FAST_ANSWER : 0);
        setPointsEarned((p) => p + pts);
        setAnsweredList((prev) => [...prev, { question: currentQuestion, isCorrect: true, timeRemaining: timeLeft }]);
      } else {
        SoundService.playWrongSound();
        setAnsweredList((prev) => [...prev, { question: currentQuestion, isCorrect: false, timeRemaining: timeLeft }]);
      }
    },
    [answered, currentQuestion, timeLeft],
  );

  const handleTimeout = useCallback(() => {
    if (answered) return;
    setAnswered(true);
    setSelectedIndex(null);
    SoundService.playWrongSound();
    setAnsweredList((prev) => [...prev, { question: currentQuestion, isCorrect: false, timeRemaining: 0 }]);
  }, [answered, currentQuestion]);

  // ── Move to next question or finish ──────────────────────────────────────
  const handleNext = useCallback(async () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= totalQuestions) {
      // Game over
      const stars = calculateStars(correctCount, totalQuestions);
      SoundService.playLevelCompleteSound();

      await completeStage({
        stage,
        correctCount,
        totalQuestions,
        pointsEarned,
        stars,
      });

      navigation.replace('Results', {
        stage,
        correctCount,
        totalQuestions,
        pointsEarned,
        stars,
      });
    } else {
      setCurrentIndex(nextIndex);
      setSelectedIndex(null);
      setAnswered(false);
      questionRef.current?.fadeIn(300);
    }
  }, [correctCount, currentIndex, currentQuestion, navigation, completeStage, pointsEarned, selectedIndex, stage, totalQuestions]);

  // ── Answer button states ──────────────────────────────────────────────────
  const getAnswerState = (index) => {
    if (!answered) return 'default';
    if (index === currentQuestion.correctAnswer) return 'correct';
    if (index === selectedIndex) return 'selected-wrong';
    return 'disabled';
  };

  const timerColor = timeLeft > 10 ? COLORS.success : COLORS.error;

  return (
    <LinearGradient
      colors={['#EDE9FE', '#F3F4F6']}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={confirmExit} style={styles.exitBtn}>
            <Text style={styles.exitIcon}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.stageBadge}>المرحلة {stage}</Text>
          <View style={styles.scoreBox}>
            <Text style={styles.scoreLabel}>نقاط</Text>
            <Text style={styles.scoreValue}>{pointsEarned}</Text>
          </View>
        </View>

        {/* Progress bar (questions) */}
        <View style={styles.progressRow}>
          <Text style={styles.progressLabel}>
            {currentIndex + 1} / {totalQuestions}
          </Text>
          <View style={styles.progressBarWrapper}>
            <ProgressBar progress={(currentIndex + 1) / totalQuestions} color={COLORS.primary} height={8} />
          </View>
        </View>

        {/* Timer */}
        <View style={styles.timerRow}>
          <View style={[styles.timerCircle, { borderColor: timerColor }]}>
            <Text style={[styles.timerText, { color: timerColor }]}>
              {String(timeLeft).padStart(2, '0')}
            </Text>
          </View>
        </View>

        {/* Question card */}
        <Animatable.View
          ref={questionRef}
          animation="fadeIn"
          duration={400}
          useNativeDriver
          style={styles.questionCard}
        >
          <Text style={styles.categoryBadge}>{currentQuestion?.category}</Text>
          <Text style={styles.questionText}>{currentQuestion?.question}</Text>
        </Animatable.View>

        {/* Answer buttons */}
        <View style={styles.answersContainer}>
          {currentQuestion?.options.map((option, index) => (
            <AnswerButton
              key={index}
              option={option}
              index={index}
              state={getAnswerState(index)}
              onPress={handleAnswer}
              disabled={answered}
            />
          ))}
        </View>

        {/* Next button (visible after answering) */}
        {answered && (
          <Animatable.View animation="fadeInUp" duration={400} useNativeDriver style={styles.nextRow}>
            <TouchableOpacity style={styles.nextBtn} onPress={handleNext} activeOpacity={0.85}>
              <LinearGradient
                colors={COLORS.gradientPurple}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.nextGradient}
              >
                <Text style={styles.nextText}>
                  {currentIndex + 1 >= totalQuestions ? 'عرض النتائج 🏆' : 'التالي ➤'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animatable.View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, paddingHorizontal: 16 },
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    marginBottom: 8,
  },
  exitBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exitIcon: { fontSize: 16, color: COLORS.darkGray, fontWeight: '700' },
  stageBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    color: COLORS.white,
    fontWeight: '800',
    fontSize: 14,
    writingDirection: 'rtl',
  },
  scoreBox: { alignItems: 'center' },
  scoreLabel: { fontSize: 10, color: COLORS.gray, writingDirection: 'rtl' },
  scoreValue: { fontSize: 18, fontWeight: '900', color: COLORS.primaryDark },
  progressRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.darkGray,
    minWidth: 42,
    textAlign: 'right',
  },
  progressBarWrapper: { flex: 1 },
  timerRow: { alignItems: 'center', marginBottom: 12 },
  timerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timerText: { fontSize: 22, fontWeight: '900' },
  questionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
    minHeight: 120,
    justifyContent: 'center',
  },
  categoryBadge: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primaryLight,
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    marginBottom: 10,
    writingDirection: 'rtl',
  },
  questionText: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.black,
    textAlign: 'right',
    writingDirection: 'rtl',
    lineHeight: 32,
  },
  answersContainer: { flex: 1, justifyContent: 'center' },
  nextRow: { paddingBottom: 16, paddingTop: 8 },
  nextBtn: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  nextGradient: {
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '900',
    writingDirection: 'rtl',
  },
});

export default GameScreen;
