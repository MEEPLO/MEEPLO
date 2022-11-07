import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AutoHeightImage from 'react-native-auto-height-image';
import { theme } from '../../assets/constant/DesignTheme';

import Swipeable from 'react-native-gesture-handler/Swipeable';

const MomentpicBack = ({ uri, type }) => {
  const windowWidth = Dimensions.get('window').width;
  var imgWidth = windowWidth * 0.5 - 30;

  const renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton
        style={{
          // flex: 1,
          width: 200,
          backgroundColor: 'cyan',
          justifyContent: 'center',
        }}
        onPress={console.log('Pressed')}>
        <Text>text</Text>
      </RectButton>
    );
  };
  return (
    <View>
      <Swipeable renderLeftActions={renderLeftActions}>
        <RectButton
          style={{
            width: '100%',
            height: 80,
            backgroundColor: 'blue',
          }}
        />
        <AutoHeightImage
          source={{ uri }}
          width={imgWidth}
          style={{ borderRadius: 5, borderWidth: type === 3 ? 0 : 2, borderColor: theme.color.disabled }}
        />
      </Swipeable>
    </View>
  );
};

export default MomentpicBack;
