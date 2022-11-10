import { View, Text } from 'react-native';
import React from 'react';
import StepButton from '../../stepper/StepButton';

const CommentsSetCheck = ({ toNext, toPrev, onFinish, visible, state }) => {
  return visible ? (
    <>
      <View>
        <Text>CommentsSetCheck</Text>
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
    </>
  ) : null;
};

export default CommentsSetCheck;
