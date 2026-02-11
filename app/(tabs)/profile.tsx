import React from 'react';
import { View, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Surface, Heading, Text, Button, Divider } from '~/components/design-system';
import { ProfileHeader } from '~/components/design-system';
import { useAuthStore } from '~/store/authStore';

export default function Profile() {
  const { user, signOut, isLoading } = useAuthStore();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/(auth)/start');
  };

  const displayName = user?.email?.split('@')[0] ?? 'User';

  return (
    <Surface useSafeArea className="flex-1" padding="none">
      <ScrollView>
        <ProfileHeader
          name={displayName}
          email={user?.email}
          stats={[
            { label: 'Tasks Done', value: 0 },
            { label: 'Streak', value: 0 },
          ]}
        />

        <View className="px-6 pt-6">
          <Heading level="h4" className="mb-4">Account</Heading>
          <Divider className="mb-6" />

          <Button
            title="Sign Out"
            variant="danger"
            size="md"
            onPress={handleSignOut}
            loading={isLoading}
          />
        </View>
      </ScrollView>
    </Surface>
  );
}
