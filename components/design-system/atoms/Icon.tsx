import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../tokens/colors';

export interface IconProps {
  name: keyof typeof FontAwesome.glyphMap;
  size?: number;
  color?: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = colors.gray[700],
  ...props
}) => {
  return <FontAwesome name={name} size={size} color={color} {...props} />;
};

Icon.displayName = 'Icon';
