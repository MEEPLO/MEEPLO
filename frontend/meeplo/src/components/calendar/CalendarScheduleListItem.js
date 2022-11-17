import React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import { theme } from '../../assets/constant/DesignTheme';

import ScheduleButton from '../common/ScheduleButton';

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

const screen = Dimensions.get('screen');

const CalendarScheduleListItem = ({ item }) => {
  return (
    <TouchableOpacity style={styles.itemView}>
      <ScheduleButton
        isData={true}
        picture="yellow"
        title={item?.name}
        date={item?.date}
        place={item?.location?.amuseName}
        group={item?.groupName}
        people={item?.memberCount}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemView: {
    marginVertical: 10,
  },
});

export default CalendarScheduleListItem;
