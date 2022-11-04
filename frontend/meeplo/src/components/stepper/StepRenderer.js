import React from 'react';
import { View } from 'react-native';

const StepRenderer = ({ items, currentStep, toNext, toPrev, onFinish }) => {
  return (
    <View>{typeof items[currentStep] === 'function' ? items[currentStep]({ toNext, toPrev, onFinish }) : null}</View>
  );
};

export default StepRenderer;
