import React from 'react';
import { View } from 'react-native';

const StepRenderer = ({ items, state, currentStep, toNext, toPrev, onFinish }) => {
  return (
    <View>{items.map((item, i) => item({ key: i, state, toNext, toPrev, onFinish, visible: i === currentStep }))}</View>
  );
};

export default StepRenderer;
