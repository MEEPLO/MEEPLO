import { View, StyleSheet, Alert } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideTabBar, showTabBar } from '../redux/navigationSlice';
import { useFocusEffect } from '@react-navigation/native';
import { getComments, createComment } from '../redux/momentsSlice';

import helper from '../helper';
import StepIndicator from '../components/stepper/StepIndicator';
import StepRenderer from '../components/stepper/StepRenderer';
import CommentsSetContent from '../components/moments/commentCreateSteps/CommentsSetContent';
import CommentsSetCoordinate from '../components/moments/commentCreateSteps/CommentsSetCoordinate';
import CommentsSetCheck from '../components/moments/commentCreateSteps/CommentsSetCheck';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_COMMENT':
      return {
        ...state,
        comment: action.payload,
      };
    case 'UPDATE_LOCATION':
      return {
        ...state,
        location: action.payload,
      };
    default:
      return action.type;
  }
};

const initialComment = {
  comment: '',
  location: {
    xpoint: 0,
    ypoint: 0,
    angle: 0,
  },
};

const STEP_COUNT = 3;

const MomentsCommentCreateScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [step, setStep] = React.useState(0);
  const [comment, stepDispatch] = React.useReducer(reducer, initialComment);
  const stepItems = [CommentsSetContent, CommentsSetCoordinate, CommentsSetCheck];

  const { momentId } = route.params;

  React.useEffect(() => {
    dispatch(getComments({ momentDetailId: momentId }));
  }, []);

  React.useEffect(() => {
    return navigation.addListener('beforeRemove', event => {
      const action = event.data.action;
      event.preventDefault();

      if (step > 0) {
        setStepClamp(step - 1);
      } else if (step === 0) {
        Alert.alert('댓글 생성을 취소하시겠습니까?', '입력 중인 값들이 모두 초기화됩니다.', [
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
    dispatch(createComment(commentInfo));
  };

  return (
    <View style={styles.screenStyle}>
      <View style={styles.stepIndicatorStyle}>
        <StepIndicator stepCount={STEP_COUNT} currentStep={step} />
      </View>
      <StepRenderer
        data={momentId}
        state={comment}
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

export default MomentsCommentCreateScreen;
