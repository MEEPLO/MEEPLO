import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs } from 'react-native-collapsible-tab-view';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons/faMapLocationDot';
import { renderTabBar, renderScheduleLabel, renderMomentsLabel } from '../components/Group/GroupDetailTabBar';
import GroupDetailHeader from '../components/Group/GroupDetailHeader';
import GroupDetailScheduleItem from '../components/Group/GroupDetailScheduleItem';
import GroupDetailMomentsItem from '../components/Group/GroupDetailMomentsItem';
import { getGroupDetail, getGroupMomentsFeed } from '../redux/groupSlice';
import { theme } from '../assets/constant/DesignTheme';

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
  ],
};
const MOMENTS = [
  {
    id: 1,
    photo:
      'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80',
  },
  {
    id: 2,
    photo:
      'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80',
  },
  {
    id: 3,
    photo: 'https://e1.pngegg.com/pngimages/917/1009/png-clipart-polaroid-frames-thumbnail.png',
  },
  { id: 4, photo: 'https://iso.500px.com/wp-content/uploads/2016/11/stock-photo-159533631-1500x1000.jpg' },
  { id: 5, photo: 'https://img.gqkorea.co.kr/gq/2022/04/style_624a422c209d0-340x1024.jpg' },
  { id: 6, photo: 'https://iso.500px.com/wp-content/uploads/2016/11/stock-photo-159533631-1500x1000.jpg' },
  { id: 7, photo: 'https://img.gqkorea.co.kr/gq/2022/04/style_624a422c209d0-340x1024.jpg' },
  { id: 8, photo: 'https://iso.500px.com/wp-content/uploads/2016/11/stock-photo-159533631-1500x1000.jpg' },
  { id: 9, photo: 'https://img.gqkorea.co.kr/gq/2022/04/style_624a422c209d0-340x1024.jpg' },
  { id: 10, photo: 'https://iso.500px.com/wp-content/uploads/2016/11/stock-photo-159533631-1500x1000.jpg' },
  {
    id: 11,
    photo: 'https://e1.pngegg.com/pngimages/917/1009/png-clipart-polaroid-frames-thumbnail.png',
  },
];

const GroupDetailScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { groupId } = route.params;
  const groupDetail = useSelector(state => state.group.details);
  const groupMomentsFeed = useSelector(state => state.group.moments);
  const { width } = Dimensions.get('window');

  const colorList = ['purple', 'red', 'navy', 'yellow', 'green', 'orange', 'blue'];

  const renderHeader = () => {
    return <GroupDetailHeader data={DATA} navigation={navigation} groupId={groupId} isInfo={false} />;
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
    // TODO: hrookim remove annotation
    // dispatch(getGroupDetail({ groupId }));
    // dispatch(getGroupMomentsFeed({ groupId }));
  }, []);

  return (
    <Tabs.Container renderHeader={renderHeader} renderTabBar={renderTabBar}>
      <Tabs.Tab name="scheduleLabel" label={renderScheduleLabel}>
        {/* TODO: hrookim change DATA to groupDetail */}
        <Tabs.FlatList data={DATA.schedules} renderItem={renderItem} keyExtractor={item => item.id + 'id'} />
      </Tabs.Tab>
      <Tabs.Tab name="momentsLabel" label={renderMomentsLabel}>
        <Tabs.ScrollView>
          <TouchableOpacity activeOpacity={0.6}>
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                alignSelf: 'center',
                height: 35,
                width: width - 120,
                marginVertical: 15,
                borderColor: theme.color.border,
                borderWidth: 2,
                borderRadius: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: theme.color.bright.blue,
                  borderTopLeftRadius: 7,
                  borderBottomLeftRadius: 7,
                  borderColor: theme.color.border,
                  borderRightWidth: 2,
                }}></View>
              <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <FontAwesomeIcon icon={faMapLocationDot} size={20} color="gray" />
                <Text style={{ fontSize: 20, fontWeight: '900', alignItems: 'center' }}>{`  지도로 추억 보기`}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={{ marginBottom: 105, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {MOMENTS.map((item, i) => (
              <GroupDetailMomentsItem
                key={item.id}
                id={item.id}
                photo={item.photo}
                width={width / 3 - 2}
                color={colorList[(item.id % 4) + 3]}
              />
            ))}
          </View>
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
