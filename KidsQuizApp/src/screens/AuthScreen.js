import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import AuthService from '../services/AuthService';
import COLORS from '../constants/colors';
import STRINGS from '../constants/strings';

// Map Firebase error codes to user-friendly Arabic messages
const mapFirebaseError = (code) => {
  switch (code) {
    case 'auth/email-already-in-use': return STRINGS.ERROR_EMAIL_IN_USE;
    case 'auth/invalid-email': return STRINGS.ERROR_INVALID_EMAIL;
    case 'auth/weak-password': return STRINGS.ERROR_WEAK_PASSWORD;
    case 'auth/wrong-password': return STRINGS.ERROR_WRONG_PASSWORD;
    case 'auth/user-not-found': return STRINGS.ERROR_USER_NOT_FOUND;
    case 'auth/network-request-failed': return STRINGS.ERROR_NETWORK;
    default: return STRINGS.ERROR_GENERIC;
  }
};

const AuthScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const formRef = useRef(null);

  const validate = () => {
    if (!email.trim()) { setError(STRINGS.FIELD_REQUIRED); return false; }
    if (!password.trim()) { setError(STRINGS.FIELD_REQUIRED); return false; }
    if (!isLogin && !displayName.trim()) { setError(STRINGS.FIELD_REQUIRED); return false; }
    return true;
  };

  const handleSubmit = async () => {
    setError('');
    if (!validate()) return;
    setLoading(true);
    try {
      if (isLogin) {
        await AuthService.login(email.trim(), password);
      } else {
        await AuthService.register(email.trim(), password, displayName.trim());
      }
      // Navigation handled by the auth listener in GameContext / AppNavigator
    } catch (e) {
      const msg = mapFirebaseError(e.code);
      setError(msg);
      formRef.current?.shake(600);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setError('');
    setIsLogin((prev) => !prev);
  };

  return (
    <LinearGradient
      colors={COLORS.gradientSplash}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={styles.gradient}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header emoji */}
          <Animatable.Text animation="bounceIn" duration={700} useNativeDriver style={styles.headerEmoji}>
            🎓
          </Animatable.Text>

          {/* Title */}
          <Animatable.Text animation="fadeInDown" delay={200} useNativeDriver style={styles.title}>
            {STRINGS.APP_NAME}
          </Animatable.Text>
          <Animatable.Text animation="fadeIn" delay={400} useNativeDriver style={styles.subtitle}>
            {isLogin ? STRINGS.WELCOME_BACK : STRINGS.CREATE_ACCOUNT}
          </Animatable.Text>

          {/* Form card */}
          <Animatable.View
            ref={formRef}
            animation="fadeInUp"
            delay={500}
            useNativeDriver
            style={styles.card}
          >
            {/* Name field (register only) */}
            {!isLogin && (
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>👤</Text>
                <TextInput
                  style={styles.input}
                  placeholder={STRINGS.DISPLAY_NAME}
                  placeholderTextColor={COLORS.gray}
                  value={displayName}
                  onChangeText={setDisplayName}
                  textAlign="right"
                  maxLength={30}
                  returnKeyType="next"
                />
              </View>
            )}

            {/* Email field */}
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>📧</Text>
              <TextInput
                style={styles.input}
                placeholder={STRINGS.EMAIL}
                placeholderTextColor={COLORS.gray}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                textAlign="right"
                returnKeyType="next"
              />
            </View>

            {/* Password field */}
            <View style={styles.inputWrapper}>
              <TouchableOpacity onPress={() => setShowPassword((p) => !p)}>
                <Text style={styles.inputIcon}>{showPassword ? '🙈' : '🔒'}</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder={STRINGS.PASSWORD}
                placeholderTextColor={COLORS.gray}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                textAlign="right"
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
              />
            </View>

            {/* Error */}
            {!!error && (
              <Animatable.Text animation="fadeIn" style={styles.errorText}>
                ⚠️ {error}
              </Animatable.Text>
            )}

            {/* Submit button */}
            <TouchableOpacity
              style={styles.submitBtn}
              activeOpacity={0.85}
              onPress={handleSubmit}
              disabled={loading}
            >
              <LinearGradient
                colors={COLORS.gradientOrange}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.submitGradient}
              >
                {loading ? (
                  <ActivityIndicator color={COLORS.white} />
                ) : (
                  <Text style={styles.submitText}>
                    {isLogin ? STRINGS.LOGIN : STRINGS.REGISTER}
                  </Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Forgot password (login only) */}
            {isLogin && (
              <TouchableOpacity
                onPress={() => Alert.alert(STRINGS.FORGOT_PASSWORD, STRINGS.EMAIL, [
                  { text: STRINGS.CANCEL, style: 'cancel' },
                  {
                    text: STRINGS.RESET_PASSWORD,
                    onPress: async () => {
                      if (!email.trim()) { setError(STRINGS.FIELD_REQUIRED); return; }
                      try {
                        await AuthService.resetPassword(email.trim());
                        Alert.alert('✅', STRINGS.RESET_EMAIL_SENT);
                      } catch (e) {
                        setError(mapFirebaseError(e.code));
                      }
                    },
                  },
                ])}
                style={styles.forgotBtn}
              >
                <Text style={styles.forgotText}>{STRINGS.FORGOT_PASSWORD}</Text>
              </TouchableOpacity>
            )}

            {/* Toggle login/register */}
            <TouchableOpacity onPress={toggleMode} style={styles.toggleBtn}>
              <Text style={styles.toggleText}>
                {isLogin ? STRINGS.NO_ACCOUNT : STRINGS.ALREADY_HAVE_ACCOUNT}
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  headerEmoji: { fontSize: 64, marginBottom: 8 },
  title: {
    fontSize: 34,
    fontWeight: '900',
    color: COLORS.white,
    textAlign: 'center',
    writingDirection: 'rtl',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 6,
    marginBottom: 24,
    textAlign: 'center',
    writingDirection: 'rtl',
    fontWeight: '600',
  },
  card: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  inputWrapper: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: COLORS.offWhite,
    borderRadius: 14,
    marginBottom: 14,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderColor: COLORS.lightGray,
  },
  inputIcon: { fontSize: 22, marginLeft: 8 },
  input: {
    flex: 1,
    height: 52,
    fontSize: 15,
    color: COLORS.black,
    writingDirection: 'rtl',
  },
  errorText: {
    color: COLORS.error,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 10,
    writingDirection: 'rtl',
    fontWeight: '600',
  },
  submitBtn: {
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 6,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  submitGradient: {
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    color: COLORS.white,
    fontWeight: '900',
    fontSize: 18,
    writingDirection: 'rtl',
  },
  forgotBtn: { alignItems: 'center', marginTop: 14 },
  forgotText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '600',
    writingDirection: 'rtl',
  },
  toggleBtn: { alignItems: 'center', marginTop: 16 },
  toggleText: {
    color: COLORS.primaryDark,
    fontSize: 14,
    fontWeight: '700',
    writingDirection: 'rtl',
  },
});

export default AuthScreen;
