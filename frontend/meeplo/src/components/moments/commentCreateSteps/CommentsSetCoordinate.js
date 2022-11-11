import { View, Text, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import { Slider } from '@miblanchard/react-native-slider';
import { theme } from '../../../assets/constant/DesignTheme';
import images from '../../../assets/image';
import { useDispatch, useSelector } from 'react-redux';
import StepButton from '../../stepper/StepButton';

const momentData = {
  moment: {
    id: 'long',
    photoUrl: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107005349.png',
    writer: 'int',
    type: 3,
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

const CommentsSetCoordinate = ({ toNext, toPrev, onFinish, visible, state }) => {
  const dispatch = useDispatch();

  const [tilt, setTilt] = React.useState(0);
  // 실제 좌표 데이터 보낼 때에는 조정 필요
  const [delX, setDelX] = React.useState(0);
  const [delY, setDelY] = React.useState(0);
  const commentsList = useSelector(state => state.commentsList);

  const windowHeight = Dimensions.get('window').height;
  var imgHeight = windowHeight * 0.65;

  const imgWidth = {
    1: imgHeight * 0.86,
    2: imgHeight * 1.25,
    3: imgHeight * 0.277,
  };

  const onPressNext = () => {
    const actions = [
      {
        type: 'UPDATE_LOCATION',
        payload: { xpoint: delX * 1.05, ypoint: delY * 1.05, angle: tilt[0] },
      },
    ];
    toNext(actions);
  };

  const watermark = images.frame.watermark;
  const windowWidth = Dimensions.get('window').width;
  var imgMargin = (windowWidth - imgWidth[momentData.moment.type]) * 0.5;

  const setLocation = event => {
    const { locationX, locationY } = event.nativeEvent;
    setDelX(locationX);
    setDelY(locationY);
  };

  return visible ? (
    <>
      <View style={{ position: 'relative', height: windowHeight - 150, marginHorizontal: 20 }}>
        <TouchableOpacity
          style={{
            marginHorizontal: imgMargin,
            width: imgWidth[momentData.moment.type],
            height: imgHeight,
            position: 'relative',
            overflow: 'hidden',
          }}
          onPress={setLocation}>
          <ImageBackground source={watermark} style={{ width: '100%', height: '100%' }} resizeMode="cover">
            {commentsList.comments.map((comment, idx) => (
              <View
                style={{
                  width: '80%',
                  transform: [{ rotate: `${comment.location.angle}deg` }],
                  position: 'absolute',
                  top: comment.location.ypoint * 0.85,
                  left: comment.location.xpoint * 0.6,
                }}
                key={idx}>
                <Text style={{ fontSize: 10 }}>{comment.comment}</Text>
              </View>
            ))}
            <Text
              style={{
                width: '80%',
                fontSize: 10,
                color: theme.font.color,
                transform: [{ rotate: `${tilt}deg` }],
                position: 'absolute',
                top: delY,
                left: delX,
              }}>
              {state.comment}
            </Text>
          </ImageBackground>
        </TouchableOpacity>
        <View style={{ marginHorizontal: 40 }}>
          <Slider
            value={tilt}
            onValueChange={value => setTilt(value)}
            maximumValue={360}
            minimumTrackTintColor={theme.color.bright.red}
            maximumTrackTintColor={theme.color.pale.gray}
            thumbTintColor={theme.color.alert}
            step={1}
          />
        </View>
      </View>
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
    </>
  ) : null;
};

export default CommentsSetCoordinate;
