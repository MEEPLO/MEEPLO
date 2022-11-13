import { ScrollView, View, Text, Image, TouchableOpacity, Dimensions, Alert, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import AWS from 'aws-sdk';
import { decode } from 'base64-arraybuffer';
import fs from 'react-native-fs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { theme } from '../../assets/constant/DesignTheme';
import { MEEPLO_APP_ALBUM_BUCKET_NAME, MEEPLO_APP_BUCKET_REGION, MEEPLO_APP_IDENTITY_POOL_ID } from '@env';
import { editUserInfo } from '../../redux/userSlice';

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

const MyPageScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.info);
  const [userPhotoFile, setUserPhotoFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userInitialNickname, setUserInitialNickname] = useState(user?.nickname);
  const [userInitialPhoto, setUserInitialPhoto] = useState(user?.profilePhoto);
  const [userNickname, setUserNickname] = useState(user?.nickname);
  const [userPhoto, setUserPhoto] = useState(user?.profilePhoto);
  const [inputBorderColor, setInputBorderColor] = useState(theme.color.disabled);
  const { width, height } = Dimensions.get('window');

  const addImage = async () => {
    const result = await launchImageLibrary();
    const file = {
      uri: result?.assets[0].uri,
      name: result?.assets[0].fileName,
      type: result?.assets[0].type,
    };
    setUserPhotoFile(file);
    setUserPhoto(result.assets[0].uri);
  };

  const uploadToS3 = async file => {
    AWS.config.update({
      region: MEEPLO_APP_BUCKET_REGION,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: MEEPLO_APP_IDENTITY_POOL_ID,
      }),
    });

    var s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: { Bucket: MEEPLO_APP_ALBUM_BUCKET_NAME },
    });

    const base64 = await fs.readFile(file.uri, 'base64');
    const arrayBuffer = decode(base64);

    var params = {
      Key: file.name,
      Body: arrayBuffer,
      ContentDisposition: 'inline;filename="' + file.name + '"',
      ContentType: file.type,
    };

    s3.upload(params, function (err, data) {
      if (err) {
        // 로딩 모달 -> 실패
        return alert(err.stack);
      }
      // console.log(data.Location);
      // setGroupPhoto(data.Location);

      // 로딩 모달 -> 성공 -> 닫기 + 상세(?)로 이동
      const form = {
        nickname: userNickname,
        profilePhoto: data.Location,
      };
      dispatch(editUserInfo({ form, Alert, navigation }));
      // 이동 여기서 바로
      // 상세 컴포넌트에서 리덕스의 값을 가져오는데
      // 아직 업데이트 전이면 -> 스피너, 로딩
      // 업데이트가 되면(값이 제대로 왔다면) -> 상세 스크린 보여주기
    });
  };

  const inputOnBlur = () => {
    setInputBorderColor(theme.color.disabled);
  };

  const inputOnFocus = () => {
    setInputBorderColor(theme.color.bright.red);
  };

  const onPressEdit = () => {
    if (userPhoto === userInitialPhoto) {
      const form = {
        nickname: userNickname,
        profilePhoto: userPhoto,
      };
      dispatch(editUserInfo({ form, Alert, navigation }));
    } else {
      uploadToS3(userPhotoFile);
      // 로딩 모달 열기
    }
    setIsEditing(!isEditing);
  };

  const onClickCancel = () => {
    setIsEditing(!isEditing);
    setUserNickname(userInitialNickname);
    setUserPhoto(userInitialPhoto);
  };

  const onPressEditLocations = () => {};

  return (
    <ScrollView style={{ flex: 1, marginHorizontal: 20 }}>
      <View
        style={{
          width: '100%',
          height: 240,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {!!userPhoto && (
          <Image
            source={{ uri: userPhoto }}
            style={[
              { width: 120, height: 120, borderRadius: 60, borderWidth: 2 },
              { borderColor: isEditing ? theme.color.disabled : theme.color.border },
            ]}
            resizeMode="contain"
          />
        )}
        {isEditing && (
          <TouchableOpacity
            onPress={addImage}
            activeOpacity={0.6}
            style={{
              position: 'absolute',
              width: 34,
              height: 34,
              borderRadius: 17,
              backgroundColor: 'white',
              left: width / 2,
              borderWidth: 1,
              borderColor: theme.color.disabled,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FontAwesomeIcon icon={faPen} color={'gray'} size={17} />
          </TouchableOpacity>
        )}
        {isEditing ? (
          <View>
            <TextInput
              onBlur={inputOnBlur}
              onFocus={inputOnFocus}
              value={userNickname}
              onChangeText={setUserNickname}
              style={{
                textAlign: 'center',
                width: width * 0.6,
                height: 36,
                borderBottomColor: inputBorderColor,
                borderBottomWidth: 1,
                fontSize: 25,
                marginVertical: 15,
                padding: 0,
              }}
            />
          </View>
        ) : (
          <Text style={{ fontSize: 30, fontWeight: '900', color: 'black', marginVertical: 15 }}>{userNickname}</Text>
        )}
        {isEditing ? (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={onClickCancel}
              activeOpacity={0.6}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 35,
                width: 80,
                borderColor: theme.color.border,
                borderWidth: 2,
                borderRadius: 10,
                backgroundColor: theme.color.disabled,
                marginHorizontal: 5,
              }}>
              <Text style={{ fontSize: 20, fontWeight: '900', color: 'black' }}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPressEdit}
              activeOpacity={0.6}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 35,
                width: 80,
                borderColor: theme.color.border,
                borderWidth: 2,
                borderRadius: 10,
                backgroundColor: theme.color.pale.orange,
                marginHorizontal: 5,
              }}>
              <Text style={{ fontSize: 20, fontWeight: '900', color: 'black' }}>수정</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setIsEditing(!isEditing);
            }}
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
    </ScrollView>
  );
};

export default MyPageScreen;
