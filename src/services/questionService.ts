// src/services/questionService.ts
import { LearningItem, FlashCard, Question, Category } from '../types';

import progData from '../data/questions/programming.json';
import genData from '../data/questions/general_knowledge.json';
import sciData from '../data/questions/science.json';
import artData from '../data/questions/art.json';

// Diziyi Rastgele Karıştırma Fonksiyonu (Fisher-Yates Shuffle)
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Ham veriyi kategoriye göre getiren iç yardımcı (Double-casting ile güvenli tip aktarımı)
const getRawDataByCategory = (category: Category | 'all'): LearningItem[] => {
  const progItems = (progData as unknown) as LearningItem[];
  const genItems = (genData as unknown) as LearningItem[];
  const sciItems = (sciData as unknown) as LearningItem[];
  const artItems = (artData as unknown) as LearningItem[];

  switch (category) {
    case 'programming':
      return progItems;
    case 'general_knowledge':
      return genItems;
    case 'science':
      return sciItems;
    case 'art':
      return artItems;
    case 'all':
    default:
      return [...progItems, ...genItems, ...sciItems, ...artItems];
  }
};

/**
 * Seçilen kategoriye ait Flashcard'ları getirir ve karıştırır.
 */
export const getCardsByCategory = (category: Category | 'all'): FlashCard[] => {
  const rawItems = getRawDataByCategory(category);
  const cards: FlashCard[] = rawItems.map((item) => ({
    id: item.id,
    categoryId: item.categoryId,
    title: item.card.title,
    frontText: item.card.frontText,
    backText: item.card.backText,
  }));

  return shuffleArray(cards);
};

/**
 * Seçilen kategoriye ait Soruları karıştırarak getirir ve istenen limitte keser.
 * @param category Seçilen kategori
 * @param limit Getirilecek maksimum soru sayısı (Varsayılan: 10)
 */
export const getQuestionsByCategory = (
  category: Category | 'all',
  limit: number = 10
): Question[] => {
  const rawItems = getRawDataByCategory(category);
  const questions: Question[] = rawItems.map((item) => ({
    id: item.id,
    categoryId: item.categoryId,
    questionText: item.quiz.questionText,
    options: item.quiz.options,
    explanation: item.quiz.explanation,
  }));

  const randomized = shuffleArray(questions);
  return randomized.slice(0, limit);
};