import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import FontText from './FontText';

import { theme } from '../../assets/constant/DesignTheme';

const screen = Dimensions.get('screen');

const buttonWidth = screen.width * 0.85;

const FlatButton = ({ onPress, text, backgroundColor }) => {
  return (
    <TouchableOpacity style={styles.buttonView(backgroundColor)} onPress={onPress}>
      <FontText style={styles.buttonText}>{text}</FontText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonView: backgroundColor => {
    return {
      backgroundColor: backgroundColor,
      width: buttonWidth,
      height: 45,

      padding: 5,
      marginTop: 10,

      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',

      borderWidth: theme.border.thick,
      borderColor: theme.color.border,
      borderRadius: theme.radius.input,
    };
  },
  buttonText: {
    fontSize: 20,
    color: theme.font.color,
    fontWeight: 'bold',
  },
});

export default FlatButton;
