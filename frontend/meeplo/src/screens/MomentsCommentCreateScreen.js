import { View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMomentDetail } from '../redux/momentsSlice';

import StepIndicator from '../components/stepper/StepIndicator';
import StepRenderer from '../components/stepper/StepRenderer';
import CommentsSetContent from '../components/moments/commentCreateSteps/CommentsSetContent';
import CommentsSetCoordinate from '../components/moments/commentCreateSteps/CommentsSetCoordinate';

const MomentsCommentCreateScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const momentDetail = useSelector(state => state.momentDetail);
  const { momentId } = route.params;

  console.log(momentId);

  React.useEffect(() => {
    dispatch(getMomentDetail({ momentId }));
  }, []);

  const [step, setStep] = React.useState(0);
  // const [state, dispatch] = useReducer(reducer, initialState);
  const stepItems = [CommentsSetCoordinate, CommentsSetContent];
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
    <View style={{ marginTop: 50 }}>
      <View style={{ marginBottom: 50 }}>
        <StepIndicator stepCount={2} currentStep={step} />
      </View>
      <StepRenderer
        comments={momentDetail.comments}
        items={stepItems}
        currentStep={step}
        toNext={toNext}
        toPrev={toPrev}
        onFinish={onFinish}
      />
    </View>
  );
};

export default MomentsCommentCreateScreen;
