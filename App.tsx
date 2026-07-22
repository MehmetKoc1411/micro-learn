// App.tsx
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LearnScreen } from './src/screens/LearnScreen';
import { QuizSetupScreen } from './src/screens/QuizSetupScreen';
import { QuizScreen } from './src/screens/QuizScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { COLORS, SPACING } from './src/constants/theme';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
          initialRouteName="Learn"
          screenOptions={({ navigation }) => ({
            headerStyle: {
              backgroundColor: COLORS.background,
            },
            headerTintColor: COLORS.primary,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShadowVisible: false,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
                style={{ marginRight: SPACING.xs }}
              >
                <Text style={{ fontSize: 22 }}>👤</Text>
              </TouchableOpacity>
            ),
          })}
        >
          <Stack.Screen
            name="Learn"
            component={LearnScreen}
            options={{ title: '🎓 MicroLearn - Öğren' }}
          />
          <Stack.Screen
            name="QuizSetup"
            component={QuizSetupScreen}
            options={{ title: '⚙️ Yarışma Ayarları' }}
          />
          <Stack.Screen
            name="Quiz"
            component={QuizScreen}
            options={{ title: '⚡ Zamana Karşı Yarışma' }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: '🏆 Profil ve Başarılar' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}