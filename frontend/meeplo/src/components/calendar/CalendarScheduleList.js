import React from 'react';
import { FlatList } from 'react-native';
import CalendarScheduleListItem from './CalendarScheduleListItem';

const CalendarScheduleList = ({ data }) => {
  return (
    <FlatList
      data={data}
      renderItem={CalendarScheduleListItem}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      flex={1}
    />
  );
};

export default CalendarScheduleList;
