import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfile, login, logout, unlink } from '@react-native-seoul/kakao-login';

async function userLogin(kakaoAccessToken) {
  try {
    console.log('카카오 액세스 토큰:', kakaoAccessToken);
    // TODO: kakao 로그인 후 kakaoAccessToken 백에 전달
    const tokens = await axios.get('http://meeplo.co.kr/meeplo/api/v1/auth/kakao', {
      headers: {
        Authorization: `Bearer ${kakaoAccessToken}`,
      },
    });
    // 백에서 전달받은 accessToken refreshToken AsyncStorage에 저장
    AsyncStorage.setItem('accessToken', tokens.data.accessToken);
    AsyncStorage.setItem('refreshToken', tokens.data.refreshToken);
    console.log('성공!', tokens.data);
  } catch (err) {
    console.error("CAN'T SAVE TOKEN");
  }
}

/**
 * kakao에서 토큰을 받아오는 함수
 * @returns message: 카카오에서 받아오기 성공했는지
 */
export const logInWithKakao = async () => {
  try {
    const kakaoToken = await login();
    const { accessToken } = kakaoToken;
    userLogin(accessToken);
    console.log('카카오로그인성공', kakaoToken);

    // return message;
  } catch (err) {
    console.error('login err =======', err);
  }
};

export const logOutWithKakao = async () => {
  try {
    const message = await logout();
    console.log('signout', message);
    return message;
  } catch (err) {
    console.error('signOut error', err);
  }
};

export const getKakaoProfile = async () => {
  try {
    const profile = await getProfile();
    const userKakaoId = profile.id;
    return userKakaoId;
  } catch (err) {
    console.error('signOut error', err);
  }
};

export const unlinkKakao = async () => {
  try {
    const message = await unlink();
    return message;
  } catch (err) {
    console.error('signOut error', err);
  }
};
