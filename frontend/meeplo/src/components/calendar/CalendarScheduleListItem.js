import React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import ScheduleItem from '../common/ScheduleItem';

/*
 API data 형태
 {
			"id" : long,
			"name" : String,
			"date" : Datetime,
			"groupName" : String,
			"memberCount" : int,
			”momentRecorded” : boolean
			"location" : {
				"meetName" : String,
				"amuseName" : String
			}
		}
*/

const colorList = ['purple', 'yellow', 'red', 'green', 'orange', 'blue'];

const CalendarScheduleListItem = ({ item, onItemPress }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onItemPress(item.id);
      }}>
      <ScheduleItem
        date={item?.date}
        location={item?.location}
        name={item?.name}
        groupName={item?.groupName}
        memberCount={item?.memberCount}
        color={colorList[item.id % 7]}
      />
    </TouchableOpacity>
  );
};

export default CalendarScheduleListItem;
