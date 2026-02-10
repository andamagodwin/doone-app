import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps, View } from 'react-native';
import { SpinnerSize } from '../types';
import { colors } from '../tokens';

export interface SpinnerProps extends Omit<ActivityIndicatorProps, 'size'> {
  size?: SpinnerSize;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = colors.primary,
  ...props
}) => {
  const sizeValue = size === 'sm' ? 'small' as const :
                   size === 'lg' ? 'large' as const :
                   'small' as const;

  return (
    <View className="items-center justify-center">
      <ActivityIndicator size={sizeValue} color={color} {...props} />
    </View>
  );
};

Spinner.displayName = 'Spinner';
