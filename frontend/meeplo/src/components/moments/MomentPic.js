import React from 'react';
import { View, Dimensions, Pressable, Modal, Animated, TouchableOpacity, Easing } from 'react-native';
import styled from 'styled-components';
import AutoHeightImage from 'react-native-auto-height-image';
import { theme } from '../../assets/constant/DesignTheme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faComment } from '@fortawesome/free-solid-svg-icons/faComment';

const MomentsCol = styled.View`
  height: ${({ height }) => height}px;
  padding-left: ${({ paddLeft }) => paddLeft}px;
  margin-bottom: 25px;
`;

const MomentPic = ({ uri, type, direction }) => {
  const [momentModal, setMomentModal] = React.useState(false);
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);
  const [imageFront, setImageFront] = React.useState(true);
  const [imageUri, setImageUri] = React.useState();
  const swipeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    setImageUri(uri);
  }, []);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  var imgWidth = windowWidth * 0.5 - 30;

  const viewHeight = {
    1: imgWidth * 1.17,
    2: imgWidth * 0.8,
    3: imgWidth * 3.61,
  };

  const detailWidth = {
    1: windowWidth * 0.8,
    2: windowWidth * 0.8,
    3: windowWidth * 0.5,
  };
  const uri1 = 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107010049.png';
  const uri2 = 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107010141.png';

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
    console.log('out');
    isSwiped();
  };

  const isSwiped = () => {
    console.log('in&out', touchStart - touchEnd);
    if (touchEnd - touchStart < 100) {
      if (imageFront) {
        setImageFront(false);
        setTimeout(() => {
          setImageUri(uri2);
        }, 80);
      } else {
        setImageFront(true);
        setTimeout(() => {
          setImageUri(uri);
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

  return (
    <MomentsCol paddLeft={direction === 'left' ? 20 : 10} height={viewHeight[type]}>
      <View style={{ width: '80%', height: 600 }}>
        <Pressable onPress={() => setMomentModal(true)}>
          {/* <MomentpicBack uri={uri} type={type} /> */}
          <AutoHeightImage
            source={{ uri }}
            width={imgWidth}
            style={{ borderRadius: 5, borderWidth: type === 3 ? 0 : 2, borderColor: theme.color.disabled }}
          />
        </Pressable>
      </View>

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
            onPress={() => setMomentModal(false)}
            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}></Pressable>
          {/* <AutoHeightImage source={{ uri }} width={detailWidth[type]} /> */}

          <TouchableOpacity
            onPressIn={setStartLocation}
            onPressOut={setEndLocation}
            style={{ width: imgWidth + 40, height: viewHeight[type], backgroundColor: 'transparent' }}>
            <Animated.Image
              style={{ width: imgWidth, height: viewHeight[type], transform: [{ rotateY: rotateData }] }}
              resizeMode="contain"
              source={{ uri: imageUri }}
            />
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
            }}>
            <FontAwesomeIcon icon={faComment} color={theme.color.bright.green} size={30} />
          </Pressable>
        </View>
      </Modal>
    </MomentsCol>
  );
};

export default MomentPic;
