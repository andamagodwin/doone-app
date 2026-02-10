import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { Text } from '../atoms/Text';

interface DateItem {
  day: string;
  date: number;
  month: number;
  year: number;
  fullDate: Date;
}

export interface DateScrollerProps {
  onDateSelect?: (date: { date: number; month: number; year: number }) => void;
  initialDate?: Date;
  daysRange?: number;
}

export const DateScroller: React.FC<DateScrollerProps> = ({
  onDateSelect,
  initialDate = new Date(),
  daysRange = 30,
}) => {
  const today = useMemo(() => new Date(), []);
  const scrollViewRef = useRef<ScrollView>(null);
  const [selectedDate, setSelectedDate] = useState(initialDate.getDate());
  const [selectedMonth, setSelectedMonth] = useState(initialDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(initialDate.getFullYear());

  // Generate dates centered around today
  const generateWeekDates = useCallback(() => {
    const dates: DateItem[] = [];
    const currentDate = new Date();

    // Generate dates (daysRange before and daysRange after today)
    for (let i = -daysRange; i <= daysRange; i++) {
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
  }, [daysRange]);

  const [weekDates] = useState(generateWeekDates());
  const itemPositions = useRef<Record<string, number>>({});

  // Calculate snap points for Sundays only
  const snapOffsets = useMemo(() => {
    const offsets: number[] = [];
    weekDates.forEach((item, index) => {
      if (item.day === 'Su') {
        // Approximate offset for each Sunday (item width ~52px)
        offsets.push(index * 52);
      }
    });
    return offsets;
  }, [weekDates]);

  const getKey = (d: { date: number; month: number; year: number }) =>
    `${d.year}-${d.month}-${d.date}`;

  const scrollToDate = useCallback(
    (d: { date: number; month: number; year: number }) => {
      const key = getKey(d);
      const x = itemPositions.current[key];
      if (x != null && scrollViewRef.current) {
        // Align selected/today to the left edge with small padding
        scrollViewRef.current.scrollTo({ x: Math.max(0, x - 10), animated: false });
      }
    },
    []
  );

  // Scroll to initial date on mount
  useEffect(() => {
    const id = setTimeout(() => {
      scrollToDate({
        date: initialDate.getDate(),
        month: initialDate.getMonth(),
        year: initialDate.getFullYear(),
      });
    }, 50);
    return () => clearTimeout(id);
  }, [weekDates, initialDate, scrollToDate]);

  const handleDateSelect = (item: DateItem) => {
    setSelectedDate(item.date);
    setSelectedMonth(item.month);
    setSelectedYear(item.year);
    onDateSelect?.({ date: item.date, month: item.month, year: item.year });
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToOffsets={snapOffsets}
      snapToAlignment="start"
      decelerationRate="fast"
      contentContainerStyle={{ paddingHorizontal: 10, gap: 11 }}
      style={{ marginHorizontal: -20 }}>
      {weekDates.map((item, index) => {
        const isSelected =
          item.date === selectedDate &&
          item.month === selectedMonth &&
          item.year === selectedYear;
        const isTodayItem =
          item.date === today.getDate() &&
          item.month === today.getMonth() &&
          item.year === today.getFullYear();

        return (
          <Pressable
            key={index}
            onLayout={(e) => {
              itemPositions.current[getKey(item)] = e.nativeEvent.layout.x;
            }}
            onPress={() => handleDateSelect(item)}
            className={`items-center px-2 py-3 rounded-full min-w-[40px] ${
              isSelected
                ? 'bg-primary'
                : isTodayItem
                ? 'bg-gray-100/60'
                : 'bg-transparent'
            } active:bg-gray-200`}>
            <Text
              variant="bodySmall"
              className={`mb-1 ${
                isSelected ? 'text-white font-lato-bold' : 'text-gray-500'
              }`}>
              {item.day}
            </Text>
            <Text
              variant="bodySmall"
              className={`py-1 px-2 rounded-2xl ${
                isSelected
                  ? 'text-black border-0 bg-white/80'
                  : 'text-gray-700 border-2 border-gray-200'
              }`}>
              {item.date}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

DateScroller.displayName = 'DateScroller';
