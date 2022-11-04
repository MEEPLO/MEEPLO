import React, { useState } from 'react';
import { SafeAreaView, Text, f } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import styled from 'styled-components/native';

import { Calendar } from 'react-native-calendars';
import config from '../../config';

import CalendarScheduleList from '../../components/calendar/CalendarScheduleList';

const TitleView = styled.View``;
const FilterView = styled.View``;
const FilterItem = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-horizontal: 15px;
`;

const CalendarView = styled.View`
  margin: 20px;
`;

const CalendarScheduleListView = styled.View`
  flex: 1;
`;

const TitleText = styled.Text`
  color: #000;
  font-size: 24px;
  font-weight: bold;
  margin: 10px;
  padding: 10px;
`;

const ScheduleHomeScreen = () => {
  const [noMomentCheck, setNoMomentCheck] = useState(false);

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

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <TitleView>
        <TitleText>약속 리스트</TitleText>
      </TitleView>
      <FilterView>
        <FilterItem>
          <Text>기록 없는 약속</Text>
          <CheckBox disabled={false} value={noMomentCheck} onValueChange={newValue => setNoMomentCheck(newValue)} />
        </FilterItem>
      </FilterView>
      <CalendarView>
        <Calendar
          {...config.calendar.meeploCalendarParam}
          theme={{
            ...config.calendar.meeploCalendarParamTheme,
          }}
          onDayPress={day => console.log(day)}
          onDayLongPress={day => console.log('long', day)}
        />
      </CalendarView>
      <CalendarScheduleListView>
        <CalendarScheduleList data={tmpData} />
      </CalendarScheduleListView>
    </SafeAreaView>
  );
};

export default ScheduleHomeScreen;
