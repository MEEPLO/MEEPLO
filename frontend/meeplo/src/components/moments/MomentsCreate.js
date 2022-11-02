import { useState } from 'react';
import {View, Text, Pressable, Button, Image} from 'react-native';
import {WebView} from 'react-native-webview';
import styled from 'styled-components';
import mergeAndUpload from './mergeAndUpload';
import AWS from 'aws-sdk';

// npm install react-native-webview --legacy-peer-deps
// npm i react-native-dotenv --legacy-peer-deps
// yarn add aws-sdk

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

  return 'ourMoment' + year + month + day + hour + minute + second + '.jpg';
};


const MomentsCreate = () => {

  const uploadToS3 = (dataString) => {
    let now = new Date();
    const imageTitle = getImageTitle(now);

    const data = JSON.parse(dataString);
    var blobData = new Blob([data], {type: 'image/jpg'});

    AWS.config.update({
      region: bucketRegion,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
      })
    });

    var s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: {Bucket: albumBucketName}
    });

    var params = {
      Key: imageTitle,
      ContentType: 'image/jpg',
      Body: blobData,
    };

    console.log(s3)
    s3.upload(params, function (err, data) {
      if (err) {
        return alert(err.stack);
      }
      alert('Successfully uploaded photo.');
      console.log(data.Location);
    });
  };

  function onMessage(event) {
    uploadToS3(event.nativeEvent.data);
  }

  return (
    <View style={{height: 550}}>
      <WebView source={{html: mergeAndUpload}} onMessage={onMessage} />
    </View>
  );
};

export default MomentsCreate;
