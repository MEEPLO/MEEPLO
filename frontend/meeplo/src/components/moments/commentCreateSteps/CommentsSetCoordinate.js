import { View, Text, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import { Slider } from '@miblanchard/react-native-slider';
import { theme } from '../../../assets/constant/DesignTheme';
import images from '../../../assets/image';

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

const CommentsSetCoordinate = () => {
  const [tilt, setTilt] = React.useState(0);
  // 실제 좌표 데이터 보낼 때에는 조정 필요
  const [delX, setDelX] = React.useState(0);
  const [delY, setDelY] = React.useState(0);

  const windowHeight = Dimensions.get('window').height;
  var imgHeight = windowHeight * 0.65;

  const imgWidth = {
    1: imgHeight * 0.86,
    2: imgHeight * 1.25,
    3: imgHeight * 0.277,
  };

  const watermark = images.frame.watermark;
  const windowWidth = Dimensions.get('window').width;
  var imgMargin = (windowWidth - imgWidth[momentData.moment.type]) * 0.5;

  const setLocation = event => {
    const { locationX, locationY } = event.nativeEvent;
    setDelX(locationX);
    setDelY(locationY);
  };

  return (
    <View>
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
          {momentData.comments.map((comment, idx) => (
            <View
              style={{
                transform: [{ rotate: `${comment.location.angle}deg` }],
                position: 'absolute',
                top: comment.location.yPoint * 0.85,
                left: comment.location.xPoint * 0.6,
              }}
              key={idx}>
              <Text style={{ fontSize: 10 }}>{comment.comment}</Text>
            </View>
          ))}
          <Text
            style={{
              fontSize: 10,
              color: theme.font.color,
              transform: [{ rotate: `${tilt}deg` }],
              position: 'absolute',
              top: delY,
              left: delX,
              transform: [{ rotate: `${tilt}deg` }],
              position: 'absolute',
              top: delY,
              left: delX,
            }}>
            새로운 댓글!!!!!!!!!!!!!!!을 길게 적는다면 ?50자가 넘어버린다면 ? ㅓ그렇다ㅕㄴ? 어쩔 셈이지? 어쩔거냐고? 어?
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
        <Text>Value: {tilt}</Text>
      </View>
    </View>
  );
};

export default CommentsSetCoordinate;
