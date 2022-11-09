import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image, Alert } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faCrown } from '@fortawesome/free-solid-svg-icons/faCrown';
import GroupDetailHeader from '../components/Group/GroupDetailHeader';
import { theme } from '../assets/constant/DesignTheme';
import Images from '../assets/image/index';

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

const GroupDetailInfoScreen = ({ route, navigation }) => {
  const { groupId } = route.params;
  const groupDetail = useSelector(state => state.group.details);
  const { width } = Dimensions.get('window');
  const memberCount = DATA.members.length;
  const isLeader = true;

  const onPressKick = nickname => {
    Alert.alert(
      '그룹 멤버 강퇴',
      `${nickname}님을 강퇴하시겠습니까?`,
      [
        {
          text: '강퇴하기',
          onPress: () => {
            // TODO: hrookim 강퇴 dispatch
            Alert.alert(`${nickname}님을 강퇴했습니다.`);
          },
        },
        {
          text: '취소',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <ScrollView>
      <GroupDetailHeader data={DATA} navigation={navigation} groupId={groupId} isInfo={true} />
      <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 105 }}>
        {/* FIXME: 설명파트 */}
        <View style={{ margin: 20 }}>
          <Text>{DATA.description}</Text>
        </View>

        {/* FIXME: 버튼 */}
        <TouchableOpacity activeOpacity={0.6}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 35,
              width: width - 150,
              marginVertical: 15,
              borderColor: theme.color.border,
              borderWidth: 2,
              borderRadius: 10,
              backgroundColor: theme.color.pale.blue,
            }}>
            <Text style={{ fontSize: 20, fontWeight: '900', color: 'black' }}>친구 초대하기</Text>
          </View>
        </TouchableOpacity>

        {/* FIXME: 멤버 파트 */}
        <View
          style={[
            {
              marginHorizontal: 20,
              marginTop: 20,
              width: width - 40,
              height: 40 * (memberCount + 1),
              borderRadius: 20,
              overflow: 'hidden',
              borderColor: theme.color.border,
              borderWidth: 2,
            },
          ]}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              borderTopEndRadius: 20,
              width: width - 40,
              overflow: 'hidden',
              borderColor: theme.color.border,
              borderBottomWidth: 2,
              backgroundColor: theme.color.pale.green,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{ marginHorizontal: 20, fontWeight: '900', fontSize: 19, color: 'black' }}>멤버</Text>
            <View style={{ marginHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faUser} size={14} />
              <Text style={{ fontSize: 14, marginLeft: 5, fontWeight: '900', color: 'black' }}>{memberCount}</Text>
            </View>
          </View>
          <View
            style={{
              flex: memberCount,
              flexDirection: 'row',
              marginHorizontal: 20,
              alignItems: 'center',
            }}>
            <View style={{ flex: 3, justifyContent: 'space-evenly', height: width * 0.2 }}>
              {DATA.members.map((item, i) => (
                <View key={'groupMember' + i} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={{ uri: item.photo }}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: theme.color.border,
                    }}
                  />
                  <Text style={{ margin: 10 }}>{item.nickname}</Text>
                  {item.nickname === DATA.leader && <FontAwesomeIcon icon={faCrown} size={14} />}
                  {isLeader && item.nickname !== DATA.leader && (
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => {
                        onPressKick(item.nickname);
                      }}>
                      <Image source={Images.faDoor} style={{ width: 14, height: 14 }} />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
            <View style={{ flex: 1, justifyContent: 'space-evenly', height: width * 0.2 }}></View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default GroupDetailInfoScreen;
