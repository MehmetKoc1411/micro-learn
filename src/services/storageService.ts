// src/services/storageService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile } from '../types';
import { INITIAL_BADGES } from '../data/mockData';

const USER_PROFILE_KEY = '@MicroLearn:userProfile';

const DEFAULT_PROFILE: UserProfile = {
  xp: 0,
  level: 1,
  streak: 1,
  completedCardsCount: 0,
  correctAnswersCount: 0,
  badges: INITIAL_BADGES,
};

export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_PROFILE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : DEFAULT_PROFILE;
  } catch (e) {
    console.error('Profile get error:', e);
    return DEFAULT_PROFILE;
  }
};

export const addXP = async (amount: number): Promise<UserProfile> => {
  try {
    const profile = await getUserProfile();
    const newXP = profile.xp + amount;
    // Her 100 XP'de 1 seviye atlama mantığı
    const newLevel = Math.floor(newXP / 100) + 1;

    const updatedProfile: UserProfile = {
      ...profile,
      xp: newXP,
      level: newLevel,
      completedCardsCount: profile.completedCardsCount + 1,
    };

    await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(updatedProfile));
    return updatedProfile;
  } catch (e) {
    console.error('Add XP error:', e);
    return DEFAULT_PROFILE;
  }
};