// App.tsx
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LearnScreen } from './src/screens/LearnScreen';
import { QuizScreen } from './src/screens/QuizScreen';
import { COLORS } from './src/constants/theme';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        initialRouteName="Learn"
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.background,
          },
          headerTintColor: COLORS.primary,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="Learn"
          component={LearnScreen}
          options={{ title: '🎓 MicroLearn - Öğren' }}
        />
        <Stack.Screen
          name="Quiz"
          component={QuizScreen}
          options={{ title: '⚡ Zamana Karşı Yarışma' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}