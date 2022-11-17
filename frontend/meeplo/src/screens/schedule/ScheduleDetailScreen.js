import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { theme } from '../../assets/constant/DesignTheme';
import { getScheduleDetail } from '../../redux/scheduleSlice';

import RoundView from '../../components/common/RoundView';
import ModalCover from '../../components/common/ModalCover';
import { PacmanIndicator } from 'react-native-indicators';

const ScheduleDetailScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const schedule = useSelector(state => state?.schedule?.schedule);
  const isLoading = useSelector(state => state?.schedule?.isLoading);

  useEffect(() => {
    dispatch(getScheduleDetail(route?.params?.scheduleId));
  }, []);

  useEffect(() => {
    console.log(schedule);
  }, [schedule]);

  return (
    <View style={styles.screenStyle}>
      {!isLoading ? (
        <RoundView title={schedule.name}>
          <Text>ScheduleDetailScreen with {route?.params?.scheduleId}</Text>
        </RoundView>
      ) : (
        <ModalCover visible={isLoading} backgroundColor={theme.color.dim}>
          <PacmanIndicator size={100} color={theme.color.bright.orange} />
        </ModalCover>
      )}
    </View>
  );
};

// const api_data = {
//   amuseLocations: [
//     { address: '서울특별시 강남구 테헤란로 222', id: 20, lat: 37.50165271, lng: 127.0407525, name: '대명리조트' },
//   ],
//   date: '2022-11-16 17:09',
//   group: { id: 39, name: '미플로' },
//   keywords: [],
//   meetLocation: {
//     address: '서울특별시 강남구 언주로87길 44',
//     id: 54647,
//     lat: 37.50085021,
//     lng: 127.0395752,
//     name: '탄',
//   },
//   members: [
//     {
//       id: 41,
//       nickname: '김제관',
//       photo: 'http://k.kakaocdn.net/dn/cfPYeU/btrN6n7q9ee/RihFtGFpkJSSIuSw39bPm0/img_640x640.jpg',
//       status: 'JOINED',
//     },
//     {
//       id: 42,
//       nickname: '김제관',
//       photo: 'http://k.kakaocdn.net/dn/cfPYeU/btrN6n7q9ee/RihFtGFpkJSSIuSw39bPm0/img_640x640.jpg',
//       status: 'PENDING',
//     },
//   ],
//   name: 'ㄱ',
// };

const styles = StyleSheet.create({
  screenStyle: {
    backgroundColor: theme.color.background,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default ScheduleDetailScreen;
