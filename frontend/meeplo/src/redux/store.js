import {configureStore, combineReducers} from '@reduxjs/toolkit';

import memoryReducer from './memorySlice';
import groupReducer from './groupSlice';
import scheduleReducer from './scheduleSlice';

// TODO: import redux-persist

const rootReducer = combineReducers({
  memory: memoryReducer,
  group: groupReducer,
  schedule: scheduleReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
