import React from 'react';
import { View, Text, Pressable, Dimensions, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import AWS from 'aws-sdk';
import { MEEPLO_APP_ALBUM_BUCKET_NAME, MEEPLO_APP_BUCKET_REGION, MEEPLO_APP_IDENTITY_POOL_ID } from '@env';
import { decode } from 'base64-arraybuffer';
import Toast from 'react-native-toast-message';

import { TOAST_MESSAGE } from '../../../assets/constant/string';
import { theme } from '../../../assets/constant/DesignTheme';
import mergeAndUpload from '../mergeAndUpload';
import StepButton from '../../stepper/StepButton';
import LoadingModal from '../../common/LoadingModal';

const windowHeight = Dimensions.get('window').height;
const viewWidth = Dimensions.get('window').width - 120;

const getImageTitle = date => {
  let year = date.getFullYear().toString().substring(2);
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  month = month >= 10 ? month : '0' + month;
  day = day >= 10 ? day : '0' + day;
  hour = hour >= 10 ? hour : '0' + hour;
  minute = minute >= 10 ? minute : '0' + minute;
  second = second >= 10 ? second : '0' + second;

  return 'ourmoment' + year + month + day + hour + minute + second + '.png';
};

const MomentsSetPicture = ({ toNext, toPrev, onFinish, visible, state }) => {
  const webviewRef = React.useRef();
  const [pictureUrl, setPictureUrl] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isChanged, setIsChanged] = React.useState(false);
  const [isNext, setIsNext] = React.useState(false);

  // load webview
  const html = mergeAndUpload(state.type);

  // upload image
  const uploadToS3 = dataString => {
    setIsLoading(true);
    let now = new Date();
    const imageTitle = getImageTitle(now);
    const base64 = dataString.split(',')[1];
    const arrayBuffer = decode(base64);

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

    var params = {
      Key: imageTitle,
      ContentType: 'image/png',
      Body: arrayBuffer,
    };

    s3.upload(params, function (err, data) {
      if (err) {
        return alert(err.stack);
      }
      setIsLoading(false);
      Toast.show({
        type: 'success',
        text1: '멋진 추억을 남길 사진이 완성되었어요!',
        text2: "'다음'을 눌러주세요.",
      });
      setPictureUrl(data.Location);
      setIsNext(true);
    });
  };

  const onMessage = event => {
    // console.log(event.nativeEvent.data);
    event.nativeEvent.data === 'input changed' ? setIsChanged(true) : uploadToS3(event.nativeEvent.data);
  };

  const onPressNext = () => {
    const actions = [
      {
        type: 'UPDATE_PICTURE',
        payload: pictureUrl,
      },
    ];

    !!pictureUrl
      ? toNext(actions)
      : Toast.show({
          type: 'error',
          text1: TOAST_MESSAGE.REQUIRED_FIELD_ERROR,
          text2: TOAST_MESSAGE.MOMENT_NO_PICTURE,
        });
  };

  return visible ? (
    <>
      <View style={{ height: windowHeight - 200, marginHorizontal: 20 }}>
        <Text style={{ color: '#000', fontWeight: 'bold', marginBottom: 20, lineHeight: 25 }}>
          사진 선택<Text style={{ color: theme.color.alert }}>*</Text>
          {'\n'}
          갤러리에서 사진을 꾹 눌러 사진 {state.type === 2 ? state.type + 2 : state.type + 1}개를 선택해주세요.{' '}
        </Text>

        <View
          style={{
            marginHorizontal: 20,
            width: viewWidth,
            height: windowHeight - 350,
            position: 'relative',
          }}>
          <Pressable
            style={{
              width: viewWidth,
              height: 55,
              borderRadius: 15,
              overflow: 'hidden',
              borderColor: theme.color.border,
              borderWidth: 2,
              backgroundColor: theme.color.pale.red,
              position: 'absolute',
              bottom: 85,
            }}>
            <Text style={{ lineHeight: 49, textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: 'gray' }}>
              갤러리
            </Text>
          </Pressable>
          {isChanged ? (
            <Pressable
              style={{
                width: viewWidth,
                height: 55,
                borderRadius: 15,
                overflow: 'hidden',
                borderColor: theme.color.border,
                borderWidth: 2,
                backgroundColor: theme.color.bright.red,
                position: 'absolute',
                bottom: 20,
              }}>
              <Text style={{ lineHeight: 51, textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: 'gray' }}>
                사진 확정하기
              </Text>
            </Pressable>
          ) : null}
          <WebView
            ref={webviewRef}
            source={{ html: html }}
            onMessage={onMessage}
            style={{ backgroundColor: 'transparent' }}
          />
        </View>
      </View>
      {isNext ? (
        <View
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <StepButton text="< 이전" active={true} onPress={toPrev} />
          <StepButton text="다음 >" active={true} onPress={onPressNext} />
        </View>
      ) : null}

      <LoadingModal visible={isLoading} />
    </>
  ) : null;
};

export default MomentsSetPicture;
