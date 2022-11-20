import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import { axiosPrivate } from '../auth/axiosInstance';

export const getNearLocations = createAsyncThunk('location/getNearLocations', async ({ lat, lng, radius }) => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axiosPrivate.get(`/location?lat=${lat}&lng=${lng}&radius=${radius}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (err) {
    return isRejectedWithValue(err.response.data);
  }
});

export const getStationList = createAsyncThunk('location/getStationList', async searchValue => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axiosPrivate.get(`/location/station?keyword=${searchValue}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (err) {
    return isRejectedWithValue(err.response.data);
  }
});

export const getDetailLocation = createAsyncThunk('location/getDetailLocation', async locationId => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axiosPrivate.get(`/location/${locationId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (err) {
    return isRejectedWithValue(err.response.data);
  }
});

const locationSlice = createSlice({
  name: 'location',
  initialState: { isLoading: false, stations: [], station: {} },
  reducers: {},
  extraReducers: {
    [getStationList.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [getStationList.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.stations = payload?.stations;
    },
    [getDetailLocation.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [getDetailLocation.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.station = payload;
    },
  },
});

export { locationSlice };
