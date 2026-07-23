// src/screens/QuizResultScreen.tsx
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';

export const QuizResultScreen = ({ route, navigation }: any) => {
  const { totalQuestions, correctCount, wrongCount, score, maxCombo } =
    route.params || {
      totalQuestions: 10,
      correctCount: 0,
      wrongCount: 0,
      score: 0,
      maxCombo: 1,
    };

  const successRate = Math.round((correctCount / totalQuestions) * 100) || 0;

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <View style={styles.content}>
        {/* Tebrik İkonu & Başlık */}
        <View style={styles.headerBox}>
          <Text style={styles.trophyEmoji}>
            {successRate >= 70 ? '🎉' : successRate >= 50 ? '👏' : '💪'}
          </Text>
          <Text style={styles.title}>
            {successRate >= 70
              ? 'Harika İş Çıkardın!'
              : successRate >= 50
              ? 'Tebrikler!'
              : 'Gelişmeye Devam!'}
          </Text>
          <Text style={styles.subtitle}>Testi Başarıyla Tamamladın</Text>
        </View>

        {/* Skor & İstatistik Kartları */}
        <View style={styles.statsCard}>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>Kazanılan Toplam XP</Text>
            <Text style={styles.scoreValue}>+ {score} XP</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.gridStats}>
            <View style={styles.statItem}>
              <Text style={styles.statEmoji}>✅</Text>
              <Text style={styles.statValue}>{correctCount}</Text>
              <Text style={styles.statLabel}>Doğru</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statEmoji}>❌</Text>
              <Text style={styles.statValue}>{wrongCount}</Text>
              <Text style={styles.statLabel}>Yanlış</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statEmoji}>🔥</Text>
              <Text style={styles.statValue}>{maxCombo}x</Text>
              <Text style={styles.statLabel}>Max Kombo</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statEmoji}>🎯</Text>
              <Text style={styles.statValue}>%{successRate}</Text>
              <Text style={styles.statLabel}>Başarı</Text>
            </View>
          </View>
        </View>

        {/* Aksiyon Butonları */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('QuizSetup')}
          >
            <Text style={styles.primaryButtonText}>🔄 Yeniden Yarış</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Learn')}
          >
            <Text style={styles.secondaryButtonText}>🎓 Öğrenmeye Dön</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
    justifyContent: 'space-between',
  },
  headerBox: {
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  trophyEmoji: {
    fontSize: 64,
    marginBottom: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: SPACING.lg,
    elevation: 3,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  scoreValue: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  gridStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statEmoji: {
    fontSize: FONT_SIZE.md,
    marginBottom: 4,
  },
  statValue: {
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontSize: FONT_SIZE.xs - 1,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  buttonGroup: {
    gap: 12,
    marginBottom: SPACING.md,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
  },
});