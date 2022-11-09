import React from 'react';
import styled from 'styled-components';
import { View, Text, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TestHome from './TestHome';
import ScheduleHomeScreen from './ScheduleHomeScreen';
import ScheduleCreateScreen from './ScheduleCreateScreen';

const ScheduleStack = createNativeStackNavigator();

const ScheduleStackScreen = ({ navigation }) => {
  return (
    <ScheduleStack.Navigator
      initialRouteName="Test"
      screenOptions={{
        headerShown: false,
      }}>
      <ScheduleStack.Screen name="Test" component={TestHome} />
      <ScheduleStack.Screen name="Home" component={ScheduleHomeScreen} />
      <ScheduleStack.Screen name="Create" component={ScheduleCreateScreen} />
    </ScheduleStack.Navigator>
  );
};

export default ScheduleStackScreen;
