import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import AWS from 'aws-sdk';
import { decode } from 'base64-arraybuffer';
import fs from 'react-native-fs';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';
import { theme } from '../assets/constant/DesignTheme';
import StepTextInput from '../components/common/StepTextInput';
import { hideTabBar, showTabBar } from '../redux/navigationSlice';
import { MEEPLO_APP_ALBUM_BUCKET_NAME, MEEPLO_APP_BUCKET_REGION, MEEPLO_APP_IDENTITY_POOL_ID } from '@env';
import { createGroup } from '../redux/groupSlice';
import LoadingModal from '../components/common/LoadingModal';
import { TOAST_MESSAGE } from '../assets/constant/string';
import FontText from '../components/common/FontText';

const { width } = Dimensions.get('window');

const GroupCreateScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [groupPhotoFile, setGroupPhotoFile] = useState(null);
  const [groupName, setGroupName] = useState('');
  const [groupPhoto, setGroupPhoto] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [inputBorderColor, setInputBorderColor] = useState(theme.color.disabled);
  const [isProfilePictureEdit, setIsprofilePrictureEdit] = useState(false);
  const isLoading = useSelector(state => state.group.isLoading);

  const validateInput = () => {
    if (!groupName || groupName.length === 0) {
      Toast.show({
        type: 'error',
        text1: TOAST_MESSAGE.REQUIRED_FIELD_ERROR,
        text2: TOAST_MESSAGE.GROUP_NO_NAME,
      });
      return false;
    } else if (!groupPhoto || groupPhoto.length === 0) {
      Toast.show({
        type: 'error',
        text1: TOAST_MESSAGE.REQUIRED_FIELD_ERROR,
        text2: TOAST_MESSAGE.GROUP_NO_PHOTO,
      });
      return false;
    } else if (groupName.length > 20) {
      Toast.show({
        type: 'error',
        text1: TOAST_MESSAGE.INPUT_ERROR,
        text2: TOAST_MESSAGE.GROUP_NAME_LENGTH_EXCESS,
      });
      return false;
    } else if (groupDescription.length > 200) {
      Toast.show({
        type: 'error',
        text1: TOAST_MESSAGE.INPUT_ERROR,
        text2: TOAST_MESSAGE.GROUP_DESCRIPTION_LENGTH_EXCESS,
      });
      return false;
    }
    return true;
  };

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
      dispatch(createGroup({ form, Alert, navigation }));
    });
  };

  const inputOnBlur = () => {
    setInputBorderColor(theme.color.disabled);
  };

  const inputOnFocus = () => {
    setInputBorderColor(theme.color.bright.red);
  };

  const onPressCreate = () => {
    if (validateInput()) {
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
          <StepTextInput type="그룹명" maxLength={20} required={true} onValueChange={setGroupName} />
        </View>
        <View style={{ margin: 20 }}>
          <FontText style={{ color: theme.font.color, fontWeight: 'bold' }}>
            대표 사진 <FontText style={{ color: theme.color.alert }}>*</FontText>
          </FontText>
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
              <FontText style={{ color: 'black', alignSelf: 'center', lineHeight: 24 }}>이미지 선택</FontText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <FontText style={{ color: theme.font.color, fontWeight: 'bold', marginVertical: 20 }}>그룹 설명</FontText>
          <TextInput
            multiline={true}
            numberOfLines={6}
            onBlur={inputOnBlur}
            onFocus={inputOnFocus}
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
        onPress={onPressCreate}>
        <FontText style={{ color: theme.color.alert, fontSize: 20, fontWeight: 'bold' }}>만들기</FontText>
      </TouchableOpacity>
      <LoadingModal visible={isLoading || isProfilePictureEdit} />
    </SafeAreaView>
  );
};

export default GroupCreateScreen;
