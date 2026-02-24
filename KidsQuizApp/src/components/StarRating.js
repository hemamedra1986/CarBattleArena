import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import COLORS from '../constants/colors';

/**
 * Star rating – displays 0 to 3 stars.
 *
 * Props:
 *   stars    {0|1|2|3}  number of filled stars
 *   size     {number}   star font size (default 28)
 *   style    object     container style override
 */
const StarRating = ({ stars = 0, size = 28, style }) => {
  return (
    <View style={[styles.row, style]}>
      {[0, 1, 2].map((i) => (
        <Text
          key={i}
          style={[
            styles.star,
            { fontSize: size, color: i < stars ? COLORS.starFilled : COLORS.starEmpty },
          ]}
        >
          ★
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row-reverse',   // RTL: right-to-left star order
    alignItems: 'center',
  },
  star: {
    marginHorizontal: 2,
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default StarRating;
