import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { theme } from '../../assets/constant/DesignTheme';
import { deleteStartLocation, getUserInfo } from '../../redux/userSlice';

const MyPageLocationItem = ({ item, navigation }) => {
  const dispatch = useDispatch();

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
        borderWidth: 2,
        borderColor: theme.color.disabled,
        borderRadius: 20,
        padding: 20,
        marginVertical: 10,
      }}>
      <Text style={{ fontSize: 20, fontWeight: '700', color: 'black' }}>{item.name}</Text>
      <Text style={{ marginTop: 5, fontSize: 16, fontWeight: '400' }}>{item.address}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        {/* <TouchableOpacity
          style={{ marginTop: 5, marginHorizontal: 5 }}
          onPress={() => {
            console.log(item.id);
            navigation.navigate('MyPageLocationEdit', { locationId: item.id });
          }}>
          <Text style={{ fontSize: 16, fontWeight: '400', color: 'black' }}>수정</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={{ marginTop: 5, marginHorizontal: 5 }} onPress={onPressDelete}>
          <Text style={{ fontSize: 16, fontWeight: '400', color: theme.color.alert }}>삭제</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyPageLocationItem;
