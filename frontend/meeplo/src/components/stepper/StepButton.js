import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontText from '../common/FontText';

const StepButton = ({ text, onPress, active }) => {
  return (
    <TouchableOpacity style={styles(active).buttonStyle} activeOpacity={0.8} onPress={onPress}>
      <FontText style={styles(active).textStyle}>{text}</FontText>
    </TouchableOpacity>
  );
};

const styles = active =>
  StyleSheet.create({
    buttonStyle: {
      width: 100,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textStyle: {
      color: active ? '#FF886D' : '#BABABA',
      fontWeight: 'bold',
    },
  });

export default StepButton;
