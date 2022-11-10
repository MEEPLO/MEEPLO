import React from 'react';
import { View, Text, Image, Dimensions, Pressable } from 'react-native';
import { theme } from '../../../assets/constant/DesignTheme';
import AutoHeightImage from 'react-native-auto-height-image';
import Images from '../../../assets/image/index';

const MomentsSetFrame = () => {
  const frameContainerWidth = Dimensions.get('window').width - 100;
  const frameContainerHeight = Dimensions.get('window').height * 0.18;
  const frameHeight = frameContainerHeight - 20;

  const [selectedFrame, setSelectedFrame] = React.useState(0);

  const selectedFrameHandler = value => {
    setSelectedFrame(value);
  };

  return (
    <View>
      <Text style={{ marginBottom: 10, color: theme.font.color, fontWeight: '800' }}>프레임 선택</Text>
      <View style={{}}>
        <Pressable
          style={{
            marginBottom: 20,
            width: frameContainerWidth,
            height: frameContainerHeight,
            borderRadius: 20,
            borderColor: selectedFrame === 1 ? theme.color.bright.red : theme.color.disabled,
            borderWidth: 2,
          }}
          onPress={() => selectedFrameHandler(1)}>
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
            borderColor: selectedFrame === 2 ? theme.color.bright.red : theme.color.disabled,
            borderWidth: 2,
          }}
          onPress={() => selectedFrameHandler(2)}>
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
            borderColor: selectedFrame === 3 ? theme.color.bright.red : theme.color.disabled,
            borderWidth: 2,
          }}
          onPress={() => selectedFrameHandler(3)}>
          <View style={{ marginVertical: 10, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <AutoHeightImage source={Images.frame.fourCut} width={frameHeight * 0.27} />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default MomentsSetFrame;
