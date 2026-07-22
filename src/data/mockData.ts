// src/data/mockData.ts
import { FlashCard, Question, Badge } from '../types';

export const MOCK_CARDS: FlashCard[] = [
  {
    id: 'c1',
    categoryId: 'programming',
    title: 'React Native - State vs Props',
    frontText: 'State ve Props arasındaki temel fark nedir?',
    backText: 'State, bileşenin kendi içinde yönettiği dinamik veridir. Props ise üst bileşenden alt bileşene aktarılan salt okunur (read-only) veridir.',
  },
  {
    id: 'c2',
    categoryId: 'programming',
    title: 'TypeScript - Interface',
    frontText: 'Interface ne işe yarar?',
    backText: 'Nesnelerin (object) şablonunu ve veri tiplerini tanımlayarak kodun tip güvenliğini sağlar.',
  },
  {
    id: 'c3',
    categoryId: 'general_knowledge',
    title: 'Coğrafya - Dünyanın En Derin Noktası',
    frontText: 'Dünyanın bilinen en derin noktası neresidir?',
    backText: 'Mariana Çukuru (Yaklaşık 10.994 metre derinliktedir).',
  },
  {
    id: 'c4',
    categoryId: 'science',
    title: 'Fizik - Işık Hızı',
    frontText: 'Işığın boşluktaki hızı yaklaşık ne kadardır?',
    backText: 'Saniyede yaklaşık 300.000 kilometre (299.792.458 m/s).',
  },
];

export const MOCK_QUESTIONS: Question[] = [
  {
    id: 'q1',
    categoryId: 'programming',
    questionText: 'React Native\'de hangisi state güncellemesi için kullanılır?',
    options: [
      { id: 'o1', text: 'useState', isCorrect: true },
      { id: 'o2', text: 'useEffect', isCorrect: false },
      { id: 'o3', text: 'useRef', isCorrect: false },
      { id: 'o4', text: 'useMemo', isCorrect: false },
    ],
    explanation: 'useState hook\'u bileşen içerisindeki durum verilerini tanımlamak ve güncellemek için kullanılır.',
  },
  {
    id: 'q2',
    categoryId: 'general_knowledge',
    questionText: 'Mariana Çukuru hangi okyanusta yer alır?',
    options: [
      { id: 'o1', text: 'Atlas Okyanusu', isCorrect: false },
      { id: 'o2', text: 'Büyük Okyanus (Pasifik)', isCorrect: true },
      { id: 'o3', text: 'Hint Okyanusu', isCorrect: false },
      { id: 'o4', text: 'Arktik Okyanusu', isCorrect: false },
    ],
    explanation: 'Mariana Çukuru, Pasifik Okyanusu\'nun batısındaki Mariana Adaları\'nın doğusunda yer alır.',
  },
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'b1',
    title: 'İlk Adım',
    description: 'İlk kartını başarıyla öğrendin.',
    icon: '🌱',
  },
  {
    id: 'b2',
    title: 'Bilgi Avcısı',
    description: '5 soruya üst üste doğru cevap verdin.',
    icon: '🎯',
  },
  {
    id: 'b3',
    title: 'Yazılım Ustası',
    description: 'Yazılım kategorisindeki tüm kartları tamamladın.',
    icon: '💻',
  },
];