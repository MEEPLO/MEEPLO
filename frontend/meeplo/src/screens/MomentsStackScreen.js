import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ToolBarLeft, ToolBarRight, ToolBarTitle } from '../components/common/navigator/ToolBar';
import MomentsListScreen from './MomentsListScreen';
import MomentsCreateScreen from './MomentsCreateScreen';
import MomentsCommentCreateScreen from './MomentsCommentCreateScreen';
import { useSelector } from 'react-redux';

const MomentsStack = createNativeStackNavigator();

const MomentsStackScreen = () => {
  const user = useSelector(state => state.user);
  return (
    <MomentsStack.Navigator initialRouteName="MomentsList" screenOptions={{ headerShown: false }}>
      <MomentsStack.Screen
        name="MomentsList"
        component={MomentsListScreen}
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
      <MomentsStack.Screen
        name="MomentsCreate"
        component={MomentsCreateScreen}
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
      <MomentsStack.Screen
        name="MomentsCommentCreate"
        component={MomentsCommentCreateScreen}
        initialParams={{ momentId: 1 }}
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
    </MomentsStack.Navigator>
  );
};

export default MomentsStackScreen;
