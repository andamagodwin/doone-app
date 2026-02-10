import React from 'react';
import { Switch as RNSwitch, SwitchProps as RNSwitchProps } from 'react-native';
import { colors } from '../tokens';

export interface SwitchProps extends RNSwitchProps {
  size?: 'sm' | 'md';
}

export const Switch: React.FC<SwitchProps> = ({
  size = 'md',
  trackColor = { false: colors.gray[300], true: colors.primary },
  thumbColor = colors.background.primary,
  ...props
}) => {
  const scale = size === 'sm' ? 0.8 : 1;

  return (
    <RNSwitch
      trackColor={trackColor}
      thumbColor={thumbColor}
      style={{ transform: [{ scale }] }}
      {...props}
    />
  );
};

Switch.displayName = 'Switch';
