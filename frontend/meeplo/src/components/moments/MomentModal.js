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
  ImageBackground,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Images from '../../assets/image/index';
import { theme } from '../../assets/constant/DesignTheme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faHeart as frHeart } from '@fortawesome/free-regular-svg-icons/faHeart';
import { faComment } from '@fortawesome/free-solid-svg-icons/faComment';
import { getMomentDetail, updateMomentReaction, deleteMomentReaction } from '../../redux/momentsSlice';

const windowWidth = Dimensions.get('window').width;

const MomentModal = ({ momentDetailId, setMomentModal, momentModal, navigation }) => {
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);
  const [imageFront, setImageFront] = React.useState(true);
  const [imageUri, setImageUri] = React.useState();
  const [isLiked, setIsLiked] = React.useState(false);

  const dispatch = useDispatch();
  const momentDetail = useSelector(state => state.momentDetail);

  React.useEffect(() => {
    dispatch(getMomentDetail({ momentDetailId }));
    setIsLiked(momentDetail.reaction.liked);
  }, []);

  React.useEffect(() => {
    console.log('modal detail id: ', momentDetailId);
    setImageUri({ uri: momentDetail.moment.photoUrl });
  }, [momentDetail.moment]);

  const linkTo = React.useCallback((nextPage, params) => {
    setMomentModal(false);
    navigation.push(nextPage, params);
  }, []);

  const momentLikeHandler = () => {
    if (isLiked) {
      console.log('isliked off');
      setIsLiked(prev => !prev);
      dispatch(deleteMomentReaction({ momentDetailId }));
    } else {
      console.log('isliked on');
      setIsLiked(prev => !prev);
      dispatch(updateMomentReaction({ momentDetailId }));
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
      if (imageFront) {
        setImageFront(false);
        setTimeout(() => {
          setImageUri(Images.frame.watermark);
        }, 80);
      } else {
        setImageFront(true);
        setTimeout(() => {
          setImageUri({ uri: momentDetail.moment.photoUrl });
        }, 80);
      }
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

  const imgWidth = {
    1: windowWidth * 0.7,
    2: windowWidth * 0.8,
    3: windowWidth * 0.5 - 30,
  };

  const viewHeight = {
    0: windowWidth * 0.7 * 1.17,
    1: windowWidth * 0.8 * 0.8,
    2: (windowWidth * 0.5 - 30) * 3.61,
  };

  return (
    <Modal visible={momentModal} animationType={'fade'} transparent={true}>
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}>
        <Pressable
          onPressOut={() => setMomentModal(false)}
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
              resizeMode="contain"
              source={imageUri}
            />
          ) : (
            <Animated.View
              style={{
                marginLeft: 20,
                width: imgWidth[momentDetail.moment.type] - 40,
                height: viewHeight[momentDetail.moment.type] - 10,
                transform: [{ rotateY: rotateData }],
                position: 'relative',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              resizeMode="contain">
              <View
                style={{
                  width:
                    momentDetail.moment.type === 2
                      ? (viewHeight[momentDetail.moment.type] - 10) * 0.277
                      : imgWidth[momentDetail.moment.type],
                  height: viewHeight[momentDetail.moment.type] - 10,
                  overflow: 'hidden',
                }}>
                <ImageBackground
                  source={Images.frame.watermark}
                  style={{ overflow: 'hidden', width: '100%', height: '100%' }}>
                  {momentDetail.comments?.map((comment, idx) => (
                    <View
                      style={{
                        width: '80%',
                        transform: [{ rotate: `${comment.location.angle}deg` }],
                        position: 'absolute',
                        top: comment.location.ypoint,
                        left: comment.location.xpoint,
                      }}
                      key={idx}>
                      <Text style={{ fontSize: 12 }}>{comment.comment}</Text>
                    </View>
                  ))}
                </ImageBackground>
              </View>
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
          {isLiked ? (
            <FontAwesomeIcon icon={faHeart} color={theme.color.alert} size={30} />
          ) : (
            <FontAwesomeIcon icon={frHeart} color={theme.color.alert} size={30} />
          )}
        </Pressable>
        <Pressable
          style={{
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
          onPress={() => linkTo('MomentsCommentCreate', { momentId: momentDetailId })}>
          <FontAwesomeIcon icon={faComment} color={theme.color.bright.green} size={30} />
        </Pressable>
      </View>
    </Modal>
  );
};

export default MomentModal;
