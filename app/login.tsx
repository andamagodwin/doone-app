import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Surface, Heading, Text, Button, Link } from '~/components/design-system';
import { InputField, AlertBox } from '~/components/design-system';
import { useAuthStore } from '~/store/authStore';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});

  const { signIn, isLoading, error, clearError } = useAuthStore();

  const validate = (): boolean => {
    const errors: { email?: string; password?: string } = {};
    if (!email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Enter a valid email';
    if (!password) errors.password = 'Password is required';
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async () => {
    clearError();
    if (!validate()) return;

    const result = await signIn(email.trim(), password);
    if (result.success) {
      router.replace('/(tabs)');
    }
  };

  return (
    <Surface useSafeArea className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 32 }}
          keyboardShouldPersistTaps="handled">
          <Heading level="h1" className="mb-2 text-center">
            Login
          </Heading>
          <Text variant="body" className="mb-10 text-center text-gray-600">
            Welcome back! Sign in to continue
          </Text>

          {error && (
            <AlertBox
              variant="error"
              message={error}
              dismissible
              onDismiss={clearError}
              className="mb-6"
            />
          )}

          <View className="gap-5">
            <InputField
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              error={formErrors.email}
              required
            />

            <InputField
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
              error={formErrors.password}
              required
            />
          </View>

          <Button
            title="LOGIN"
            variant="primary"
            size="lg"
            onPress={handleLogin}
            loading={isLoading}
            className="mt-8"
          />

          <View className="mt-6 flex-row items-center justify-center gap-1">
            <Text variant="body" className="text-gray-600">
              Don't have an account?
            </Text>
            <Link onPress={() => router.replace('/signup')} size="md">
              Sign Up
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Surface>
  );
}
