import React from 'react';
import { View, Dimensions, Pressable, Text } from 'react-native';
import styled from 'styled-components';
import AutoHeightImage from 'react-native-auto-height-image';
import { theme } from '../../assets/constant/DesignTheme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';

const MomentsCol = styled.View`
  height: ${({ height }) => height}px;
  padding-left: ${({ paddLeft }) => paddLeft}px;
  margin-bottom: 25px;
`;

const MomentPic = ({ moment, direction, setMomentModal, setMomentId }) => {
  const windowWidth = Dimensions.get('window').width;
  var imgWidth = windowWidth * 0.5 - 30;

  const viewHeight = {
    POLAROID: imgWidth * 1.17,
    DAYFILM: imgWidth * 0.8,
    FOURCUT: imgWidth * 3.61,
  };

  const setDetailModel = () => {
    setMomentModal(true);
    setMomentId(moment.id);
  };
  return (
    <MomentsCol paddLeft={direction === 'left' ? 20 : 10} height={viewHeight[moment.type]}>
      <Pressable style={{ width: '80%', position: 'relative' }} onPress={setDetailModel}>
        <AutoHeightImage
          source={{ uri: moment.photo }}
          width={imgWidth}
          style={{ borderRadius: 5, borderWidth: moment.type === 3 ? 0 : 2, borderColor: theme.color.disabled }}
        />
        <Text style={{ position: 'absolute', bottom: 10, right: 0, fontSize: 14, backgroundColor: 'pink' }}>
          <FontAwesomeIcon icon={faHeart} color={theme.color.alert} size={13} style={{ marginRight: 5 }} />
          {moment.reactionCount}
        </Text>
      </Pressable>
    </MomentsCol>
  );
};

export default MomentPic;
