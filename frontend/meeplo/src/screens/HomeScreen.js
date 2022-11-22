import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView, View, Text, TouchableOpacity, Button, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import HomeGroup from '../components/Home/HomeGroup';
import HomeMoments from '../components/Home/HomeMoments';
import HomeSchedule from '../components/Home/HomeSchedule';
import HomePlaceRecommendation from '../components/Home/HomePlaceRecommendation';
import { getGroupList } from '../redux/groupSlice';
import { getUserInfo } from '../redux/userSlice';
import { getUpcomingSchedule, getNoMomentsSchedule } from '../redux/scheduleSlice';
import { theme } from '../assets/constant/DesignTheme';
import FontText from '../components/common/FontText';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const groupList = useSelector(state => state.groupList);
  const upComingScheduleList = useSelector(state => state.schedule.upComing);
  const noMomentsScheduleList = useSelector(state => state.schedule.noMoments);

  const onPressMoreSchedule = () => {
    navigation.navigate('ScheduleStack', { screen: 'Home' });
  };
  const onPressMoreGroup = () => {
    navigation.navigate('GroupStack', { screen: 'GroupHome' });
  };
  const onPressMoreMoment = () => {
    navigation.navigate('MomentsStack', { screen: 'MomentsList' });
  };

  useEffect(() => {
    dispatch(getUserInfo());
    dispatch(getGroupList());
    dispatch(getUpcomingSchedule());
    dispatch(getNoMomentsSchedule());
  }, []);

  return (
    <ScrollView>
      <View
        style={{
          margin: 20,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'baseline',
        }}>
        <FontText style={{ fontSize: 24, fontFamily: 'NanumSquareRoundB', color: 'black' }}>예정된 약속</FontText>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onPressMoreSchedule}
          style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontText>더보기</FontText>
          <FontAwesomeIcon icon={faChevronRight} size={10} color="black" />
        </TouchableOpacity>
      </View>
      <HomeSchedule data={upComingScheduleList} navigation={navigation} />
      <View
        style={{
          margin: 20,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'baseline',
        }}>
        <FontText style={{ fontSize: 24, fontFamily: 'NanumSquareRoundB', color: 'black' }}>
          내가 참여하는 그룹
        </FontText>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onPressMoreGroup}
          style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontText>더보기</FontText>
          <FontAwesomeIcon icon={faChevronRight} size={10} color="black" />
        </TouchableOpacity>
      </View>
      <HomeGroup data={groupList?.slice(0, 3)} navigation={navigation} />
      <View style={{ margin: 20, marginTop: 30 }}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'baseline',
          }}>
          <FontText style={{ fontSize: 24, fontFamily: 'NanumSquareRoundB', color: 'black' }}>추억 남기기</FontText>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={onPressMoreMoment}
            style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontText>더보기</FontText>
            <FontAwesomeIcon icon={faChevronRight} size={10} color="black" />
          </TouchableOpacity>
        </View>

        <FontText style={{ color: theme.color.dim }}>아직 추억을 기록하지 않은 약속에 추억을 남겨보아요~</FontText>
      </View>
      <HomeMoments data={noMomentsScheduleList} navigation={navigation} />
      {/* <View
        style={{
          margin: 20,
          marginTop: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FontText style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>어디서 놀지 모르겠다면</FontText>
        <FontText style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}> 추천 받아 보세요</FontText>
      </View>
      <HomePlaceRecommendation /> */}
      <View style={{ height: 90 }} />
    </ScrollView>
  );
};

export default HomeScreen;
