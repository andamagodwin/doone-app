import React, { useState, useRef, useEffect, useMemo } from 'react';
import { FlatList, Pressable, ListRenderItemInfo } from 'react-native';
import { Text } from '../atoms/Text';

interface DateItem {
  day: string;
  date: number;
  month: number;
  year: number;
  key: string;
}

export interface DateScrollerProps {
  onDateSelect?: (date: Date) => void;
  initialDate?: Date;
  daysRange?: number;
}

// Move constants outside component to avoid recreation
const DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const ITEM_WIDTH = 56;
const ITEM_GAP = 8;
const TOTAL_ITEM_WIDTH = ITEM_WIDTH + ITEM_GAP;

// Utility to create date key
const getDateKey = (date: Date): string =>
  `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

// Utility to check if two dates are same day
const isSameDay = (date1: Date, date2: Date): boolean =>
  date1.getDate() === date2.getDate() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getFullYear() === date2.getFullYear();

export const DateScroller: React.FC<DateScrollerProps> = ({
  onDateSelect,
  initialDate = new Date(),
  daysRange = 30,
}) => {
  const flatListRef = useRef<FlatList>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);

  // Memoize today's date and key once
  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const todayKey = useMemo(() => getDateKey(today), [today]);

  // Generate dates centered around today - memoized with proper dependencies
  const weekDates = useMemo(() => {
    const dates: DateItem[] = [];
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Generate dates (daysRange before and daysRange after today)
    for (let i = -daysRange; i <= daysRange; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);

      dates.push({
        day: DAY_NAMES[date.getDay()],
        date: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        key: getDateKey(date),
      });
    }
    return dates;
  }, [daysRange]);

  // Calculate snap points for every week (7 days)
  const snapOffsets = useMemo(() => {
    const offsets: number[] = [];
    for (let i = 0; i < weekDates.length; i += 7) {
      offsets.push(i * TOTAL_ITEM_WIDTH);
    }
    return offsets;
  }, [weekDates]);

  // Find initial scroll index - snap to the week containing the initial date
  const initialScrollIndex = useMemo(() => {
    const initialKey = getDateKey(initialDate);
    const dateIndex = weekDates.findIndex(item => item.key === initialKey);
    if (dateIndex === -1) return 0;
    // Snap to the start of the week (every 7 days)
    return Math.floor(dateIndex / 7) * 7;
  }, [weekDates, initialDate]);

  // Scroll to initial date on mount
  useEffect(() => {
    if (initialScrollIndex !== -1 && flatListRef.current) {
      const timeout = setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: initialScrollIndex,
          animated: false,
          viewPosition: 0,
        });
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [initialScrollIndex]);

  const handleDateSelect = (item: DateItem) => {
    const newDate = new Date(item.year, item.month, item.date);
    setSelectedDate(newDate);
    onDateSelect?.(newDate);
  };

  // Memoized render item
  const renderItem = ({ item }: ListRenderItemInfo<DateItem>) => {
    const itemDate = new Date(item.year, item.month, item.date);
    const isSelected = isSameDay(selectedDate, itemDate);
    const isTodayItem = item.key === todayKey;

    return (
      <Pressable
        onPress={() => handleDateSelect(item)}
        className={`items-center px-2.5 py-3.5 rounded-2xl w-[56px] ${
          isSelected
            ? 'bg-primary shadow-xs'
            : isTodayItem
            ? 'bg-primary/10 border-1 border-primary/20'
            : 'bg-transparent'
        } active:scale-95`}
        style={{ marginRight: ITEM_GAP }}>
        <Text
          variant="caption"
          className={`mb-2 font-lato-bold ${
            isSelected
              ? 'text-white'
              : isTodayItem
              ? 'text-primary'
              : 'text-gray-500'
          }`}>
          {item.day}
        </Text>
        <Text
          variant="bodySmall"
          className={`py-1.5 px-2.5 rounded-xl font-lato-bold min-w-[24px] text-center ${
            isSelected
              ? 'text-gray-900 bg-white shadow-xs'
              : isTodayItem
              ? 'text-primary bg-white border-2 border-primary/30'
              : 'text-gray-700 bg-gray-100'
          }`}>
          {item.date}
        </Text>
      </Pressable>
    );
  };

  // Optimized layout calculation
  const getItemLayout = (_: any, index: number) => ({
    length: TOTAL_ITEM_WIDTH,
    offset: TOTAL_ITEM_WIDTH * index,
    index,
  });

  const keyExtractor = (item: DateItem) => item.key;

  return (
    <FlatList
      ref={flatListRef}
      data={weekDates}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToOffsets={snapOffsets}
      snapToAlignment="start"
      decelerationRate="fast"
      getItemLayout={getItemLayout}
      initialScrollIndex={initialScrollIndex}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      style={{ marginHorizontal: -20 }}
      removeClippedSubviews
      maxToRenderPerBatch={15}
      windowSize={11}
      onScrollToIndexFailed={(info) => {
        // Fallback if initial scroll fails
        const wait = new Promise(resolve => setTimeout(resolve, 100));
        wait.then(() => {
          flatListRef.current?.scrollToIndex({
            index: info.index,
            animated: false,
          });
        });
      }}
    />
  );
};

DateScroller.displayName = 'DateScroller';
