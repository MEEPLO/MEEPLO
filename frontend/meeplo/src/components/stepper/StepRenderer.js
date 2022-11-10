import React from 'react';
import { View } from 'react-native';

const StepRenderer = ({ items, state, data, currentStep, toNext, toPrev, onFinish }) => {
  return (
    <View>
      {items.map((item, i) => item({ key: i, state, data, toNext, toPrev, onFinish, visible: i === currentStep }))}
    </View>
  );
};

export default StepRenderer;
