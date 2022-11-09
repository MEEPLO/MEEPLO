import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://meeplo.co.kr/meeplo/api/v1';
const accessToken = AsyncStorage.getItem('@accessToken');

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export default API;
