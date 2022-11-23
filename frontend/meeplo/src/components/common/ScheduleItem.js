import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { theme } from '../../assets/constant/DesignTheme';

const ScheduleItem = ({ date, location, name, groupName, memberCount, color }) => {
  const width = Dimensions.get('window').width - 40;
  const height = width * 0.4;
  const rawDate = new Date(date);
  const scheduleDate = {
    year: rawDate.getFullYear(),
    month: rawDate.getMonth() + 1,
    day: rawDate.getDate(),
    hour: rawDate.getHours(),
    minute: ('0' + rawDate.getMinutes()).slice(-2),
  };

  return (
    <View
      style={[
        {
          marginHorizontal: 20,
          marginTop: 15,
          width,
          height,
          borderRadius: 20,
          overflow: 'hidden',
          borderColor: theme.color.border,
          borderWidth: 3,
        },
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
        <Text style={{ marginHorizontal: 20, fontWeight: 'bold', fontSize: 19, color: 'black' }}>
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
            <Text style={{ fontSize: 14, color: 'gray' }}>
              {`약속 이름  `}
              <Text style={{ fontWeight: 'bold', color: 'black' }}>{name}</Text>
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 14 }}>
              {`그룹 이름  `}
              <Text style={{ fontWeight: 'bold', color: 'black' }}>{groupName}</Text>
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 14 }}>
              {`약속 장소  `}
              <Text style={{ fontWeight: 'bold', color: 'black' }}>{location.amuseName}</Text>
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'space-evenly', height: width * 0.2 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faUser} size={14} />
              <Text style={{ fontSize: 14, marginLeft: 5, fontWeight: 'bold', color: 'black' }}>{memberCount}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ScheduleItem;
