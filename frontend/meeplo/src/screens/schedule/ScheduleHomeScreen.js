import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, View, Text, Dimensions, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs } from 'react-native-collapsible-tab-view';

import { Calendar, CalendarContext } from 'react-native-calendars';
import { theme } from '../../assets/constant/DesignTheme';
import config from '../../config';

import { getSchedulesDatesMonthly, getSchedulesMonthly, getSchedulesDaily } from '../../redux/scheduleSlice';

import CalendarScheduleList from '../../components/calendar/CalendarScheduleList';
import LoadingModal from '../../components/common/LoadingModal';

const screen = Dimensions.get('screen');

const ScheduleHomeScreen = () => {
  const calendarContext = useContext(CalendarContext);
  const [selectedDate, setSelectedDate] = useState();
  const [schedueledDates, setSchedueledDates] = useState({});
  const dispatch = useDispatch();

  const schedules = useSelector(state => state?.schedule?.schedules);
  const scheduleDates = useSelector(state => state?.schedule?.scheduleDates);
  const isLoading = useSelector(state => state?.schedule?.isLoading);

  const onDayPress = date => {
    setSelectedDate(date.dateString);
    dispatch(getSchedulesDaily(date.dateString));
  };

  const onMonthChange = date => {
    dispatch(getSchedulesDatesMonthly(`${date.year}-${date.month}`));
    dispatch(getSchedulesMonthly(`${date.year}-${date.month}`));
    setSelectedDate();
  };

  const getMarkedDates = (schedueledDates, selectedDate) => {
    const markedDates = {};

    if (selectedDate) {
      markedDates[selectedDate] = { selected: true, selectedColor: theme.color.bright.orange };
    }

    if (schedueledDates && Array.isArray(schedueledDates)) {
      schedueledDates.forEach(date => (markedDates[date] = { ...markedDates[date], marked: true }));
    }

    return markedDates;
  };

  useEffect(() => {
    console.log('wowowowow', scheduleDates);
    if (Array.isArray(scheduleDates)) {
      setSchedueledDates(scheduleDates);
    }
  }, [scheduleDates]);

  const renderCalendar = () => {
    return (
      <Calendar
        {...config.calendar.meeploCalendarParam}
        theme={{
          ...config.calendar.meeploCalendarParamTheme,
        }}
        context={calendarContext}
        onDayPress={onDayPress}
        onMonthChange={onMonthChange}
        markedDates={getMarkedDates(schedueledDates, selectedDate)}
      />
    );
  };

  return (
    <View style={styles.screenView}>
      <Tabs.Container renderHeader={renderCalendar}>
        <Tabs.Tab name="scheduleList" label="약속 리스트">
          <CalendarScheduleList data={schedules?.schedules} />
        </Tabs.Tab>
      </Tabs.Container>

      <LoadingModal visible={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  screenView: {
    width: screen.width,
    height: screen.height,
  },
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
