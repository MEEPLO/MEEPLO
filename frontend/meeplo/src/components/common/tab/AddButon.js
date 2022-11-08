import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Animated, TouchableOpacity, Easing } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import Images from '../../../assets/image/index';

const AddButon = props => {
  // TODO: hrookim 생성메뉴 나오기
  const mode = new Animated.Value(0);

  const rotation = mode.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const handlePress = async () => {
    Animated.timing(mode, {
      toValue: mode._value === 0 ? 1 : 0,
      duration: 200,
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
        <TouchableOpacity onPress={handlePress} activeOpacity={1}>
          <View>
            <Animated.Image
              style={{ width: 75, height: 75, bottom: 25, transform: [{ rotate: rotation }] }}
              source={Images.addIcon}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default AddButon;
