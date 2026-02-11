import React from 'react';
import { View, ViewProps } from 'react-native';
import { Text } from '../atoms/Text';
import { Icon } from '../atoms/Icon';
import { IconButton } from '../atoms/IconButton';
import { colors } from '../tokens';

export interface AlertBoxProps extends ViewProps {
  title?: string;
  message: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  dismissible?: boolean;
  onDismiss?: () => void;
}

export const AlertBox: React.FC<AlertBoxProps> = ({
  title,
  message,
  variant = 'info',
  dismissible = false,
  onDismiss,
  className = '',
  ...props
}) => {
  const variantConfig = getVariantConfig(variant);

  return (
    <View
      className={`flex-row p-4 rounded-xl ${variantConfig.bgClass} ${className}`.trim()}
      {...props}>
      <View className="mr-3 pt-0.5">
        <Icon name={variantConfig.icon} size={20} color={variantConfig.color} />
      </View>

      <View className="flex-1">
        {title && (
          <Text variant="label" className="mb-1" style={{ color: variantConfig.color }}>
            {title}
          </Text>
        )}
        <Text variant="bodySmall" style={{ color: variantConfig.textColor }}>
          {message}
        </Text>
      </View>

      {dismissible && onDismiss && (
        <IconButton
          icon={<Icon name="times" size={16} color={variantConfig.textColor} />}
          variant="ghost"
          size="sm"
          onPress={onDismiss}
        />
      )}
    </View>
  );
};

AlertBox.displayName = 'AlertBox';

function getVariantConfig(variant: 'info' | 'success' | 'warning' | 'error') {
  switch (variant) {
    case 'success':
      return {
        bgClass: 'bg-success bg-opacity-10',
        color: colors.success,
        textColor: colors.gray[800],
        icon: 'check-circle' as const,
      };
    case 'warning':
      return {
        bgClass: 'bg-warning bg-opacity-10',
        color: colors.warning,
        textColor: colors.gray[800],
        icon: 'exclamation-triangle' as const,
      };
    case 'error':
      return {
        bgClass: 'bg-error bg-opacity-10',
        color: colors.error,
        textColor: colors.gray[800],
        icon: 'exclamation-circle' as const,
      };
    case 'info':
    default:
      return {
        bgClass: 'bg-info bg-opacity-10',
        color: colors.info,
        textColor: colors.gray[800],
        icon: 'info-circle' as const,
      };
  }
}
