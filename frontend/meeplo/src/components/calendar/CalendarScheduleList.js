import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';

import CalendarScheduleListItem from './CalendarScheduleListItem';

const screen = Dimensions.get('screen');

const CalendarScheduleList = ({ data }) => {
  return data?.length > 0 ? (
    <Tabs.FlatList
      data={data}
      renderItem={CalendarScheduleListItem}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      flex={1}
    />
  ) : (
    <Tabs.ScrollView>
      <View style={styles.noDataView}>
        <Text>아무 약속이 없습니다.</Text>
      </View>
    </Tabs.ScrollView>
  );
};

const styles = StyleSheet.create({
  noDataView: {
    width: screen.width,
    height: screen.height * 0.4,

    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CalendarScheduleList;
