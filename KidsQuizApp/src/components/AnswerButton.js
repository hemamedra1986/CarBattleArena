import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import COLORS from '../constants/colors';

const LABELS = ['أ', 'ب', 'ج', 'د'];
const LABEL_COLORS = ['#7C3AED', '#3B82F6', '#F97316', '#10B981'];

/**
 * State values:
 *   'default'          – not yet answered
 *   'selected-correct' – user chose this and it is correct
 *   'selected-wrong'   – user chose this and it is wrong
 *   'correct'          – correct answer revealed (another option was chosen)
 *   'disabled'         – answer phase over; this option is neither selected nor correct
 */
const AnswerButton = ({ option, index, state = 'default', onPress, disabled }) => {
  const isCorrect = state === 'selected-correct' || state === 'correct';
  const isWrong = state === 'selected-wrong';
  const isDefault = state === 'default';

  const gradientColors = isCorrect
    ? [COLORS.success, COLORS.successLight]
    : isWrong
    ? [COLORS.error, COLORS.errorLight]
    : [COLORS.white, COLORS.offWhite];

  const labelBg = isCorrect
    ? COLORS.successLight
    : isWrong
    ? COLORS.errorLight
    : LABEL_COLORS[index % LABEL_COLORS.length];

  const textColor = isCorrect || isWrong ? COLORS.white : COLORS.black;
  const labelText = isCorrect ? '✓' : isWrong ? '✗' : LABELS[index];

  const animation = isCorrect ? 'bounceIn' : isWrong ? 'shake' : undefined;

  return (
    <Animatable.View
      animation={animation}
      duration={500}
      useNativeDriver
      style={styles.wrapper}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => !disabled && onPress && onPress(index)}
        disabled={disabled}
        style={[
          styles.touchable,
          isDefault && styles.shadowDefault,
          isCorrect && styles.shadowCorrect,
          isWrong && styles.shadowWrong,
        ]}
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          {/* Label badge */}
          <View style={[styles.labelBadge, { backgroundColor: labelBg }]}>
            <Text style={styles.labelText}>{labelText}</Text>
          </View>

          {/* Option text */}
          <Text
            style={[styles.optionText, { color: textColor }]}
            numberOfLines={2}
            adjustsFontSizeToFit
          >
            {option}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 6,
    width: '100%',
  },
  touchable: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  shadowDefault: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  shadowCorrect: {
    shadowColor: COLORS.success,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  shadowWrong: {
    shadowColor: COLORS.error,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    minHeight: 60,
  },
  labelBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  labelText: {
    color: COLORS.white,
    fontWeight: '900',
    fontSize: 17,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
    writingDirection: 'rtl',
    paddingRight: 8,
  },
});

export default AnswerButton;
