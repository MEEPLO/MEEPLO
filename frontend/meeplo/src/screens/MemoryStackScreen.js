import React from 'react';
import styled from 'styled-components';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const MemoryStack = createNativeStackNavigator();

const MemoryStackScreen = () => {
  return (
    <>
      <View style={{ flex: 1, backgroundColor: 'blue' }}>
        <Text style={{ fontSize: 40 }}>This is Test Two</Text>
      </View>
    </>
  );
};

export default MemoryStackScreen;
