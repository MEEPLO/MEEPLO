import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { theme } from '../../assets/constant/DesignTheme';
import { deleteStartLocation, getUserInfo, changeDefaultLocation } from '../../redux/userSlice';
// import FontText from '../common/FontText';

const MyPageLocationItem = ({ item, navigation }) => {
  // console.log(item);
  const dispatch = useDispatch();

  const onPressDefault = () => {
    Alert.alert(
      '기본 출발지 설정',
      `기본 출발지를 ${item.name}(으)로 설정하시겠습니까?`,
      [
        {
          text: '취소',
        },
        {
          text: '확인',
          onPress: () => {
            dispatch(changeDefaultLocation({ locationId: item.id, Alert, locationName: item.name })).then(() => {
              dispatch(getUserInfo());
            });
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const onPressDelete = () => {
    Alert.alert(
      '출발지 삭제',
      `출발지 ${item.name}을/를 삭제하시겠습니까?`,
      [
        {
          text: '취소',
        },
        {
          text: '삭제',
          onPress: () => {
            dispatch(deleteStartLocation({ locationId: item.id })).then(() => {
              dispatch(getUserInfo());
            });
            Alert.alert(`출발지 ${item.name}을/를 삭제했습니다.`);
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };
  return (
    <View
      style={{
        // height: 100,
        borderWidth: 2,
        borderColor: item.defaultLocation ? theme.color.alert : theme.color.disabled,
        borderRadius: 20,
        padding: 20,
        marginVertical: 10,
      }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>{item.name}</Text>
      <Text style={{ marginTop: 5, fontSize: 16, fontWeight: '400', color: 'gray' }}>{item.address}</Text>
      {!item.defaultLocation ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, height: 20 }}>
          <TouchableOpacity onPress={onPressDefault} style={{ marginHorizontal: 5 }}>
            <Text style={{ fontSize: 16, fontWeight: '400', color: 'black' }}>기본 출발지로 설정</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={onPressDelete}>
            <Text style={{ fontSize: 16, fontWeight: '400', color: theme.color.alert }}>삭제</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ height: 25 }} />
      )}
    </View>
  );
};

export default MyPageLocationItem;
