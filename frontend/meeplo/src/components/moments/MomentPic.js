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
import styled from 'styled-components';
import AutoHeightImage from 'react-native-auto-height-image';
import Images from '../../assets/image/index';
import { theme } from '../../assets/constant/DesignTheme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faComment } from '@fortawesome/free-solid-svg-icons/faComment';

const MomentsCol = styled.View`
  height: ${({ height }) => height}px;
  padding-left: ${({ paddLeft }) => paddLeft}px;
  margin-bottom: 25px;
`;

const MomentPic = ({ uri, type, direction, navigation }) => {
  const [momentModal, setMomentModal] = React.useState(false);
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);
  const [imageFront, setImageFront] = React.useState(true);
  const [imageUri, setImageUri] = React.useState();
  const swipeAnim = React.useRef(new Animated.Value(0)).current;
  const watermark = Images.frame.watermark;

  const linkTo = React.useCallback(nextPage => {
    navigation.push(nextPage);
  }, []);

  const momentData = {
    moment: {
      id: 'long',
      photoUrl: uri,
      writer: 'int',
      type: type,
    },
    reaction: {
      count: 'int',
      liked: 'boolean',
    },
    comments: [
      {
        comment: '다음엔 2차 3차도 갑시다 👍',
        location: {
          xPoint: 0,
          yPoint: 60,
          angle: -40,
        },
      },
      {
        comment: '오늘 진짜 재미있었다 오랜만에 만나서 더 꿀잼이었던 듯 😍',
        location: {
          xPoint: 0,
          yPoint: 170,
          angle: 20,
        },
      },
      {
        comment: '너희만 놀기 있냐? 나도 데려가라',
        location: {
          xPoint: 0,
          yPoint: 300,
          angle: 280,
        },
      },
      {
        comment: '내가 봤을 때 그때 먹은 양꼬치가 진짜 미쳤음 칭따오 8병 실화냐? 사장님 서비스도 낭낭했음',
        location: {
          xPoint: 10,
          yPoint: 450,
          angle: -20,
        },
      },
    ],
  };

  React.useEffect(() => {
    setImageUri(uri);
  }, []);

  const windowWidth = Dimensions.get('window').width;
  var imgWidth = windowWidth * 0.5 - 30;

  const viewHeight = {
    1: imgWidth * 1.17,
    2: imgWidth * 0.8,
    3: imgWidth * 3.61,
  };

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
    isSwiped();
  };

  const isSwiped = () => {
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
          <AutoHeightImage
            source={{ uri: momentData.moment.photoUrl }}
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
            onPressOut={() => setMomentModal(false)}
            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}></Pressable>
          <TouchableOpacity
            onPressIn={setStartLocation}
            onPressOut={setEndLocation}
            style={{ width: imgWidth + 40, height: viewHeight[type], backgroundColor: 'transparent' }}>
            {imageFront ? (
              <Animated.Image
                style={{ width: imgWidth, height: viewHeight[type], transform: [{ rotateY: rotateData }] }}
                resizeMode="contain"
                source={{ uri: imageUri }}
              />
            ) : (
              <Animated.View
                style={{
                  width: imgWidth,
                  height: viewHeight[type] - 10,
                  transform: [{ rotateY: rotateData }],
                  position: 'relative',
                  overflow: 'hidden',
                }}
                resizeMode="contain">
                <ImageBackground source={watermark} style={{ width: '100%', height: '100%' }}>
                  {momentData.comments.map((comment, idx) => (
                    <View
                      style={{
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
            onPress={() => linkTo('MomentsCommentCreate')}>
            <FontAwesomeIcon icon={faComment} color={theme.color.bright.green} size={30} />
          </Pressable>
        </View>
      </Modal>
    </MomentsCol>
  );
};

export default MomentPic;
