import React from 'react';
import { View, Text } from 'react-native';

const StepRenderer = ({ items, state, currentStep, toNext, toPrev, onFinish }) => {
  return items.map((item, i) => (
    <View key={i}>{item({ state, toNext, toPrev, onFinish, visible: i === currentStep })}</View>
  ));
};

export default StepRenderer;
