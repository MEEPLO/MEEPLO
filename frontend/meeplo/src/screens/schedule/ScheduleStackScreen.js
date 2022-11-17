import React from 'react';
import styled from 'styled-components';
import { View, Text, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { ToolBarLeft, ToolBarRight, ToolBarTitle } from '../../components/common/navigator/ToolBar';

import TestHome from './TestHome';
import ScheduleHomeScreen from './ScheduleHomeScreen';
import ScheduleCreateScreen from './ScheduleCreateScreen';
import ScheduleDetailScreen from './ScheduleDetailScreen';

const ScheduleStack = createNativeStackNavigator();

const ScheduleStackScreen = ({ navigation }) => {
  const user = useSelector(state => state.user);

  return (
    <ScheduleStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <ScheduleStack.Screen
        name="Home"
        component={ScheduleHomeScreen}
        options={{
          headerShadowVisible: false,
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeft: props => {
            props.canGoBack && <ToolBarLeft {...props} />;
          },
          headerRight: () => <ToolBarRight userPhoto={user.profilePhoto} />,
          headerTitle: () => <ToolBarTitle />,
        }}
      />
      <ScheduleStack.Screen
        name="Create"
        component={ScheduleCreateScreen}
        options={{
          headerShadowVisible: false,
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeft: props => {
            props.canGoBack && <ToolBarLeft {...props} />;
          },
          headerRight: () => <ToolBarRight userPhoto={user.profilePhoto} />,
          headerTitle: () => <ToolBarTitle />,
        }}
      />
      <ScheduleStack.Screen
        name="Detail"
        component={ScheduleDetailScreen}
        options={{
          headerShadowVisible: false,
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeft: props => {
            props.canGoBack && <ToolBarLeft {...props} />;
          },
          headerRight: () => <ToolBarRight userPhoto={user.profilePhoto} />,
          headerTitle: () => <ToolBarTitle />,
        }}
      />
    </ScheduleStack.Navigator>
  );
};

export default ScheduleStackScreen;
