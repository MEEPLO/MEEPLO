import React from 'react';
import styled from 'styled-components';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const GroupStack = createNativeStackNavigator();

const GroupStackScreen = () => {
  return (
    <>
      <View style={{ flex: 1, backgroundColor: 'green' }}>
        <Text style={{ fontSize: 40 }}>This is Test One</Text>
      </View>
    </>
  );
};

export default GroupStackScreen;
