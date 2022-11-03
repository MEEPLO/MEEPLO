import React from 'react';
import { View, Dimensions } from 'react-native';
import styled from 'styled-components';
import AutoHeightImage from 'react-native-auto-height-image';

// yarn add react-native-auto-height-image

const MomentsCol = styled.View`
  height: ${({ height }) => height}px;
  padding-left: ${({ paddLeft }) => paddLeft}px;
  margin-bottom: 25px;
`;

const MomentPic = ({ uri, type, direction }) => {
  const windowWidth = Dimensions.get('window').width;
  var imgWidth = windowWidth * 0.5 - 30;

  const viewHeight = {
    1: imgWidth * 1.2,
    2: imgWidth * 0.9,
    3: imgWidth * 3.61,
  };

  return (
    <MomentsCol paddLeft={direction === 'left' ? 20 : 10} height={viewHeight[type]}>
      <View style={{ width: '80%', height: 600 }}>
        <AutoHeightImage source={{ uri }} width={imgWidth} style={{ borderRadius: 5 }} />
      </View>
    </MomentsCol>
  );
};

export default MomentPic;
