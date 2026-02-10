import React from 'react';
import { View, ViewProps } from 'react-native';
import { Text } from '../atoms/Text';
import { Heading } from '../atoms/Heading';
import { Icon } from '../atoms/Icon';
import { colors } from '../tokens';

export interface EmptyStateProps extends ViewProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  iconName?: keyof typeof import('@expo/vector-icons').FontAwesome.glyphMap;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  iconName,
  action,
  className = '',
  ...props
}) => {
  return (
    <View className={`items-center justify-center py-12 px-6 ${className}`.trim()} {...props}>
      {icon || (iconName && (
        <View className="mb-4">
          <Icon name={iconName} size={64} color={colors.gray[300]} />
        </View>
      ))}

      <Heading level="h4" className="text-center text-gray-700 mb-2">
        {title}
      </Heading>

      {description && (
        <Text variant="body" className="text-center text-gray-500 mb-6">
          {description}
        </Text>
      )}

      {action && <View>{action}</View>}
    </View>
  );
};

EmptyState.displayName = 'EmptyState';
