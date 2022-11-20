import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import MyPageLocationItem from '../../components/mypage/MyPageLocationItem';

const MyPageLocationScreen = ({ navigation }) => {
  const startLocations = useSelector(state => state.user.info.startLocations);

  return (
    <ScrollView style={{ flex: 1, marginHorizontal: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginVertical: 25 }}>등록된 출발지</Text>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}></View>
      {Array.isArray(startLocations) &&
        startLocations.map((item, index) => {
          return <MyPageLocationItem item={item} navigation={navigation} key={item.id} />;
        })}
      {Array.isArray(startLocations) && startLocations.length < 5 && (
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MyPageLocationEdit', { params: { locationId: 0 } });
            }}
            activeOpacity={0.6}
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
          </TouchableOpacity>
        </View>
      )}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

export default MyPageLocationScreen;
