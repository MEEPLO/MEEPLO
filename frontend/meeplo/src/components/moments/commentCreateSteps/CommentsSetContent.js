import React from 'react';
import { View, Dimensions } from 'react-native';
import StepTextInput from '../../common/StepTextInput';
import StepButton from '../../stepper/StepButton';

const windowHeight = Dimensions.get('window').height;

const CommentsSetContent = ({ toNext, toPrev, onFinish, visible, state }) => {
  const [value, onValueChange] = React.useState('');

  const onPressNext = () => {
    const actions = [
      {
        type: 'UPDATE_COMMENT',
        payload: value,
      },
    ];
    toNext(actions);
  };

  return visible ? (
    <>
      <View style={{ position: 'relative', height: windowHeight - 150, marginHorizontal: 20 }}>
        <StepTextInput value={value} onValueChange={onValueChange} type="댓글" maxLength={50} required={true} />
      </View>
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <StepButton text="" />
        <StepButton text="다음 >" active={true} onPress={onPressNext} />
      </View>
    </>
  ) : null;
};

export default CommentsSetContent;
