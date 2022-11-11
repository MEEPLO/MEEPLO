import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import { MEEPLO_SERVER_BASE_URL } from '@env';

const initialState = {
  // TODO: API 명세에 적혀있는대로 초기값 설정
  value: '초기약속',
};
const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {},
  extraReducers: {
    // [getSchedule.fulfilled]: (state, {payload}) => payload
  },
});

export default scheduleSlice.reducer;
