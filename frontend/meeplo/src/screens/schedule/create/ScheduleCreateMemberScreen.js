import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import StepButton from '../../../components/stepper/StepButton';

const ScheduleCreateMemberScreen = ({ state, toNext, toPrev, onFinish, visible }) => {
  return visible ? (
    <View style={styles.screenStyle}>
      <View style={styles.inputViewStyle}>
        <Text>모임</Text>
        <TextInput />
      </View>
      <View style={styles.inputViewStyle}>
        <Text>모임 멤버 초대</Text>
        <TextInput />
      </View>
      <View style={styles.navigateViewStyle}>
        <StepButton text="< 이전" active={false} onPress={toPrev} />
        <StepButton text="다음 >" active={true} onPress={toNext} />
      </View>
    </View>
  ) : null;
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

export default ScheduleCreateMemberScreen;
