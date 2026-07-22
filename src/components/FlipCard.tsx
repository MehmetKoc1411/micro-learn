// src/components/FlipCard.tsx
import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';
import { FlashCard } from '../types';

interface FlipCardProps {
  card: FlashCard;
  onLearned?: () => void;
  onRepeat?: () => void;
}

export const FlipCard = ({ card, onLearned, onRepeat }: FlipCardProps) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [isFlipped, setIsFlipped] = useState(false);

  // Kartın dönme derecesini hesaplama
  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const flipCard = () => {
    if (isFlipped) {
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
      setIsFlipped(false);
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
      setIsFlipped(true);
    }
  };

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={1} onPress={flipCard} style={styles.cardContainer}>
        {/* Ön Yüz */}
        <Animated.View style={[styles.card, styles.cardFront, frontAnimatedStyle]}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{card.title}</Text>
          </View>
          <Text style={styles.frontText}>{card.frontText}</Text>
          <Text style={styles.hintText}>💡 Cevabı/Açıklamayı görmek için dokunun</Text>
        </Animated.View>

        {/* Arka Yüz */}
        <Animated.View
          style={[
            styles.card,
            styles.cardBack,
            backAnimatedStyle,
            { position: 'absolute', top: 0 },
          ]}
        >
          <Text style={styles.backTitle}>Çözüm / Detay</Text>
          <Text style={styles.backText}>{card.backText}</Text>

          {/* Öğrendim / Tekrar Et Butonları */}
          <View style={styles.actionRow}>
            {onRepeat && (
              <TouchableOpacity
                style={[styles.actionButton, styles.repeatButton]}
                onPress={onRepeat}
              >
                <Text style={styles.actionButtonText}>🔄 Tekrar Et</Text>
              </TouchableOpacity>
            )}
            {onLearned && (
              <TouchableOpacity
                style={[styles.actionButton, styles.learnedButton]}
                onPress={onLearned}
              >
                <Text style={styles.actionButtonText}>✓ Öğrendim (+10 XP)</Text>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.md,
  },
  cardContainer: {
    width: 320,
    height: 420,
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    padding: SPACING.lg,
    justifyContent: 'space-between',
    alignItems: 'center',
    backfaceVisibility: 'hidden', // Dönünce ters yüzünün görünmemesi için hayati kural
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  cardFront: {
    backgroundColor: COLORS.cardFront,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  cardBack: {
    backgroundColor: COLORS.cardBack,
  },
  badge: {
    backgroundColor: '#F0EDFF',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
  },
  badgeText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.xs,
  },
  frontText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: 28,
  },
  hintText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  backTitle: {
    fontSize: FONT_SIZE.sm,
    fontWeight: 'bold',
    color: COLORS.secondary,
    letterSpacing: 1,
  },
  backText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 24,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  repeatButton: {
    backgroundColor: COLORS.warning,
  },
  learnedButton: {
    backgroundColor: COLORS.success,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: FONT_SIZE.xs,
  },
});