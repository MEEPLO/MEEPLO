import { View, Text, Image, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import AWS from 'aws-sdk';
import { decode } from 'base64-arraybuffer';
import fs from 'react-native-fs';
import { theme } from '../assets/constant/DesignTheme';
import StepTextInput from '../components/common/StepTextInput';
import { hideTabBar, showTabBar } from '../redux/navigationSlice';
import { MEEPLO_APP_ALBUM_BUCKET_NAME, MEEPLO_APP_BUCKET_REGION, MEEPLO_APP_IDENTITY_POOL_ID } from '@env';
import { editGroup } from '../redux/groupSlice';
import { useFocusEffect } from '@react-navigation/native';

const DATA = {
  id: 1,
  name: 'SSAFY 갓자율',
  description:
    '그룹 상세 설명이라굽쇼 이게 200자나 된다는 말이죠 이게 쉽지 않습니다 저희는 삼성 청년 소프트웨어 아카데미 7기를 다니고 있는 6명의 정예 인원이 모여서 자율 프로젝트에 임하게 되었습니다 5반에 배정되어 지금 8팀이고 덕분에 바로 문 옆에 자리가 있더라고요 근데 생각보다 많이 거슬리지 않아서 저는 이 자리가 좋습니다 그리고 칠판과 플립을 쓸 수 있어요!',
  photo: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg',
  leader: '김혜림킹갓제너럴',
  members: [
    {
      id: 1,
      nickname: '김혜림킹갓제너럴',
      photo:
        'https://static.wikia.nocookie.net/pororo/images/e/e0/LoopyCurrentOutfit.jpg/revision/latest?cb=20220224155019',
    },
    {
      id: 2,
      nickname: '한나두나세나',
      photo: 'https://item.kakaocdn.net/do/c5c470298d527ef65eb52883f0f186c49f17e489affba0627eb1eb39695f93dd',
    },
  ],
  schedules: [
    {
      id: 1,
      name: '첫번째 약속',
      date: '2022-11-11 11:11:11',
      memberCount: 6,
      location: {
        meetName: '역삼역',
        amuseName: '매화램 양꼬치',
      },
    },
    {
      id: 2,
      name: '두번째 약속',
      date: '2022-11-18 11:11:11',
      memberCount: 5,
      location: {
        meetName: '강남역',
        amuseName: '양국',
      },
    },
    {
      id: 3,
      name: '두번째 약속',
      date: '2022-11-18 11:11:11',
      memberCount: 5,
      location: {
        meetName: '강남역',
        amuseName: '양국',
      },
    },
    {
      id: 4,
      name: '두번째 약속',
      date: '2022-11-18 11:11:11',
      memberCount: 5,
      location: {
        meetName: '강남역',
        amuseName: '양국',
      },
    },
    {
      id: 5,
      name: '두번째 약속',
      date: '2022-11-18 11:11:11',
      memberCount: 5,
      location: {
        meetName: '강남역',
        amuseName: '양국',
      },
    },
  ],
};

const GroupEditScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const groupDetail = useSelector(state => state.group.details);

  // TODO: hrookim change DATA to groupDetail
  const [groupPhotoFile, setGroupPhotoFile] = useState(null);
  const [groupName, setGroupName] = useState(DATA.name);
  const [groupPhoto, setGroupPhoto] = useState(DATA.photo);
  const [groupDescription, setGroupDescription] = useState(DATA.description);
  const [inputBorderColor, setInputBorderColor] = useState(theme.color.disabled);
  const { width, height } = Dimensions.get('window');

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
      dispatch(editGroup(form));
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
    <View style={{ height }}>
      <View style={{ margin: 20 }}>
        <StepTextInput type="그룹명" maxLength={20} required={true} onValueChange={setGroupName} value={groupName} />
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
          value={groupDescription}
          onChangeText={setGroupDescription}
          style={{ borderColor: inputBorderColor, borderWidth: 1 }}
        />
      </View>
      <TouchableOpacity
        style={{
          position: 'absolute',
          alignItems: 'center',
          width,
          backgroundColor: 'white',
          justifyContent: 'center',
          height: 90,
          top: height - 140,
        }}
        activeOpacity={0.6}
        onPress={onPressCreate}>
        <Text style={{ color: theme.color.alert, fontSize: 20, fontWeight: '900' }}>만들기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GroupEditScreen;
