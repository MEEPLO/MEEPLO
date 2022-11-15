import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Dimensions, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Calendar } from 'react-native-calendars';
import { theme } from '../../assets/constant/DesignTheme';
import config from '../../config';

import { getSchedulesMonthly } from '../../redux/scheduleSlice';

import CalendarScheduleList from '../../components/calendar/CalendarScheduleList';

const screen = Dimensions.get('screen');

const ScheduleHomeScreen = () => {
  const [calendar, setCalendar] = useState({});
  const [selectedDate, setSelectedDate] = useState();
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [day, setDay] = useState();
  const [schedueledDates, setSchedueledDates] = useState({});
  const dispatch = useDispatch();
  const schedules = useSelector(state => state?.schedule?.schedules);

  const onDayPress = date => {
    setSelectedDate(date.dateString);
  };

  const onMonthChange = date => {
    dispatch(getSchedulesMonthly(`${date.year}-${date.month}`));
  };

  const getMarkedDates = (schedueledDates, selectedDate) => {
    const markedDates = {};

    if (selectedDate) {
      markedDates[selectedDate] = { selected: true };
    }

    if (schedueledDates && Array.isArray(schedueledDates)) {
      schedueledDates.forEach(date => (markedDates[date] = { marked: true }));
    }

    console.log(markedDates);
    return markedDates;
  };

  useEffect(() => {
    console.log('schedules', schedules);
    if (schedules && schedules.scheduledDates && Array.isArray(schedules.scheduledDates)) {
      setSchedueledDates(schedules.scheduledDates);
    }
  }, [schedules]);

  return (
    <View style={styles.screenView}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>약속 리스트</Text>
      </View>
      <View style={styles.calendarView}>
        <Calendar
          {...config.calendar.meeploCalendarParam}
          theme={{
            ...config.calendar.meeploCalendarParamTheme,
          }}
          onDayPress={onDayPress}
          onMonthChange={onMonthChange}
          markedDates={getMarkedDates(schedueledDates, selectedDate)}
        />
      </View>
      <CalendarScheduleList data={tmpData} />
    </View>
  );
};

const styles = StyleSheet.create({
  screenView: {
    width: screen.width,
    height: screen.height,

    alignItems: 'center',
    justifyContent: 'center',
  },
  titleView: { alignSelf: 'flex-start' },
  titleText: {
    color: theme.font.color,
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
    padding: 10,
  },
  calendarView: {
    width: screen.width * 0.9,
  },
  scheduleView: {},
});

export default ScheduleHomeScreen;

const tmpData = [
  {
    id: 1,
    name: '약속 이름',
    date: '22.10.21 12:00',
    groupName: '아직20대초딩들',
    memberCount: 4,
    memberRecorded: false,
    location: {
      meetName: '역삼역',
      amuseName: '경성양육관',
    },
  },
  {
    id: 2,
    name: '이건 무슨 약속이지',
    date: '22.11.03 18:00',
    groupName: '아직20대초딩들',
    memberCount: 6,
    memberRecorded: false,
    location: {
      meetName: '역삼역',
      amuseName: '양꼬치구이',
    },
  },
  {
    id: 3,
    name: '이건 무슨 약속이지',
    date: '22.11.03 18:00',
    groupName: '아직20대초딩들',
    memberCount: 6,
    memberRecorded: false,
    location: {
      meetName: '역삼역',
      amuseName: '양꼬치구이',
    },
  },
  {
    id: 4,
    name: '이건 무슨 약속이지',
    date: '22.11.03 18:00',
    groupName: '아직20대초딩들',
    memberCount: 6,
    memberRecorded: false,
    location: {
      meetName: '역삼역',
      amuseName: '양꼬치구이',
    },
  },
  {
    id: 5,
    name: '이건 무슨 약속이지',
    date: '22.11.03 18:00',
    groupName: '아직20대초딩들',
    memberCount: 6,
    memberRecorded: false,
    location: {
      meetName: '역삼역',
      amuseName: '양꼬치구이',
    },
  },
];
