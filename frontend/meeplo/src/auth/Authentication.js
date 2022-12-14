import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import { MEEPLO_SERVER_BASE_URL } from '@env';
import { getProfile, login, logout, unlink } from '@react-native-seoul/kakao-login';

async function userLogin(kakaoAccessToken) {
  try {
    // console.log('카카오 액세스 토큰:', kakaoAccessToken);
    const tokens = await axios.get(`${MEEPLO_SERVER_BASE_URL}/auth/kakao`, {
      headers: {
        Authorization: `Bearer ${kakaoAccessToken}`,
      },
    });
    // console.log('백에서 받아온 데이터: ', tokens.data);
    await AsyncStorage.setItem('@accessToken', tokens.data.accessToken);
    await AsyncStorage.setItem('@refreshToken', tokens.data.refreshToken);
    return tokens;
  } catch (err) {
    console.error('ERROR in userLogin: ', err.response.data);
  }
}

/**
 * kakao에서 토큰을 받아오는 함수
 * @returns message: 카카오에서 받아오기 성공했는지
 */
export const logInWithKakao = async ({ Alert, navigation }) => {
  try {
    const kakaoToken = await login();
    const { accessToken } = kakaoToken;
    userLogin(accessToken).then(res => {
      // console.log(res.data);
      if (res.data.newMember) {
        navigation.reset({
          routes: [{ name: 'NewMemberLocation' }],
        });
      } else {
        RNRestart.Restart();
      }
    });
  } catch (err) {
    Alert.alert('로그인에 실패하였습니다.');
  }
};

export const logOutWithKakao = async ({ Alert, navigation }) => {
  try {
    const message = await logout();
    AsyncStorage.clear();
    // console.log('signout', message);
    Alert.alert('로그아웃 되었습니다.', '', [
      {
        text: '확인',
        onPress: () => {
          navigation.reset({
            routes: [{ name: 'Login' }],
          });
        },
      },
    ]);
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
