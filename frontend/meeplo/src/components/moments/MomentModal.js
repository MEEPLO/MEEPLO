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
import { faComment } from '@fortawesome/free-solid-svg-icons/faComment';
import { getMomentDetail } from '../../redux/momentsSlice';

const MomentModal = ({ momentId, setMomentModal, momentModal, navigation }) => {
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);
  const [imageFront, setImageFront] = React.useState(true);
  const [imageUri, setImageUri] = React.useState();

  const dispatch = useDispatch();
  const momentDetail = useSelector(state => state.momentDetail);

  React.useEffect(() => {
    dispatch(getMomentDetail({ momentId }));
    setImageUri({ uri: momentDetail.moment.photoUrl });
  }, [momentId]);

  const linkTo = React.useCallback((nextPage, params) => {
    navigation.push(nextPage, params);
  }, []);

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

  const windowWidth = Dimensions.get('window').width;

  const imgWidth = {
    POLAROID: windowWidth * 0.7,
    DAYFILM: windowWidth * 0.8,
    FOURCUT: windowWidth * 0.5 - 30,
  };

  const viewHeight = {
    POLAROID: windowWidth * 0.7 * 1.17,
    DAYFILM: windowWidth * 0.8 * 0.8,
    FOURCUT: (windowWidth * 0.5 - 30) * 3.61,
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
            width: imgWidth[momentDetail.moment.type] + 40,
            height: viewHeight[momentDetail.moment.type],
            backgroundColor: 'transparent',
          }}>
          {imageFront ? (
            <Animated.Image
              style={{
                marginLeft: 20,
                width: imgWidth[momentDetail.moment.type],
                height: viewHeight[momentDetail.moment.type],
                transform: [{ rotateY: rotateData }],
              }}
              resizeMode="contain"
              source={imageUri}
            />
          ) : (
            <Animated.View
              style={{
                marginLeft: 20,
                width: imgWidth[momentDetail.moment.type],
                height: viewHeight[momentDetail.moment.type] - 10,
                transform: [{ rotateY: rotateData }],
                position: 'relative',
                overflow: 'hidden',
              }}
              resizeMode="contain">
              <ImageBackground source={Images.frame.watermark} style={{ width: '100%', height: '100%' }}>
                {momentDetail.comments.map((comment, idx) => (
                  <View
                    style={{
                      width: '80%',
                      transform: [{ rotate: `${comment.location.angle}deg` }],
                      position: 'absolute',
                      top: comment.location.yPoint,
                      left: comment.location.xPoint,
                    }}
                    key={idx}>
                    <Text style={{ fontSize: 12 }}>{comment.comment}</Text>
                  </View>
                ))}
              </ImageBackground>
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
          }}>
          <FontAwesomeIcon icon={faHeart} color={theme.color.alert} size={30} />
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
          onPress={() => linkTo('MomentsCommentCreate', { momentId: momentId })}>
          <FontAwesomeIcon icon={faComment} color={theme.color.bright.green} size={30} />
        </Pressable>
      </View>
    </Modal>
  );
};

export default MomentModal;
