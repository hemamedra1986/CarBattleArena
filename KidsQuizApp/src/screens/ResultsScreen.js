import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Share,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import StarRating from '../components/StarRating';
import COLORS from '../constants/colors';
import STRINGS from '../constants/strings';
import GAME_CONFIG from '../config/gameConfig';

const { width } = Dimensions.get('window');

// Confetti-like floating emoji
const CONFETTI = ['🎉', '⭐', '🌟', '🎊', '🏆', '🎈', '✨', '🎁'];

const ResultsScreen = ({ route, navigation }) => {
  const { stage, correctCount, totalQuestions, pointsEarned, stars } = route.params;

  const passed = stars > 0;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  const celebrationRef = useRef(null);
  const starsRef = useRef(null);

  useEffect(() => {
    if (passed) {
      setTimeout(() => celebrationRef.current?.bounceIn(600), 300);
      setTimeout(() => starsRef.current?.zoomIn(500), 800);
    }
  }, [passed]);

  const handleNextStage = () => {
    navigation.replace('Game', { stage: stage + 1 });
  };

  const handleRetry = () => {
    navigation.replace('Game', { stage });
  };

  const handleHome = () => {
    navigation.navigate('HomeTab');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `🏆 أنهيت المرحلة ${stage} في لعبة المعلومات!\n✅ أجبت على ${correctCount}/${totalQuestions} سؤالاً\n⭐ حصلت على ${stars} نجمة\n💰 كسبت ${pointsEarned} نقطة\nتحدّني الآن! 🎮`,
      });
    } catch { /* ignore */ }
  };

  const gradientColors = passed ? COLORS.gradientPurple : ['#6B7280', '#374151'];

  return (
    <LinearGradient colors={gradientColors} style={styles.gradient}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <SafeAreaView style={styles.safeArea}>

        {/* Floating confetti (only when passed) */}
        {passed &&
          CONFETTI.map((emoji, i) => (
            <Animatable.Text
              key={i}
              animation="fadeInDown"
              delay={i * 120}
              duration={800}
              useNativeDriver
              style={[
                styles.confetti,
                {
                  top: `${5 + Math.random() * 20}%`,
                  left: `${(i / CONFETTI.length) * 90 + 5}%`,
                  fontSize: 20 + (i % 3) * 6,
                },
              ]}
            >
              {emoji}
            </Animatable.Text>
          ))}

        {/* Header */}
        <Animatable.Text
          ref={celebrationRef}
          useNativeDriver
          style={styles.headerEmoji}
        >
          {passed ? '🏆' : '💪'}
        </Animatable.Text>

        <Animatable.Text animation="fadeInDown" delay={200} useNativeDriver style={styles.title}>
          {passed ? STRINGS.STAGE_COMPLETE : STRINGS.STAGE_FAILED}
        </Animatable.Text>

        <Animatable.Text animation="fadeIn" delay={400} useNativeDriver style={styles.stageLabel}>
          المرحلة {stage}
        </Animatable.Text>

        {/* Stars */}
        <Animatable.View ref={starsRef} useNativeDriver style={styles.starsRow}>
          <StarRating stars={stars} size={44} />
        </Animatable.View>

        {/* Score card */}
        <Animatable.View animation="fadeInUp" delay={600} useNativeDriver style={styles.scoreCard}>
          <View style={styles.scoreRow}>
            <View style={styles.scoreItem}>
              <Text style={styles.scoreValue}>{correctCount}/{totalQuestions}</Text>
              <Text style={styles.scoreItemLabel}>{STRINGS.CORRECT_ANSWERS}</Text>
            </View>
            <View style={styles.scoreDivider} />
            <View style={styles.scoreItem}>
              <Text style={styles.scoreValue}>{percentage}%</Text>
              <Text style={styles.scoreItemLabel}>{STRINGS.YOUR_SCORE}</Text>
            </View>
            <View style={styles.scoreDivider} />
            <View style={styles.scoreItem}>
              <Text style={styles.scoreValue}>+{pointsEarned}</Text>
              <Text style={styles.scoreItemLabel}>{STRINGS.POINTS_EARNED}</Text>
            </View>
          </View>
        </Animatable.View>

        {/* Action buttons */}
        <Animatable.View animation="fadeInUp" delay={800} useNativeDriver style={styles.buttonsContainer}>
          {/* Primary action */}
          {passed && stage < GAME_CONFIG.TOTAL_STAGES ? (
            <TouchableOpacity style={styles.primaryBtn} onPress={handleNextStage} activeOpacity={0.85}>
              <LinearGradient
                colors={COLORS.gradientOrange}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.btnGradient}
              >
                <Text style={styles.primaryBtnText}>المرحلة التالية ➤</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.primaryBtn} onPress={handleRetry} activeOpacity={0.85}>
              <LinearGradient
                colors={COLORS.gradientOrange}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.btnGradient}
              >
                <Text style={styles.primaryBtnText}>{STRINGS.RETRY} 🔄</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}

          {/* Retry / Home row */}
          <View style={styles.secondaryRow}>
            {passed && (
              <TouchableOpacity style={[styles.secondaryBtn, styles.retrySmallBtn]} onPress={handleRetry} activeOpacity={0.8}>
                <Text style={styles.secondaryBtnText}>{STRINGS.RETRY} 🔄</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.secondaryBtn} onPress={handleHome} activeOpacity={0.8}>
              <Text style={styles.secondaryBtnText}>{STRINGS.BACK_HOME} 🏠</Text>
            </TouchableOpacity>
          </View>

          {/* Share */}
          <TouchableOpacity style={styles.shareBtn} onPress={handleShare} activeOpacity={0.8}>
            <Text style={styles.shareBtnText}>📤 {STRINGS.SHARE_SCORE}</Text>
          </TouchableOpacity>
        </Animatable.View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  confetti: { position: 'absolute', opacity: 0.9 },
  headerEmoji: { fontSize: 80, marginBottom: 8 },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.white,
    textAlign: 'center',
    writingDirection: 'rtl',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  stageLabel: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 6,
    marginBottom: 16,
    writingDirection: 'rtl',
    fontWeight: '600',
  },
  starsRow: { marginBottom: 20 },
  scoreCard: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  scoreRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  scoreItem: { alignItems: 'center' },
  scoreValue: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.white,
  },
  scoreItemLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 4,
    writingDirection: 'rtl',
  },
  scoreDivider: { width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.3)' },
  buttonsContainer: { width: '100%' },
  primaryBtn: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  btnGradient: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '900',
    writingDirection: 'rtl',
  },
  secondaryRow: {
    flexDirection: 'row-reverse',
    gap: 10,
    marginBottom: 10,
  },
  secondaryBtn: {
    flex: 1,
    height: 48,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  retrySmallBtn: {},
  secondaryBtnText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
    writingDirection: 'rtl',
  },
  shareBtn: {
    height: 46,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  shareBtnText: {
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '700',
    fontSize: 14,
    writingDirection: 'rtl',
  },
});

export default ResultsScreen;
