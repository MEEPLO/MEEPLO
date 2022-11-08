import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';
import React, { useState, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import AWS from 'aws-sdk';
import { decode } from 'base64-arraybuffer';
import fs from 'react-native-fs';
import { theme } from '../assets/constant/DesignTheme';
import StepTextInput from '../components/common/StepTextInput';
import { hideTabBar, showTabBar } from '../redux/navigationSlice';
// import { MEEPLO_APP_ALBUM_BUCKET_NAME, MEEPLO_APP_BUCKET_REGION, MEEPLO_APP_IDENTITY_POOL_ID } from '@env';
import { createGroup } from '../redux/groupSlice';

const MEEPLO_APP_ALBUM_BUCKET_NAME = 'meeplo-bucket';
const MEEPLO_APP_BUCKET_REGION = 'ap-northeast-2';
const MEEPLO_APP_IDENTITY_POOL_ID = 'ap-northeast-2:0a2bdbc0-2ec9-4898-85e2-3404fad80059';

import { useFocusEffect } from '@react-navigation/native';
const GroupCreateScreen = () => {
  const dispatch = useDispatch();
  const [groupPhotoFile, setGroupPhotoFile] = useState(null);
  const [groupName, setGroupName] = useState('');
  const [groupPhoto, setGroupPhoto] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [inputBorderColor, setInputBorderColor] = useState(theme.color.disabled);
  const { width } = Dimensions.get('window');

  const addImage = async () => {
    const result = await launchImageLibrary();
    const file = {
      uri: result?.assets[0].uri,
      name: result?.assets[0].fileName,
      type: result?.assets[0].type,
    };
    setGroupPhotoFile(file);
    setGroupPhoto(result.assets[0].uri);
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
        name: groupName,
        photo: data.Location,
        description: groupDescription,
      };
      dispatch(createGroup(form));
      // TODO: hrookim navigate to group details
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

  const onPressCreate = () => {
    uploadToS3(groupPhotoFile);
    // 로딩 모달 열기
  };

  useFocusEffect(() => {
    dispatch(hideTabBar());

    return () => {
      dispatch(showTabBar());
    };
  });

  return (
    <View>
      <View style={{ margin: 20 }}>
        <StepTextInput type="그룹명" maxLength={20} required={true} inputValueHandler={setGroupName} />
      </View>
      <View style={{ margin: 20 }}>
        <Text style={{ color: theme.font.color, fontWeight: '800' }}>
          대표 사진<Text style={{ color: theme.color.alert }}>*</Text>
        </Text>
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <View
            style={{
              width: 160,
              height: 160,
              borderRadius: 20,
              borderWidth: 3,
              borderStyle: 'dashed',
              borderColor: theme.color.disabled,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {!!groupPhoto && (
              <Image
                source={{ uri: groupPhoto }}
                style={{ width: 160, height: 160, borderRadius: 20, borderWidth: 3, borderColor: theme.color.disabled }}
                resizeMode="cover"
              />
            )}
          </View>
          <TouchableOpacity
            style={{
              marginTop: 20,
              width: 120,
              height: 30,
              borderRadius: 15,
              borderWidth: 2,
              borderColor: theme.color.border,
            }}
            onPress={addImage}
            activeOpacity={0.6}>
            <Text style={{ color: 'black', alignSelf: 'center', lineHeight: 24 }}>이미지 선택</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ color: theme.font.color, fontWeight: '800', marginVertical: 20 }}>그룹 설명</Text>
        <TextInput
          multiline={true}
          numberOfLines={6}
          onBlur={inputOnBlur}
          onFocus={inputOnFocus}
          onChangeText={setGroupDescription}
          style={{ borderColor: inputBorderColor, borderWidth: 1 }}
        />
      </View>
      <TouchableOpacity
        style={{
          alignSelf: 'flex-end',
          alignItems: 'center',
          width,
          backgroundColor: 'white',
          justifyContent: 'center',
          height: 90,
          top: 30,
        }}
        activeOpacity={0.6}
        onPress={onPressCreate}>
        <Text style={{ color: theme.color.alert, fontSize: 20, fontWeight: '900' }}>만들기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GroupCreateScreen;
