/**
 * CustomInput Component
 * 
 * Theme-aware text input for forms, login, signup, and task entry.
 * Provides consistent styling and validation states using NativeWind.
 */

import React, { useState } from 'react';
import {
  TextInput,
  TextInputProps,
  View,
  Pressable,
} from 'react-native';
import { useThemeColors, useTypography } from '~/theme';
import { CustomText } from './CustomText';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'filled' | 'outline';

export interface CustomInputProps extends Omit<TextInputProps, 'style'> {
  /** Input size */
  size?: InputSize;
  
  /** Input variant */
  variant?: InputVariant;
  
  /** Label text */
  label?: string;
  
  /** Helper text below input */
  helperText?: string;
  
  /** Error message */
  error?: string;
  
  /** Success state */
  success?: boolean;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Left icon component */
  leftIcon?: React.ReactNode;
  
  /** Right icon component */
  rightIcon?: React.ReactNode;
  
  /** Make right icon pressable */
  onRightIconPress?: () => void;
  
  /** Full width input */
  fullWidth?: boolean;
  
  /** Additional container styles */
  containerStyle?: object;
  
  /** Additional input styles */
  style?: TextInputProps['style'];
}

// Size configurations with Tailwind classes
const SIZE_CONFIG = {
  sm: {
    containerClass: 'h-9',
    inputClass: 'px-3',
    fontSize: 12,
  },
  md: {
    containerClass: 'h-12',
    inputClass: 'px-4',
    fontSize: 14,
  },
  lg: {
    containerClass: 'h-14',
    inputClass: 'px-5',
    fontSize: 16,
  },
};

export const CustomInput: React.FC<CustomInputProps> = ({
  size = 'md',
  variant = 'outline',
  label,
  helperText,
  error,
  success = false,
  disabled = false,
  leftIcon,
  rightIcon,
  onRightIconPress,
  fullWidth = true,
  containerStyle,
  style,
  ...props
}) => {
  const colors = useThemeColors();
  const { typography } = useTypography();
  const [isFocused, setIsFocused] = useState(false);

  const sizeConfig = SIZE_CONFIG[size];
  const hasError = !!error;

  // Get border color based on state
  const getBorderColor = () => {
    if (disabled) return colors.border.secondary;
    if (hasError) return colors.border.error;
    if (success) return colors.status.success;
    if (isFocused) return colors.border.focus;
    return colors.border.primary;
  };

  // Get background color based on variant
  const getBackgroundColor = () => {
    if (disabled) return colors.background.tertiary;
    if (variant === 'filled') return colors.background.secondary;
    return colors.background.primary;
  };

  // Build container className
  const containerClassName = [
    'mb-4',
    fullWidth && 'w-full',
  ]
    .filter(Boolean)
    .join(' ');

  // Build input container className
  const inputContainerClassName = [
    'flex-row items-center rounded-lg overflow-hidden',
    sizeConfig.containerClass,
    variant === 'outline' && 'border',
    variant === 'default' && 'border-b',
  ]
    .filter(Boolean)
    .join(' ');

  // Build input className
  const inputClassName = [
    'flex-1',
    sizeConfig.inputClass,
    leftIcon && 'pl-0',
    rightIcon && 'pr-0',
  ]
    .filter(Boolean)
    .join(' ');

  const inputContainerStyle = {
    backgroundColor: getBackgroundColor(),
    borderColor: getBorderColor(),
  };

  const inputStyle = [
    {
      fontSize: sizeConfig.fontSize,
      lineHeight: typography.body.md.lineHeight,
      color: disabled ? colors.text.tertiary : colors.text.primary,
    },
    style,
  ];

  return (
    <View className={containerClassName} style={containerStyle}>
      {/* Label */}
      {label && (
        <CustomText
          variant="label"
          weight="medium"
          color={hasError ? 'error' : 'secondary'}
          style={{ marginBottom: 6 }}
        >
          {label}
        </CustomText>
      )}

      {/* Input Container */}
      <View className={inputContainerClassName} style={inputContainerStyle}>
        {/* Left Icon */}
        {leftIcon && (
          <View className="pl-3 pr-2 justify-center items-center">
            {leftIcon}
          </View>
        )}

        {/* Text Input */}
        <TextInput
          editable={!disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={colors.text.tertiary}
          className={inputClassName}
          style={inputStyle}
          {...props}
        />

        {/* Right Icon */}
        {rightIcon && (
          <Pressable
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
            className="pr-3 pl-2 justify-center items-center"
          >
            {rightIcon}
          </Pressable>
        )}
      </View>

      {/* Helper Text or Error */}
      {(helperText || error) && (
        <CustomText
          variant="caption"
          color={hasError ? 'error' : success ? 'success' : 'secondary'}
          style={{ marginTop: 4, marginLeft: 4 }}
        >
          {error || helperText}
        </CustomText>
      )}
    </View>
  );
};
