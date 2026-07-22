// src/types/index.ts

export type Category =
  | 'programming'
  | 'general_knowledge'
  | 'science'
  | 'art'
  | 'english'
  | 'pop_culture'
  | 'traffic'
  | 'sports'
  | 'productivity';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface CardContent {
  title: string;
  frontText: string;
  backText: string;
}

export interface QuizContent {
  questionText: string;
  options: QuizOption[];
  explanation: string;
}

// Bütünleşik Öğrenme Öğesi (Tekil JSON Formatı)
export interface LearningItem {
  id: string;
  categoryId: Category;
  card: CardContent;
  quiz: QuizContent;
}

// Ekranlarda Kullanılan Dönüştürücü Tipler
export interface FlashCard extends CardContent {
  id: string;
  categoryId: Category;
}

export interface Question extends QuizContent {
  id: string;
  categoryId: Category;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface UserProfile {
  xp: number;
  level: number;
  streak: number;
  completedCardsCount: number;
  correctAnswersCount: number;
  badges: Badge[];
}