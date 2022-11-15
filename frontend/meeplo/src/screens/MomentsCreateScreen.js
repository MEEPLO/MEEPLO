import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { hideTabBar, showTabBar } from '../redux/navigationSlice';
import { useFocusEffect } from '@react-navigation/native';
import { createMoment } from '../redux/momentsSlice';

import helper from '../helper';
import StepIndicator from '../components/stepper/StepIndicator';
import StepRenderer from '../components/stepper/StepRenderer';
import MomentsSetGroup from '../components/moments/createSteps/MomentsSetGroup';
import MomentsSetSchedule from '../components/moments/createSteps/MomentsSetSchedule';
import MomentsSetFrame from '../components/moments/createSteps/MomentsSetFrame';
import MomentsSetPicture from '../components/moments/createSteps/MomentsSetPicture';
import MomentSetCheck from '../components/moments/createSteps/MomentSetCheck';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_GROUPID':
      return {
        ...state,
        groupId: action.payload,
      };
    case 'UPDATE_GROUPNAME':
      return {
        ...state,
        groupName: action.payload,
      };
    case 'UPDATE_SCHEDULEID':
      return {
        ...state,
        schedulePlaceId: action.payload,
      };
    case 'UPDATE_SCHEDULENAME':
      return {
        ...state,
        scheduleName: action.payload,
      };
    case 'UPDATE_FRAME':
      return {
        ...state,
        type: action.payload,
      };
    case 'UPDATE_PICTURE':
      return {
        ...state,
        photoUrl: action.payload,
      };
    default:
      return action.type;
  }
};

const initialMoment = {
  groupId: null,
  groupName: '',
  schedulePlaceId: null,
  scheduleName: '',
  photoUrl: null,
  content: 'null',
  type: null,
};

const STEP_COUNT = 5;

const MomentsCreateScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const [momentData, stepDispatch] = React.useReducer(reducer, initialMoment);
  const stepItems = [MomentsSetGroup, MomentsSetSchedule, MomentsSetFrame, MomentsSetPicture, MomentSetCheck];

  React.useEffect(() => {
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

  useFocusEffect(() => {
    dispatch(hideTabBar());

    return () => {
      dispatch(showTabBar());
    };
  });

  const setStepClamp = newStep => {
    setStep(helper.number.clamp(newStep, 0, STEP_COUNT - 1));
  };
  const toNext = actions => {
    if (Array.isArray(actions)) {
      actions.forEach(action => stepDispatch(action));
    }
    setStepClamp(step + 1);
  };

  const toPrev = () => {
    setStepClamp(step - 1);
  };

  const onFinish = actions => {
    const moment = {
      groupId: momentData.groupId,
      schedulePlaceId: momentData.schedulePlaceId,
      photoUrl: momentData.photoUrl,
      content: 'null',
      type: momentData.type,
    };
    dispatch(createMoment({ moment, navigation, Alert }));
  };

  return (
    <View style={styles.screenStyle}>
      <View style={styles.stepIndicatorStyle}>
        <StepIndicator stepCount={STEP_COUNT} currentStep={step} />
      </View>
      <StepRenderer
        state={momentData}
        items={stepItems}
        currentStep={step}
        toNext={toNext}
        toPrev={toPrev}
        onFinish={onFinish}
      />
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

export default MomentsCreateScreen;
