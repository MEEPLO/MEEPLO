import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GroupListItem from '../components/Group/GroupListItem';
import { theme } from '../assets/constant/DesignTheme';
import { getGroupList } from '../redux/groupSlice';

const GroupHomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const groupList = useSelector(state => state.groupList);
  const colorList = ['red', 'orange', 'yellow', 'green', 'blue', 'navy', 'purple'];

  // TODO: hrookim navigate to group details
  const onPressGroup = () => {
    // navigation.navigate()
  };
  const data = [
    {
      id: 1,
      name: '첫번째 그룹',
      photo: 'https://economist.co.kr/data/photo/202206/21/9960f61b-1670-47c0-88ab-6436796a8abf.jpg',
      memberCount: 5,
      leaderName: '김혜림',
      lastSchedule: '2022-11-11 11:11:11',
    },
    {
      id: 2,
      name: '두번째 그룹',
      photo: 'https://economist.co.kr/data/photo/202206/21/9960f61b-1670-47c0-88ab-6436796a8abf.jpg',
      memberCount: 3,
      leaderName: '공조한',
      lastSchedule: '2022-11-11 11:11:11',
    },
    {
      id: 3,
      name: '세번째 그룹',
      photo: 'https://economist.co.kr/data/photo/202206/21/9960f61b-1670-47c0-88ab-6436796a8abf.jpg',
      memberCount: 4,
      leaderName: '으아아아아',
      lastSchedule: '1111-11-11 11:11:11',
    },
    {
      id: 4,
      name: '네번째 그룹',
      photo: 'https://economist.co.kr/data/photo/202206/21/9960f61b-1670-47c0-88ab-6436796a8abf.jpg',
      memberCount: 4,
      leaderName: '맹구야놀자',
      lastSchedule: '2022-11-11 11:11:11',
    },
    {
      id: 5,
      name: '다섯번째 그룹',
      photo: 'https://economist.co.kr/data/photo/202206/21/9960f61b-1670-47c0-88ab-6436796a8abf.jpg',
      memberCount: 4,
      leaderName: '아기허스키',
      lastSchedule: '2022-11-11 11:11:11',
    },
    {
      id: 6,
      name: '여섯번째 그룹',
      photo: 'https://economist.co.kr/data/photo/202206/21/9960f61b-1670-47c0-88ab-6436796a8abf.jpg',
      memberCount: 4,
      leaderName: '으아아아아',
      lastSchedule: '2022-11-30 11:11:11',
    },
  ];

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
        <Text style={{ fontSize: 24, fontWeight: '900', fontColor: theme.font.color }}>그룹 리스트</Text>
      </View>
      <View>
        {/* change to groupList */}
        {data.map((item, i) => (
          <View style={{ marginVertical: 4 }} key={`groupList-${i}`}>
            <TouchableOpacity activeOpacity={0.6}>
              <GroupListItem
                name={item.name}
                photo={item.photo}
                memberCount={item.memberCount}
                leaderName={item.leaderName}
                lastSchedule={item.lastSchedule}
                color={colorList[i % 7]}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={{ height: 90 }} />
    </ScrollView>
  );
};

export default GroupHomeScreen;
