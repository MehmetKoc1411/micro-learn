// src/screens/QuizScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';
import { getQuestionsByCategory } from '../services/questionService';
import { addXP } from '../services/storageService';
import { Question, QuizOption, Category } from '../types';

const QUESTION_TIME_LIMIT = 10;

export const QuizScreen = ({ route, navigation }: any) => {
  const category: Category | 'all' = route.params?.category || 'all';
  const limit: number = route.params?.limit || 10;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);
  const [combo, setCombo] = useState(1);
  const [maxCombo, setMaxCombo] = useState(1);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    const fetchedQuestions = getQuestionsByCategory(category, limit);
    setQuestions(fetchedQuestions);
  }, [category, limit]);

  useEffect(() => {
    if (isAnswered || questions.length === 0) return;

    if (timeLeft === 0) {
      handleTimeOut();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered, questions]);

  const handleTimeOut = () => {
    setIsAnswered(true);
    setWrongCount((prev) => prev + 1);
    setCombo(1);
  };

  const handleOptionSelect = async (option: QuizOption) => {
    if (isAnswered) return;

    setSelectedOptionId(option.id);
    setIsAnswered(true);

    if (option.isCorrect) {
      const earnedXP = 20 * combo;
      setScore((prev) => prev + earnedXP);
      setCorrectCount((prev) => prev + 1);
      setCombo((prev) => {
        const nextCombo = prev + 1;
        if (nextCombo > maxCombo) setMaxCombo(nextCombo);
        return nextCombo;
      });
      await addXP(earnedXP);
    } else {
      setWrongCount((prev) => prev + 1);
      setCombo(1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
      setTimeLeft(QUESTION_TIME_LIMIT);
    } else {
      navigation.navigate('QuizResult', {
        totalQuestions: questions.length,
        correctCount,
        wrongCount,
        score,
        maxCombo,
      });
    }
  };

  if (questions.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Bu kriterlere uygun soru bulunamadı.</Text>
          <TouchableOpacity
            style={[styles.nextButton, { marginTop: 16 }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.nextButtonText}>Ayarlara Dön</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      {/* Üst Bilgi Barı */}
      <View style={styles.header}>
        <View style={styles.timerBadge}>
          <Text style={styles.timerText}>⏰ {timeLeft}s</Text>
        </View>

        {combo > 1 && (
          <View style={styles.comboBadge}>
            <Text style={styles.comboText}>🔥 {combo}x COMBO!</Text>
          </View>
        )}

        <View style={styles.scoreBadge}>
          <Text style={styles.scoreText}>🏆 {score} XP</Text>
        </View>
      </View>

      {/* Soru Kartı */}
      <View style={styles.questionCard}>
        <Text style={styles.questionCounter}>
          Soru {currentQuestionIndex + 1} / {questions.length}
        </Text>
        <Text style={styles.questionText}>{currentQuestion.questionText}</Text>
      </View>

      {/* Şıklar */}
      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option) => (
          <TouchableOpacity
            key={option.id}
            disabled={isAnswered}
            style={[
              styles.optionButton,
              isAnswered && option.isCorrect && styles.correctOption,
              isAnswered &&
                option.id === selectedOptionId &&
                !option.isCorrect &&
                styles.wrongOption,
            ]}
            onPress={() => handleOptionSelect(option)}
          >
            <Text
              style={[
                styles.optionText,
                isAnswered &&
                  (option.isCorrect || option.id === selectedOptionId) &&
                  styles.whiteText,
              ]}
            >
              {option.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Cevap Açıklaması ve Sonraki Soru Butonu */}
      {isAnswered && (
        <View style={styles.explanationBox}>
          <Text style={styles.explanationTitle}>💡 Bilgi Notu:</Text>
          <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>

          <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
            <Text style={styles.nextButtonText}>
              {currentQuestionIndex < questions.length - 1
                ? 'Sonraki Soru ➔'
                : 'Sonuçları Gör 🎉'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  timerBadge: {
    backgroundColor: '#FFEAA7',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
  },
  timerText: {
    fontWeight: 'bold',
    color: '#D63031',
  },
  comboBadge: {
    backgroundColor: '#FF7675',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
  },
  comboText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  scoreBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
  },
  scoreText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    elevation: 3,
  },
  questionCounter: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  questionText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    lineHeight: 26,
  },
  optionsContainer: {
    gap: 10,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    borderRadius: 12,
  },
  correctOption: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  wrongOption: {
    backgroundColor: COLORS.danger,
    borderColor: COLORS.danger,
  },
  optionText: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  whiteText: {
    color: '#FFFFFF',
  },
  explanationBox: {
    backgroundColor: '#F0EDFF',
    borderRadius: 12,
    padding: SPACING.md,
    marginTop: SPACING.md,
  },
  explanationTitle: {
    fontSize: FONT_SIZE.xs,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  explanationText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textPrimary,
    marginVertical: SPACING.xs,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
  },
});