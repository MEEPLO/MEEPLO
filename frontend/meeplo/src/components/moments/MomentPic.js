import React from 'react';
import { View, Dimensions, Pressable, Text, StyleSheet } from 'react-native';
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

const MomentPic = ({ momentData, direction, setMomentModal, setMomentDetailId }) => {
  const windowWidth = Dimensions.get('window').width;
  var imgWidth = windowWidth * 0.5 - 30;

  const viewHeight = {
    POLAROID: imgWidth * 1.17,
    DAYFILM: imgWidth * 0.8,
    FOURCUT: imgWidth * 3.61,
  };

  const setDetailModel = () => {
    setMomentModal(true);
    setMomentDetailId(momentData.id);
  };

  return (
    <MomentsCol paddLeft={direction === 'left' ? 20 : 10} height={viewHeight[momentData.type]}>
      <Pressable style={{ width: '80%', position: 'relative' }} onPress={setDetailModel}>
        <AutoHeightImage
          source={{ uri: momentData.photo }}
          width={imgWidth}
          style={{ borderRadius: 5, borderWidth: momentData.type === 3 ? 0 : 2, borderColor: theme.color.disabled }}
        />
        <Text style={momentData.type === 'DAYFILM' ? styles.dayfilmType : styles.otherTypes}>
          <FontAwesomeIcon icon={faHeart} color={theme.color.alert} size={13} style={{ marginRight: 10 }} />
          {momentData.reactionCount}
        </Text>
      </Pressable>
    </MomentsCol>
  );
};

const styles = StyleSheet.create({
  otherTypes: { position: 'absolute', bottom: 10, right: -10, fontSize: 14 },
  dayfilmType: { position: 'absolute', top: 3, right: -10, fontSize: 14 },
});

export default MomentPic;
