// src/screens/ProfileScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';
import { getUserProfile } from '../services/storageService';
import { UserProfile, Badge } from '../types';

export const ProfileScreen = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const loadProfileData = async () => {
      const data = await getUserProfile();
      setProfile(data);
    };
    loadProfileData();
  }, []);

  const currentXP = profile?.xp || 0;
  const currentLevel = profile?.level || 1;
  // Sonraki seviye için gereken XP (Her seviye 100 XP)
  const xpForNextLevel = currentLevel * 100;
  const progressPercent = Math.min((currentXP % 100) / 100, 1) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Kullanıcı Kartı ve Seviye Durumu */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarEmoji}>🎓</Text>
          </View>
          <Text style={styles.userName}>Bilgi Avcısı</Text>
          <Text style={styles.userLevel}>Seviye {currentLevel} Öğrenci</Text>

          {/* XP İlerleme Çubuğu */}
          <View style={styles.progressContainer}>
            <View style={styles.progressTextRow}>
              <Text style={styles.progressLabel}>Seviye İlerlemesi</Text>
              <Text style={styles.progressValue}>
                {currentXP % 100} / 100 XP
              </Text>
            </View>
            <View style={styles.progressBarBackground}>
              <View
                style={[styles.progressBarFill, { width: `${progressPercent}%` }]}
              />
            </View>
          </View>
        </View>

        {/* İstatistik Özet Kartları */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🔥</Text>
            <Text style={styles.statNumber}>{currentXP}</Text>
            <Text style={styles.statTitle}>Toplam XP</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🃏</Text>
            <Text style={styles.statNumber}>{profile?.completedCardsCount || 0}</Text>
            <Text style={styles.statTitle}>Tamamlanan Kart</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>⚡</Text>
            <Text style={styles.statNumber}>{profile?.streak || 1} Gün</Text>
            <Text style={styles.statTitle}>Öğrenme Serisi</Text>
          </View>
        </View>

        {/* Kazanılan Rozetler Bölümü */}
        <Text style={styles.sectionTitle}>🏆 Başarı Rozetleri</Text>
        <View style={styles.badgesContainer}>
          {profile?.badges.map((badge: Badge) => (
            <View key={badge.id} style={styles.badgeCard}>
              <Text style={styles.badgeIcon}>{badge.icon}</Text>
              <View style={styles.badgeInfo}>
                <Text style={styles.badgeTitle}>{badge.title}</Text>
                <Text style={styles.badgeDescription}>{badge.description}</Text>
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
  avatarCircle: {
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
  userLevel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  progressContainer: {
    width: '100%',
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  progressLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  progressValue: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: '#EDF2F7',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: SPACING.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: SPACING.md,
    alignItems: 'center',
    elevation: 2,
  },
  statEmoji: {
    fontSize: FONT_SIZE.lg,
    marginBottom: 4,
  },
  statNumber: {
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  statTitle: {
    fontSize: FONT_SIZE.xs - 1,
    color: COLORS.textSecondary,
    marginTop: 2,
    textAlign: 'center',
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
    borderRadius: 12,
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