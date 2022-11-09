import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import GroupDetailHeader from '../components/Group/GroupDetailHeader';
import { theme } from '../assets/constant/DesignTheme';
import { renderTabBar, renderScheduleLabel, renderMomentsLabel } from '../components/Group/GroupDetailTabBar';
import GroupDetailScheduleItem from '../components/Group/GroupDetailScheduleItem';
import { getGroupDetail } from '../redux/groupSlice';

const identity = v => v.id + 'id';
const DATA = {
  id: 1,
  name: 'SSAFY 갓자율',
  description:
    '그룹 상세 설명이라굽쇼 이게 200자나 된다는 말이죠 이게 쉽지 않습니다 저희는 삼성 청년 소프트웨어 아카데미 7기를 다니고 있는 6명의 정예 인원이 모여서 자율 프로젝트에 임하게 되었습니다 5반에 배정되어 지금 8팀이고 덕분에 바로 문 옆에 자리가 있더라고요 근데 생각보다 많이 거슬리지 않아서 저는 이 자리가 좋습니다 그리고 칠판과 플립을 쓸 수 있어요!',
  photo: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg',
  leader: '김혜림킹갓제너럴',
  members: [
    {
      id: 1,
      nickname: '김혜림킹갓제너럴',
      photo:
        'https://static.wikia.nocookie.net/pororo/images/e/e0/LoopyCurrentOutfit.jpg/revision/latest?cb=20220224155019',
    },
    {
      id: 2,
      nickname: '한나두나세나',
      photo: 'https://item.kakaocdn.net/do/c5c470298d527ef65eb52883f0f186c49f17e489affba0627eb1eb39695f93dd',
    },
  ],
  schedules: [
    {
      id: 1,
      name: '첫번째 약속',
      date: '2022-11-11 11:11:11',
      memberCount: 6,
      location: {
        meetName: '역삼역',
        amuseName: '매화램 양꼬치',
      },
    },
    {
      id: 2,
      name: '두번째 약속',
      date: '2022-11-18 11:11:11',
      memberCount: 5,
      location: {
        meetName: '강남역',
        amuseName: '양국',
      },
    },
    {
      id: 3,
      name: '두번째 약속',
      date: '2022-11-18 11:11:11',
      memberCount: 5,
      location: {
        meetName: '강남역',
        amuseName: '양국',
      },
    },
    {
      id: 4,
      name: '두번째 약속',
      date: '2022-11-18 11:11:11',
      memberCount: 5,
      location: {
        meetName: '강남역',
        amuseName: '양국',
      },
    },
    {
      id: 5,
      name: '두번째 약속',
      date: '2022-11-18 11:11:11',
      memberCount: 5,
      location: {
        meetName: '강남역',
        amuseName: '양국',
      },
    },
    {
      id: 6,
      name: '두번째 약속',
      date: '2022-11-18 11:11:11',
      memberCount: 5,
      location: {
        meetName: '강남역',
        amuseName: '양국',
      },
    },
  ],
};

const GroupDetailScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { groupId } = route.params;
  const groupDetail = useSelector(state => state.group);
  const colorList = ['purple', 'red', 'navy', 'yellow', 'green', 'orange', 'blue'];

  const renderHeader = () => {
    return <GroupDetailHeader data={DATA} navigation={navigation} />;
  };

  const renderItem = useCallback(({ index, item }) => {
    return (
      <TouchableOpacity activeOpacity={0.6}>
        <GroupDetailScheduleItem
          style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]}
          name={item.name}
          date={item.date}
          memberCount={item.memberCount}
          location={item.location}
          color={colorList[item.id % 7]}
          isLast={DATA.schedules.length === index + 1 ? true : false}
        />
      </TouchableOpacity>
    );
  }, []);

  useEffect(() => {
    console.log('디태일 useEffect');
    dispatch(getGroupDetail({ groupId }));
  }, []);

  return (
    <Tabs.Container renderHeader={renderHeader} renderTabBar={renderTabBar}>
      <Tabs.Tab name="scheduleLabel" label={renderScheduleLabel}>
        {/* TODO: hrookim change DATA to groupDetail */}
        <Tabs.FlatList data={DATA.schedules} renderItem={renderItem} keyExtractor={identity} />
      </Tabs.Tab>
      <Tabs.Tab name="momentsLabel" label={renderMomentsLabel}>
        <Tabs.ScrollView>
          <View style={[styles.box, styles.boxA]} />
          <View style={[styles.box, styles.boxB]} />
        </Tabs.ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 250,
    width: '100%',
  },
  boxA: {
    backgroundColor: 'white',
  },
  boxB: {
    backgroundColor: '#D8D8D8',
  },
  header: {
    width: '100%',
    backgroundColor: '#2196f3',
  },
});

export default GroupDetailScreen;
