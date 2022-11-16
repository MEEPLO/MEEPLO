import React from 'react';
import { View, Text, Dimensions, Pressable, Alert } from 'react-native';
import { theme } from '../../../assets/constant/DesignTheme';
import AutoHeightImage from 'react-native-auto-height-image';
import Images from '../../../assets/image/index';
import StepButton from '../../stepper/StepButton';

const MomentsSetFrame = ({ toNext, toPrev, onFinish, visible }) => {
  const [frameType, setFrameType] = React.useState(-1);

  const windowHeight = Dimensions.get('window').height;
  const frameContainerWidth = Dimensions.get('window').width - 100;
  const frameContainerHeight = Dimensions.get('window').height * 0.18;
  const frameHeight = frameContainerHeight - 20;

  const onPressNext = () => {
    const actions = [
      {
        type: 'UPDATE_FRAME',
        payload: frameType,
      },
    ];
    frameType === -1 ? Alert.alert('프레임을 선택해주세요.') : toNext(actions);
  };

  return visible ? (
    <View style={{ height: windowHeight - 200, marginHorizontal: 20 }}>
      <Text style={{ marginBottom: 10, color: theme.font.color, fontWeight: '800' }}>프레임 선택</Text>
      <View style={{ marginLeft: 20 }}>
        <Pressable
          style={{
            marginBottom: 20,
            width: frameContainerWidth,
            height: frameContainerHeight,
            borderRadius: 20,
            borderColor: frameType === 0 ? theme.color.bright.red : theme.color.disabled,
            borderWidth: 2,
          }}
          onPress={() => setFrameType(0)}>
          <View style={{ marginVertical: 10, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <AutoHeightImage source={Images.frame.polaroid} width={frameHeight * 0.85} />
          </View>
        </Pressable>
        <Pressable
          style={{
            marginBottom: 20,
            width: frameContainerWidth,
            height: frameContainerHeight,
            borderRadius: 20,
            borderColor: frameType === 1 ? theme.color.bright.red : theme.color.disabled,
            borderWidth: 2,
          }}
          onPress={() => setFrameType(1)}>
          <View style={{ marginVertical: 10, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <AutoHeightImage source={Images.frame.dayFilm} width={frameHeight * 1.25} />
          </View>
        </Pressable>
        <Pressable
          style={{
            marginBottom: 20,
            width: frameContainerWidth,
            height: frameContainerHeight,
            borderRadius: 20,
            borderColor: frameType === 2 ? theme.color.bright.red : theme.color.disabled,
            borderWidth: 2,
          }}
          onPress={() => setFrameType(2)}>
          <View style={{ marginVertical: 10, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <AutoHeightImage source={Images.frame.fourCut} width={frameHeight * 0.27} />
          </View>
        </Pressable>
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
    </View>
  ) : null;
};

export default MomentsSetFrame;
