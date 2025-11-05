/**
 * CheckToggle Atom
 *
 * A custom-styled checkbox/toggle for task completion.
 */

import React, { useState, useMemo } from 'react';
import { Pressable, ViewStyle } from 'react-native';
import { useThemeColors } from '~/theme';
import { Icon } from './Icon';

export type CheckToggleSize = 'sm' | 'md' | 'lg';

export interface CheckToggleProps {
  value?: boolean; // controlled
  defaultValue?: boolean; // uncontrolled
  onChange?: (checked: boolean) => void;
  size?: CheckToggleSize;
  disabled?: boolean;
  style?: ViewStyle;
}

const SIZE_PX: Record<CheckToggleSize, number> = {
  sm: 20,
  md: 24,
  lg: 28,
};

export const CheckToggle: React.FC<CheckToggleProps> = ({
  value,
  defaultValue = false,
  onChange,
  size = 'md',
  disabled = false,
  style,
}) => {
  const colors = useThemeColors();
  const [internal, setInternal] = useState(defaultValue);
  const checked = value ?? internal;
  const side = SIZE_PX[size];

  const handlePress = () => {
    if (disabled) return;
    const next = !checked;
    setInternal(next);
    onChange?.(next);
  };

  const styles = useMemo(
    () => ({
      box: {
        width: side,
        height: side,
        borderRadius: side / 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
      } as ViewStyle,
    }),
    [side]
  );

  const backgroundColor = checked ? colors.interactive.primary : colors.background.primary;
  const borderColor = checked ? colors.interactive.primary : colors.border.primary;
  const iconColor = checked ? colors.text.inverse : 'transparent';

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      onPress={handlePress}
      disabled={disabled}
      style={[styles.box, { backgroundColor, borderColor, opacity: disabled ? 0.6 : 1 }, style]}
    >
      <Icon name="checkmark" family="Ionicons" size={16} color={iconColor} />
    </Pressable>
  );
};

export default CheckToggle;
