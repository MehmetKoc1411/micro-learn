// src/data/mockData.ts
import { Category, Badge } from '../types';

export interface CategoryItem {
  id: Category | 'all';
  name: string;
  icon: string;
}

export const CATEGORIES: CategoryItem[] = [
  { id: 'all', name: 'Tümü', icon: '🌐' },
  { id: 'programming', name: 'Yazılım', icon: '💻' },
  { id: 'general_knowledge', name: 'Genel Kültür', icon: '🧠' },
  { id: 'science', name: 'Bilim & Doğa', icon: '🔬' },
  { id: 'art', name: 'Sanat & Tarih', icon: '🎨' },
  { id: 'english', name: 'İngilizce', icon: '🔤' },
  { id: 'pop_culture', name: 'Sinema & Pop', icon: '🍿' },
  { id: 'traffic', name: 'Sürücü & Trafik', icon: '🚘' },
  { id: 'sports', name: 'Spor', icon: '🏆' },
  { id: 'productivity', name: 'Kişisel Gelişim', icon: '💡' },
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
    description: 'Yarışmada 5 soruya doğru cevap verdin.',
    icon: '🎯',
  },
  {
    id: 'b3',
    title: 'Çok Yönlü Öğrenci',
    description: 'Farklı kategorilerden kartlar tamamladın.',
    icon: '🧩',
  },
];