import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import { theme } from '../../assets/constant/DesignTheme';

const screen = Dimensions.get('screen');
const modalWidth = screen.width * 0.85;

const RoundView = ({ children, onRequestClose, hideHeader, title }) => {
  return (
    <View style={styles.roundedView}>
      {hideHeader ? null : (
        <View style={styles.headerView}>
          <TouchableOpacity style={styles.closeButtonStyle} onPress={onRequestClose}>
            <Text style={styles.closeButtonTextStyle}> X </Text>
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
      <View style={styles.childrenView}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  roundedView: {
    width: modalWidth,
    backgroundColor: 'white',

    borderRadius: theme.radius.base,
    borderWidth: 2,
    borderColor: theme.color.border,

    overflow: 'hidden',

    justifyContent: 'center',
    alignItems: 'center',
  },
  headerView: {
    width: screen.width,
    height: 50,
    backgroundColor: theme.color.bright.green,

    borderColor: theme.color.border,
    borderBottomWidth: 2,

    justifyContent: 'center',
    alignItems: 'center',
  },
  childrenView: {
    width: modalWidth,
    padding: 20,
    justifyContent: 'center',
  },
  closeButtonStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 50,
  },
  closeButtonTextStyle: {
    fontWeight: '800',
    fontSize: 18,
  },
  title: {
    fontWeight: '800',
  },
});

export default RoundView;
