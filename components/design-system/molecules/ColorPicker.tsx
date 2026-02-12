import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { colors } from '../tokens';
import { Icon } from '../atoms/Icon';

export interface ColorPickerProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
  colors?: string[];
  size?: number;
}

const DEFAULT_COLORS = [
  colors.primary,
  colors.secondary,
  colors.error,
  colors.warning,
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#10b981', // emerald
];

export const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onColorSelect,
  colors: customColors = DEFAULT_COLORS,
  size = 40,
}) => {
  return (
    <View style={styles.container}>
      {customColors.map((color) => {
        const isSelected = color === selectedColor;
        return (
          <Pressable
            key={color}
            onPress={() => onColorSelect(color)}
            style={[
              styles.colorCircle,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: color,
              },
              isSelected && styles.selectedCircle,
            ]}>
            {isSelected && <Icon name="check" size={20} color="#fff" />}
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCircle: {
    borderColor: '#fff',
    borderWidth: 3,
  },
});

ColorPicker.displayName = 'ColorPicker';
