/**
 * Start/Welcome Screen
 * 
 * Final screen in onboarding flow with Login and Create Account options.
 */

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function StartScreen() {
  const handleLogin = () => {
    // Navigate to main app for now (will connect to auth later)
    router.replace('/(tabs)');
  };

  const handleCreateAccount = () => {
    // Navigate to main app for now (will connect to auth later)
    router.replace('/(tabs)');
  };

  const handleSkip = () => {
    // Skip authentication and go straight to app
    router.replace('/(tabs)');
  };

  return (
    <View className="flex-1 bg-white">
      {/* Skip button */}
      <View className="absolute right-6 top-16 z-10">
        <Pressable onPress={handleSkip} className="px-4 py-2">
          <Text className="text-base font-semibold text-gray-500">Skip</Text>
        </Pressable>
      </View>

      <View className="flex-1 items-center justify-center px-8">
       

        {/* Welcome heading */}
        <Text className="mb-4 text-center text-[32px] font-bold text-gray-900">
          Welcome to Doone
        </Text>

        {/* Subtitle */}
        <Text className="mb-16 text-center text-base leading-6 text-gray-600">
          Please login to your account or create{'\n'}new account to continue
        </Text>

       

        {/* Action buttons */}
        <View className="w-full">
          <Pressable
            onPress={handleLogin}
            className="mb-4 items-center rounded-lg bg-primary py-4 active:opacity-80"
          >
            <Text className="text-base font-semibold text-white">LOGIN</Text>
          </Pressable>

          <Pressable
            onPress={handleCreateAccount}
            className="items-center rounded-lg border-2 border-primary bg-transparent py-4 active:opacity-80"
          >
            <Text className="text-base font-semibold text-primary">CREATE ACCOUNT</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
