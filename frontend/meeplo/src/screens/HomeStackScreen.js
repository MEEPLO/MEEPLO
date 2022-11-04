import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, Button, View } from 'react-native-svg';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import LoadingBar from '../components/common/LoadingBar';
import { ToolBarLeft, ToolBarRight, ToolBarTitle } from '../components/common/ToolBar';
import { getUserInfo } from '../redux/userSlice';
import HomeGroup from '../components/Home/HomeGroup';

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);
  return (
    <HomeStack.Navigator initialRouteName="Splash">
      <HomeStack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
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
