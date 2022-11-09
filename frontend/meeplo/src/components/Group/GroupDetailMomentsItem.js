import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { theme } from '../../assets/constant/DesignTheme';

const GroupDetailMomentsItem = ({ id, photo, width, color }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{
        backgroundColor: theme.color.pale[color],
        width,
        height: width,
        padding: 2,
        margin: 1,
      }}>
      <Image source={{ uri: photo }} style={{ width: '100%', height: '100%' }} resizeMode="center" />
    </TouchableOpacity>
  );
};

export default GroupDetailMomentsItem;
