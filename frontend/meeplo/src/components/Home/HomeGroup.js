import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import HomeGroupItem from './HomeGroupItem';

const HomeGroup = ({ data, navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        // TODO: hrookim navigate to Group-DETAIL page
        navigation.navigate('HomeStack', { screen: 'Login' });
        // navigation.navigate()
      }}>
      <HomeGroupItem
        name={item.name}
        lastSchedule={item?.lastSchedule}
        photo={item.photo}
        memberCount={item.memberCount}
        leaderName={item.leaderName}
      />
    </TouchableOpacity>
  );

  return (
    <View style={{ marginHorizontal: 20 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
export default HomeGroup;
