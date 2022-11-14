import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import { MEEPLO_SERVER_BASE_URL } from '@env';

export const createSchedule = createAsyncThunk('schedule/createSchedule', async schedule => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axios.post(`${MEEPLO_SERVER_BASE_URL}/schedule`, schedule, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    return isRejectedWithValue(err.response.data);
  }
});

const initialState = {
  // TODO: API 명세에 적혀있는대로 초기값 설정
  value: '초기약속',
};
const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {},
  extraReducers: {},
});

export default scheduleSlice.reducer;
