/**
 * Spacer Atom
 *
 * Renders empty space with consistent sizing using the Tailwind scale.
 */

import React from 'react';
import { View } from 'react-native';

export type SpaceSize = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16';

export interface SpacerProps {
  size?: SpaceSize; // default '4'
  horizontal?: boolean; // if true => width, else => height
  style?: any;
}

const SCALE: Record<SpaceSize, number> = {
  '0': 0,
  '1': 4,
  '2': 8,
  '3': 12,
  '4': 16,
  '5': 20,
  '6': 24,
  '8': 32,
  '10': 40,
  '12': 48,
  '16': 64,
};

export const Spacer: React.FC<SpacerProps> = ({ size = '4', horizontal = false, style }) => {
  const px = SCALE[size];
  return <View style={[horizontal ? { width: px } : { height: px }, style]} />;
};

export default Spacer;
