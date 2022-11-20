import React, { useState, useReducer, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

import helper from '../../helper';

import StepIndicator from '../stepper/StepIndicator';
import StepRenderer from '../stepper/StepRenderer';
import MomentsSetGroup from './createSteps/MomentsSetGroup';
import MomentsSetSchedule from './createSteps/MomentsSetSchedule';
import MomentsSetPicture from './createSteps/MomentsSetPicture';
import MomentsSetFrame from './createSteps/MomentsSetFrame';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_GROUPID':
      return {
        ...state,
        date: action.payload,
      };

    case 'UPDATE_SCHEDULEID':
      return {
        ...state,
        name: action.payload,
      };
    case 'UPDATE_FRAME':
      return {
        ...state,
        groupId: action.payload,
      };
    case 'UPDATE_PICTURE':
      return {
        ...state,
        members: action.payload,
      };
    default:
      return action.type;
  }
};

const initialMoment = {
  groupId: null,
  schedulePlaceId: null,
  photoUrl: null,
  content: null,
  type: null,
};

const STEP_COUNT = 4;

const MomentCreateStep = ({ navigation }) => {
  const [step, setStep] = useState(0);
  const [moment, dispatch] = useReducer(reducer, initialMoment);
  const stepItems = [MomentsSetGroup, MomentsSetSchedule, MomentsSetFrame, MomentsSetPicture];

  useEffect(() => {
    return navigation.addListener('beforeRemove', event => {
      const action = event.data.action;
      event.preventDefault();

      if (step > 0) {
        setStepClamp(step - 1);
      } else if (step === 0) {
        Alert.alert('추억 생성을 취소하시겠습니까?', '입력 중인 값들이 모두 초기화됩니다.', [
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

  const toNext = actions => {
    if (Array.isArray(actions)) {
      actions.forEach(action => dispatch(action));
    }
    setStepClamp(step + 1);
  };

  const toPrev = () => {
    setStepClamp(step - 1);
  };

  const onFinish = () => {
    console.log(moment);
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
  },
  stepIndicatorStyle: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 50,
  },
});

export default MomentCreateStep;
