import React from 'react';
import styled from 'styled-components/native';

import StepDot from './StepDot';

const StepIndicatorView = styled.View`
  display: flex;
  flex-direction: row;
`;

const StepIndicator = ({ stepCount, currentStep }) => {
  const getState = (index, step) => {
    if (index < step) {
      // TODO-jekwan: 상수로 바꾸기
      return 'finished';
    } else if (index === step) {
      return 'current';
    } else {
      return 'unfinished';
    }
  };

  return (
    <StepIndicatorView>
      {Array.from(Array(stepCount).keys()).map(id => {
        return <StepDot key={id} state={getState(id, currentStep)} />;
      })}
    </StepIndicatorView>
  );
};

export default StepIndicator;
