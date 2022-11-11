import { View, Text, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { theme } from '../../assets/constant/DesignTheme';
import { editUserInfo } from '../../redux/userSlice';

const MyPageScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.info);
  const [isEditing, setIsEditing] = useState(false);
  const [userNickname, setUserNickname] = useState(user.nickname);
  const [userPhoto, setUserPhoto] = useState(user.profilePhoto);
  const { width, height } = Dimensions.get('window');

  const DATA = {
    id: 2,
    nickname: '김혜림',
    profilePhoto: 'http://k.kakaocdn.net/dn/8v2nW/btrN66KPJ0G/kUvxNi2zoea8K4y3mzfMc0/img_640x640.jpg',
    startLocations: [
      {
        id: 1,
        name: '집',
        address: '서울특별시 양천구 신월동 350-2 신안파크아파트',
      },
      {
        id: 2,
        name: '집',
        address: '서울특별시 양천구 신월동 350-2 신안파크아파트',
      },
      {
        id: 3,
        name: '집',
        address:
          '서울특별시 양천구 신월동 350-2 신안파크아파트 겁나 길어지면 어때요? 오오오오오오 알아서 되네 좋아요굳굳',
      },
      {
        id: 4,
        name: '집',
        address: '서울특별시 양천구 신월동 350-2 신안파크아파트',
      },
      {
        id: 5,
        name: '집',
        address: '서울특별시 양천구 신월동 350-2 신안파크아파트',
      },
    ],
  };

  const onPressEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // dispatch(editUserInfo({ form, Alert, navigation }));
    }
  };

  const onPressEditLocations = () => {};

  return (
    <View style={{ flex: 1, marginHorizontal: 20 }}>
      <View
        style={{
          width: '100%',
          height: 220,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={{ uri: user.profilePhoto }}
          style={{ width: 120, height: 120, borderRadius: 60, borderWidth: 2, borderColor: theme.color.border }}
          resizeMode="contain"
        />
        {isEditing && (
          <TouchableOpacity
            activeOpacity={0.6}
            style={{
              position: 'absolute',
              width: 34,
              height: 34,
              borderRadius: 17,
              backgroundColor: 'red',
              left: width / 2,
            }}
          />
        )}
        <Text style={{ fontSize: 30, fontWeight: '900', color: 'black', marginVertical: 10 }}>{user?.nickname}</Text>
        {isEditing ? (
          <TouchableOpacity
            onPress={onPressEdit}
            activeOpacity={0.6}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 35,
              width: 150,
              borderColor: theme.color.border,
              borderWidth: 2,
              borderRadius: 10,
              backgroundColor: theme.color.pale.orange,
            }}>
            <Text style={{ fontSize: 20, fontWeight: '900', color: 'black' }}>수정</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={onPressEdit}
            activeOpacity={0.6}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 35,
              width: 150,
              borderColor: theme.color.border,
              borderWidth: 2,
              borderRadius: 10,
              backgroundColor: theme.color.pale.green,
            }}>
            <Text style={{ fontSize: 20, fontWeight: '900', color: 'black' }}>프로필 수정</Text>
          </TouchableOpacity>
        )}
      </View>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 24, fontWeight: '900', color: 'black', marginVertical: 25 }}>등록된 출발지</Text>
          <TouchableOpacity
            activeOpacity={0.6}
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={onPressEditLocations}>
            <Text>수정</Text>
            <FontAwesomeIcon icon={faChevronRight} size={10} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ marginHorizontal: 20 }}>
          {DATA.startLocations.map((item, index) => {
            return (
              <View key={'startLocation' + index} style={{ marginVertical: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: '700', color: 'black' }}>{item.name}</Text>
                <Text style={{ fontSize: 16, fontWeight: '400' }}>{item.address}</Text>
              </View>
            );
          })}
        </View>
      </View>
      {/* Inviting button */}
    </View>
  );
};

export default MyPageScreen;
