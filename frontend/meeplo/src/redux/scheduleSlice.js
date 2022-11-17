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

// ex) yearMonth === '2022-11'
export const getSchedulesMonthly = createAsyncThunk('schedule/getSchedulesMonthly', async yearMonth => {
  try {
    console.log('yearmonth', yearMonth);
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axios.get(`${MEEPLO_SERVER_BASE_URL}/schedule/monthly/${yearMonth}/list`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (err) {
    return isRejectedWithValue(err.response.data);
  }
});

// ex) yearMonth === '2022-11'
export const getSchedulesDatesMonthly = createAsyncThunk('schedule/getSchedulesMonthly', async yearMonth => {
  try {
    console.log('yearmonth', yearMonth);
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axios.get(`${MEEPLO_SERVER_BASE_URL}/schedule/monthly/${yearMonth}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (err) {
    return isRejectedWithValue(err.response.data);
  }
});

// ex) date === '2022-11-11'
export const getSchedulesDaily = createAsyncThunk('schedule/getSchedulesMonthly', async date => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axios.get(`${MEEPLO_SERVER_BASE_URL}/schedule/daily/${date}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (err) {
    return isRejectedWithValue(err.response.data);
  }
});

export const getSchedules = createAsyncThunk('schedule/getSchedules', async ({ yearMonth }) => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axios.get(`${MEEPLO_SERVER_BASE_URL}/schedule`, {
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
  isLoading: false,
  schedules: [],
  scheduleDates: [],
};
const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {},
  extraReducers: {
    [getSchedulesMonthly.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [getSchedulesMonthly.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.schedules = payload;
    },
    [getSchedulesDatesMonthly.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [getSchedulesDatesMonthly.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.scheduleDates = payload;
    },
    [getSchedules.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [getSchedules.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.schedules = payload;
    },
    [getSchedulesDaily.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [getSchedulesDaily.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.schedules = payload;
    },
  },
});

export default scheduleSlice.reducer;
