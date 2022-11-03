import React, { useEffect } from 'react';
import { Text } from 'react-native-svg';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import LoadingBar from '../components/common/LoadingBar';
// import styled from 'styled-components';

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="Splash" component={SplashScreen} />
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Login" component={LoginScreen} />
      <HomeStack.Screen name="Loading" component={LoadingBar} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
