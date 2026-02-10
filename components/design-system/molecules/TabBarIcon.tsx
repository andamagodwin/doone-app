import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, IconProps } from '../atoms/Icon';

export interface TabBarIconProps extends Omit<IconProps, 'size'> {
  focused?: boolean;
  size?: number;
}

export const TabBarIcon: React.FC<TabBarIconProps> = ({
  focused = false,
  size = 28,
  color,
  ...props
}) => {
  return <Icon size={size} color={color} style={styles.tabBarIcon} {...props} />;
};

TabBarIcon.displayName = 'TabBarIcon';

const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: -3,
  },
});
