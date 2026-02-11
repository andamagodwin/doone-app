/**
 * Start/Welcome Screen
 *
 * Final screen in onboarding flow with Login and Create Account options.
 */

import React from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { Surface, Heading, Text, Button } from '~/components/design-system';

export default function StartScreen() {
  const handleLogin = () => {
    router.push('/login');
  };

  const handleCreateAccount = () => {
    router.push('/signup');
  };

  return (
    <Surface useSafeArea className="flex-1">
      <View className="flex-1 items-center justify-center px-8">
        {/* Welcome heading */}
        <Heading level="h1" className="mb-4 text-center">
          Welcome to Doone
        </Heading>

        {/* Subtitle */}
        <Text variant="body" className="mb-16 text-center text-gray-600">
          Please login to your account or create{'\n'}new account to continue
        </Text>

        {/* Action buttons */}
        <View className="w-full gap-4">
          <Button
            title="LOGIN"
            variant="primary"
            onPress={handleLogin}
            size="lg"
          />

          <Button
            title="CREATE ACCOUNT"
            variant="outline"
            onPress={handleCreateAccount}
            size="lg"
          />
        </View>
      </View>
    </Surface>
  );
}
