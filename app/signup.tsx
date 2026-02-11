import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Surface, Heading, Text, Button, Link } from '~/components/design-system';
import { InputField, AlertBox } from '~/components/design-system';
import { useAuthStore } from '~/store/authStore';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const { signUp, isLoading, error, clearError } = useAuthStore();

  const validate = (): boolean => {
    const errors: { email?: string; password?: string; confirmPassword?: string } = {};
    if (!email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Enter a valid email';
    if (!password) errors.password = 'Password is required';
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (!confirmPassword) errors.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignUp = async () => {
    clearError();
    if (!validate()) return;

    const result = await signUp(email.trim(), password);
    if (result.success) {
      const session = useAuthStore.getState().session;
      if (session) {
        router.replace('/(tabs)');
      } else {
        router.replace('/login');
      }
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
            Create Account
          </Heading>
          <Text variant="body" className="mb-10 text-center text-gray-600">
            Sign up to get started with Doone
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
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="new-password"
              error={formErrors.password}
              required
            />

            <InputField
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoComplete="new-password"
              error={formErrors.confirmPassword}
              required
            />
          </View>

          <Button
            title="CREATE ACCOUNT"
            variant="primary"
            size="lg"
            onPress={handleSignUp}
            loading={isLoading}
            className="mt-8"
          />

          <View className="mt-6 flex-row items-center justify-center gap-1">
            <Text variant="body" className="text-gray-600">
              Already have an account?
            </Text>
            <Link onPress={() => router.replace('/login')} size="md">
              Login
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Surface>
  );
}
