import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import COLORS from '../constants/colors';
import STRINGS from '../constants/strings';

const { width, height } = Dimensions.get('window');

// Decorative floating elements
const FLOATERS = [
  { emoji: '⭐', top: '8%', left: '10%', delay: 0, size: 32 },
  { emoji: '🚀', top: '12%', right: '12%', delay: 200, size: 36 },
  { emoji: '🎈', top: '70%', left: '8%', delay: 400, size: 30 },
  { emoji: '🌟', top: '65%', right: '10%', delay: 600, size: 34 },
  { emoji: '🎉', top: '35%', left: '5%', delay: 100, size: 28 },
  { emoji: '💡', top: '40%', right: '6%', delay: 300, size: 28 },
  { emoji: '🌈', top: '85%', left: '40%', delay: 500, size: 30 },
];

const SplashScreen = ({ navigation }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Auth');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={COLORS.gradientSplash}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Floating decorative elements */}
      {FLOATERS.map((f, i) => (
        <Animatable.Text
          key={i}
          animation="swing"
          iterationCount="infinite"
          direction="alternate"
          delay={f.delay}
          duration={2000 + i * 300}
          useNativeDriver
          style={[
            styles.floater,
            { fontSize: f.size, top: f.top, left: f.left, right: f.right },
          ]}
        >
          {f.emoji}
        </Animatable.Text>
      ))}

      {/* Logo / icon area */}
      <Animatable.View
        animation="bounceIn"
        duration={900}
        useNativeDriver
        style={styles.logoContainer}
      >
        <View style={styles.logoCircle}>
          <Animatable.Text
            animation="rotate"
            iterationCount="infinite"
            duration={6000}
            easing="linear"
            useNativeDriver
            style={styles.logoEmoji}
          >
            🌟
          </Animatable.Text>
          <Text style={styles.logoInner}>؟</Text>
        </View>
      </Animatable.View>

      {/* Title */}
      <Animatable.Text
        ref={titleRef}
        animation="fadeInDown"
        delay={400}
        duration={700}
        useNativeDriver
        style={styles.title}
      >
        {STRINGS.APP_NAME}
      </Animatable.Text>

      {/* Tagline */}
      <Animatable.Text
        animation="fadeInUp"
        delay={700}
        duration={700}
        useNativeDriver
        style={styles.tagline}
      >
        {STRINGS.TAGLINE}
      </Animatable.Text>

      {/* Loading dots */}
      <Animatable.View
        animation="fadeIn"
        delay={1200}
        useNativeDriver
        style={styles.dotsRow}
      >
        {[0, 1, 2].map((i) => (
          <Animatable.View
            key={i}
            animation="pulse"
            iterationCount="infinite"
            delay={i * 200}
            duration={800}
            useNativeDriver
            style={styles.dot}
          />
        ))}
      </Animatable.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floater: {
    position: 'absolute',
    opacity: 0.8,
  },
  logoContainer: {
    marginBottom: 28,
  },
  logoCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoEmoji: {
    position: 'absolute',
    fontSize: 60,
    opacity: 0.5,
  },
  logoInner: {
    fontSize: 64,
    color: COLORS.white,
    fontWeight: '900',
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: COLORS.white,
    textAlign: 'center',
    letterSpacing: 2,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
    writingDirection: 'rtl',
  },
  tagline: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 12,
    textAlign: 'center',
    fontWeight: '600',
    writingDirection: 'rtl',
  },
  dotsRow: {
    flexDirection: 'row',
    marginTop: 48,
    gap: 12,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginHorizontal: 4,
  },
});

export default SplashScreen;
