import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MEEPLO_SERVER_BASE_URL } from '@env';
import { navigate } from '../components/common/navigator/RootNavigator';

export const axiosPrivate = axios.create({
  baseURL: MEEPLO_SERVER_BASE_URL,
});

let isTokenRefreshing = false;
let refreshSubscribers = [];

const onTokenRefreshed = accessToken => {
  refreshSubscribers.map(callback => callback(accessToken));
};

const addRefreshSubscriber = callback => {
  refreshSubscribers.push(callback);
};

axiosPrivate.interceptors.response.use(
  res => res,
  async err => {
    const errorCode = err.response.status;
    const originalRequest = err.config;
    // console.log(originalRequest);
    if (errorCode === 401) {
      if (isTokenRefreshing === false) {
        isTokenRefreshing = true;
        const currentAccessToken = await AsyncStorage.getItem('@accessToken');
        const currentRefreshToken = await AsyncStorage.getItem('@refreshToken');
        axios
          .get(MEEPLO_SERVER_BASE_URL + `/auth/refresh`, {
            headers: {
              Authorization: `Bearer ${currentAccessToken}`,
              Refresh: `Bearer ${currentRefreshToken}`,
            },
          })
          .then(res => {
            const { accessToken, refreshToken } = res.data;
            AsyncStorage.setItem('@accessToken', accessToken);
            AsyncStorage.setItem('@refreshToken', refreshToken);
            isTokenRefreshing = false;
            originalRequest.headers.Authorization = 'Bearer ' + accessToken;
            onTokenRefreshed(accessToken);
          })
          .catch(err => {
            console.log(err);
            console.log('새로운 로그인 필요');
            AsyncStorage.clear();
            // TODO: hrookim 홈에 쌓임... 어떻게 해야 reset이 가능한것인가..
            navigate('HomeStack', { screen: 'Login' });
          });
      }
      const retryOriginalRequest = new Promise(resolve => {
        const callback = accessToken => {
          originalRequest.headers.Authorization = 'Bearer ' + accessToken;
          resolve(axios(originalRequest));
        };
        addRefreshSubscriber(callback);
      });
      return retryOriginalRequest;
    }
    return Promise.reject(err);
  },
);
