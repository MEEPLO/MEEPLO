import React from 'react';
import { Tabs } from 'react-native-collapsible-tab-view';

import CalendarScheduleListItem from './CalendarScheduleListItem';

const CalendarScheduleList = ({ data }) => {
  return (
    <Tabs.FlatList
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
