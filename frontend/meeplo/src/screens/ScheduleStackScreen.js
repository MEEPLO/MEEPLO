import React from 'react';
import styled from 'styled-components';
import { View, Text, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ScheduleTestScreen from './ScheduleTestScreen';

const ScheduleStack = createNativeStackNavigator();

const ScheduleStackScreen = ({ navigation }) => {
  return (
    <>
      <View style={{ flex: 1, backgroundColor: 'green' }}>
        <Text style={{ fontSize: 40 }}>This is Test One</Text>
        <Button title="Go to ScheduleHome" onPress={() => navigation.navigate('ScheduleHome')} />
        <Button title="Go to ScheduleCreate" onPress={() => navigation.navigate('ScheduleCreate')} />
      </View>
    </>
  );
};

export default ScheduleStackScreen;
