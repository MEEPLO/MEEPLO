import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import StepButton from '../../../components/stepper/StepButton';

const ScheduleCreateLocationScreen = ({ toNext, toPrev, onFinish }) => {
  return (
    <View style={styles.screenStyle}>
      <View style={styles.inputViewStyle}>
        <Text>만날 장소</Text>
        <TextInput />
      </View>
      <View style={styles.inputViewStyle}>
        <Text>약속 장소</Text>
        <TextInput />
      </View>
      <View style={styles.navigateViewStyle}>
        <StepButton text="< 이전" active={false} onPress={toPrev} />
        <StepButton text="만들기" active={true} onPress={onFinish} />
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

export default ScheduleCreateLocationScreen;