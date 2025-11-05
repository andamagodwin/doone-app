/**
 * ScreenHeader Molecule
 *
 * Navigation bar with title and action buttons.
 */

import React from 'react';
import { View } from 'react-native';
import { CustomText, CustomButton, Icon, Spacer } from '~/components/Atoms';

export interface ScreenHeaderProps {
  title: string;
  onAddPress?: () => void;
  onSettingsPress?: () => void;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title, onAddPress, onSettingsPress }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 }}>
      <CustomText variant="h2" weight="bold" style={{ flex: 1 }}>
        {title}
      </CustomText>

      {/* Add Task */}
      <CustomButton variant="primary" size="sm" onPress={onAddPress}>
        + Add
      </CustomButton>

      <Spacer size="3" horizontal />

      {/* Settings */}
      <Icon family="Ionicons" name="settings-outline" variant="secondary" />
    </View>
  );
};

export default ScreenHeader;
