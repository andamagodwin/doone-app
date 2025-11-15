import '../global.css';

import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Text, TextInput } from 'react-native';
import { useFonts } from 'expo-font';

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

  if (!fontsLoaded) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="start" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: false }} />
    </Stack>
  );
}
