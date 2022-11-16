import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import styled from 'styled-components/native';

import { theme } from '../../assets/constant/DesignTheme';

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

const TitleView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-vertical: 2px;
`;

const TitleText = styled.Text`
  color: black;
  font-size: 20px;
  font-weight: bold;
`;

const ContentText = styled.Text`
  color: #8a8a8a;
  font-size: 14px;
  font-weight: 400;
  margin-vertical: 2px;
`;

const screen = Dimensions.get('screen');

const CalendarScheduleListItem = ({ item }) => {
  return (
    <View style={styles.itemView}>
      <TitleView>
        <TitleText>{item?.date}</TitleText>
        <TitleText>{item?.location?.amuseName}</TitleText>
      </TitleView>
      <ContentText>{item?.name}</ContentText>
      <ContentText>{`${item?.groupName} | ${item?.memberCount}명`}</ContentText>
    </View>
  );
};

const styles = StyleSheet.create({
  itemView: {
    width: screen.width * 0.9,
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: theme.color.bright.red,
    borderWidth: theme.border.thick,
    borderRadius: theme.radius.base,
  },
});

export default CalendarScheduleListItem;
