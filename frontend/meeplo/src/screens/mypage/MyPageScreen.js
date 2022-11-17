import { ScrollView, View, Text, Image, TouchableOpacity, Dimensions, Alert, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import AWS from 'aws-sdk';
import { decode } from 'base64-arraybuffer';
import fs from 'react-native-fs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import Toast from 'react-native-toast-message';
import { theme } from '../../assets/constant/DesignTheme';
import { MEEPLO_APP_ALBUM_BUCKET_NAME, MEEPLO_APP_BUCKET_REGION, MEEPLO_APP_IDENTITY_POOL_ID } from '@env';
import { editUserInfo, getUserInfo } from '../../redux/userSlice';
import LoadingModal from '../../components/common/LoadingModal';
import { useIsFocused } from '@react-navigation/native';
import { TOAST_MESSAGE } from '../../assets/constant/string';

const { width } = Dimensions.get('window');

const MyPageScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.info);
  const [userPhotoFile, setUserPhotoFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userNickname, setUserNickname] = useState(user?.nickname);
  const [userPhoto, setUserPhoto] = useState(user?.profilePhoto);
  const [inputBorderColor, setInputBorderColor] = useState(theme.color.disabled);
  const [isProfilePictureEdit, setIsprofilePrictureEdit] = useState(false);
  const userInitialNickname = user?.nickname;
  const userInitialPhoto = user?.profilePhoto;
  const isEditLoading = useSelector(state => state.user.isEditLoading);

  const validateInput = () => {
    if (!userNickname || userNickname.length === 0) {
      Toast.show({
        type: 'error',
        text1: TOAST_MESSAGE.REQUIRED_FIELD_ERROR,
        text2: TOAST_MESSAGE.USER_NO_NICKNAME,
      });
      return false;
    } else if (!userPhoto || userPhoto.length === 0) {
      Toast.show({
        type: 'error',
        text1: TOAST_MESSAGE.REQUIRED_FIELD_ERROR,
        text2: TOAST_MESSAGE.USER_NO_PROFILEPHOTO,
      });
      return false;
    } else if (userNickname.length > 8) {
      Toast.show({
        type: 'error',
        text1: TOAST_MESSAGE.INPUT_ERROR,
        text2: TOAST_MESSAGE.USER_NAME_LENGTH_EXCESS,
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

    setIsprofilePrictureEdit(true);
    s3.upload(params, function (err, data) {
      if (err) {
        setIsprofilePrictureEdit(false);
        setIsEditing(!isEditing);
        return alert(err.stack);
      }

      const form = {
        nickname: userNickname,
        profilePhoto: data.Location,
      };

      setIsprofilePrictureEdit(false);
      setIsEditing(!isEditing);
      dispatch(editUserInfo({ form, Alert, navigation })).then(() => {
        dispatch(getUserInfo());
      });
    });
  };

  const inputOnBlur = () => {
    setInputBorderColor(theme.color.disabled);
  };

  const inputOnFocus = () => {
    setInputBorderColor(theme.color.bright.red);
  };

  const onPressEdit = () => {
    if (validateInput()) {
      if (userPhoto === userInitialPhoto) {
        const form = {
          nickname: userNickname,
          profilePhoto: userPhoto,
        };
        dispatch(editUserInfo({ form, Alert, navigation })).then(() => {
          dispatch(getUserInfo());
        });
        setIsEditing(!isEditing);
      } else {
        uploadToS3(userPhotoFile);
      }
    }
  };

  const onClickCancel = () => {
    setIsEditing(!isEditing);
    setUserNickname(userInitialNickname);
    setUserPhoto(userInitialPhoto);
  };

  const onPressEditLocations = () => {
    navigation.navigate('MyPageLocation');
  };

  useEffect(() => {
    if (!isFocused) {
      setIsEditing(false);
    }
  }, [isFocused]);

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  return (
    <View style={{ flex: 1, marginHorizontal: 20 }}>
      <ScrollView>
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
            {user.startLocations.length !== 0 && (
              <TouchableOpacity
                activeOpacity={0.6}
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={onPressEditLocations}>
                <Text>수정</Text>
                <FontAwesomeIcon icon={faChevronRight} size={10} color="black" />
              </TouchableOpacity>
            )}
          </View>
          <View style={{ marginHorizontal: 20 }}>
            {user.startLocations.length === 0 && (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={onPressEditLocations}
                style={{
                  borderWidth: 2,
                  borderColor: theme.color.disabled,
                  height: 100,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{ fontSize: 16 }}>아직 등록된 출발지가 없네요!</Text>
                <Text style={{ fontSize: 20, color: 'gray' }}>출발지를 등록해보세요</Text>
              </TouchableOpacity>
            )}
            {user.startLocations.map((item, index) => {
              return (
                <View key={'startLocation' + index} style={{ marginVertical: 10 }}>
                  <Text style={{ fontSize: 20, fontWeight: '700', color: 'black' }}>{item.name}</Text>
                  <Text style={{ fontSize: 16, fontWeight: '400' }}>{item.address}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <LoadingModal visible={isEditLoading || isProfilePictureEdit} />
    </View>
  );
};

export default MyPageScreen;
