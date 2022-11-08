import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ToolBarLeft, ToolBarRight, ToolBarTitle } from '../components/common/ToolBar';
import GroupCreateScreen from './GroupCreateScreen';
import GroupDetailScreen from './GroupDetailScreen';
import GroupHomeScreen from './GroupHomeScreen';

const GroupStack = createNativeStackNavigator();

const GroupStackScreen = () => {
  const user = useSelector(state => state.user);

  useEffect(() => {}, []);
  return (
    <GroupStack.Navigator initialRouteName="GroupCreate">
      <GroupStack.Screen
        name="GroupHome"
        component={GroupHomeScreen}
        options={{
          headerShadowVisible: false,
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeft: props => {
            props.canGoBack && <ToolBarLeft {...props} />;
          },
          headerRight: () => <ToolBarRight userPhoto={user.memberDetail.profilePhoto} />,
          headerTitle: () => <ToolBarTitle />,
        }}
      />
      <GroupStack.Screen name="GroupDetail" component={GroupDetailScreen} options={{ headerShown: true }} />
      <GroupStack.Screen
        name="GroupCreate"
        component={GroupCreateScreen}
        options={{
          headerShadowVisible: false,
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeft: props => {
            props.canGoBack && <ToolBarLeft {...props} />;
          },
          headerRight: () => <ToolBarRight userPhoto={user.memberDetail.profilePhoto} />,
          headerTitle: () => <ToolBarTitle />,
        }}
      />
    </GroupStack.Navigator>
  );
};

export default GroupStackScreen;
