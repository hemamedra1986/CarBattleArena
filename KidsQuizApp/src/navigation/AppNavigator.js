import React from 'react';
import { Text, ActivityIndicator, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useGame } from '../context/GameContext';

// Screens
import SplashScreen from '../screens/SplashScreen';
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import ResultsScreen from '../screens/ResultsScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import SettingsScreen from '../screens/SettingsScreen';

import COLORS from '../constants/colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

// ── Home stack (Home → Game → Results) ────────────────────────────────────
const HomeStackNavigator = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="HomeMain" component={HomeScreen} />
    <HomeStack.Screen
      name="Game"
      component={GameScreen}
      options={{ gestureEnabled: false }}
    />
    <HomeStack.Screen
      name="Results"
      component={ResultsScreen}
      options={{ gestureEnabled: false }}
    />
  </HomeStack.Navigator>
);

// ── Tab bar icon helper ────────────────────────────────────────────────────
const TabIcon = ({ emoji, label, focused }) => (
  <View style={tabStyles.iconWrapper}>
    <Text style={[tabStyles.emoji, focused && tabStyles.emojiActive]}>{emoji}</Text>
    <Text style={[tabStyles.label, focused && tabStyles.labelActive]}>{label}</Text>
  </View>
);

// ── Main bottom-tab navigator ──────────────────────────────────────────────
const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: tabStyles.tabBar,
      tabBarShowLabel: false,
    }}
  >
    <Tab.Screen
      name="HomeTab"
      component={HomeStackNavigator}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon emoji="🏠" label="الرئيسية" focused={focused} />
        ),
      }}
    />
    <Tab.Screen
      name="Leaderboard"
      component={LeaderboardScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon emoji="🏆" label="المتصدرون" focused={focused} />
        ),
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon emoji="⚙️" label="الإعدادات" focused={focused} />
        ),
      }}
    />
  </Tab.Navigator>
);

// ── Root navigator ──────────────────────────────────────────────────────────
const AppNavigator = () => {
  const { user, loading } = useGame();

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          // Auth flow
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Auth" component={AuthScreen} />
          </>
        ) : (
          // App flow
          <Stack.Screen name="Main" component={MainTabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.background },
});

const tabStyles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.tabBackground,
    borderTopWidth: 0,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    height: 64,
    paddingBottom: 8,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4,
  },
  emoji: {
    fontSize: 24,
    opacity: 0.5,
  },
  emojiActive: {
    opacity: 1,
    transform: [{ scale: 1.15 }],
  },
  label: {
    fontSize: 9,
    color: COLORS.tabInactive,
    marginTop: 2,
    writingDirection: 'rtl',
    fontWeight: '600',
  },
  labelActive: {
    color: COLORS.tabActive,
    fontWeight: '800',
  },
});

export default AppNavigator;
