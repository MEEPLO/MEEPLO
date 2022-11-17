import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import { MEEPLO_SERVER_BASE_URL } from '@env';
import { axiosPrivate } from '../auth/axiosInstance';

export const createSchedule = createAsyncThunk('schedule/createSchedule', async schedule => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axios.post(`${MEEPLO_SERVER_BASE_URL}/schedule`, schedule, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('response', response);
    return response.data;
  } catch (err) {
    console.log('error', err);
    return isRejectedWithValue(err.response.data);
  }
});

export const getUpcomingSchedule = createAsyncThunk('schedule/getUpcomingSchedule', async () => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axiosPrivate.get(`/schedule/upcoming`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response?.data.schedules;
  } catch (err) {
    console.error('ERROR in getUpcomingSchedule!', err);
    return isRejectedWithValue(err.response?.data);
  }
});

export const getNoMomentsSchedule = createAsyncThunk('schedule/getNoMomentsSchedule', async () => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axiosPrivate.get(`/schedule/unwritten`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response?.data.schedules;
  } catch (err) {
    console.error('ERROR in getUpcomingSchedule!', err);
    return isRejectedWithValue(err.response?.data);
  }
});

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: {
    value: '초기약속',
    upComing: [],
    noMoments: [],
  },
  reducers: {},
  extraReducers: {
    [getUpcomingSchedule.fulfilled]: (state, { payload }) => {
      state.upComing = payload.slice(0, 3);
    },
    [getNoMomentsSchedule.fulfilled]: (state, { payload }) => {
      state.noMoments = payload.slice(0, 3);
    },
  },
});

export default scheduleSlice.reducer;
