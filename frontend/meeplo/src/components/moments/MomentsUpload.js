import React from 'react';
import { View, Text, Pressable, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import mergeAndUpload from './mergeAndUpload';
import AWS from 'aws-sdk';
import { MEEPLO_APP_ALBUM_BUCKET_NAME, MEEPLO_APP_BUCKET_REGION, MEEPLO_APP_IDENTITY_POOL_ID } from '@env';
import { decode } from 'base64-arraybuffer';
import { theme } from '../../assets/constant/DesignTheme';

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

const MpomentsUpload = ({ setPictureUrl, frameType }) => {
  const webviewRef = React.useRef();
  const viewWidth = Dimensions.get('window').width - 120;

  console.log(frameType);
  const html = mergeAndUpload(1);
  // upload image
  const uploadToS3 = dataString => {
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
      alert('Successfully uploaded photo.');
      // console.log(data.Location);
      setPictureUrl(data.Location);
    });
  };

  const onMessage = event => {
    uploadToS3(event.nativeEvent.data);
  };

  return (
    <View style={{ marginHorizontal: 20, width: viewWidth, height: 530, position: 'relative' }}>
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
          bottom: 65,
        }}>
        <Text style={{ lineHeight: 53, textAlign: 'center', fontSize: 20, fontWeight: '800' }}>갤러리</Text>
      </Pressable>
      <Pressable
        style={{
          width: viewWidth,
          height: 35,
          borderRadius: 15,
          overflow: 'hidden',
          position: 'absolute',
          bottom: 20,
        }}>
        <Text style={{ lineHeight: 33, textAlign: 'center', fontSize: 15, fontWeight: '800' }}>사진 선택 초기화</Text>
      </Pressable>
      <WebView
        ref={webviewRef}
        source={{ html: html }}
        onMessage={onMessage}
        style={{ backgroundColor: 'transparent' }}
      />
    </View>
  );
};

export default MpomentsUpload;
