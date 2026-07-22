// src/screens/LearnScreen.tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';
import { MOCK_CARDS } from '../data/mockData';
import { FlipCard } from '../components/FlipCard';
import { getUserProfile, addXP } from '../services/storageService';
import { UserProfile } from '../types';

export const LearnScreen = ({ navigation }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const loadProfile = async () => {
    const profile = await getUserProfile();
    setUserProfile(profile);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleLearned = async () => {
    const updated = await addXP(10);
    setUserProfile(updated);
    nextCard();
  };

  const handleRepeat = () => {
    nextCard();
  };

  const nextCard = () => {
    if (currentIndex < MOCK_CARDS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Tüm kartlar bittiğinde ilk karta dön veya tamamlama göster
      setCurrentIndex(0);
    }
  };

  const currentCard = MOCK_CARDS[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      {/* Üst Header: Level ve XP Bilgisi */}
      <View style={styles.header}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Seviye</Text>
          <Text style={styles.statValue}>⭐ {userProfile?.level || 1}</Text>
        </View>

        <View style={styles.progressBox}>
          <Text style={styles.cardCounter}>
            Kart {currentIndex + 1} / {MOCK_CARDS.length}
          </Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Toplam XP</Text>
          <Text style={styles.statValue}>🔥 {userProfile?.xp || 0}</Text>
        </View>
      </View>

      {/* 3D Flip Kart Alanı */}
      <View style={styles.cardArea}>
        <FlipCard
          key={currentCard.id}
          card={currentCard}
          onLearned={handleLearned}
          onRepeat={handleRepeat}
        />
      </View>

      {/* Alt Gezinme Butonları */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.quizNavButton}
          onPress={() => navigation.navigate('Quiz')}
        >
          <Text style={styles.quizNavText}>⚡ Bilgi Yarışmasına Geç</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  statBox: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  statValue: {
    fontSize: FONT_SIZE.md,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  progressBox: {
    alignItems: 'center',
  },
  cardCounter: {
    fontSize: FONT_SIZE.sm,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
  },
  cardArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    padding: SPACING.md,
    alignItems: 'center',
  },
  quizNavButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  quizNavText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: FONT_SIZE.md,
  },
});