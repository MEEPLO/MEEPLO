import React from 'react';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme } from '@react-navigation/native';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import LoadingBar from '../components/common/LoadingBar';
import { ToolBarLeft, ToolBarRight, ToolBarTitle } from '../components/common/ToolBar';
import HomeGroup from '../components/Home/HomeGroup';

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  const user = useSelector(state => state.user);

  return (
    <HomeStack.Navigator initialRouteName="Login">
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
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
      <HomeStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="Loading" component={LoadingBar} options={{ headerShown: false }} />
      <HomeStack.Screen
        name="HomeGroup"
        component={HomeGroup}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerLeft: props => {
            return props.canGoBack && <ToolBarLeft {...props} />;
          },
          headerRight: () => <ToolBarRight userPhoto={user.memberDetail.profilePhoto} />,
          headerTitle: () => <ToolBarTitle />,
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
