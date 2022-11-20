import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const StepButton = ({ text, onPress, active }) => {
  return (
    <TouchableOpacity style={styles(active).buttonStyle} activeOpacity={0.8} onPress={onPress}>
      <Text style={styles(active).textStyle}>{text}</Text>
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
