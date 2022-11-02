import React from 'react';
import CalendarHeader from '../components/calendar/CalendarHeader';
import { LocaleConfig } from 'react-native-calendars';

// global local settings
LocaleConfig.locales['ko'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['월', '화', '수', '목', '금', '토', '일'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'ko';

const calendar = {};
const today = new Date();
calendar.meeploCalendarParam = {
  renderHeader: date => {
    return <CalendarHeader date={date} />;
  },

  enableSwipeMonths: true,
  minDate: '2020-10-01',
  maxDate: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() - 1}`,
};

export default calendar;
