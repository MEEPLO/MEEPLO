import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import GroupListItem from '../components/Group/GroupListItem';
import { theme } from '../assets/constant/DesignTheme';
import { getGroupList } from '../redux/groupSlice';

const GroupHomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const groupList = useSelector(state => state.groupList);
  const colorList = ['red', 'orange', 'yellow', 'green', 'blue', 'navy', 'purple'];

  const onPressGroup = props => {
    navigation.navigate('GroupDetail', { groupId: props });
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
        <Text style={{ fontSize: 24, fontWeight: '900', fontColor: theme.font.color }}>그룹 리스트</Text>
      </View>
      {groupList?.map((item, i) => (
        <View style={{ marginVertical: 4 }} key={`groupList-${i}`}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              onPressGroup(item.id);
            }}>
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
      <View style={{ height: 90 }} />
    </ScrollView>
  );
};

export default GroupHomeScreen;
