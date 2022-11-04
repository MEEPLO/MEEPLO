import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import StepButton from '../../../components/stepper/StepButton';

const ScheduleCreateInfoScreen = ({ toNext, toPrev, onFinish }) => {
  return (
    <View style={styles.screenStyle}>
      <View style={styles.inputViewStyle}>
        <Text>일시</Text>
        <TextInput />
      </View>
      <View style={styles.inputViewStyle}>
        <Text>약속 이름</Text>
        <TextInput />
      </View>
      <View style={styles.inputViewStyle}>
        <Text>키워드</Text>
        <TextInput />
      </View>
      <View style={styles.navigateViewStyle}>
        <StepButton text="" />
        <StepButton text="다음 >" active={true} onPress={toNext} />
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
