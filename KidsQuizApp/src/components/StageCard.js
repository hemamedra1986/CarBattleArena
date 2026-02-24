import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import StarRating from './StarRating';
import { getStageGradient, getDifficultyLabel, getDifficultyColor } from '../utils/gameUtils';
import COLORS from '../constants/colors';

/**
 * StageCard – displays a single stage tile in the Home screen grid.
 *
 * Props:
 *   stage       {number}
 *   isUnlocked  {boolean}
 *   stars       {0|1|2|3}
 *   difficulty  {'easy'|'medium'|'hard'}
 *   onPress     {function}
 */
const StageCard = ({ stage, isUnlocked, stars = 0, difficulty = 'easy', onPress }) => {
  const gradient = getStageGradient(stage);
  const diffColor = getDifficultyColor(difficulty);
  const diffLabel = getDifficultyLabel(difficulty);

  return (
    <Animatable.View
      animation={isUnlocked ? 'fadeInUp' : undefined}
      delay={((stage - 1) % 10) * 40}
      duration={400}
      useNativeDriver
    >
      <TouchableOpacity
        activeOpacity={isUnlocked ? 0.75 : 1}
        onPress={() => isUnlocked && onPress && onPress(stage)}
        style={styles.wrapper}
      >
        <LinearGradient
          colors={isUnlocked ? gradient : ['#9CA3AF', '#6B7280']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          {/* Lock overlay */}
          {!isUnlocked && (
            <View style={styles.lockOverlay}>
              <Text style={styles.lockIcon}>🔒</Text>
            </View>
          )}

          {/* Stage number */}
          <Text style={styles.stageNum}>{stage}</Text>
          <Text style={styles.stageLabel}>مرحلة</Text>

          {/* Stars */}
          {isUnlocked && (
            <View style={styles.starsRow}>
              <StarRating stars={stars} size={16} />
            </View>
          )}

          {/* Difficulty badge */}
          {isUnlocked && (
            <View style={[styles.badge, { backgroundColor: diffColor }]}>
              <Text style={styles.badgeText}>{diffLabel}</Text>
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '46%',
    margin: '2%',
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
  },
  card: {
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  lockIcon: {
    fontSize: 32,
  },
  stageNum: {
    fontSize: 36,
    fontWeight: '900',
    color: COLORS.white,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  stageLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: 1,
  },
  starsRow: {
    marginTop: 6,
  },
  badge: {
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '700',
  },
});

export default StageCard;
