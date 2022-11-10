import { View, Text } from 'react-native';
import React from 'react';
import StepTextInput from '../../common/StepTextInput';

const CommentsSetContent = () => {
  return (
    <View>
      <Text>CommentsSetContent</Text>
      <StepTextInput type="댓글" maxLength={50} required={true} />
    </View>
  );
};

export default CommentsSetContent;
