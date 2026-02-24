import React, { useEffect, useRef } from 'react';
import { View, Animated, Text, StyleSheet } from 'react-native';
import COLORS from '../constants/colors';

/**
 * Animated horizontal progress bar.
 *
 * Props:
 *   progress   {number}  0–1
 *   color      {string}  fill color (optional)
 *   height     {number}  bar height (optional, default 12)
 *   showLabel  {boolean} show percentage label (optional)
 *   label      {string}  custom label text (optional)
 */
const ProgressBar = ({
  progress = 0,
  color = COLORS.primary,
  height = 12,
  showLabel = false,
  label = null,
  style,
}) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  const clampedProgress = Math.min(1, Math.max(0, progress));

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: clampedProgress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [clampedProgress, animatedWidth]);

  return (
    <View style={[styles.container, style]}>
      {(showLabel || label) && (
        <Text style={styles.label}>
          {label !== null ? label : `${Math.round(clampedProgress * 100)}%`}
        </Text>
      )}
      <View style={[styles.track, { height }]}>
        <Animated.View
          style={[
            styles.fill,
            {
              height,
              backgroundColor: color,
              width: animatedWidth.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    color: COLORS.darkGray,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'right',
    marginBottom: 4,
    writingDirection: 'rtl',
  },
  track: {
    width: '100%',
    backgroundColor: COLORS.lightGray,
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: 999,
  },
});

export default ProgressBar;
