import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';

export const getUserInfo = createAsyncThunk('user/getUserInfo', async () => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axios.get('http://meeplo.co.kr/meeplo/api/v1/member', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error('ERROR in getUserInfo!', err.response.data);
    return isRejectedWithValue(err.response.data);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    nickname: 'String',
    profilePhoto: 'http://www.pharmnews.com/news/photo/202206/205376_75336_1939.png',
    startLocations: [
      {
        id: -1,
        name: 'String',
        lat: 0.1,
        lng: 0.1,
        address: 'String',
      },
    ],
  },
  extraReducers: {
    [getUserInfo.fulfilled]: (state, { payload }) => payload,
  },
});

export { userSlice };
