import { View, Text, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';

export default function Home() {
  const today = useMemo(() => new Date(), []);
  const scrollViewRef = useRef<ScrollView>(null);
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  // Generate week dates centered around today
  const generateWeekDates = () => {
    const dates = [];
    const currentDate = new Date();
    
    // Generate 60 days (30 before and 30 after today)
    for (let i = -30; i <= 30; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      
      const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
      dates.push({
        day: dayNames[date.getDay()],
        date: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        fullDate: date,
      });
    }
    return dates;
  };

  const [weekDates] = useState(generateWeekDates());
  const itemPositions = useRef<Record<string, number>>({});
  const getKey = (d: { date: number; month: number; year: number }) => `${d.year}-${d.month}-${d.date}`;
  const scrollToDate = useCallback((d: { date: number; month: number; year: number }) => {
    const key = getKey(d);
    const x = itemPositions.current[key];
    if (x != null && scrollViewRef.current) {
      // Align selected/today to the left edge with small padding
      scrollViewRef.current.scrollTo({ x: Math.max(0, x - 10), animated: false });
    }
  }, []);

  // Scroll to today's date on mount
  useEffect(() => {
    // Scroll after initial layout so positions are measured
    const id = setTimeout(() => {
      scrollToDate({ date: today.getDate(), month: today.getMonth(), year: today.getFullYear() });
    }, 50);
    return () => clearTimeout(id);
  }, [weekDates, today, scrollToDate]);

  // Get display text for the header
  const getHeaderText = () => {
    const selected = new Date(selectedYear, selectedMonth, selectedDate);
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
      return `${monthNames[selectedMonth]} ${selectedDate}, ${selectedYear}`;
    }
  };

  const handleDateSelect = (item: any) => {
    setSelectedDate(item.date);
    setSelectedMonth(item.month);
    setSelectedYear(item.year);
  };

  const goToOnboarding = async () => {
    // Clear the flag so onboarding shows again
    await AsyncStorage.removeItem('hasSeenOnboarding');
    router.replace('/onboarding' as any);
  };

  return (
    <View className='flex-1 bg-gray-50'>
      {/* Header */}
      <View className="bg-white px-5 pt-12 pb-4">
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-xl font-bold text-gray-900">{getHeaderText()}</Text>
          <Pressable className="p-2">
            <View className="flex-row space-x-1">
              <View className="w-1 h-1 rounded-full bg-gray-900" />
              <View className="w-1 h-1 rounded-full bg-gray-900" />
              <View className="w-1 h-1 rounded-full bg-gray-900" />
            </View>
          </Pressable>
        </View>

        {/* Horizontal Date Scroller */}
        <ScrollView 
          ref={scrollViewRef}
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10, gap: 11 }}
          style={{ marginHorizontal: -20 }}
        >
          {weekDates.map((item, index) => {
            const isSelected = item.date === selectedDate && 
                             item.month === selectedMonth && 
                             item.year === selectedYear;
            const isTodayItem = item.date === today.getDate() && item.month === today.getMonth() && item.year === today.getFullYear();
            
            return (
              <Pressable
                key={index}
                onLayout={(e) => {
                  itemPositions.current[getKey(item)] = e.nativeEvent.layout.x;
                }}
                onPress={() => handleDateSelect(item)}
                className={`items-center px-2 py-2 rounded-full min-w-[40px] ${
                  isSelected ? 'bg-primary' : isTodayItem ? 'bg-gray-100/60' : 'bg-transparent'
                } active:bg-gray-200`}
              >
                <Text className={`text-sm mb-1 ${isSelected ? 'text-white font-semibold' : 'text-gray-500'}`}>
                  {item.day}
                </Text>
                <Text 
                  className={`text-md p-1 rounded-full ${
                    isSelected 
                      ? 'text-gray-700 bg-white' 
                      : 'text-gray-700'
                  }`}
                >
                  {item.date}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Content Area */}
      <View className='flex-1 items-center bg-white justify-center px-8'>
        <Text className="mb-4 text-lg text-gray-600">Your tasks will appear here</Text>
        
        <Pressable
          onPress={goToOnboarding}
          className="w-full rounded-lg bg-primary px-6 py-4 active:opacity-80"
        >
          <Text className="text-center text-base font-semibold text-white">
            Go to Onboarding
          </Text>
        </Pressable>
      </View>
    </View>
  );
}