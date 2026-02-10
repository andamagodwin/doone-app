import { View, Pressable } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useMemo } from 'react';
import { DateScroller, Text, Button } from '~/components/design-system';

export default function Home() {
  const today = useMemo(() => new Date(), []);
  const [selectedDate, setSelectedDate] = useState({
    date: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear(),
  });

  // Get display text for the header
  const getHeaderText = () => {
    const selected = new Date(selectedDate.year, selectedDate.month, selectedDate.date);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);

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
      return `${monthNames[selectedDate.month]} ${selectedDate.date}, ${selectedDate.year}`;
    }
  };

  const handleDateSelect = (date: { date: number; month: number; year: number }) => {
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
      <View className="px-5 pt-12 pb-4">
        <View className="flex-row items-center justify-center mb-6 relative">
          <Text variant="body" className="text-lg font-lato-bold text-gray-900">
            {getHeaderText()}
          </Text>
          <Pressable
            className="p-2 active:opacity-50 absolute right-0"
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
