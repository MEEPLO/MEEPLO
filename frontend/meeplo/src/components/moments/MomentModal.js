import React from 'react';
import {
  View,
  Dimensions,
  Pressable,
  Text,
  Modal,
  Animated,
  TouchableOpacity,
  Easing,
  Image,
  Linking,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getMomentDetail, updateMomentReaction, deleteMomentReaction } from '../../redux/momentsSlice';
import AWS from 'aws-sdk';
import { MEEPLO_APP_ALBUM_BUCKET_NAME, MEEPLO_APP_BUCKET_REGION, MEEPLO_APP_IDENTITY_POOL_ID } from '@env';

import Images from '../../assets/image/index';
import AnimationLikes from '../common/AnimationLikes';
import AnimationComment from '../common/AnimationComment';
import AnimationDownload from '../common/AnimationDownload';

const windowWidth = Dimensions.get('window').width;

const MomentModal = ({ momentDetailId, setMomentModal, momentModal, navigation }) => {
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);
  const [imageFront, setImageFront] = React.useState(true);
  // const [imageUri, setImageUri] = React.useState();

  const dispatch = useDispatch();
  const momentDetail = useSelector(state => state.momentDetail);

  React.useEffect(() => {
    dispatch(getMomentDetail({ momentDetailId }));
    console.log('momentDetailId changed', momentDetail);
  }, [momentDetailId]);

  const linkToCommentCreate = React.useCallback(() => {
    setMomentModal(false);
    navigation.navigate('MomentsStack', { screen: 'MomentsCommentCreate', params: { momentId: momentDetailId } });
  }, []);

  const closeModal = () => {
    setMomentModal(false);
    setImageFront(true);
  };

  const momentLikeHandler = () => {
    if (momentDetail.reaction.liked) {
      console.log('isliked off');
      dispatch(deleteMomentReaction({ momentDetailId })).then(() => {
        dispatch(getMomentDetail({ momentDetailId }));
      });
    } else {
      console.log('isliked on');
      dispatch(updateMomentReaction({ momentDetailId })).then(() => {
        dispatch(getMomentDetail({ momentDetailId }));
      });
    }
  };

  const swipeAnim = React.useRef(new Animated.Value(0)).current;

  const rotateData = swipeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const setStartLocation = event => {
    const { locationX, pageX } = event.nativeEvent;
    setTouchStart(pageX);
  };

  const setEndLocation = event => {
    const { locationY, pageY } = event.nativeEvent;
    setTouchEnd(pageY);
    isSwiped();
  };

  const isSwiped = () => {
    if (touchEnd - touchStart < 100) {
      imageFront ? setImageFront(false) : setImageFront(true);
      swipeAnim.setValue(0);
      Animated.timing(swipeAnim, {
        toValue: 1,
        duration: 320,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => {});
      setTouchStart(0);
      setTouchEnd(0);
    }
  };

  const getImage = () => {
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

    var imageName = momentDetail.moment.photoUrl.split('/')[3];
    var contentDisposition = `attachment; filename="${imageName}"`;
    var params = {
      Bucket: MEEPLO_APP_ALBUM_BUCKET_NAME,
      Key: imageName,
      ResponseContentDisposition: contentDisposition,
      Expires: 60,
    };

    s3.getSignedUrl('getObject', params, function (err, url) {
      if (err) {
        console.log(err);
      }
      Linking.openURL(url);
    });
  };

  const imgWidth = [windowWidth * 0.8, windowWidth * 0.85, windowWidth * 0.5];
  const viewHeight = [windowWidth * 0.8 * 1.17, windowWidth * 0.85 * 0.8, windowWidth * 0.4 * 3.65];

  return momentDetail.moment ? (
    <Modal visible={momentModal} animationType={'fade'} transparent={true} onRequestClose={() => setMomentModal(false)}>
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}>
        <Pressable
          onPressOut={() => closeModal()}
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}></Pressable>
        <TouchableOpacity
          onPressIn={setStartLocation}
          onPressOut={setEndLocation}
          style={{
            width: imgWidth[momentDetail.moment.type],
            height: viewHeight[momentDetail.moment.type],
            backgroundColor: 'transparent',
          }}>
          {imageFront ? (
            <Animated.Image
              style={{
                marginLeft: momentDetail.moment.type === 2 ? 20 : 0,
                width:
                  momentDetail.moment.type === 2
                    ? imgWidth[momentDetail.moment.type] - 40
                    : imgWidth[momentDetail.moment.type],
                height: viewHeight[momentDetail.moment.type] - 10,
                transform: [{ rotateY: rotateData }],
              }}
              resizeMode="cover"
              source={{ uri: momentDetail.moment.photoUrl }}
            />
          ) : (
            <Animated.View
              style={{
                marginLeft: momentDetail.moment.type === 2 ? 20 : 0,
                width:
                  momentDetail.moment.type === 2
                    ? imgWidth[momentDetail.moment.type] - 40
                    : imgWidth[momentDetail.moment.type],
                height: viewHeight[momentDetail.moment.type] - 10,
                transform: [{ rotateY: rotateData }],
                position: 'relative',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}>
              <Image
                source={Images.frame.watermark}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover',
                }}
              />
              {momentDetail.comments?.map((comment, idx) => (
                <View
                  style={{
                    width: '80%',
                    transform: [{ rotate: `${comment.location.angle}deg` }],
                    position: 'absolute',
                    top: comment.location.ypoint * 0.8,
                    left: comment.location.xpoint * 0.8,
                  }}
                  key={idx}>
                  <Text style={{ fontSize: 12 }}>{comment.comment}</Text>
                </View>
              ))}
            </Animated.View>
          )}
        </TouchableOpacity>

        <Pressable
          style={{
            width: 50,
            height: 50,
            backgroundColor: '#fff',
            borderRadius: 25,
            position: 'absolute',
            bottom: 30,
            right: 20,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={momentLikeHandler}>
          <AnimationLikes isLiked={momentDetail.reaction.liked} />
        </Pressable>
        {momentDetail.commentCreated || imageFront ? null : (
          <Pressable
            style={{
              padding: 5,
              width: 50,
              height: 50,
              backgroundColor: '#fff',
              borderRadius: 25,
              position: 'absolute',
              bottom: 100,
              right: 20,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => linkToCommentCreate()}>
            <AnimationComment />
          </Pressable>
        )}
        {imageFront ? (
          <Pressable
            style={{
              padding: 5,
              width: 50,
              height: 50,
              backgroundColor: '#fff',
              borderRadius: 25,
              position: 'absolute',
              bottom: 100,
              right: 20,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => getImage()}>
            <AnimationDownload />
          </Pressable>
        ) : null}
      </View>
    </Modal>
  ) : null;
};

export default MomentModal;
