// src/screens/QuizSetupScreen.tsx
import React, { useState } from 'react';
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
import { Category } from '../types';

const QUESTION_LIMITS = [5, 10, 15, 20];

export const QuizSetupScreen = ({ navigation }: any) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedLimit, setSelectedLimit] = useState<number>(10);

  const handleStartQuiz = () => {
    navigation.navigate('Quiz', {
      category: selectedCategory,
      limit: selectedLimit,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Başlık */}
        <View style={styles.titleBox}>
          <Text style={styles.title}>⚙️ Yarışma Ayarları</Text>
          <Text style={styles.subtitle}>
            Yarışmak istediğin kategoriyi ve soru sayısını belirle!
          </Text>
        </View>

        {/* Kategori Seçimi */}
        <Text style={styles.sectionTitle}>1. Kategori Seç</Text>
        <View style={styles.categoryGrid}>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryCard,
                  isSelected && styles.selectedCategoryCard,
                ]}
                onPress={() => setSelectedCategory(cat.id)}
              >
                <Text style={styles.categoryIcon}>{cat.icon}</Text>
                <Text
                  style={[
                    styles.categoryName,
                    isSelected && styles.selectedCategoryName,
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Soru Sayısı Seçimi */}
        <Text style={styles.sectionTitle}>2. Soru Sayısı Seç</Text>
        <View style={styles.limitRow}>
          {QUESTION_LIMITS.map((limit) => {
            const isSelected = selectedLimit === limit;
            return (
              <TouchableOpacity
                key={limit}
                style={[styles.limitChip, isSelected && styles.selectedLimitChip]}
                onPress={() => setSelectedLimit(limit)}
              >
                <Text
                  style={[
                    styles.limitText,
                    isSelected && styles.selectedLimitText,
                  ]}
                >
                  {limit} Soru
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Başlat Butonu */}
        <TouchableOpacity style={styles.startButton} onPress={handleStartQuiz}>
          <Text style={styles.startButtonText}>🚀 Yarışmayı Başlat</Text>
        </TouchableOpacity>
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
  titleBox: {
    marginBottom: SPACING.lg,
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
  sectionTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: SPACING.lg,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 1,
  },
  selectedCategoryCard: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  categoryName: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  selectedCategoryName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  limitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: SPACING.xl,
  },
  limitChip: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  selectedLimitChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  limitText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  selectedLimitText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 3,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
  },
});