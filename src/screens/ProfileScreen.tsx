// src/screens/ProfileScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';
import { getUserProfile } from '../services/storageService';
import { UserProfile } from '../types';

export const ProfileScreen = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const data = await getUserProfile();
      setProfile(data);
    };
    loadProfile();
  }, []);

  const nextLevelXP = (profile?.level || 1) * 100;
  const currentXPInLevel = (profile?.xp || 0) % 100;
  const progressPercent = (currentXPInLevel / 100) * 100;

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profil Başlığı */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarBox}>
            <Text style={styles.avatarEmoji}>🎓</Text>
          </View>
          <Text style={styles.userName}>Bilgi Avcısı</Text>
          <Text style={styles.userLevelText}>
            Seviye {profile?.level || 1} Öğrenci
          </Text>

          {/* Seviye İlerleme Barı */}
          <View style={styles.levelProgressContainer}>
            <View style={styles.levelProgressHeader}>
              <Text style={styles.levelProgressLabel}>Seviye İlerlemesi</Text>

              <Text style={styles.levelProgressValue}>
                {currentXPInLevel} / 100 XP
              </Text>
            </View>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${progressPercent}%` },
                ]}
              />
            </View>
          </View>
        </View>

        {/* İstatistik Izgarası */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🔥</Text>
            <Text style={styles.statNumber}>{profile?.xp || 0}</Text>
            <Text style={styles.statLabel}>Toplam XP</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🃏</Text>
            <Text style={styles.statNumber}>
              {profile?.completedCardsCount || 0}
            </Text>
            <Text style={styles.statLabel}>Tamamlanan Kart</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>⚡</Text>
            <Text style={styles.statNumber}>{profile?.streak || 1} Gün</Text>
            <Text style={styles.statLabel}>Öğrenme Serisi</Text>
          </View>
        </View>

        {/* Başarı Rozetleri */}
        <Text style={styles.sectionTitle}>🏆 Başarı Rozetleri</Text>
        <View style={styles.badgesContainer}>
          {profile?.badges.map((badge) => (
            <View key={badge.id} style={styles.badgeCard}>
              <Text style={styles.badgeIcon}>{badge.icon}</Text>
              <View style={styles.badgeInfo}>
                <Text style={styles.badgeTitle}>{badge.title}</Text>
                <Text style={styles.badgeDescription}>
                  {badge.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.md,
  },
  profileHeader: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: SPACING.lg,
    alignItems: 'center',
    marginBottom: SPACING.md,
    elevation: 2,
  },
  avatarBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0EDFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  avatarEmoji: {
    fontSize: 40,
  },
  userName: {
    fontSize: FONT_SIZE.lg,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  userLevelText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  levelProgressContainer: {
    width: '100%',
  },
  levelProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  levelProgressLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  levelProgressValue: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: '#E2E8F0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: SPACING.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: SPACING.md,
    alignItems: 'center',
    elevation: 1,
  },
  statEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  statNumber: {
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontSize: FONT_SIZE.xs - 2,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  badgesContainer: {
    gap: 10,
  },
  badgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: SPACING.md,
    elevation: 1,
  },
  badgeIcon: {
    fontSize: 32,
    marginRight: SPACING.md,
  },
  badgeInfo: {
    flex: 1,
  },
  badgeTitle: {
    fontSize: FONT_SIZE.sm,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  badgeDescription: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});