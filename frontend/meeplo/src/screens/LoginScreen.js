import React from 'react';
import { Image, TouchableOpacity, Dimensions, Alert, ImageBackground } from 'react-native';
import { useDispatch } from 'react-redux';
import AutoHeightImage from 'react-native-auto-height-image';

import { logInWithKakao, logOutWithKakao } from '../auth/Authentication';
import styled from 'styled-components';
import Images from '../assets/image/index';
import { hideTabBar, showTabBar } from '../redux/navigationSlice';
import { useFocusEffect } from '@react-navigation/native';
import { getUserInfo } from '../redux/userSlice';

const LoginView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.background};
`;

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { width, height } = Dimensions.get('window');

  const onPressLogin = () => {
    logInWithKakao({ Alert, navigation }).then(() => {
      dispatch(getUserInfo());
    });
  };

  useFocusEffect(() => {
    dispatch(hideTabBar());

    return () => {
      dispatch(showTabBar());
    };
  });

  return (
    <LoginView>
      <Image
        source={Images.login.background}
        resizeMode="cover"
        style={{ position: 'absolute', top: 0, left: 0, opacity: 0.3, width: width, height: height }}
      />
      <AutoHeightImage source={Images.login.intro} resizeMode="cover" width={width} style={{ marginBottom: 30 }} />

      <TouchableOpacity style={{ top: 15, alignItems: 'center' }} onPress={onPressLogin}>
        <Image style={{ width: 300 }} resizeMode="contain" source={Images.kakaoLogin} />
      </TouchableOpacity>
    </LoginView>
  );
};

export default LoginScreen;
