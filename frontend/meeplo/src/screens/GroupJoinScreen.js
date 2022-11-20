import { View, Text } from 'react-native';
import React from 'react';

const GroupJoinScreen = ({ route, navigation }) => {
  // TODO: 친구 초대 수락하기
  console.log(route.test, route.groupId);
  return (
    <View>
      <Text style={{ fontSize: 30, color: 'gray' }}>GroupJoinScreen</Text>
    </View>
  );
};

export default GroupJoinScreen;
