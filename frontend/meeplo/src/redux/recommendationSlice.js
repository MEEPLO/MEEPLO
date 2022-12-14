import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import { axiosPrivate } from '../auth/axiosInstance';

export const getMiddlePoint = createAsyncThunk('recommendation/getMiddlePoint', async form => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axiosPrivate.post(`/recommendation/location/middle`, form, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (err) {
    console.log('getMiddlePoint error', err.response.data);
    return isRejectedWithValue(err.response.data);
  }
});

export const getAmuseRecommendation = createAsyncThunk('recommendation/getAmuseRecommendation', async form => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axiosPrivate.post(`/recommendation/location/amuse`, form, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (err) {
    console.log('getAmuseRecommendation error', err.response.data);
    return isRejectedWithValue(err.response.data);
  }
});

const recommendationSlice = createSlice({
  name: 'recommendation',
  initialState: {
    isLoading: false,
    recommendedStations: [],
    recommendedAmuses: [],
  },
  reducers: {},
  extraReducers: {
    [getMiddlePoint.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [getMiddlePoint.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.recommendedStations = payload?.stations;
    },
    [getAmuseRecommendation.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [getAmuseRecommendation.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.recommendedAmuses = payload?.amuses;
    },
  },
});

export { recommendationSlice };
