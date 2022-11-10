import React from 'react';
import styled from 'styled-components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MomentsListScreen from './MomentsListScreen';
import MomentsCreateScreen from './MomentsCreateScreen';
import MomentsCommentCreateScreen from './MomentsCommentCreateScreen';

const MomentsStack = createNativeStackNavigator();

const MomentsStackScreen = () => {
  return (
    <MomentsStack.Navigator initialRouteName="MomentsList" screenOptions={{ headerShown: false }}>
      <MomentsStack.Screen name="MomentsList" component={MomentsListScreen} />
      <MomentsStack.Screen name="MomentsCreate" component={MomentsCreateScreen} />
      <MomentsStack.Screen name="MomentsCommentCreate" component={MomentsCommentCreateScreen} />
    </MomentsStack.Navigator>
  );
};

export default MomentsStackScreen;
