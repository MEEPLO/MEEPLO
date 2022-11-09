import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { theme } from '../../../assets/constant/DesignTheme';

import StepButton from '../../../components/stepper/StepButton';
import StepTextInput from '../../../components/common/StepTextInput';
import DateModalInput from '../../../components/schedule/DateModalInput';

const ScheduleCreateInfoScreen = ({ toNext, toPrev, onFinish }) => {
  const onPressNext = () => {
    const actions = [
      {
        type: '',
        payload: '',
      },
      {
        type: '',
        payload: '',
      },
      {
        type: '',
        payload: '',
      },
    ];

    toNext(actions);
  };
  return (
    <View style={styles.screenStyle}>
      <View style={styles.inputViewStyle}>
        <DateModalInput type="일시" required />
      </View>
      <View style={styles.inputViewStyle}>
        <Text>약속 이름</Text>
        <StepTextInput />
      </View>
      <View style={styles.inputViewStyle}>
        <Text>키워드</Text>
        <StepTextInput />
      </View>
      <View style={styles.navigateViewStyle}>
        <StepButton text="" />
        <StepButton text="다음 >" active={true} onPress={onPressNext} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenStyle: {
    width: '100%',
    height: '100%',
  },
  inputViewStyle: {
    marginBottom: 20,
  },
  navigateViewStyle: {
    width: '100%',

    position: 'absolute',
    bottom: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ScheduleCreateInfoScreen;
