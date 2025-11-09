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

  return (
    <View className="flex-1 bg-[#121212]">
      <Text className="mb-5 ml-6 pt-[60px] text-base text-white">Start Screen</Text>

      <View className="flex-1 items-center justify-center px-8">
        {/* App Icon/Logo */}
        <View className="mb-16 h-48 w-48 items-center justify-center rounded-full bg-[#8875FF20]">
          <Text className="text-[96px]">✓</Text>
        </View>

        {/* Welcome heading */}
        <Text className="mb-4 text-center text-[32px] font-bold text-white">
          Welcome to UpTodo
        </Text>

        {/* Subtitle */}
        <Text className="mb-16 text-center text-base leading-6 text-gray-400">
          Please login to your account or create{'\n'}new account to continue
        </Text>

        {/* Pagination dot (single dot for final screen) */}
        <View className="mb-16">
          <View className="h-2 w-2 rounded bg-[#8875FF]" />
        </View>

        {/* Action buttons */}
        <View className="w-full">
          <Pressable
            onPress={handleLogin}
            className="mb-4 items-center rounded-lg bg-[#8875FF] py-4 active:opacity-80"
          >
            <Text className="text-base font-semibold text-white">LOGIN</Text>
          </Pressable>

          <Pressable
            onPress={handleCreateAccount}
            className="items-center rounded-lg border-2 border-[#8875FF] bg-transparent py-4 active:opacity-80"
          >
            <Text className="text-base font-semibold text-white">CREATE ACCOUNT</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
