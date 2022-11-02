import React, { useState, useEffect } from 'react';
import { Button, Image, TouchableOpacity } from 'react-native';
import { getProfile, unlink } from '@react-native-seoul/kakao-login';
import { logInWithKakao, logOutWithKakao } from '../auth/Authentication';
import styled from 'styled-components';

const LoginView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.background};
`;

const LoginLogo = styled.Text`
  font-size: 50px;
  font-weight: bold;
  color: ${({ theme }) => theme.font.color};
`;

const MEEPLO_LOGO_IMG = require('../assets/image/test_loopy.png');
const KAKAO_LOGIN_IMG = require('../assets/image/kakao_login_large_wide.png');

const LoginScreen = ({ navigation }) => {
  const [result, setResult] = useState('Welcome to Meeplo');

  const getKakaoProfile = async () => {
    try {
      const profile = await getProfile();
      setResult(JSON.stringify(profile));
    } catch (err) {
      console.error('signOut error', err);
    }
  };

  const unlinkKakao = async () => {
    try {
      const message = await unlink();
      setResult(message);
    } catch (err) {
      console.error('signOut error', err);
    }
  };

  return (
    <LoginView>
      <Image source={MEEPLO_LOGO_IMG} style={{ width: 100, height: 100 }} />
      <LoginLogo>MEEPLO</LoginLogo>
      <TouchableOpacity style={{ top: 15, alignItems: 'center' }} onPress={logInWithKakao}>
        <Image style={{ width: 300 }} resizeMode="contain" source={KAKAO_LOGIN_IMG} />
      </TouchableOpacity>
      {/* <Button title="프로필 조회" onPress={getKakaoProfile} />
      <Button title="링크 해제" onPress={unlinkKakao} /> */}
      <Button title="로그아웃" onPress={logOutWithKakao} />
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
