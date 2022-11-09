import { View, Text } from 'react-native';
import React from 'react';
import GroupDetailHeader from '../components/Group/GroupDetailHeader';

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

const GroupEditScreen = ({ route, navigation }) => {
  const { groupId } = route.params;

  return (
    <View>
      <GroupDetailHeader data={DATA} navigation={navigation} groupId={groupId} isEdit={true} />
      <Text>GroupEditScreen</Text>
    </View>
  );
};

export default GroupEditScreen;
