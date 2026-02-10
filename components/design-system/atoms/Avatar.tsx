import React from 'react';
import { Image, ImageProps, View, Text } from 'react-native';
import { colors } from '../tokens';

export interface AvatarProps {
  source?: ImageProps['source'];
  size?: 'sm' | 'md' | 'lg' | 'xl';
  initials?: string;
  backgroundColor?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  size = 'md',
  initials,
  backgroundColor = colors.primary,
}) => {
  const sizeClass = size === 'sm' ? 'w-8 h-8' :
                    size === 'md' ? 'w-12 h-12' :
                    size === 'lg' ? 'w-16 h-16' :
                    'w-24 h-24';

  const textSize = size === 'sm' ? 'text-xs' :
                   size === 'md' ? 'text-base' :
                   size === 'lg' ? 'text-xl' :
                   'text-3xl';

  if (source) {
    return (
      <Image
        source={source}
        className={`${sizeClass} rounded-full`}
        resizeMode="cover"
      />
    );
  }

  if (initials) {
    return (
      <View
        className={`${sizeClass} rounded-full items-center justify-center`}
        style={{ backgroundColor }}>
        <Text className={`${textSize} font-lato-bold text-white`}>
          {initials.toUpperCase()}
        </Text>
      </View>
    );
  }

  return (
    <View
      className={`${sizeClass} rounded-full items-center justify-center bg-gray-300`}
    />
  );
};

Avatar.displayName = 'Avatar';
