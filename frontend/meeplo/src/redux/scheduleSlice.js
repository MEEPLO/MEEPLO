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

    return response.data;
  } catch (err) {
    return isRejectedWithValue(err.response.data);
  }
});

// ex) yearMonth === '2022-11'
export const getSchedulesMonthly = createAsyncThunk('schedule/getSchedulesMonthly', async yearMonth => {
  try {
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
export const getSchedulesDatesMonthly = createAsyncThunk('schedule/getSchedulesDatesMonthly', async yearMonth => {
  try {
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
export const getSchedulesDaily = createAsyncThunk('schedule/getSchedulesDaily', async date => {
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
    console.error('ERROR in getNoMomentsSchedule!', err);
    return isRejectedWithValue(err.response?.data);
  }
});

export const getScheduleDetail = createAsyncThunk('schedule/getScheduleDetail', async scheduleId => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axiosPrivate.get(`/schedule/${scheduleId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response?.data;
  } catch (err) {
    console.error('ERROR in getScheduleDetail!', err);
    return isRejectedWithValue(err.response?.data);
  }
});

export const editSchedule = createAsyncThunk('schedule/editGroup', async ({ form, scheduleId, Alert, navigation }) => {
  console.log(form);
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axiosPrivate
      .put(
        `/schedule`,
        { ...form },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then(() => {
        Alert.alert(`약속을 수정했습니다.`, '', [
          {
            text: '확인',
            onPress: () => {
              navigation.reset({
                index: 1,
                routes: [{ name: 'Home' }, { name: 'Detail', params: { scheduleId } }],
              });
            },
          },
        ]);
      });
    console.log('schedule EDITED!');
  } catch (err) {
    console.error('ERROR in editSchedule!', err);
    return isRejectedWithValue(err.response?.data);
  }
});

export const getScheduleMomentsFeed = createAsyncThunk('schedule/getScheduleMomentsFeed', async ({ scheduleId }) => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axiosPrivate.get(`/schedule/${scheduleId}/moment`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response?.data.moments;
  } catch (err) {
    console.error('ERROR in getScheduleMomentsFeed', err);
    return isRejectedWithValue(err.response?.data);
  }
});

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: {
    value: '초기약속',
    isLoading: false,
    schedule: {},
    schedules: [],
    scheduleDates: [],
    upComing: [],
    noMoments: [],
    moments: [],
  },
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
      state.scheduleDates = payload.scheduledDates;
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
    [getUpcomingSchedule.fulfilled]: (state, { payload }) => {
      state.upComing = payload.slice(0, 3);
    },
    [getNoMomentsSchedule.fulfilled]: (state, { payload }) => {
      state.noMoments = payload.slice(0, 3);
    },
    [getScheduleDetail.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [getScheduleDetail.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.schedule = payload;
    },
    [getScheduleMomentsFeed.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [getScheduleMomentsFeed.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.moments = payload;
    },
  },
});

export default scheduleSlice.reducer;
