import React from 'react';
import { Pressable as RNPressable, PressableProps as RNPressableProps } from 'react-native';
import * as Haptics from 'expo-haptics';

export interface PressableProps extends RNPressableProps {
  hapticFeedback?: boolean;
  hapticStyle?: 'light' | 'medium' | 'heavy';
}

export const Pressable = React.forwardRef<RNPressable, PressableProps>(
  ({ hapticFeedback = false, hapticStyle = 'light', onPress, ...props }, ref) => {
    const handlePress = (event: any) => {
      if (hapticFeedback) {
        const impactStyle = hapticStyle === 'light' ? Haptics.ImpactFeedbackStyle.Light :
                           hapticStyle === 'medium' ? Haptics.ImpactFeedbackStyle.Medium :
                           Haptics.ImpactFeedbackStyle.Heavy;

        Haptics.impactAsync(impactStyle);
      }

      onPress?.(event);
    };

    return <RNPressable ref={ref} onPress={handlePress} {...props} />;
  }
);

Pressable.displayName = 'Pressable';
