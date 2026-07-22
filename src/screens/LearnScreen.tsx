// src/screens/LearnScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';
import { CATEGORIES } from '../data/mockData';
import { getCardsByCategory } from '../services/questionService';
import { FlipCard } from '../components/FlipCard';
import { getUserProfile, addXP } from '../services/storageService';
import { UserProfile, Category, FlashCard } from '../types';

export const LearnScreen = ({ navigation }: any) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [cards, setCards] = useState<FlashCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Kategori değiştiğinde kartları servisten çek
  useEffect(() => {
    const fetchedCards = getCardsByCategory(selectedCategory);
    setCards(fetchedCards);
    setCurrentIndex(0);
  }, [selectedCategory]);

  const loadProfile = async () => {
    const profile = await getUserProfile();
    setUserProfile(profile);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleCategorySelect = (catId: Category | 'all') => {
    setSelectedCategory(catId);
  };

  const handleLearned = async () => {
    const updated = await addXP(10);
    setUserProfile(updated);
    nextCard();
  };

  const handleRepeat = () => {
    nextCard();
  };

  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0); // Başa dön
    }
  };

  const currentCard = cards[currentIndex];

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      {/* Üst Header: Level ve XP Bilgisi */}
      <View style={styles.header}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Seviye</Text>
          <Text style={styles.statValue}>⭐ {userProfile?.level || 1}</Text>
        </View>

        <View style={styles.progressBox}>
          <Text style={styles.cardCounter}>
            {cards.length > 0
              ? `Kart ${currentIndex + 1} / ${cards.length}`
              : 'Kart Yok'}
          </Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Toplam XP</Text>
          <Text style={styles.statValue}>🔥 {userProfile?.xp || 0}</Text>
        </View>
      </View>

      {/* Kategori Seçim Çipleri (Horizontal Scroll) */}
      <View style={styles.categoryBar}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.categoryChip, isSelected && styles.selectedCategoryChip]}
                onPress={() => handleCategorySelect(cat.id)}
              >
                <Text style={styles.categoryIcon}>{cat.icon}</Text>
                <Text
                  style={[
                    styles.categoryText,
                    isSelected && styles.selectedCategoryText,
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* 3D Flip Kart Alanı */}
      <View style={styles.cardArea}>
        {cards.length > 0 && currentCard ? (
          <FlipCard
            key={currentCard.id || currentIndex}
            card={currentCard}
            onLearned={handleLearned}
            onRepeat={handleRepeat}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Bu kategoride henüz kart bulunmuyor.</Text>
          </View>
        )}
      </View>

      {/* Alt Gezinme Butonu (Quiz Ayarlar Ekranına Yönlendirir) */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.quizNavButton}
          onPress={() => navigation.navigate('QuizSetup')}
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
    paddingTop: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  statBox: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: SPACING.sm + 4,
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
  categoryBar: {
    marginVertical: SPACING.xs,
  },
  categoryScroll: {
    paddingHorizontal: SPACING.md,
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  selectedCategoryChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  categoryText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  selectedCategoryText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  cardArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
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