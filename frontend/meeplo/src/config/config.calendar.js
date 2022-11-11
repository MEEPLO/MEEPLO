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
// LocaleConfig.defaultLocale = 'ko';

const calendar = {};

const today = new Date();

calendar.getTodayDateObject = () => ({
  day: today.getDate(), // day of month (1-31)
  month: today.getMonth() + 1, // month of year (1-12)
  year: today.getFullYear(), // year
  timestamp: today.getTime(), // UTC timestamp representing 00:00 AM of this date
  dateString: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`, // date formatted as 'YYYY-MM-DD' string
});

calendar.meeploCalendarParam = {
  renderHeader: date => {
    return <CalendarHeader date={date} />;
  },

  enableSwipeMonths: true,
  initialDate: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() - 2}`,
  // minDate: '2020-10-01',
  // maxDate: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() - 1}`,
};

calendar.meeploCalendarParamTheme = {
  // backgroundColor: '#ffffff',
  // calendarBackground: '#ffffff',
  // textSectionTitleColor: '#b6c1cd',
  // textSectionTitleDisabledColor: '#ffffff',
  // selectedDayBackgroundColor: '#00adf5',
  // selectedDayTextColor: '#ffffff',
  // todayTextColor: '#ffffff',
  // dayTextColor: 'green',
  // textDisabledColor: '#d9e1e8',
  // dotColor: '#00adf5',
  // selectedDotColor: '#ffffff',
  // arrowColor: 'orange',
  // disabledArrowColor: '#d9e1e8',
  // monthTextColor: 'blue',
  // indicatorColor: 'blue',
  // textDayFontFamily: 'monospace',
  // textMonthFontFamily: 'monospace',
  // textDayHeaderFontFamily: 'monospace',
  // textDayFontWeight: '300',
  // textMonthFontWeight: 'bold',
  // textDayHeaderFontWeight: '300',
  // textDayFontSize: 16,
  // textMonthFontSize: 16,
  // textDayHeaderFontSize: 16,
  'stylesheet.calendar.header': {
    dayTextAtIndex0: {
      color: 'blue',
    },
    dayTextAtIndex6: {
      color: 'blue',
    },
  },
};

export default calendar;
