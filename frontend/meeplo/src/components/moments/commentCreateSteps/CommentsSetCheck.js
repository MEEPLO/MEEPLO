import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import AutoHeightImage from 'react-native-auto-height-image';
import StepButton from '../../stepper/StepButton';

const CommentsSetCheck = ({ toNext, toPrev, onFinish, visible, state }) => {
  const windowWidth = Dimensions.get('window').width - 40;
  const windowHeight = Dimensions.get('window').height;
  const momentDetail = useSelector(state => state.momentDetail);

  return visible ? (
    <View style={{ height: windowHeight - 150, marginHorizontal: 20 }}>
      <View>
        <Text>입력 사항 체크</Text>
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <View>
          <AutoHeightImage
            source={{ uri: momentDetail.moment.photoUrl }}
            width={momentDetail.moment.type === 2 ? windowWidth * 0.2 : windowWidth * 0.8}
            style={{ marginLeft: momentDetail.moment.type === 2 ? windowWidth * 0.4 - 40 : windowWidth * 0.1 - 40 }}
          />
        </View>
        <View style={{ height: 90 }}>
          <Text style={{ lineHeight: 90, fontSize: 15 }}>댓글 내용: </Text>
          <Text style={{ lineHeight: 90, fontWeight: '800', fontSize: 17 }}>{state.comment}</Text>
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
