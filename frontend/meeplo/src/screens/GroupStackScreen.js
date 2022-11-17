import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ToolBarLeft, ToolBarRight, ToolBarTitle } from '../components/common/navigator/ToolBar';
import GroupCreateScreen from './GroupCreateScreen';
import GroupDetailScreen from './GroupDetailScreen';
import GroupHomeScreen from './GroupHomeScreen';
import GroupDetailInfoScreen from './GroupDetailInfoScreen';
import GroupEditScreen from './GroupEditScreen';
import GroupJoinScreen from './GroupJoinScreen';

const GroupStack = createNativeStackNavigator();

const GroupStackScreen = () => {
  const user = useSelector(state => state.user);

  useEffect(() => {}, []);
  return (
    <GroupStack.Navigator initialRouteName="GroupHome">
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
          headerRight: () => <ToolBarRight userPhoto={user.profilePhoto} />,
          headerTitle: () => <ToolBarTitle />,
        }}
      />
      <GroupStack.Screen
        name="GroupDetail"
        component={GroupDetailScreen}
        initialParams={{ groupId: 1 }}
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
          headerRight: () => <ToolBarRight userPhoto={user.profilePhoto} />,
          headerTitle: () => <ToolBarTitle />,
        }}
      />
      <GroupStack.Screen
        name="GroupEdit"
        component={GroupEditScreen}
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
      <GroupStack.Screen
        name="GroupDetailInfo"
        component={GroupDetailInfoScreen}
        initialParams={{ groupId: 1 }}
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
      <GroupStack.Screen
        name="GroupJoin"
        component={GroupJoinScreen}
        initialParams={{ groupId: 0, from: 'kakao' }}
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
    </GroupStack.Navigator>
  );
};

export default GroupStackScreen;
