import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { theme } from '../../assets/constant/DesignTheme';

const GroupDetailMomentsItem = ({ id, photo, width, color }) => {
  return (
    <View
      style={{
        backgroundColor: theme.color.pale[color],
        width,
        height: width,
        padding: 2,
        margin: 1,
      }}>
      <Image source={{ uri: photo }} style={{ width: '100%', height: '100%' }} resizeMode="center" />
    </View>
  );
};

export default GroupDetailMomentsItem;
