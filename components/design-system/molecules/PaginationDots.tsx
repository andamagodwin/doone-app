import React from 'react';
import { View, ViewProps } from 'react-native';
import { colors } from '../tokens';

export interface PaginationDotsProps extends ViewProps {
  count: number;
  activeIndex: number;
  dotSize?: number;
  spacing?: number;
  activeColor?: string;
  inactiveColor?: string;
}

export const PaginationDots: React.FC<PaginationDotsProps> = ({
  count,
  activeIndex,
  dotSize = 8,
  spacing = 8,
  activeColor = colors.primary,
  inactiveColor = colors.gray[300],
  className = '',
  ...props
}) => {
  return (
    <View className={`flex-row items-center ${className}`.trim()} {...props}>
      {Array.from({ length: count }).map((_, index) => (
        <View
          key={index}
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor: index === activeIndex ? activeColor : inactiveColor,
            marginHorizontal: spacing / 2,
          }}
        />
      ))}
    </View>
  );
};

PaginationDots.displayName = 'PaginationDots';
