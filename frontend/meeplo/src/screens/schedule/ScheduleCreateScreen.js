import React, { useState, useReducer, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

import helper from '../../helper';

import StepIndicator from '../../components/stepper/StepIndicator';
import StepRenderer from '../../components/stepper/StepRenderer';
import ScheduleCreateInfoScreen from './create/ScheduleCreateInfoScreen';
import ScheduleCreateLocationScreen from './create/ScheduleCreateLocationScreen';
import ScheduleCreateMemberScreen from './create/ScheduleCreateMemberScreen';

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return action.type;
  }
};

const initialSchedule = {};
const STEP_COUNT = 3;

const ScheduleCreateScreen = ({ navigation }) => {
  const [step, setStep] = useState(0);
  const [schedule, dispatch] = useReducer(reducer, initialSchedule);
  const stepItems = [ScheduleCreateInfoScreen, ScheduleCreateMemberScreen, ScheduleCreateLocationScreen];

  useEffect(() => {
    return navigation.addListener('beforeRemove', e => {
      const action = e.data.action;
      e.preventDefault();

      if (step > 0) {
        setStepClamp(step - 1);
      } else if (step === 0) {
        Alert.alert('약속 생성을 취소하시겠습니까?', '입력 중인 값들이 모두 초기화됩니다.', [
          { text: '남아있기', style: 'cancel' },
          {
            text: '나가기',
            style: 'destructive',
            onPress: () => navigation.dispatch(action),
          },
        ]);
      }
    });
  }, [navigation, step]);

  const setStepClamp = newStep => {
    setStep(helper.number.clamp(newStep, 0, STEP_COUNT - 1));
  };
  const toNext = () => {
    setStepClamp(step + 1);
  };

  const toPrev = () => {
    setStepClamp(step - 1);
  };

  const onFinish = () => {
    console.log(schedule);
  };

  return (
    <View style={styles.screenStyle}>
      <View style={styles.stepIndicatorStyle}>
        <StepIndicator stepCount={STEP_COUNT} currentStep={step} />
      </View>
      <StepRenderer items={stepItems} currentStep={step} toNext={toNext} toPrev={toPrev} onFinish={onFinish} />
    </View>
  );
};

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',

    borderWidth: 3,
  },
  stepIndicatorStyle: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 50,
  },
});

export default ScheduleCreateScreen;
