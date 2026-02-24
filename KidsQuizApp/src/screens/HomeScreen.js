import React, { useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useGame } from '../context/GameContext';
import StageCard from '../components/StageCard';
import ProgressBar from '../components/ProgressBar';
import GAME_CONFIG from '../config/gameConfig';
import COLORS from '../constants/colors';
import STRINGS from '../constants/strings';
import { getOverallProgress } from '../utils/gameUtils';

const { width } = Dimensions.get('window');
const TOTAL = GAME_CONFIG.TOTAL_STAGES;

// Determine difficulty label per stage for the card badge
const getStageDifficulty = (stage) => {
  if (stage <= 10) return 'easy';
  if (stage <= 30) return 'medium';
  return 'hard';
};

const HomeScreen = ({ navigation }) => {
  const { user, progress, isStageUnlocked, getStageResult } = useGame();

  const overallProgress = useMemo(
    () => getOverallProgress(progress.stageResults),
    [progress.stageResults],
  );

  const stages = useMemo(
    () => Array.from({ length: TOTAL }, (_, i) => i + 1),
    [],
  );

  const renderItem = ({ item: stage }) => {
    const result = getStageResult(stage);
    return (
      <StageCard
        stage={stage}
        isUnlocked={isStageUnlocked(stage)}
        stars={result?.stars ?? 0}
        difficulty={getStageDifficulty(stage)}
        onPress={(s) => {
          navigation.navigate('Game', { stage: s });
        }}
      />
    );
  };

  const ListHeader = () => (
    <View>
      {/* Top banner */}
      <LinearGradient
        colors={COLORS.gradientPurple}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.banner}
      >
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <Animatable.View animation="fadeInDown" useNativeDriver>
          <Text style={styles.greeting}>
            {STRINGS.HELLO}، {user?.displayName || 'لاعب'} 👋
          </Text>
          <Text style={styles.bannerSub}>
            {STRINGS.CHOOSE_STAGE}
          </Text>
        </Animatable.View>

        {/* Stats row */}
        <Animatable.View animation="fadeInUp" delay={200} useNativeDriver style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{progress.totalPoints ?? 0}</Text>
            <Text style={styles.statLabel}>نقطة</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{progress.totalStars ?? 0}</Text>
            <Text style={styles.statLabel}>نجمة ⭐</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{progress.highestStage ?? 1}</Text>
            <Text style={styles.statLabel}>مرحلة</Text>
          </View>
        </Animatable.View>
      </LinearGradient>

      {/* Overall progress */}
      <View style={styles.progressSection}>
        <Text style={styles.progressTitle}>
          {STRINGS.OVERALL_PROGRESS} – {overallProgress}%
        </Text>
        <ProgressBar
          progress={overallProgress / 100}
          color={COLORS.primary}
          height={10}
        />
      </View>

      <Text style={styles.sectionTitle}>🎮 {STRINGS.STAGES}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={stages}
        keyExtractor={(item) => String(item)}
        renderItem={renderItem}
        numColumns={2}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        initialNumToRender={12}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  banner: {
    paddingTop: 56,
    paddingBottom: 28,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.white,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  bannerSub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'right',
    marginTop: 4,
    writingDirection: 'rtl',
  },
  statsRow: {
    flexDirection: 'row-reverse',
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 12,
    justifyContent: 'space-around',
  },
  statBox: { alignItems: 'center' },
  statValue: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.white,
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
    writingDirection: 'rtl',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  progressSection: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 4,
  },
  progressTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.darkGray,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.primaryDark,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  listContent: {
    paddingBottom: 32,
  },
  row: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 8,
  },
});

export default HomeScreen;
