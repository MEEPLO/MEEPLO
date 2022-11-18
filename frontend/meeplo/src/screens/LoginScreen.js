import React, { useState, useEffect } from 'react';
import { Button, Image, TouchableOpacity, Text, Dimensions, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
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
  const { width } = Dimensions.get('window');

  const onPressLogin = () => {
    logInWithKakao({ Alert }).then(() => {
      dispatch(getUserInfo());
    });
  };

  const onPressLogout = () => {
    logOutWithKakao({ Alert, navigation }).then(() => {});
  };

  useFocusEffect(() => {
    dispatch(hideTabBar());

    return () => {
      dispatch(showTabBar());
    };
  });

  return (
    <LoginView>
      <Image source={Images.meeploLogo} style={{ width: width * 0.6, height: width * 0.6 }} resizeMode="contain" />
      <Text style={{ fontSize: 50, fontWeight: 'bold' }}>미플로</Text>

      <Text>우리... 어디서 만나?</Text>

      <Text>중간장소를 찾고</Text>
      <Text>약속 장소를 추천받아</Text>
      <Text>함께한 기록을 남겨보아요</Text>

      <TouchableOpacity style={{ top: 15, alignItems: 'center' }} onPress={onPressLogin}>
        <Image style={{ width: 300 }} resizeMode="contain" source={Images.kakaoLogin} />
      </TouchableOpacity>
      <Button title="로그아웃" onPress={onPressLogout} />
      <Button
        title="홈으로 가기"
        onPress={() => {
          navigation.replace('Home');
        }}
      />
    </LoginView>
  );
};

export default LoginScreen;
