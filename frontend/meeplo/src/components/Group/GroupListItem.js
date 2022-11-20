import { View, Text, Image, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { theme } from '../../assets/constant/DesignTheme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faCrown } from '@fortawesome/free-solid-svg-icons/faCrown';

const GroupListItem = ({ name, photo, memberCount, leaderName, lastSchedule, color }) => {
  const [lastScheduleDate, setLastScheduleDate] = useState('');
  const width = Dimensions.get('window').width - 40;
  const height = width * 0.33;
  const imgHeight = width * 0.18;

  useEffect(() => {
    if (lastSchedule === '1111-11-11 11:11') {
      setLastScheduleDate('');
    } else {
      const date = moment(new Date(lastSchedule)).format('YYYY.MM.DD');
      setLastScheduleDate(date);
    }
  }, []);
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginVertical: 10,
        width,
        height,
        borderRadius: 20,
        overflow: 'hidden',
        borderColor: theme.color.border,
        borderWidth: 3,
      }}>
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
        <Text style={{ marginHorizontal: 20, fontWeight: 'bold', fontSize: 19, color: 'black' }}>{name}</Text>
      </View>
      <View
        style={{
          flex: 2,
          flexDirection: 'row',
          marginHorizontal: 20,
          alignItems: 'center',
        }}>
        <View style={{ flex: 1 }}>
          <Image
            source={{
              uri: photo,
            }}
            style={{
              width: imgHeight,
              height: imgHeight,
              borderRadius: 5,
              borderColor: theme.color.border,
              borderWidth: 1,
            }}
          />
        </View>
        <View style={{ flex: 3, justifyContent: 'space-evenly', height: width * 0.2 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faCrown} size={14} />
              <Text style={{ fontSize: 14, marginLeft: 5, color: 'gray' }}>{leaderName}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faUser} size={14} />
              <Text style={{ fontSize: 14, marginLeft: 5, color: 'gray' }}>{memberCount}</Text>
            </View>
          </View>
          {lastScheduleDate && (
            <View>
              <Text style={{ fontSize: 14, color: 'gray' }}>최근모임: {lastScheduleDate}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default GroupListItem;
