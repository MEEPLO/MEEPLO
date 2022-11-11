import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import StepButton from '../../stepper/StepButton';

const CommentsSetCheck = ({ toNext, toPrev, onFinish, visible, state }) => {
  const windowHeight = Dimensions.get('window').height;

  return visible ? (
    <View style={{ height: windowHeight - 150, marginHorizontal: 20 }}>
      <View>
        <Text>입력 사항 체크</Text>
      </View>
      <View style={{ marginHorizontal: 20 }}>
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
