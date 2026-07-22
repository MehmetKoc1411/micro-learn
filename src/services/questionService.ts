// src/services/questionService.ts
import { LearningItem, FlashCard, Question, Category } from '../types';

// Mevcut Kategoriler
import progData from '../data/questions/programming.json';
import genData from '../data/questions/general_knowledge.json';
import sciData from '../data/questions/science.json';
import artData from '../data/questions/art.json';

// Yeni Eklenen Kategoriler
import engData from '../data/questions/english.json';
import popData from '../data/questions/pop_culture.json';
import trafData from '../data/questions/traffic.json';
import sportsData from '../data/questions/sports.json';
import prodData from '../data/questions/productivity.json';

// Fisher-Yates Shuffle
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const getRawDataByCategory = (category: Category | 'all'): LearningItem[] => {
  const progItems = ((progData as unknown) as LearningItem[]) || [];
  const genItems = ((genData as unknown) as LearningItem[]) || [];
  const sciItems = ((sciData as unknown) as LearningItem[]) || [];
  const artItems = ((artData as unknown) as LearningItem[]) || [];
  const engItems = ((engData as unknown) as LearningItem[]) || [];
  const popItems = ((popData as unknown) as LearningItem[]) || [];
  const trafItems = ((trafData as unknown) as LearningItem[]) || [];
  const sportsItems = ((sportsData as unknown) as LearningItem[]) || [];
  const prodItems = ((prodData as unknown) as LearningItem[]) || [];

  switch (category) {
    case 'programming':
      return progItems;
    case 'general_knowledge':
      return genItems;
    case 'science':
      return sciItems;
    case 'art':
      return artItems;
    case 'english':
      return engItems;
    case 'pop_culture':
      return popItems;
    case 'traffic':
      return trafItems;
    case 'sports':
      return sportsItems;
    case 'productivity':
      return prodItems;
    case 'all':
    default:
      return [
        ...progItems,
        ...genItems,
        ...sciItems,
        ...artItems,
        ...engItems,
        ...popItems,
        ...trafItems,
        ...sportsItems,
        ...prodItems,
      ];
  }
};

/**
 * Seçilen kategoriye ait Flashcard'ları getirir ve karıştırır
 */
export const getCardsByCategory = (category: Category | 'all'): FlashCard[] => {
  const rawItems = getRawDataByCategory(category);

  const cards: FlashCard[] = rawItems
    .filter((item) => item && item.card)
    .map((item) => ({
      id: item.id || Math.random().toString(),
      categoryId: item.categoryId,
      title: item.card?.title || 'Başlık Yok',
      frontText: item.card?.frontText || 'İçerik Yok',
      backText: item.card?.backText || 'Açıklama Yok',
    }));

  return shuffleArray(cards);
};

/**
 * Seçilen kategoriye ait Soruları karıştırarak getirir
 */
export const getQuestionsByCategory = (
  category: Category | 'all',
  limit: number = 10
): Question[] => {
  const rawItems = getRawDataByCategory(category);

  const questions: Question[] = rawItems
    .filter((item) => item && item.quiz)
    .map((item) => ({
      id: item.id || Math.random().toString(),
      categoryId: item.categoryId,
      questionText: item.quiz?.questionText || 'Soru Yok',
      options: item.quiz?.options || [],
      explanation: item.quiz?.explanation || 'Açıklama Yok',
    }));

  const randomized = shuffleArray(questions);
  return randomized.slice(0, limit);
};