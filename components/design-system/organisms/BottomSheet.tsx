import React, { useEffect, useRef, useState } from 'react';
import { Modal, View, Pressable, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '../atoms/Icon';
import { IconButton } from '../atoms/IconButton';
import { colors } from '../tokens';
import { animations } from '../tokens/animations';

export interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  height?: string | number;
  showHandle?: boolean;
  showCloseButton?: boolean;
  children: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  height = '95%',
  showHandle = true,
  showCloseButton = true,
  children,
}) => {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      // Small delay to ensure modal is mounted before animation starts
      setTimeout(() => {
        Animated.parallel([
          Animated.spring(slideAnim, {
            toValue: 1,
            useNativeDriver: true,
            tension: animations.spring.standard.tension,
            friction: animations.spring.standard.friction,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: animations.timing.normal,
            useNativeDriver: true,
          }),
        ]).start();
      }, 50);
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: animations.timing.normal,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Hide modal after animation completes
        setModalVisible(false);
      });
    }
  }, [visible, slideAnim, fadeAnim]);

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="none"
      onRequestClose={onClose}>
      <Animated.View className="flex-1 bg-black/50" style={{ opacity: fadeAnim }}>
        <Pressable className="flex-1" onPress={onClose}>
          <Animated.View
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl"
            style={{
              height: typeof height === 'number' ? height : height,
              paddingTop: 20,
              paddingBottom: insets.bottom + 20,
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1000, 0],
                  }),
                },
              ],
            }}>
            <Pressable className="flex-1" onPress={(e) => e.stopPropagation()}>
              {/* Header with close button and handle */}
              {(showHandle || showCloseButton) && (
                <View className="flex-row items-center px-5 mb-4">
                  {showCloseButton && (
                    <IconButton
                      icon={<Icon name="close" size={24} color={colors.gray[900]} />}
                      variant="ghost"
                      onPress={onClose}
                      className="-ml-2"
                    />
                  )}
                  {showHandle && (
                    <View className="flex-1 items-center -ml-8">
                      <View className="w-12 h-1 bg-gray-300 rounded-full" />
                    </View>
                  )}
                </View>
              )}

              {/* Content */}
              <View className="flex-1 px-5">{children}</View>
            </Pressable>
          </Animated.View>
        </Pressable>
      </Animated.View>
    </Modal>
  );
};

BottomSheet.displayName = 'BottomSheet';
