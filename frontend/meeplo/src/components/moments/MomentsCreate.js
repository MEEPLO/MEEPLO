import { useState } from 'react';
import { View } from 'react-native';
import StepIndicator from '../stepper/StepIndicator';
import StepRenderer from '../stepper/StepRenderer';
import MomentsSetGroup from './createSteps/MomentsSetGroup';
import MomentsSetSchedule from './createSteps/MomentsSetSchedule';
import MomentsSetPicture from './createSteps/MomentsSetPicture';
import MomentsSetFrame from './createSteps/MomentsSetFrame';

const MomentsCreate = () => {
  const [step, setStep] = useState(0);
  // const [state, dispatch] = useReducer(reducer, initialState);
  const stepItems = [MomentsSetGroup, MomentsSetSchedule, MomentsSetFrame];
  const STEP_COUNT = stepItems.length;

  const toNext = (type, payload) => {
    // dispatch({ type: type, payload: payload });
    // setStep(helper.number.clamp(step + 1, 0, STEP_COUNT - 1));
  };
  const toPrev = () => {
    // setStep(helper.number.clamp(step - 1, 0, STEP_COUNT - 1));
  };
  const onFinish = () => {
    // submit state
  };

  return (
    <View style={{ marginTop: 50, marginHorizontal: 40 }}>
      <View style={{ marginBottom: 50 }}>
        <StepIndicator stepCount={3} currentStep={step} />
      </View>
      <StepRenderer items={stepItems} currentStep={step} toNext={toNext} toPrev={toPrev} onFinish={onFinish} />
    </View>
  );
};

export default MomentsCreate;
