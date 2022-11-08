import { View, Text, Dimensions, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { theme } from '../../assets/constant/DesignTheme';

const HomeGroupItem = ({ name, photo, memberCount, leaderName, lastSchedule }) => {
  const [lastScheduleDate, setLastScheduleDate] = useState('');

  const width = (Dimensions.get('window').width - 40) / 2;
  const height = width * 0.33;

  useEffect(() => {
    if (lastSchedule !== '1111-11-11 11:11:11') {
      const date = moment(new Date(lastSchedule)).format('YY.MM.DD');
      setLastScheduleDate(date);
    }
  }, []);
  return (
    <View
      style={{
        width,
        height: width,
        borderRadius: 20,
        overflow: 'hidden',
        borderColor: theme.color.border,
        borderWidth: 3,
        marginRight: 20,
      }}>
      <ImageBackground source={{ uri: photo }} style={{ height: width }} resizeMode="cover">
        <View
          style={{
            backgroundColor: 'rgba(255,255,255,0.73)',
            height,
            top: width - height,
            justifyContent: 'center',
          }}>
          <Text style={{ fontWeight: '900', marginHorizontal: 5, fontSize: 15 }}>{name}</Text>
          <Text style={{ marginHorizontal: 5, fontSize: 12 }}>
            {memberCount}명 {lastScheduleDate && ` |  마지막 약속: ${lastScheduleDate}`}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeGroupItem;
