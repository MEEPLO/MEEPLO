import React from 'react';
import { View } from 'react-native';

const StepRenderer = ({ items, currentStep }) => {
  return <View>{typeof items[currentStep] === 'function' ? items[currentStep]() : null}</View>;
};

export default StepRenderer;
