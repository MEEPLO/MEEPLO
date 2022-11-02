import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import styled from 'styled-components/native';

import { Calendar } from 'react-native-calendars';
import config from '../config';

const TitleView = styled.View`
  border-width: 1px;
  border-color: black;
`;

const StyledText = styled.Text`
  color: #000;
  font-size: 20px;
  margin: 10px;
  padding: 10px;
`;

const ScheduleHomeScreen = () => {
  return (
    <SafeAreaView>
      <TitleView>
        <StyledText>약속 리스트</StyledText>
      </TitleView>
      <View style={{ borderWidth: 4, borderColor: 'black' }}>
        <Calendar
          {...config.calendar.meeploCalendarParam}
          theme={{
            ...config.calendar.meeploCalendarParamTheme,
          }}
          onDayPress={day => console.log(day)}
          onDayLongPress={day => console.log('long', day)}
        />
      </View>
    </SafeAreaView>
  );
};

export default ScheduleHomeScreen;
