
import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const goToOnboarding = async () => {
    // Clear the flag so onboarding shows again
    await AsyncStorage.removeItem('hasSeenOnboarding');
    router.replace('/onboarding' as any);
  };

  return (
    <View className='flex-1 items-center justify-center bg-white px-8'>
      <Text className="mb-8 text-2xl font-bold">Welcome Home</Text>
      
      <Pressable
        onPress={goToOnboarding}
        className="w-full rounded-lg bg-purple-600 px-6 py-4 active:opacity-80"
      >
        <Text className="text-center text-base font-semibold text-white">
          Go to Onboarding
        </Text>
      </Pressable>
    </View>
  );
}

