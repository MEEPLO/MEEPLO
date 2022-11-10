import { View, Text, Image, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { theme } from '../../assets/constant/DesignTheme';

const GroupDetailScheduleItem = ({ name, date, memberCount, location, color, isLast }) => {
  const rawDate = new Date(date);
  const scheduleDate = {
    year: rawDate.getFullYear(),
    month: rawDate.getMonth() + 1,
    day: rawDate.getDate(),
    hour: rawDate.getHours(),
    minute: ('0' + rawDate.getMinutes()).slice(-2),
  };
  const width = Dimensions.get('window').width - 40;
  const height = width * 0.4;
  return (
    <View
      style={[
        {
          marginHorizontal: 20,
          marginTop: 20,
          width,
          height,
          borderRadius: 20,
          overflow: 'hidden',
          borderColor: theme.color.border,
          borderWidth: 3,
        },
        isLast && { marginBottom: 105 },
      ]}>
      <View
        style={{
          flex: 1,
          borderTopEndRadius: 20,
          width,
          overflow: 'hidden',
          borderColor: theme.color.border,
          borderBottomWidth: 3,
          backgroundColor: theme.color.pale[color],
          justifyContent: 'center',
        }}>
        <Text style={{ marginHorizontal: 20, fontWeight: '900', fontSize: 19, color: 'black' }}>
          {`${scheduleDate.year}년 ${scheduleDate.month}월 ${scheduleDate.day}일  ${scheduleDate.hour}:${scheduleDate.minute}`}
        </Text>
      </View>
      <View
        style={{
          flex: 3,
          flexDirection: 'row',
          marginHorizontal: 20,
          alignItems: 'center',
        }}>
        <View style={{ flex: 7, justifyContent: 'space-evenly', height: '100%' }}>
          <View>
            <Text style={{ fontSize: 14 }}>
              {`약속 이름  `}
              <Text style={{ fontWeight: '900', color: 'black' }}>{name}</Text>
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 14 }}>
              {`만남 장소  `}
              <Text style={{ fontWeight: '900', color: 'black' }}>{location.meetName}</Text>
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 14 }}>
              {`약속 장소  `}
              <Text style={{ fontWeight: '900', color: 'black' }}>{location.amuseName}</Text>
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'space-evenly', height: width * 0.2 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faUser} size={14} />
              <Text style={{ fontSize: 14, marginLeft: 5, fontWeight: '900', color: 'black' }}>{memberCount}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default GroupDetailScheduleItem;
