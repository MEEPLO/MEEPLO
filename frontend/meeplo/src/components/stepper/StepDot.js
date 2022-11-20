import React, { useCallback, useRef, useEffect } from 'react';
import { StyleSheet, Animated } from 'react-native';

const StepDot = ({ state }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const scaleUp = useCallback(() => {
    Animated.timing(scaleAnim, {
      toValue: 1.2,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  const scaleDown = useCallback(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  useEffect(() => {
    switch (state) {
      // TODO-jekwan: 상수로 바꾸기
      case 'finished':
        scaleDown();
        break;
      case 'current':
        scaleUp();
        break;
      case 'unfinished':
        scaleDown();
        break;
      default:
        break;
    }
  }, [state, scaleUp, scaleDown]);

  return <Animated.View style={[styles.dotStyle(state), { transform: [{ scale: scaleAnim }] }]} />;
};

const styles = StyleSheet.create({
  dotStyle: state => ({
    width: 10,
    height: 10,
    marginHorizontal: 10,

    backgroundColor: getBackgroundColor(state),

    borderRadius: 10,
    borderWidth: getBorderWidth(state),
    borderColor: getBorderColor(state),
  }),
});

const getBorderWidth = state => {
  switch (state) {
    // TODO-jekwan: 상수로 바꾸기
    case 'finished':
      return 0;
    case 'current':
      return 2;
    case 'unfinished':
    default:
      return 0;
  }
};

const getBorderColor = state => {
  switch (state) {
    // TODO-jekwan: 상수로 바꾸기
    case 'current':
      return '#FF886D';
    case 'finished':
    case 'unfinished':
    default:
      return '#FFFFFF';
  }
};

const getBackgroundColor = state => {
  switch (state) {
    // TODO-jekwan: 상수로 바꾸기
    case 'finished':
      return '#FF886D';
    case 'current':
      return '#FFFFFF';
    case 'unfinished':
    default:
      return '#BABABA';
  }
};

export default StepDot;
