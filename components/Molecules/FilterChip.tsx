/**
 * FilterChip Molecule
 *
 * Toggleable chip for filtering tasks.
 */

import React, { useState } from 'react';
import { ViewStyle } from 'react-native';
import { CustomText, CustomPressable } from '~/components/Atoms';
import { useThemeColors } from '~/theme';

export interface FilterChipProps {
  label: string;
  selected?: boolean;
  onChange?: (selected: boolean) => void;
  style?: ViewStyle;
}

export const FilterChip: React.FC<FilterChipProps> = ({ label, selected, onChange, style }) => {
  const colors = useThemeColors();
  const [internal, setInternal] = useState(false);
  const isSelected = selected ?? internal;

  const handlePress = () => {
    const next = !isSelected;
    setInternal(next);
    onChange?.(next);
  };

  return (
    <CustomPressable
      onPress={handlePress}
      border
      rounded="xl"
      // CustomPressable expects a single style object; merge manually
      style={{
        paddingVertical: 8,
        paddingHorizontal: 12,
        alignSelf: 'flex-start',
        backgroundColor: isSelected ? colors.brand.primary : colors.background.primary,
        borderColor: isSelected ? colors.brand.primary : colors.border.primary,
        ...(style || {}),
      }}
    >
      <CustomText variant="body-sm" color={isSelected ? 'inverse' : 'secondary'}>
        {label}
      </CustomText>
    </CustomPressable>
  );
};

export default FilterChip;
