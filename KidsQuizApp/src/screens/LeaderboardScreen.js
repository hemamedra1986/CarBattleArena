import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import GameService from '../services/GameService';
import { useGame } from '../context/GameContext';
import COLORS from '../constants/colors';
import STRINGS from '../constants/strings';
import { getMedalColor } from '../utils/gameUtils';

const MEDAL_EMOJIS = { 1: '🥇', 2: '🥈', 3: '🥉' };

const LeaderboardScreen = () => {
  const { user } = useGame();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLeaderboard = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    try {
      const data = await GameService.getLeaderboard(10);
      setEntries(data);
    } catch { /* ignore */ }
    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const renderItem = ({ item, index }) => {
    const rank = index + 1;
    const isCurrentUser = item.uid === user?.uid;
    const medalColor = getMedalColor(rank);
    const medalEmoji = MEDAL_EMOJIS[rank] || `#${rank}`;

    return (
      <Animatable.View
        animation="fadeInRight"
        delay={index * 80}
        duration={400}
        useNativeDriver
      >
        <View
          style={[
            styles.row,
            isCurrentUser && styles.rowHighlighted,
            rank <= 3 && { borderLeftColor: medalColor, borderLeftWidth: 4 },
          ]}
        >
          {/* Rank */}
          <Text style={[styles.rankText, { color: rank <= 3 ? medalColor : COLORS.darkGray }]}>
            {typeof medalEmoji === 'string' && medalEmoji.startsWith('#')
              ? medalEmoji
              : medalEmoji}
          </Text>

          {/* Avatar placeholder */}
          <View style={[styles.avatar, { backgroundColor: medalColor + '33' }]}>
            <Text style={styles.avatarText}>
              {(item.displayName || '؟')[0].toUpperCase()}
            </Text>
          </View>

          {/* Name + you label */}
          <View style={styles.nameCol}>
            <Text style={styles.playerName} numberOfLines={1}>
              {item.displayName || 'لاعب'}
            </Text>
            {isCurrentUser && (
              <Text style={styles.youLabel}>{STRINGS.YOU} 👈</Text>
            )}
          </View>

          {/* Stats */}
          <View style={styles.statsCol}>
            <Text style={styles.pointsText}>{item.totalPoints ?? 0} 💰</Text>
            <Text style={styles.starsText}>{item.totalStars ?? 0} ⭐</Text>
          </View>
        </View>
      </Animatable.View>
    );
  };

  const ListHeader = () => (
    <LinearGradient
      colors={COLORS.gradientPurple}
      style={styles.header}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <Text style={styles.headerTitle}>🏆 {STRINGS.LEADERBOARD}</Text>
      <Text style={styles.headerSub}>أفضل ١٠ لاعبين</Text>
    </LinearGradient>
  );

  const ListEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyEmoji}>🎮</Text>
      <Text style={styles.emptyText}>{STRINGS.NO_DATA}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <>
          <ListHeader />
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        </>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(item) => item.uid}
          renderItem={renderItem}
          ListHeaderComponent={ListHeader}
          ListEmptyComponent={ListEmpty}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => fetchLeaderboard(true)}
              colors={[COLORS.primary]}
              tintColor={COLORS.primary}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Refresh FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => fetchLeaderboard(true)}
        activeOpacity={0.85}
      >
        <LinearGradient colors={COLORS.gradientPurple} style={styles.fabGradient}>
          <Text style={styles.fabIcon}>🔄</Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    paddingTop: 56,
    paddingBottom: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.white,
    writingDirection: 'rtl',
  },
  headerSub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 6,
    writingDirection: 'rtl',
  },
  listContent: { paddingHorizontal: 16, paddingBottom: 80 },
  row: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 14,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  rowHighlighted: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: '#EDE9FE',
  },
  rankText: {
    fontSize: 22,
    fontWeight: '900',
    width: 40,
    textAlign: 'center',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primaryDark,
  },
  nameCol: { flex: 1 },
  playerName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.black,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  youLabel: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: '700',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  statsCol: { alignItems: 'flex-end', minWidth: 70 },
  pointsText: { fontSize: 13, fontWeight: '700', color: COLORS.accent },
  starsText: { fontSize: 12, color: COLORS.darkGray, marginTop: 2 },
  loadingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyContainer: { alignItems: 'center', padding: 48 },
  emptyEmoji: { fontSize: 56, marginBottom: 12 },
  emptyText: {
    fontSize: 16,
    color: COLORS.gray,
    writingDirection: 'rtl',
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 28,
    left: 24,
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  fabGradient: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabIcon: { fontSize: 22 },
});

export default LeaderboardScreen;
