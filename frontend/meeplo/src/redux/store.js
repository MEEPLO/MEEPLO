import { configureStore, combineReducers } from '@reduxjs/toolkit';
import momentsReducer from './momentsSlice';
import scheduleReducer from './scheduleSlice';
import { groupListSlice, groupDetailSlice } from './groupSlice';
import { userSlice } from './userSlice';

// TODO: import redux-persist

const rootReducer = combineReducers({
  moments: momentsReducer,
  groupList: groupListSlice.reducer,
  group: groupDetailSlice.reducer,
  schedule: scheduleReducer,
  user: userSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
