import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  momentsListSlice,
  momentsCalendarSlice,
  momentDetailSlice,
  commentsSlice,
  groupSchedulesSlice,
} from './momentsSlice';
import scheduleReducer from './scheduleSlice';
import { groupListSlice, groupDetailSlice } from './groupSlice';
import { userSlice } from './userSlice';
import { tabBarSlice } from './navigationSlice';
import { recommendationSlice } from './recommendationSlice';

// TODO: import redux-persist

const rootReducer = combineReducers({
  momentsList: momentsListSlice.reducer,
  momentsCalendar: momentsCalendarSlice.reducer,
  momentDetail: momentDetailSlice.reducer,
  commentsList: commentsSlice.reducer,
  groupSchedules: groupSchedulesSlice.reducer,
  groupList: groupListSlice.reducer,
  group: groupDetailSlice.reducer,
  schedule: scheduleReducer,
  user: userSlice.reducer,
  tabBar: tabBarSlice.reducer,
  recommendation: recommendationSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
