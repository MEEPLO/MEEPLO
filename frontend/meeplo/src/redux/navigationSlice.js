import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';

const tabBarSlice = createSlice({
  name: 'tabBar',
  initialState: {
    display: 'flex',
  },
  reducers: {
    hideTabBar: state => {
      return { ...state, display: 'none' };
    },
    showTabBar: state => {
      return { ...state, display: 'flex' };
    },
  },
  extraReducers: {},
});

export const { hideTabBar, showTabBar } = tabBarSlice.actions;
export { tabBarSlice };
