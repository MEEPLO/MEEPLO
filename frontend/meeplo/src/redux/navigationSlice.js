import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';

const tabBarSlice = createSlice({
  name: 'tabBar',
  initialState: {
    display: 'flex',
    opened: false,
  },
  reducers: {
    hideTabBar: state => {
      return { ...state, display: 'none' };
    },
    showTabBar: state => {
      return { ...state, display: 'flex' };
    },
    setOpened: (state, action) => {
      state.opened = action.payload;
    },
  },
  extraReducers: {},
});

export const { hideTabBar, showTabBar, setOpened } = tabBarSlice.actions;
export { tabBarSlice };
