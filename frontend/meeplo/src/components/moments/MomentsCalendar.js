import { View, Text } from 'react-native';
import React from 'react';

import { Calendar } from 'react-native-calendars';
import config from '../../config';

const MomentsCalendar = () => {
  return (
    <View>
      <Text>MomentsCalendar</Text>
      <Calendar
        {...config.calendar.meeploCalendarParam}
        theme={{
          ...config.calendar.meeploCalendarParamTheme,
        }}
      />
    </View>
  );
};

export default MomentsCalendar;
