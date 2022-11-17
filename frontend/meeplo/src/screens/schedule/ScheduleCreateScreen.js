import React, { useState, useReducer, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { hideTabBar, showTabBar } from '../../redux/navigationSlice';
import Toast from 'react-native-toast-message';

import helper from '../../helper';
import { TOAST_MESSAGE, ALERT_MESSAGE } from '../../assets/constant/string';

import StepIndicator from '../../components/stepper/StepIndicator';
import StepRenderer from '../../components/stepper/StepRenderer';
import ScheduleCreateInfoScreen from './create/ScheduleCreateInfoScreen';
import ScheduleCreateLocationScreen from './create/ScheduleCreateLocationScreen';
import ScheduleCreateMemberScreen from './create/ScheduleCreateMemberScreen';
import ScheduleCreateCheckScreen from './create/ScheduleCreateCheckScreen';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_DATE':
      return {
        ...state,
        date: action.payload,
      };

    case 'UPDATE_NAME':
      return {
        ...state,
        name: action.payload,
      };
    case 'UPDATE_GROUP':
      return {
        ...state,
        group: action.payload,
      };
    case 'UPDATE_MEET':
      return {
        ...state,
        meet: action.payload,
      };
    case 'UPDATE_KEYWORDS':
      return {
        ...state,
        keywords: action.payload,
      };
    case 'UPDATE_MEMBERS':
      return {
        ...state,
        members: action.payload,
      };
    case 'UPDATE_AMUSE':
      return {
        ...state,
        amuse: action.payload,
      };
    default:
      return action.type;
  }
};

const initialSchedule = {
  date: '',
  name: '',
  group: {},
  meet: {},
  keywords: [],
  members: [],
  amuse: {},
};

const STEP_COUNT = 4;

const ScheduleCreateScreen = ({ navigation }) => {
  const reduxDispatch = useDispatch();
  const [step, setStep] = useState(0);
  const [schedule, dispatch] = useReducer(reducer, initialSchedule);
  const stepItems = [
    ScheduleCreateInfoScreen,
    ScheduleCreateMemberScreen,
    ScheduleCreateLocationScreen,
    ScheduleCreateCheckScreen,
  ];

  useEffect(() => {
    reduxDispatch(hideTabBar());
    return () => {
      reduxDispatch(showTabBar());
    };
  }, []);

  useEffect(() => {
    return navigation.addListener('beforeRemove', e => {
      const action = e.data.action;
      e.preventDefault();

      if (step > 0) {
        setStepClamp(step - 1);
      } else if (step === 0) {
        Alert.alert(ALERT_MESSAGE.SCHEDULE_ASK_CANCEL_CREATE_TEXT1, ALERT_MESSAGE.SCHEDULE_ASK_CANCEL_CREATE_TEXT2, [
          { text: ALERT_MESSAGE.STAY, style: 'cancel' },
          {
            text: ALERT_MESSAGE.STAY,
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
    Toast.show({
      type: 'success',
      text1: TOAST_MESSAGE.SCHEDULE_SUCCESS_CREATE_TEXT1,
      text2: TOAST_MESSAGE.SCHEDULE_SUCCESS_CREATE_TEXT2,
    });

    // TODO-jekwan: 생성된 약속의 상세 페이지로 이동
    // navigation.reset({
    //   routes: [{ name: 'Home' }],
    // });
    navigation.navigate('Home');
  };

  return (
    <View style={styles.screenStyle}>
      <View style={styles.stepIndicatorStyle}>
        <StepIndicator stepCount={STEP_COUNT} currentStep={step} />
      </View>
      <StepRenderer
        items={stepItems}
        state={schedule}
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

export default ScheduleCreateScreen;
