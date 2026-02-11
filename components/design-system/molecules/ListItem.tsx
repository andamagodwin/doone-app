import React from 'react';
import { View } from 'react-native';
import { Pressable } from '../atoms/Pressable';
import { Text } from '../atoms/Text';
import { Icon } from '../atoms/Icon';
import { colors } from '../tokens';

export interface ListItemProps {
  title: string;
  description?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPress?: () => void;
  showChevron?: boolean;
  disabled?: boolean;
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  description,
  leftIcon,
  rightIcon,
  onPress,
  showChevron = false,
  disabled = false,
}) => {
  const content = (
    <View className="flex-row items-center py-4 px-4">
      {leftIcon && <View className="mr-3">{leftIcon}</View>}

      <View className="flex-1">
        <Text variant="body" className="text-gray-900">
          {title}
        </Text>
        {description && (
          <Text variant="caption" className="text-gray-500 mt-1">
            {description}
          </Text>
        )}
      </View>

      {rightIcon && <View className="ml-3">{rightIcon}</View>}
      {showChevron && !rightIcon && (
        <Icon name="chevron-right" size={16} color={colors.gray[400]} />
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        hapticFeedback
        className={`border-b border-gray-100 ${disabled ? 'opacity-50' : ''}`}>
        {content}
      </Pressable>
    );
  }

  return <View className="border-b border-gray-100">{content}</View>;
};

ListItem.displayName = 'ListItem';
