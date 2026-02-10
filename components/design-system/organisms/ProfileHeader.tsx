import React from 'react';
import { View } from 'react-native';
import { Avatar } from '../atoms/Avatar';
import { Heading } from '../atoms/Heading';
import { Text } from '../atoms/Text';
import { IconButton } from '../atoms/IconButton';
import { Icon } from '../atoms/Icon';
import { colors } from '../tokens';

export interface ProfileHeaderProps {
  name: string;
  email?: string;
  avatarSource?: any;
  stats?: Array<{
    label: string;
    value: string | number;
  }>;
  onEdit?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  email,
  avatarSource,
  stats,
  onEdit,
}) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <View className="bg-white px-6 py-8 border-b border-gray-100">
      {/* Avatar and Edit Button */}
      <View className="flex-row items-center mb-6">
        <Avatar
          source={avatarSource}
          initials={initials}
          size="xl"
          backgroundColor={colors.primary}
        />
        {onEdit && (
          <View className="ml-auto">
            <IconButton
              icon={<Icon name="edit" size={20} color={colors.gray[700]} />}
              variant="ghost"
              onPress={onEdit}
            />
          </View>
        )}
      </View>

      {/* Name and Email */}
      <Heading level="h3" className="mb-1">
        {name}
      </Heading>
      {email && (
        <Text variant="body" className="text-gray-500 mb-6">
          {email}
        </Text>
      )}

      {/* Stats */}
      {stats && stats.length > 0 && (
        <View className="flex-row justify-around pt-4 border-t border-gray-100">
          {stats.map((stat, index) => (
            <View key={index} className="items-center">
              <Text variant="body" className="font-lato-bold text-2xl text-gray-900 mb-1">
                {stat.value}
              </Text>
              <Text variant="caption" className="text-gray-500">
                {stat.label}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

ProfileHeader.displayName = 'ProfileHeader';
