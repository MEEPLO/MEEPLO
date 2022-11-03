import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

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

const ItemView = styled.View`
  margin: 2.5%;
  padding-vertical: 2.5%;
  padding-horizontal: 5%;
  background-color: #ffc5c5;
  border-width: 2px;
  border-radius: 25px;
`;

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

const CalendarScheduleListItem = ({ item }) => {
  console.log(item);
  return (
    <ItemView>
      <TitleView>
        <TitleText>{item?.date}</TitleText>
        <TitleText>{item?.location?.amuseName}</TitleText>
      </TitleView>
      <ContentText>{item?.name}</ContentText>
      <ContentText>{`${item?.groupName} | ${item?.memberCount}명`}</ContentText>
    </ItemView>
  );
};

export default CalendarScheduleListItem;
