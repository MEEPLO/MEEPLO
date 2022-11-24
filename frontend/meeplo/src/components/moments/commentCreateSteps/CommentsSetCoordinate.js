import { View, Text, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Slider } from '@miblanchard/react-native-slider';
import { theme } from '../../../assets/constant/DesignTheme';
import images from '../../../assets/image';
import StepButton from '../../stepper/StepButton';

const CommentsSetCoordinate = ({ toNext, toPrev, onFinish, visible, state }) => {
  const momentDetail = useSelector(state => state.momentDetail);

  const [tilt, setTilt] = React.useState(0);
  // 실제 좌표 데이터 보낼 때에는 조정 필요
  const [delX, setDelX] = React.useState(0);
  const [delY, setDelY] = React.useState(0);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const imgWidth = [windowWidth * 0.8, windowWidth * 0.85, windowWidth * 0.35];
  const viewHeight = [windowWidth * 0.8 * 1.17, windowWidth * 0.85 * 0.8, windowWidth * 0.35 * 3.65];

  const onPressNext = () => {
    const actions = [
      {
        type: 'UPDATE_LOCATION',
        payload:
          momentDetail.moment.type === 2
            ? { xpoint: delX * 1.09, ypoint: delY * 1.48, angle: tilt[0] }
            : { xpoint: delX * 1.08, ypoint: delY * 1.3, angle: tilt[0] },
      },
    ];
    toNext(actions);
  };

  const watermark = images.frame.watermark;
  var imgMargin = (windowWidth - imgWidth[momentDetail.moment.type]) * 0.5;

  const setLocation = event => {
    const { locationX, locationY } = event.nativeEvent;
    setDelX(locationX);
    setDelY(locationY);
  };

  return visible ? (
    <>
      <View style={{ position: 'relative', width: '100%', height: windowHeight - 200, marginLeft: -20 }}>
        <TouchableOpacity
          style={{
            marginHorizontal: imgMargin,
            width: imgWidth[momentDetail.moment.type],
            height: viewHeight[momentDetail.moment.type],
            position: 'relative',
            overflow: 'hidden',
          }}
          onPress={setLocation}>
          <ImageBackground source={watermark} style={{ width: '100%', height: '100%' }} resizeMode="cover">
            {momentDetail.comments?.map((comment, idx) => (
              <View
                style={{
                  width: momentDetail.moment.type === 2 ? '86%' : '40%',
                  transform: [{ rotate: `${comment.location.angle}deg` }],
                  position: 'absolute',
                  top: momentDetail.moment.type === 2 ? comment.location.ypoint * 0.5 : comment.location.ypoint * 0.85,
                  left: momentDetail.moment.type === 2 ? comment.location.xpoint * 0.65 : comment.location.xpoint * 0.7,
                }}
                key={idx}>
                <Text
                  style={{
                    color: 'gray',
                    fontSize:
                      momentDetail.moment.type === 2
                        ? comment.font === 'gag'
                          ? 17
                          : comment.font === 'NanumSquareRoundR'
                          ? 11
                          : 13
                        : comment.font === 'gag'
                        ? 18
                        : comment.font === 'NanumSquareRoundR'
                        ? 12.5
                        : 15,
                    fontFamily: comment.font,
                  }}>
                  {comment.comment}
                </Text>
              </View>
            ))}
            <Text
              style={{
                // width: momentDetail.moment.type === 2 ? '90%' : '40%',
                fontSize:
                  momentDetail.moment.type === 2
                    ? state.font === 'gag'
                      ? 17
                      : state.font === 'NanumSquareRoundR'
                      ? 11
                      : 13
                    : state.font === 'gag'
                    ? 18
                    : state.font === 'NanumSquareRoundR'
                    ? 13
                    : 15,
                color: theme.font.color,
                transform: [{ rotate: `${tilt}deg` }],
                position: 'absolute',
                top: delY,
                left: delX,
                fontFamily: state.font,
              }}>
              {state.comment}
            </Text>
          </ImageBackground>
        </TouchableOpacity>
        <View style={{ marginHorizontal: 40, width: windowWidth - 80, height: 150, position: 'absolute', bottom: 0 }}>
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
