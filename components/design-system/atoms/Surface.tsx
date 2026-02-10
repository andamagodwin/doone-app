import React from 'react';
import { SafeAreaView, View, ViewProps } from 'react-native';
import { SurfaceVariant } from '../types';
import { shadows } from '../tokens';

export interface SurfaceProps extends ViewProps {
  variant?: SurfaceVariant;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  useSafeArea?: boolean;
  children: React.ReactNode;
}

export const Surface: React.FC<SurfaceProps> = ({
  variant = 'default',
  padding = 'md',
  useSafeArea = false,
  children,
  className = '',
  style,
  ...props
}) => {
  const variantClass = variant === 'elevated' ? 'bg-white shadow-md' :
                       variant === 'outlined' ? 'bg-white border border-gray-200' :
                       'bg-white';

  const paddingClass = padding === 'none' ? '' :
                       padding === 'sm' ? 'p-2' :
                       padding === 'md' ? 'p-6' :
                       'p-8';

  const combinedClassName = `${variantClass} ${paddingClass} ${className}`.trim();
  const combinedStyle = variant === 'elevated' ? [shadows.md, style] : style;

  const Container = useSafeArea ? SafeAreaView : View;

  return (
    <Container className={combinedClassName} style={combinedStyle} {...props}>
      {children}
    </Container>
  );
};

Surface.displayName = 'Surface';
