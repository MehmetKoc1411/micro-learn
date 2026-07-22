// src/data/mockData.ts
import { FlashCard, Question, Badge, Category } from '../types';

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
];

export const MOCK_CARDS: FlashCard[] = [
  // --- YAZILIM ---
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
    categoryId: 'programming',
    title: 'JavaScript - Async/Await',
    frontText: 'Async/Await yapısının amacı nedir?',
    backText: 'Asenkron (Promise dayalı) kodları senkronmuş gibi daha okunabilir ve yönetilebilir yazmamızı sağlar.',
  },
  {
    id: 'c4',
    categoryId: 'programming',
    title: 'React Native - Flexbox',
    frontText: 'FlexDirection varsayılan olarak React Native\'de nedir?',
    backText: 'Web\'in aksine (row), React Native\'de varsayılan flexDirection düzeni "column" (sütun)\'dur.',
  },

  // --- GENEL KÜLTÜR ---
  {
    id: 'c5',
    categoryId: 'general_knowledge',
    title: 'Coğrafya - Mariana Çukuru',
    frontText: 'Dünyanın bilinen en derin noktası neresidir?',
    backText: 'Mariana Çukuru (Yaklaşık 10.994 metre derinliktedir ve Büyük Okyanus\'ta yer alır).',
  },
  {
    id: 'c6',
    categoryId: 'general_knowledge',
    title: 'Dünya Başkentleri - Avustralya',
    frontText: 'Avustralya\'nın başkenti neresidir?',
    backText: 'Kanberra (Canberra). Sıklıkla Sydney veya Melbourne ile karıştırılır.',
  },
  {
    id: 'c7',
    categoryId: 'general_knowledge',
    title: 'Astronomi - En Sıcak Gezegen',
    frontText: 'Güneş Sistemimizdeki en sıcak gezegen hangisidir?',
    backText: 'Venüs. Güneş\'e en yakın gezegen Merkür olsa da, Venüs yoğun seragazı atmosferi nedeniyle 465°C ile en sıcaktır.',
  },

  // --- BİLİM & DOĞA ---
  {
    id: 'c8',
    categoryId: 'science',
    title: 'Fizik - Işık Hızı',
    frontText: 'Işığın boşluktaki hızı yaklaşık ne kadardır?',
    backText: 'Saniyede yaklaşık 300.000 kilometre (299.792.458 m/s).',
  },
  {
    id: 'c9',
    categoryId: 'science',
    title: 'Biyoloji - DNA',
    frontText: 'DNA\'nın açılımı nedir?',
    backText: 'Deoksiribonükleik Asit. Canlıların genetik talimatlarını taşıyan moleküldür.',
  },
  {
    id: 'c10',
    categoryId: 'science',
    title: 'Kimya - Su Molekülü',
    frontText: 'Suyun kimyasal formülündeki elementler nelerdir?',
    backText: '2 Hidrojen ve 1 Oksijen atomu (H₂O).',
  },

  // --- SANAT & TARİH ---
  {
    id: 'c11',
    categoryId: 'art',
    title: 'Resim - Mona Lisa',
    frontText: 'Mona Lisa tablosu kime aittir ve nerede sergilenir?',
    backText: 'Leonardo da Vinci tarafından yapılmıştır ve Paris\'teki Louvre Müzesi\'nde sergilenir.',
  },
  {
    id: 'c12',
    categoryId: 'art',
    title: 'Resim - Yıldızlı Gece',
    frontText: '"Yıldızlı Gece" (The Starry Night) tablosunun ressamı kimdir?',
    backText: 'Hollandalı empresyonist ressam Vincent van Gogh.',
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
    questionText: 'Avustralya\'nın resmi başkenti hangisidir?',
    options: [
      { id: 'o1', text: 'Sydney', isCorrect: false },
      { id: 'o2', text: 'Melbourne', isCorrect: false },
      { id: 'o3', text: 'Canberra', isCorrect: true },
      { id: 'o4', text: 'Brisbane', isCorrect: false },
    ],
    explanation: 'Avustralya\'nın başkenti Canberra\'dır.',
  },
  {
    id: 'q3',
    categoryId: 'science',
    questionText: 'Güneş Sistemindeki en sıcak gezegen hangisidir?',
    options: [
      { id: 'o1', text: 'Merkür', isCorrect: false },
      { id: 'o2', text: 'Venüs', isCorrect: true },
      { id: 'o3', text: 'Mars', isCorrect: false },
      { id: 'o4', text: 'Jüpiter', isCorrect: false },
    ],
    explanation: 'Venüs, atmosferindeki seragazı etkisi sebebiyle 465°C ile sistemin en sıcak gezegenidir.',
  },
  {
    id: 'q4',
    categoryId: 'art',
    questionText: 'Mona Lisa tablosu hangi müzede sergilenmektedir?',
    options: [
      { id: 'o1', text: 'British Museum', isCorrect: false },
      { id: 'o2', text: 'Louvre Müzesi', isCorrect: true },
      { id: 'o3', text: 'Prado Müzesi', isCorrect: false },
      { id: 'o4', text: 'Vatikan Müzesi', isCorrect: false },
    ],
    explanation: 'Mona Lisa, Fransa\'nın Paris kentinde bulunan Louvre Müzesi\'nde korunmaktadır.',
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