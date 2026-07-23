// src/services/storageService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile } from '../types';
import { INITIAL_BADGES } from '../data/mockData';

const USER_PROFILE_KEY = '@microlearn_user_profile';
const FAVORITES_KEY = '@microlearn_favorites';

const DEFAULT_PROFILE: UserProfile = {
  xp: 0,
  level: 1,
  streak: 1,
  lastLoginDate: undefined,
  completedCardsCount: 0,
  correctAnswersCount: 0,
  badges: INITIAL_BADGES,
};

/**
 * Kullanıcı profilini getirir. Yoksa varsayılan profili oluşturur.
 */
export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const data = await AsyncStorage.getItem(USER_PROFILE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(DEFAULT_PROFILE));
    return DEFAULT_PROFILE;
  } catch (error) {
    console.error('Profile load error:', error);
    return DEFAULT_PROFILE;
  }
};

/**
 * Kullanıcıya XP ekler, Seviye hesabını ve Günlük Giriş Serisini (Streak) günceller.
 */
export const addXP = async (amount: number): Promise<UserProfile> => {
  try {
    const profile = await getUserProfile();
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const lastDate = profile.lastLoginDate;

    let newStreak = profile.streak || 1;

    if (!lastDate) {
      // İlk aktivite
      newStreak = 1;
    } else if (lastDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (lastDate === yesterdayStr) {
        // Dün aktif olmuş, bugün de aktif -> Seri +1
        newStreak += 1;
      } else {
        // Gün atlanmış -> Seri sıfırlanıp 1'den başlar
        newStreak = 1;
      }
    }

    const newXP = profile.xp + amount;
    const newLevel = Math.floor(newXP / 100) + 1;

    const updatedProfile: UserProfile = {
      ...profile,
      xp: newXP,
      level: newLevel,
      streak: newStreak,
      lastLoginDate: today,
      completedCardsCount: profile.completedCardsCount + 1,
    };

    await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(updatedProfile));
    return updatedProfile;
  } catch (error) {
    console.error('XP add error:', error);
    return DEFAULT_PROFILE;
  }
};

/**
 * Favoriye eklenen kartların ID listesini getirir.
 */
export const getFavoriteCardIds = async (): Promise<string[]> => {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Favorites load error:', error);
    return [];
  }
};

/**
 * Kartı favorilere ekler veya çıkarır (Toggle).
 */
export const toggleFavoriteCard = async (cardId: string): Promise<string[]> => {
  try {
    const favorites = await getFavoriteCardIds();
    let updated: string[];

    if (favorites.includes(cardId)) {
      updated = favorites.filter((id) => id !== cardId);
    } else {
      updated = [...favorites, cardId];
    }

    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Favorite toggle error:', error);
    return [];
  }
};