import { configureStore, combineReducers } from '@reduxjs/toolkit';
import memoryReducer from './memorySlice';
import scheduleReducer from './scheduleSlice';
import { groupListSlice, groupDetailSlice } from './groupSlice';
import { userSlice } from './userSlice';

// TODO: import redux-persist

const rootReducer = combineReducers({
  memory: memoryReducer,
  groupList: groupListSlice.reducer,
  group: groupDetailSlice.reducer,
  schedule: scheduleReducer,
  user: userSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
