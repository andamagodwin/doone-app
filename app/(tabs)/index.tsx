import { View, Pressable } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DateScroller, Text, Button } from '~/components/design-system';

export default function Home() {
  const insets = useSafeAreaInsets();
  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const [selectedDate, setSelectedDate] = useState<Date>(today);

  // Get display text for the header
  const getHeaderText = () => {
    const selected = new Date(selectedDate);
    selected.setHours(0, 0, 0, 0);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    const diffTime = selected.getTime() - todayDate.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === -1) {
      return 'Yesterday';
    } else if (diffDays === 1) {
      return 'Tomorrow';
    } else {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${monthNames[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`;
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const goToOnboarding = async () => {
    // Clear the flag so onboarding shows again
    await AsyncStorage.removeItem('hasSeenOnboarding');
    router.replace('/onboarding' as any);
  };

  return (
    <View className='flex-1 bg-primary/10'>
      {/* Header */}
      <View
        className="px-5 pb-5"
        style={{ paddingTop: insets.top + 16 }}>
        <View className="flex-row items-center justify-between mb-7">
          <View className="flex-1" />
          <Text variant="body" className="text-xl font-lato-bold text-gray-900">
            {getHeaderText()}
          </Text>
          <View className="flex-1 items-end">
            <Pressable
              className="p-2 active:opacity-50"
              onPress={() => {
                // Handle menu action
                console.log('Menu pressed');
                // TODO: Open menu/options
              }}
            >
              <View className="flex-row gap-1.5">
                <View className="w-1 h-1 rounded-full bg-gray-900" />
                <View className="w-1 h-1 rounded-full bg-gray-900" />
                <View className="w-1 h-1 rounded-full bg-gray-900" />
              </View>
            </Pressable>
          </View>
        </View>

        {/* Horizontal Date Scroller */}
        <DateScroller
          onDateSelect={handleDateSelect}
          initialDate={today}
          daysRange={30}
        />
      </View>

      {/* Content Area */}
      <View className='flex-1 items-center bg-white justify-center px-8 rounded-t-3xl'>
        <Text variant="body" className="mb-4 text-gray-600">
          Your tasks will appear here
        </Text>

        <Button
          title="Go to Onboarding"
          variant="primary"
          onPress={goToOnboarding}
          size="lg"
          className="w-full"
        />
      </View>
    </View>
  );
}
