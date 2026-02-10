import React from 'react';
import { Pressable, View, ViewProps } from 'react-native';
import { Icon } from './Icon';
import { colors } from '../tokens';

export interface CheckboxProps extends ViewProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onCheckedChange,
  disabled = false,
  size = 'md',
  className = '',
  ...props
}) => {
  const sizeClass = size === 'sm' ? 'w-5 h-5' :
                    size === 'md' ? 'w-6 h-6' :
                    'w-7 h-7';

  const iconSize = size === 'sm' ? 14 : size === 'md' ? 16 : 18;

  return (
    <Pressable
      onPress={() => !disabled && onCheckedChange(!checked)}
      disabled={disabled}
      className={`${sizeClass} border-2 rounded items-center justify-center ${
        checked ? 'bg-primary border-primary' : 'bg-white border-gray-300'
      } ${disabled ? 'opacity-50' : ''} ${className}`.trim()}
      {...props}>
      {checked && (
        <Icon name="check" size={iconSize} color={colors.text.inverse} />
      )}
    </Pressable>
  );
};

Checkbox.displayName = 'Checkbox';
