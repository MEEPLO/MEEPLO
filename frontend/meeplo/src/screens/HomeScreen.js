import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import HomeGroup from '../components/Home/HomeGroup';
import HomeMemory from '../components/Home/HomeMemory';
import HomeSchedule from '../components/Home/HomeSchedule';
import HomePlaceRecommendation from '../components/Home/HomePlaceRecommendation';
import { getGroupList } from '../redux/groupSlice';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const groupList = useSelector(state => state.groupList);

  // TODO: hrookim Change dummy data to redux state data
  const data = [
    {
      id: 1,
      title: '하나',
      date: '2022.10.20',
      group: '아아아그룹',
      people: 5,
      place: '역삼역',
    },
    {
      id: 2,
      title: '둘',
      date: '2022.10.30',
      group: '근데 다른 그룹',
      people: 4,
      place: '강남역',
    },
    {
      id: 3,
      title: '셋',
      date: '2022.11.06',
      group: 'another group',
      people: 6,
      place: '모르는역',
    },
  ];

  const onPressMoreSchedule = () => {
    // TODO: navigation으로 페이지 옮기기
    console.log('무브무브');
  };
  const onPressMoreGroup = () => {
    // TODO: navigation으로 페이지 옮기기
    console.log('이동이동');
  };
  const onPressMoreMoment = () => {
    // TODO: navigation으로 페이지 옮기기
    console.log('무브이동');
  };

  useEffect(() => {
    dispatch(getGroupList());
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
        <Text style={{ fontSize: 24, fontWeight: '900' }}>예정된 약속</Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onPressMoreSchedule}
          style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>더보기</Text>
          <FontAwesomeIcon icon={faChevronRight} size={10} color="black" />
        </TouchableOpacity>
      </View>
      <HomeSchedule data={data} />
      <View
        style={{
          margin: 20,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'baseline',
        }}>
        <Text style={{ fontSize: 24, fontWeight: '900' }}>내가 속한 그룹</Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onPressMoreGroup}
          style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>더보기</Text>
          <FontAwesomeIcon icon={faChevronRight} size={10} color="black" />
        </TouchableOpacity>
      </View>
      <HomeGroup data={groupList.slice(0, 3)} navigation={navigation} />
      <View
        style={{
          margin: 20,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'baseline',
        }}>
        <Text style={{ fontSize: 24, fontWeight: '900' }}>추억 남기기</Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onPressMoreMoment}
          style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>더보기</Text>
          <FontAwesomeIcon icon={faChevronRight} size={10} color="black" />
        </TouchableOpacity>
      </View>
      <HomeMemory data={data} />
      <View
        style={{
          margin: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{ fontSize: 24, fontWeight: '900', color: 'black' }}>어디서 놀지 모르겠다면</Text>
        <Text style={{ fontSize: 24, fontWeight: '900', color: 'black' }}> 추천 받아 보세요</Text>
      </View>
      <HomePlaceRecommendation />
      <View style={{ height: 90 }} />
    </ScrollView>
  );
};

export default HomeScreen;
