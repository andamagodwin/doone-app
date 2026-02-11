import React from 'react';
import { View } from 'react-native';
import { Heading } from '../atoms/Heading';
import { IconButton } from '../atoms/IconButton';
import { Icon } from '../atoms/Icon';
import { colors } from '../tokens';

export interface NavigationBarProps {
  title: string;
  leftAction?: {
    icon: React.ReactNode;
    onPress: () => void;
  };
  rightAction?: {
    icon: React.ReactNode;
    onPress: () => void;
  };
  showBackButton?: boolean;
  onBack?: () => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  title,
  leftAction,
  rightAction,
  showBackButton = false,
  onBack,
}) => {
  return (
    <View className="flex-row items-center justify-between px-5 py-4 bg-white border-b border-gray-100">
      {/* Left Action */}
      <View className="w-10">
        {showBackButton && onBack ? (
          <IconButton
            icon={<Icon name="arrow-left" size={24} color={colors.gray[900]} />}
            variant="ghost"
            onPress={onBack}
          />
        ) : leftAction ? (
          <IconButton
            icon={leftAction.icon}
            variant="ghost"
            onPress={leftAction.onPress}
          />
        ) : null}
      </View>

      {/* Title */}
      <Heading level="h5" className="flex-1 text-center">
        {title}
      </Heading>

      {/* Right Action */}
      <View className="w-10">
        {rightAction && (
          <IconButton
            icon={rightAction.icon}
            variant="ghost"
            onPress={rightAction.onPress}
          />
        )}
      </View>
    </View>
  );
};

NavigationBar.displayName = 'NavigationBar';
