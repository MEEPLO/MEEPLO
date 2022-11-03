import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { theme } from '../../assets/constant/DesignTheme';

const LoadingBar = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.color.background }}>
      {/* TODO: change color */}
      <ActivityIndicator size="large" color="#CF44F1" />
    </View>
  );
};

export default LoadingBar;
