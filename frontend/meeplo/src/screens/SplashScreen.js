import React, { useState, useEffect } from 'react';
import { StatusBar, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components';

const SplashView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #465bd8;
`;

const SplashLogo = styled.Text`
  font-size: 50px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.background};
`;

const SplashScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(false);

  // TODO: login 된 사용자면 바로 Home으로 넘김
  // TODO: login 되지 않은 사용자면 LoginScreen으로 넘김
  useEffect(() => {
    const getIsLogin = async () => {
      if ((await AsyncStorage.getItem('accessToken')) !== null) {
        console.log('로그인된 사용자!');
        setIsLogin(true);
      }
    };
    getIsLogin();

    setTimeout(() => {
      if (isLogin === true) {
        navigation.replace('Home');
      } else {
        // navigation.replace('Home');
        navigation.replace('Login');
      }
    }, 2500);
  }, []);

  return (
    <SplashView>
      <StatusBar animated={true} barStyle="light-content" hidden={true} backgroundColor="#465bd8" />
      <Image source={require('../assets/image/test_loopy.png')} style={{ width: 100, height: 100 }} />
      <SplashLogo>MEEPLO</SplashLogo>
    </SplashView>
  );
};

export default SplashScreen;
