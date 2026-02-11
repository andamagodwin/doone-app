import React from 'react';
import { View, ViewProps } from 'react-native';
import { Heading } from '../atoms/Heading';
import { Text } from '../atoms/Text';

export interface OnboardingSlideProps extends ViewProps {
  title: string;
  description: string;
  illustration?: React.ReactNode;
}

export const OnboardingSlide: React.FC<OnboardingSlideProps> = ({
  title,
  description,
  illustration,
  className = '',
  ...props
}) => {
  return (
    <View className={`flex-1 items-center justify-center px-8 ${className}`.trim()} {...props}>
      {/* Illustration */}
      {illustration && <View className="mb-12">{illustration}</View>}

      {/* Title */}
      <Heading level="h2" className="text-center mb-4 text-gray-900">
        {title}
      </Heading>

      {/* Description */}
      <Text variant="body" className="text-center text-gray-600 leading-relaxed">
        {description}
      </Text>
    </View>
  );
};

OnboardingSlide.displayName = 'OnboardingSlide';
