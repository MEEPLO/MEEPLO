import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
  SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import AWS from 'aws-sdk';
import { decode } from 'base64-arraybuffer';
import fs from 'react-native-fs';
import { theme } from '../assets/constant/DesignTheme';
import StepTextInput from '../components/common/StepTextInput';
import { hideTabBar, showTabBar } from '../redux/navigationSlice';
import { MEEPLO_APP_ALBUM_BUCKET_NAME, MEEPLO_APP_BUCKET_REGION, MEEPLO_APP_IDENTITY_POOL_ID } from '@env';
import { editGroup, getGroupDetail } from '../redux/groupSlice';
import { useFocusEffect } from '@react-navigation/native';
import LoadingModal from '../components/common/LoadingModal';

const { width } = Dimensions.get('window');

const GroupEditScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const groupDetail = useSelector(state => state.group.details);
  const [groupPhotoFile, setGroupPhotoFile] = useState(null);
  const [groupName, setGroupName] = useState(groupDetail.name);
  const [groupPhoto, setGroupPhoto] = useState(groupDetail.photo);
  const [groupInitialPhoto, setGroupInitialPhoto] = useState(groupDetail.photo);
  const [groupDescription, setGroupDescription] = useState(groupDetail.description);
  const [inputBorderColor, setInputBorderColor] = useState(theme.color.disabled);
  const [isProfilePictureEdit, setIsprofilePrictureEdit] = useState(false);
  const isLoading = useSelector(state => state.group.isLoading);

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
    setIsprofilePrictureEdit(true);
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
        setIsprofilePrictureEdit(false);
        return alert(err.stack);
      }

      const form = {
        name: groupName,
        photo: data.Location,
        description: groupDescription,
      };
      setIsprofilePrictureEdit(false);
      dispatch(editGroup({ form, groupId: groupDetail.id, Alert, navigation }));
    });
  };

  const inputOnBlur = () => {
    setInputBorderColor(theme.color.disabled);
  };

  const inputOnFocus = () => {
    setInputBorderColor(theme.color.bright.red);
  };

  const onPressEdit = () => {
    if (groupPhoto === groupInitialPhoto) {
      const form = {
        name: groupName,
        photo: groupPhoto,
        description: groupDescription,
      };
      dispatch(editGroup({ form, groupId: groupDetail.id, Alert, navigation }));
    } else {
      uploadToS3(groupPhotoFile);
    }
  };

  useFocusEffect(() => {
    dispatch(hideTabBar());

    return () => {
      dispatch(showTabBar());
    };
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ margin: 20 }}>
          <StepTextInput
            type="그룹명"
            maxLength={20}
            required={true}
            onValueChange={setGroupName}
            value={groupName}
            multiline={false}
          />
        </View>
        <View style={{ margin: 20 }}>
          <Text style={{ color: theme.font.color, fontWeight: '800' }}>
            대표 사진 <Text style={{ color: theme.color.alert }}>*</Text>
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
                  style={{
                    width: 160,
                    height: 160,
                    borderRadius: 20,
                    borderWidth: 3,
                    borderColor: theme.color.disabled,
                  }}
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
      </ScrollView>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          width,
          justifyContent: 'center',
          height: 70,
        }}
        activeOpacity={0.6}
        onPress={onPressEdit}>
        <Text style={{ color: theme.color.alert, fontSize: 20, fontWeight: '900' }}>수정하기</Text>
      </TouchableOpacity>
      <LoadingModal visible={isLoading || isProfilePictureEdit} />
    </SafeAreaView>
  );
};

export default GroupEditScreen;
