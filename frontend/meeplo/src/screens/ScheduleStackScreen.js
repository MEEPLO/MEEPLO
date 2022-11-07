import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ScheduleTestScreen from './ScheduleTestScreen';

const ScheduleStack = createNativeStackNavigator();

const ScheduleStackScreen = () => {
  return (
    <ScheduleStack.Navigator
      initialRouteName="Test"
      screenOptions={{
        headerShown: false,
      }}>
      <ScheduleStack.Screen name="Test" component={ScheduleTestScreen} />
    </ScheduleStack.Navigator>
  );
};

export default ScheduleStackScreen;
