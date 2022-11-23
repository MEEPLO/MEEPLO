import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import AutoHeightImage from 'react-native-auto-height-image';

import { theme } from '../../../assets/constant/DesignTheme';
import StepButton from '../../stepper/StepButton';
import FontText from '../../common/FontText';

const CommentsSetCheck = ({ toNext, toPrev, onFinish, visible, state }) => {
  const windowWidth = Dimensions.get('window').width - 40;
  const windowHeight = Dimensions.get('window').height;
  const momentDetail = useSelector(state => state.momentDetail);

  return visible ? (
    <View style={{ height: windowHeight - 200, marginHorizontal: 20 }}>
      <View style={{ height: 90 }}>
        <FontText style={{ lineHeight: 50, fontWeight: 'bold', fontSize: 18, color: 'gray' }}>입력 사항 체크</FontText>
        <FontText style={{ fontSize: 14, color: theme.font.color }}>
          <FontText style={{ color: theme.color.alert, fontWeight: 'bold' }}>! </FontText> 생성된 추억은 다시 지울 수
          없어요.
        </FontText>
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <View>
          <AutoHeightImage
            source={{ uri: momentDetail.moment.photoUrl }}
            width={momentDetail.moment.type === 2 ? windowWidth * 0.2 : windowWidth * 0.8}
            style={{
              marginLeft: momentDetail.moment.type === 2 ? windowWidth * 0.4 - 40 : windowWidth * 0.1 - 40,
              borderWidth: 1,
              borderColor: theme.color.disabled,
            }}
          />
        </View>
        <View style={{ height: 90 }}>
          <FontText style={{ lineHeight: 90, fontSize: 15, color: 'gray' }}>댓글 내용: </FontText>
          <FontText style={{ fontSize: 17, color: theme.font.color, fontFamily: state.font }}>{state.comment}</FontText>
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
        <StepButton text="만들기" active={true} onPress={onFinish} />
      </View>
    </View>
  ) : null;
};

export default CommentsSetCheck;
