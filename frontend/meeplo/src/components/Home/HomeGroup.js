import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import HomeGroupItem from './HomeGroupItem';
import { theme } from '../../assets/constant/DesignTheme';
import FontText from '../common/FontText';

const width = (Dimensions.get('window').width - 40) / 2;

const HomeGroup = ({ data, navigation }) => {
  const onPressCreateGroup = () => {
    navigation.navigate('GroupStack', { screen: 'GroupCreate' });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        navigation.navigate('GroupStack', { screen: 'GroupDetail', params: { groupId: item.id } });
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
      {data?.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <TouchableOpacity
          onPress={onPressCreateGroup}
          style={{
            width,
            height: width,
            borderRadius: 20,
            overflow: 'hidden',
            borderColor: theme.color.disabled,
            borderWidth: 3,
            marginRight: 20,
          }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FontText style={{ fontSize: 16, color: 'gray' }}>새로운 그룹을</FontText>
            <FontText style={{ fontSize: 16, color: 'gray' }}>만들어보세요</FontText>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View
              style={{
                borderWidth: 2,
                borderColor: 'gray',
                width: 36,
                height: 36,
                borderRadius: 18,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesomeIcon icon={faPlus} color="gray" size={30} />
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default HomeGroup;
