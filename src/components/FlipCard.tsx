// src/components/FlipCard.tsx
import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import * as Speech from 'expo-speech';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';
import { FlashCard } from '../types';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - SPACING.md * 2;
const CARD_HEIGHT = 380;

interface FlipCardProps {
  card: FlashCard;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onLearned: () => void;
  onRepeat: () => void;
}

export const FlipCard: React.FC<FlipCardProps> = ({
  card,
  isFavorite = false,
  onToggleFavorite,
  onLearned,
  onRepeat,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setIsFlipped(false);
    animatedValue.setValue(0);
    Speech.stop();
  }, [card]);

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

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite();
    }
  };

  const handleSpeakPress = (e: any) => {
    e.stopPropagation();
    Speech.stop();

    const textToSpeak = isFlipped ? card?.backText : card?.frontText;
    if (!textToSpeak) return;

    // Metinde Türkçe karakter veya Türkçe soru ekleri var mı kontrol et
    const hasTurkishChar = /[çğışöüÇĞİŞÖÜ]/i.test(textToSpeak);
    const hasTurkishWords = /(nedir|demektir|hangisidir|karşılığı|anlamı|örneğin|fırsat)/i.test(textToSpeak);

    // Eğer Türkçe kelimeler içeriyorsa Türkçe okut, tamamen İngilizce ise en-US okut
    const language = (hasTurkishChar || hasTurkishWords) ? 'tr-TR' : 'en-US';

    Speech.speak(textToSpeak, {
      language,
      pitch: 1.0,
      rate: 0.9,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.9} onPress={flipCard}>
        {/* ÖN YÜZ */}
        <Animated.View
          pointerEvents={isFlipped ? 'none' : 'auto'}
          style={[styles.card, styles.cardFront, frontAnimatedStyle]}
        >
          <View style={styles.cardHeaderRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText} numberOfLines={1} ellipsizeMode="tail">
                {card?.title || 'Başlık'}
              </Text>
            </View>

            <View style={styles.headerRightButtons}>
              <TouchableOpacity
                onPress={handleSpeakPress}
                style={styles.iconButton}
                activeOpacity={0.6}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
              >
                <Text style={styles.iconText}>🔊</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleFavoritePress}
                style={styles.iconButton}
                activeOpacity={0.6}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
              >
                <Text style={styles.iconText}>{isFavorite ? '⭐' : '☆'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.frontText}>{card?.frontText || ''}</Text>
          <Text style={styles.hintText}>💡 Cevabı görmek için karta dokun</Text>
        </Animated.View>

        {/* ARKA YÜZ */}
        <Animated.View
          pointerEvents={isFlipped ? 'auto' : 'none'}
          style={[
            styles.card,
            styles.cardBack,
            backAnimatedStyle,
            { position: 'absolute', top: 0 },
          ]}
        >
          <View style={styles.cardHeaderRow}>
            <Text style={styles.backTitle}>Çözüm / Detay</Text>

            <View style={styles.headerRightButtons}>
              <TouchableOpacity
                onPress={handleSpeakPress}
                style={styles.iconButton}
                activeOpacity={0.6}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
              >
                <Text style={styles.iconText}>🔊</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleFavoritePress}
                style={styles.iconButton}
                activeOpacity={0.6}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
              >
                <Text style={styles.iconText}>{isFavorite ? '⭐' : '☆'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.backText}>{card?.backText || ''}</Text>

          {/* Öğrenme Aksiyon Butonları */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.actionButton, styles.repeatButton]}
              onPress={onRepeat}
            >
              <Text style={styles.actionText}>🔁 Tekrar Et</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.learnedButton]}
              onPress={onLearned}
            >
              <Text style={styles.actionText}>✅ Öğrendim (+10 XP)</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: SPACING.lg,
    justifyContent: 'space-between',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.primary,
    elevation: 4,
  },
  cardFront: {
    backgroundColor: '#FFFFFF',
  },
  cardBack: {
    backgroundColor: '#F8F9FA',
  },
  cardHeaderRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    flex: 1,
    marginRight: SPACING.xs,
    backgroundColor: '#F0EDFF',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
  },
  badgeText: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.xs,
    fontWeight: 'bold',
  },
  headerRightButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  iconButton: {
    padding: 4,
    zIndex: 999,
    elevation: 5,
  },
  iconText: {
    fontSize: 20,
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
    fontSize: FONT_SIZE.xs,
    fontWeight: 'bold',
    color: COLORS.primary,
    textTransform: 'uppercase',
  },
  backText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
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
    borderRadius: 12,
    alignItems: 'center',
  },
  repeatButton: {
    backgroundColor: '#FFEAA7',
  },
  learnedButton: {
    backgroundColor: COLORS.success,
  },
  actionText: {
    fontWeight: 'bold',
    fontSize: FONT_SIZE.xs,
    color: COLORS.textPrimary,
  },
});