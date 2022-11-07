import React from 'react';
import styled from 'styled-components';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MapView from '../components/map/MapView';

const ScheduleStack = createNativeStackNavigator();

const ScheduleStackScreen = () => {
  return (
    <>
      <View style={{ flex: 1, backgroundColor: 'green' }}>
        <MapView />
      </View>
    </>
  );
};

export default ScheduleStackScreen;
