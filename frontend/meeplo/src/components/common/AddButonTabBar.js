import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Animated, TouchableOpacity, Easing } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons/faCalendarDays';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';

const AddButonTabBar = props => {
  const mode = new Animated.Value(0);

  const rotation = mode.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const itemOneX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-24, -100],
  });

  const itemOneY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, -100],
  });

  const handlePress = async () => {
    console.log(mode._value);
    Animated.timing(mode, {
      toValue: mode._value === 0 ? 1 : 0,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      if (mode._value === 0) {
        mode.setValue(1);
      } else {
        mode.setValue(0);
      }
    });
  };
  return (
    <View style={[{ alignItems: 'center', justifyContent: 'center' }]}>
      <Animated.View>
        <TouchableOpacity onPress={handlePress}>
          <View>
            <Animated.Image
              style={{ width: 75, height: 75, bottom: 25, transform: [{ rotate: rotation }] }}
              source={require('../../assets/image/addIcon.png')}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  secondaryButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'violet',
  },
});

export default AddButonTabBar;
