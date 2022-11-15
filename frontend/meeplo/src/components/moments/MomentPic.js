import React from 'react';
import { View, Dimensions, Pressable, Text, StyleSheet } from 'react-native';
import styled from 'styled-components';
import AutoHeightImage from 'react-native-auto-height-image';
import { theme } from '../../assets/constant/DesignTheme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import AWS from 'aws-sdk';
import { MEEPLO_APP_ALBUM_BUCKET_NAME, MEEPLO_APP_BUCKET_REGION, MEEPLO_APP_IDENTITY_POOL_ID } from '@env';

const MomentsCol = styled.View`
  height: ${({ height }) => height}px;
  padding-left: ${({ paddLeft }) => paddLeft}px;
  margin-bottom: 25px;
`;

const MomentPic = ({ momentData, direction, setMomentModal, setMomentDetailId }) => {
  const windowWidth = Dimensions.get('window').width;
  var imgWidth = windowWidth * 0.5 - 30;

  const viewHeight = {
    0: imgWidth * 1.17,
    1: imgWidth * 0.8,
    2: imgWidth * 3.61,
  };

  const setDetailModel = () => {
    setMomentModal(true);
    setMomentDetailId(momentData.id);
  };

  const downloadMoment = () => {
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

    const fileName = momentData.photo.split('/')[-1];

    var downloadParams = {
      Key: fileName,
    };

    s3.upload(downloadParams, function (err, data) {
      if (err) {
        return alert(err.stack);
      }
      console.log(data);
    });
  };

  return (
    <MomentsCol paddLeft={direction === 'left' ? 20 : 10} height={viewHeight[momentData.type]}>
      <Pressable style={{ width: '80%', position: 'relative' }} onPress={setDetailModel}>
        <AutoHeightImage
          source={{ uri: momentData.photo }}
          width={imgWidth}
          style={{ borderRadius: 5, borderWidth: momentData.type === 2 ? 0 : 2, borderColor: theme.color.disabled }}
        />
        <Text
          style={{
            position: 'absolute',
            right: -10,
            fontSize: 14,
            top: momentData.type === 1 ? 3 : null,
            bottom: momentData.type === 1 ? null : 10,
            color: momentData.type === 2 ? '#fff' : '#000',
          }}>
          <FontAwesomeIcon icon={faHeart} color={theme.color.alert} size={13} />
          {`  `}
          {momentData.reactionCount}
        </Text>
      </Pressable>
    </MomentsCol>
  );
};

export default MomentPic;
