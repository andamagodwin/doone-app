import React, { useEffect, useRef, useState } from 'react';
import { Modal, View, Pressable, Animated, Dimensions, StyleSheet } from 'react-native';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '../atoms/Icon';
import { IconButton } from '../atoms/IconButton';
import { colors } from '../tokens';
import { animations } from '../tokens/animations';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const DISMISS_THRESHOLD = 0.3; // Dismiss if dragged down 30% of sheet height
const VELOCITY_THRESHOLD = 1000; // Dismiss if velocity is above this when releasing

export interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  height?: string | number;
  snapPoints?: number[]; // Percentage values (e.g., [50, 95] for half and full)
  initialSnapPoint?: number; // Index in snapPoints array
  showHandle?: boolean;
  showCloseButton?: boolean;
  enableDrag?: boolean;
  children: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  height = '95%',
  snapPoints,
  initialSnapPoint = 0,
  showHandle = true,
  showCloseButton = true,
  enableDrag = true,
  children,
}) => {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSnapIndex, setCurrentSnapIndex] = useState(initialSnapPoint);

  // Calculate sheet height in pixels
  const getSheetHeight = () => {
    if (typeof height === 'number') return height;
    if (typeof height === 'string' && height.endsWith('%')) {
      const percentage = parseInt(height);
      return (SCREEN_HEIGHT * percentage) / 100;
    }
    return SCREEN_HEIGHT * 0.95;
  };

  const sheetHeight = getSheetHeight();

  const translateY = useRef(new Animated.Value(sheetHeight)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const lastGestureY = useRef(0);

  // Get snap point height
  const getSnapHeight = (index: number) => {
    if (!snapPoints || !snapPoints[index]) return sheetHeight;
    return (SCREEN_HEIGHT * snapPoints[index]) / 100;
  };

  const currentHeight = snapPoints ? getSnapHeight(currentSnapIndex) : sheetHeight;

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      lastGestureY.current = 0;

      setTimeout(() => {
        Animated.parallel([
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            tension: animations.spring.standard.tension,
            friction: animations.spring.standard.friction,
            velocity: 0,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: animations.timing.normal,
            useNativeDriver: true,
          }),
        ]).start();
      }, 10);
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: currentHeight,
          duration: animations.timing.fast,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: animations.timing.fast,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setModalVisible(false);
        setCurrentSnapIndex(initialSnapPoint);
      });
    }
  }, [visible]);

  const handleGesture = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    {
      useNativeDriver: true,
      listener: (event: any) => {
        const { translationY } = event.nativeEvent;
        // Prevent dragging up beyond the top
        if (translationY < 0) {
          translateY.setValue(translationY * 0.3); // Rubber-band effect
        } else {
          lastGestureY.current = translationY;
        }
      },
    }
  );

  const handleGestureEnd = (event: any) => {
    const { translationY, velocityY } = event.nativeEvent;

    // Fast downward swipe - dismiss immediately
    if (velocityY > VELOCITY_THRESHOLD) {
      dismissSheet();
      return;
    }

    // Dragged past threshold - dismiss
    if (translationY > currentHeight * DISMISS_THRESHOLD) {
      dismissSheet();
      return;
    }

    // Snap back to current position
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      tension: animations.spring.bouncy.tension,
      friction: animations.spring.bouncy.friction,
      velocity: velocityY / 1000,
    }).start();
  };

  const dismissSheet = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: currentHeight,
        duration: animations.timing.fast,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: animations.timing.fast,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  const handleBackdropPress = () => {
    dismissSheet();
  };

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent>
      <GestureHandlerRootView style={styles.gestureContainer}>
        <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
          <Pressable style={styles.backdropPressable} onPress={handleBackdropPress} />

          <PanGestureHandler
            onGestureEvent={enableDrag ? handleGesture : undefined}
            onHandlerStateChange={enableDrag ? handleGestureEnd : undefined}
            enabled={enableDrag}>
            <Animated.View
              style={[
                styles.sheet,
                {
                  height: currentHeight,
                  paddingBottom: insets.bottom + 20,
                  transform: [{ translateY }],
                },
              ]}>
              {/* Drag Handle Area */}
              {showHandle && (
                <View style={styles.handleContainer}>
                  <View style={styles.handle} />
                </View>
              )}

              {/* Close Button */}
              {showCloseButton && (
                <View style={styles.closeButtonContainer}>
                  <IconButton
                    icon={<Icon name="close" size={24} color={colors.gray[600]} />}
                    variant="ghost"
                    onPress={dismissSheet}
                  />
                </View>
              )}

              {/* Content */}
              <View style={styles.content}>{children}</View>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </GestureHandlerRootView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  gestureContainer: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdropPressable: {
    flex: 1,
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background.primary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 24,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingTop: 16,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.gray[300],
    borderRadius: 2,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

BottomSheet.displayName = 'BottomSheet';
