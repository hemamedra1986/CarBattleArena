import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Switch,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useGame } from '../context/GameContext';
import AuthService from '../services/AuthService';
import SoundService from '../services/SoundService';
import COLORS from '../constants/colors';
import STRINGS from '../constants/strings';

const DIFFICULTIES = [
  { key: 'all', label: STRINGS.ALL_DIFFICULTIES },
  { key: 'easy', label: STRINGS.EASY },
  { key: 'medium', label: STRINGS.MEDIUM },
  { key: 'hard', label: STRINGS.HARD },
];

const LANGUAGES = [
  { key: 'ar', label: STRINGS.ARABIC },
  { key: 'en', label: STRINGS.ENGLISH },
];

const SectionHeader = ({ title }) => (
  <Text style={styles.sectionHeader}>{title}</Text>
);

const SettingRow = ({ icon, label, children }) => (
  <View style={styles.settingRow}>
    <View style={styles.settingLeft}>
      <Text style={styles.settingIcon}>{icon}</Text>
      <Text style={styles.settingLabel}>{label}</Text>
    </View>
    {children}
  </View>
);

const SettingsScreen = ({ navigation }) => {
  const { user, settings, updateSettings, progress } = useGame();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleToggleSound = async (value) => {
    await updateSettings({ soundEnabled: value });
    if (!value) await SoundService.toggleSoundEffects();
    else if (!SoundService.isSoundEnabled()) await SoundService.toggleSoundEffects();
  };

  const handleToggleMusic = async (value) => {
    await updateSettings({ musicEnabled: value });
    if (value) {
      SoundService.playBackgroundMusic();
    } else {
      SoundService.stopBackgroundMusic();
    }
  };

  const handleLogout = () => {
    Alert.alert(STRINGS.LOGOUT, 'هل تريد تسجيل الخروج؟', [
      { text: STRINGS.CANCEL, style: 'cancel' },
      {
        text: STRINGS.LOGOUT,
        style: 'destructive',
        onPress: async () => {
          setLoggingOut(true);
          try {
            SoundService.stopBackgroundMusic();
            await AuthService.logout();
            // Auth listener in GameContext / AppNavigator will handle redirect
          } catch (e) {
            Alert.alert('خطأ', STRINGS.ERROR_GENERIC);
          } finally {
            setLoggingOut(false);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <LinearGradient colors={COLORS.gradientPurple} style={styles.header}>
        <Text style={styles.headerTitle}>⚙️ {STRINGS.SETTINGS}</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Account info */}
        <SectionHeader title={`👤 ${STRINGS.ACCOUNT_INFO}`} />
        <Animatable.View animation="fadeInUp" delay={100} useNativeDriver style={styles.card}>
          <View style={styles.accountRow}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>
                {(user?.displayName || 'ل')[0].toUpperCase()}
              </Text>
            </View>
            <View style={styles.accountInfo}>
              <Text style={styles.accountName}>{user?.displayName || 'لاعب'}</Text>
              <Text style={styles.accountEmail}>{user?.email}</Text>
              <Text style={styles.accountStats}>
                ⭐ {progress.totalStars ?? 0}  ·  💰 {progress.totalPoints ?? 0}  ·  🎯 المرحلة {progress.highestStage ?? 1}
              </Text>
            </View>
          </View>
        </Animatable.View>

        {/* Sound settings */}
        <SectionHeader title={`🔊 الصوت`} />
        <Animatable.View animation="fadeInUp" delay={200} useNativeDriver style={styles.card}>
          <SettingRow icon="🎵" label={STRINGS.SOUND_EFFECTS}>
            <Switch
              value={settings.soundEnabled}
              onValueChange={handleToggleSound}
              trackColor={{ false: COLORS.lightGray, true: COLORS.primaryLight }}
              thumbColor={settings.soundEnabled ? COLORS.primary : COLORS.gray}
            />
          </SettingRow>
          <View style={styles.divider} />
          <SettingRow icon="🎶" label={STRINGS.BACKGROUND_MUSIC}>
            <Switch
              value={settings.musicEnabled}
              onValueChange={handleToggleMusic}
              trackColor={{ false: COLORS.lightGray, true: COLORS.primaryLight }}
              thumbColor={settings.musicEnabled ? COLORS.primary : COLORS.gray}
            />
          </SettingRow>
        </Animatable.View>

        {/* Language */}
        <SectionHeader title={`🌐 ${STRINGS.LANGUAGE}`} />
        <Animatable.View animation="fadeInUp" delay={300} useNativeDriver style={styles.card}>
          <View style={styles.optionsRow}>
            {LANGUAGES.map(({ key, label }) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.optionBtn,
                  settings.language === key && styles.optionBtnActive,
                ]}
                onPress={() => updateSettings({ language: key })}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.optionBtnText,
                    settings.language === key && styles.optionBtnTextActive,
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animatable.View>

        {/* Difficulty */}
        <SectionHeader title={`⚡ ${STRINGS.DIFFICULTY}`} />
        <Animatable.View animation="fadeInUp" delay={400} useNativeDriver style={styles.card}>
          <View style={styles.optionsRow}>
            {DIFFICULTIES.map(({ key, label }) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.optionBtn,
                  settings.difficulty === key && styles.optionBtnActive,
                ]}
                onPress={() => updateSettings({ difficulty: key })}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.optionBtnText,
                    settings.difficulty === key && styles.optionBtnTextActive,
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animatable.View>

        {/* App info */}
        <Animatable.View animation="fadeIn" delay={500} useNativeDriver style={styles.appInfoRow}>
          <Text style={styles.appInfoText}>
            {STRINGS.APP_NAME}  •  {STRINGS.APP_VERSION}: 1.0.0
          </Text>
        </Animatable.View>

        {/* Logout button */}
        <Animatable.View animation="fadeInUp" delay={600} useNativeDriver>
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={handleLogout}
            activeOpacity={0.85}
            disabled={loggingOut}
          >
            <Text style={styles.logoutText}>
              {loggingOut ? 'جارٍ الخروج...' : `🚪 ${STRINGS.LOGOUT}`}
            </Text>
          </TouchableOpacity>
        </Animatable.View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    paddingTop: 52,
    paddingBottom: 22,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.white,
    writingDirection: 'rtl',
  },
  scroll: { padding: 16, paddingBottom: 40 },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.gray,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginTop: 18,
    marginBottom: 8,
    marginRight: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  accountRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingVertical: 14,
  },
  avatarCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 14,
  },
  avatarText: { fontSize: 22, fontWeight: '900', color: COLORS.white },
  accountInfo: { flex: 1, alignItems: 'flex-end' },
  accountName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.black,
    writingDirection: 'rtl',
  },
  accountEmail: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
  accountStats: {
    fontSize: 12,
    color: COLORS.primary,
    marginTop: 4,
    fontWeight: '600',
    writingDirection: 'rtl',
  },
  settingRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  settingLeft: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: { fontSize: 20, marginLeft: 10 },
  settingLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.black,
    writingDirection: 'rtl',
  },
  divider: { height: 1, backgroundColor: COLORS.lightGray },
  optionsRow: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    paddingVertical: 12,
    gap: 8,
  },
  optionBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.lightGray,
    backgroundColor: COLORS.offWhite,
  },
  optionBtnActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  optionBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.darkGray,
    writingDirection: 'rtl',
  },
  optionBtnTextActive: { color: COLORS.white },
  appInfoRow: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 8,
  },
  appInfoText: {
    fontSize: 12,
    color: COLORS.gray,
    writingDirection: 'rtl',
  },
  logoutBtn: {
    backgroundColor: '#FEE2E2',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.error,
    marginTop: 4,
  },
  logoutText: {
    color: COLORS.error,
    fontWeight: '800',
    fontSize: 16,
    writingDirection: 'rtl',
  },
});

export default SettingsScreen;
