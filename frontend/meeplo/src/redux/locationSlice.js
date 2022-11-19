import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import { MEEPLO_SERVER_BASE_URL } from '@env';

export const getNearLocations = createAsyncThunk('location/getNearLocations', async ({ lat, lng, radius }) => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axiosPrivate.get(
      `${MEEPLO_SERVER_BASE_URL}/location?lat=${lat}&lng=${lng}&radius=${radius}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    console.log(response.data);

    return response.data;
  } catch (err) {
    return isRejectedWithValue(err.response.data);
  }
});

const locationSlice = createSlice({
  name: 'location',
  initialState: {},
  reducers: {},
  extraReducers: {},
});

export { locationSlice };
