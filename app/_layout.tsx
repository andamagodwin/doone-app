import '../global.css';

import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '~/store/authStore';
import { Spinner } from '~/components/design-system';

export const unstable_settings = {
  // Initial route set to onboarding - will redirect based on storage check
  initialRouteName: 'onboarding',
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
    'Lato-Bold': require('../assets/fonts/Lato-Bold.ttf'),
    'Lato-Light': require('../assets/fonts/Lato-Light.ttf'),
    'Lato-Black': require('../assets/fonts/Lato-Black.ttf'),
    'Lato-Italic': require('../assets/fonts/Lato-Italic.ttf'),
  });

  const { user, isAuthReady, initialize } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);

  // Set default font family
  useEffect(() => {
    if (!fontsLoaded) return;
    const T: any = Text as any;
    T.defaultProps = T.defaultProps || {};
    const baseTextStyle = Array.isArray(T.defaultProps.style)
      ? [...(T.defaultProps.style as any[]), { fontFamily: 'Lato-Regular' }]
      : [T.defaultProps.style, { fontFamily: 'Lato-Regular' }].filter(Boolean);
    T.defaultProps.style = baseTextStyle;

    const TI: any = TextInput as any;
    TI.defaultProps = TI.defaultProps || {};
    const baseInputStyle = Array.isArray(TI.defaultProps.style)
      ? [...(TI.defaultProps.style as any[]), { fontFamily: 'Lato-Regular' }]
      : [TI.defaultProps.style, { fontFamily: 'Lato-Regular' }].filter(Boolean);
    TI.defaultProps.style = baseInputStyle as any;
  }, [fontsLoaded]);

  // Initialize auth + check onboarding status
  useEffect(() => {
    initialize();
    AsyncStorage.getItem('hasSeenOnboarding').then((value) => {
      setHasSeenOnboarding(value === 'true');
    });
  }, []);

  // Navigation guard: redirect based on auth + onboarding state
  useEffect(() => {
    if (!fontsLoaded || !isAuthReady || hasSeenOnboarding === null) return;

    const inAuthGroup = segments[0] === '(tabs)';
    const inOnboarding = segments[0] === 'onboarding';

    if (!hasSeenOnboarding) {
      if (!inOnboarding) {
        router.replace('/onboarding');
      }
    } else if (!user) {
      if (inAuthGroup) {
        router.replace('/start');
      }
    } else {
      if (!inAuthGroup) {
        router.replace('/(tabs)');
      }
    }
  }, [fontsLoaded, isAuthReady, hasSeenOnboarding, user, segments]);

  // Show loading screen while initializing
  if (!fontsLoaded || !isAuthReady || hasSeenOnboarding === null) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Spinner size="lg" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="start" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: false }} />
    </Stack>
  );
}
