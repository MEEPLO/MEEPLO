import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import FontText from '../common/FontText';

import CalendarScheduleListItem from './CalendarScheduleListItem';
import { COMMON_MESSAGE } from '../../assets/constant/string';

const screen = Dimensions.get('screen');

const CalendarScheduleList = ({ data, onItemPress }) => {
  return data?.length > 0 ? (
    <Tabs.FlatList
      data={data}
      renderItem={item => <CalendarScheduleListItem item={item.item} onItemPress={onItemPress} />}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      flex={1}
      contentContainerStyle={{ paddingBottom: 280 }}
    />
  ) : (
    <Tabs.ScrollView>
      <View style={styles.noDataView}>
        <FontText>{COMMON_MESSAGE.NO_SHCEDULE_EXISTS}</FontText>
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
