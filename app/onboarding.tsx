/**
 * Onboarding Screen
 * 
 * First-time user experience with three intro slides
 * explaining the app's core features.
 */

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, FlatList, Dimensions, ViewToken, Pressable } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CalendarBro from '../assets/onboarding/Calendar-bro.svg';
import TimeManagementBro from '../assets/onboarding/Time-management-bro.svg';
import BulletJournalBro from '../assets/onboarding/Bullet-journal-bro.svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  illustrationType: 'svg' | 'emoji';
  emojiContent?: string;
}

const slidesData: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Manage your tasks',
    description: 'You can easily manage all of your daily\ntasks in Doone for free',
    illustrationType: 'svg',
  },
  {
    id: '2',
    title: 'Create daily routine',
    description: 'In Uptodo you can create your\npersonalized routine to stay productive',
    illustrationType: 'svg',
  },
  {
    id: '3',
    title: 'Organize your tasks',
    description: 'You can organize your daily tasks by\nadding your tasks into separate categories',
    illustrationType: 'svg',
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Check if user has already seen onboarding
  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
      if (hasSeenOnboarding === 'true') {
        // User has seen onboarding, skip to main app
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    }
  };

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const handleNext = () => {
    if (currentIndex < slidesData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      handleGetStarted();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
    }
  };

  const handleGetStarted = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    router.replace('/start' as any);
  };

  const renderSlide = ({ item }: { item: OnboardingSlide }) => (
    <View style={{ width: SCREEN_WIDTH }} className="flex-1 items-center justify-center px-8">
      {/* Illustration */}
      <View className="mb-12 h-64 w-64 items-center justify-center">
        {item.id === '1' && <CalendarBro width={256} height={256} />}
        {item.id === '2' && <TimeManagementBro width={256} height={256} />}
        {item.id === '3' && <BulletJournalBro width={256} height={256} />}
      </View>

      {/* Pagination dots */}
      <View className="mb-12 flex-row">
        {slidesData.map((_, index) => (
          <View
            key={index}
            className="mx-1 h-2 rounded"
            style={{
              width: index === currentIndex ? 24 : 8,
              backgroundColor: index === currentIndex ? '#36cf94' : '#4D4D4D',
            }}
          />
        ))}
      </View>

      {/* Title */}
      <Text className="mb-4 text-center text-[32px] font-bold text-primary">
        {item.title}
      </Text>

      {/* Description */}
      <Text className="mb-16 text-center text-base leading-6 text-gray-400">
        {item.description}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-[#f5f8fa]">

      <FlatList
        ref={flatListRef}
        data={slidesData}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        scrollEventThrottle={32}
      />

      {/* Navigation buttons */}
      <View className="mb-12 flex-row items-center justify-between px-8">
        <Pressable
          onPress={handleBack}
          className="px-6 py-3"
          style={{ opacity: currentIndex === 0 ? 0.3 : 1 }}
          disabled={currentIndex === 0}
        >
          <Text className="text-sm font-semibold text-gray-400">BACK</Text>
        </Pressable>

        <Pressable
          onPress={handleNext}
          className="min-w-[120px] items-center rounded-lg bg-primary px-12 py-3.5 active:opacity-80"
        >
          <Text className="text-sm font-semibold text-white">
            {currentIndex === slidesData.length - 1 ? 'GET STARTED' : 'NEXT'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
