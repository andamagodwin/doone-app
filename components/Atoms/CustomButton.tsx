/**
 * CustomButton Component
 * 
 * Main interactive element with theme-aware colors,
 * different variants, and proper touch feedback using NativeWind.
 */

import React from 'react';
import {
  Pressable,
  PressableProps,
  ActivityIndicator,
  ViewStyle,
  View,
} from 'react-native';
import { useThemeColors } from '~/theme';
import { CustomText, TextVariant } from './CustomText';

export type ButtonVariant = 'primary' | 'secondary' | 'text' | 'outline' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface CustomButtonProps extends Omit<PressableProps, 'style'> {
  /** Button variant */
  variant?: ButtonVariant;
  
  /** Button size */
  size?: ButtonSize;
  
  /** Button text/label */
  children: React.ReactNode;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Loading state */
  loading?: boolean;
  
  /** Full width button */
  fullWidth?: boolean;
  
  /** Icon component (left side) */
  leftIcon?: React.ReactNode;
  
  /** Icon component (right side) */
  rightIcon?: React.ReactNode;
  
  /** Additional custom styles */
  style?: ViewStyle;
  
  /** onPress handler */
  onPress?: () => void;
}

// Size configurations using numeric paddings to ensure visible container
const SIZE_CONFIG = {
  sm: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    textVariant: 'body-sm' as TextVariant,
    iconSize: 16,
  },
  md: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    textVariant: 'button' as TextVariant,
    iconSize: 20,
  },
  lg: {
    paddingVertical: 16,
    paddingHorizontal: 28,
    textVariant: 'body-lg' as TextVariant,
    iconSize: 24,
  },
} as const;

export const CustomButton: React.FC<CustomButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  onPress,
  ...props
}) => {
  const colors = useThemeColors();
  const sizeConfig = SIZE_CONFIG[size];

  // Get button styles based on variant and state
  const getButtonStyles = (pressed: boolean): ViewStyle => {
    const isDisabled = disabled || loading;

    if (isDisabled) {
      return {
        backgroundColor:
          variant === 'text' ? 'transparent' : colors.interactive.disabled,
        borderColor: variant === 'outline' ? colors.interactive.disabled : undefined,
        borderWidth: variant === 'outline' ? 1 : 0,
        opacity: 0.6,
      };
    }

    // Variant-specific styles
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: pressed
            ? colors.interactive.primaryPressed
            : colors.interactive.primary,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: pressed ? 1 : 2 },
          shadowOpacity: 0.1,
          shadowRadius: pressed ? 2 : 4,
          elevation: pressed ? 1 : 3,
        };

      case 'secondary':
        return {
          backgroundColor: pressed
            ? colors.interactive.secondaryPressed
            : colors.interactive.secondary,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: pressed ? 1 : 2 },
          shadowOpacity: 0.1,
          shadowRadius: pressed ? 2 : 4,
          elevation: pressed ? 1 : 3,
        };

      case 'outline':
        return {
          backgroundColor: pressed ? colors.background.tertiary : colors.background.primary,
          borderColor: colors.interactive.primary,
          borderWidth: 2,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 1,
        };

      case 'text':
        return {
          backgroundColor: pressed ? colors.background.tertiary : 'transparent',
        };

      case 'danger':
        return {
          backgroundColor: pressed ? '#B71C1C' : colors.status.error,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: pressed ? 1 : 2 },
          shadowOpacity: 0.15,
          shadowRadius: pressed ? 2 : 4,
          elevation: pressed ? 1 : 3,
        };

      default:
        return {
          backgroundColor: colors.interactive.primary,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        };
    }
  };

  // Get text color based on variant
  const getTextColor = () => {
    if (disabled || loading) {
      return 'tertiary';
    }

    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'danger':
        return 'inverse';
      case 'outline':
      case 'text':
        return 'brand-primary';
      default:
        return 'inverse';
    }
  };

  return (
    <Pressable
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [fullWidth ? { width: '100%' } : null, style]}
      {...props}
    >
      {({ pressed }) => (
        <View
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              paddingVertical: sizeConfig.paddingVertical,
              paddingHorizontal: sizeConfig.paddingHorizontal,
            },
            getButtonStyles(pressed),
          ]}
        >
          {loading ? (
            <ActivityIndicator
              size="small"
              color={
                variant === 'primary' || variant === 'secondary' || variant === 'danger'
                  ? colors.text.inverse
                  : colors.brand.primary
              }
            />
          ) : (
            <CustomText
              variant={sizeConfig.textVariant}
              weight="semibold"
              color={getTextColor()}
            >
              {leftIcon && <>{leftIcon} </>}
              {children}
              {rightIcon && <> {rightIcon}</>}
            </CustomText>
          )}
        </View>
      )}
    </Pressable>
  );
};
