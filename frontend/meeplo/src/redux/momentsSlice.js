import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import { axiosPrivate } from '../auth/axiosInstance';

export const getMomentsList = createAsyncThunk('moments/getMomentsList', async params => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axiosPrivate.get(`/moment/feed`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: params,
    });
    return response.data;
  } catch (err) {
    console.error('getMomentsList: ', err.response.data);
    return isRejectedWithValue(err.response.data);
  }
});

export const getMomentsCalendar = createAsyncThunk('moments/getMomentsCalendar', async params => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axiosPrivate.get(`/moment/calendar`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: params,
    });
    return response.data;
  } catch (err) {
    console.error('getMomentsCalendar: ', err.response.data);
    return isRejectedWithValue(err.response.data);
  }
});

export const getMomentDetail = createAsyncThunk('moments/getMomentDetail', async ({ momentDetailId }) => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axiosPrivate.get(`/moment/${momentDetailId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error('getMomentDetail: ', err.response.data);
    return isRejectedWithValue(err.response.data);
  }
});

export const updateMomentReaction = createAsyncThunk('moments/updateMomentReaction', async ({ momentDetailId }) => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axiosPrivate.post(`/moment/${momentDetailId}/reaction`, [], {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('updateMomentReaction success: ', response.data);
    return response.data;
  } catch (err) {
    console.error('updateMomentReaction: ', err.response.data);
    return isRejectedWithValue(err.response.data);
  }
});

export const deleteMomentReaction = createAsyncThunk('moments/deleteMomentReaction', async ({ momentDetailId }) => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axiosPrivate.delete(`/moment/${momentDetailId}/reaction`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('deleteMomentReaction success: ', response.data);
    return response.data;
  } catch (err) {
    console.error('deleteMomentReaction: ', err.response.data);
    return isRejectedWithValue(err.response.data);
  }
});

export const getGroupSchedules = createAsyncThunk('schedule/getGroupSchedule', async ({ groupId }) => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axiosPrivate.get(`/group/${groupId}/schedule`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error('getGroupSchedule: ', err.response.data);
    return isRejectedWithValue(err.response.data);
  }
});

export const createSimpleSchedule = createAsyncThunk('schedule/createSimpleSchedule', async ({ scheduleInfo }) => {
  console.log('scheduleInfo', scheduleInfo);
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axiosPrivate.post(`/schedule`, scheduleInfo, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('createSimpleSchedule success:', response.data);
    return response.data;
  } catch (err) {
    console.error('createSimpleSchedule: ', err.response.data);
    return isRejectedWithValue(err.response.data);
  }
});

export const createMoment = createAsyncThunk('moment/createMoment', async ({ moment, Alert, navigation }) => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axiosPrivate
      .post(`/moment`, moment, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => {
        Alert.alert(`추억을 생성했습니다.`, '', [
          {
            text: '확인',
            onPress: () => {
              navigation.reset({ routes: [{ name: 'MomentsList' }] });
            },
          },
        ]);
      });
  } catch (err) {
    console.error('createMoment: ', err.response.data);
    return isRejectedWithValue(err.response.data);
  }
});

export const deleteMoment = createAsyncThunk('moments/deleteMoment', async ({ momentDetailId }) => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axiosPrivate.delete(`/moment/${momentDetailId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error('deleteMoment: ', err.response.data);
    return isRejectedWithValue(err.response.data);
  }
});

export const getComments = createAsyncThunk('moment/getComments', async ({ momentDetailId }) => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axiosPrivate.get(`/moment/${momentDetailId}/comment`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error('getComments: ', err.response.data);
    return isRejectedWithValue(err.response.data);
  }
});

export const createComment = createAsyncThunk('moment/createComment', async commentInfo => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axiosPrivate.post(
      `/moment/${commentInfo.commentInfo.momentId}/comment`,
      commentInfo.commentInfo.comment,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log('comment created: ', response.data);
    return response.data;
  } catch (err) {
    console.error('createComment: ', err.response.data);
    return isRejectedWithValue(err.response.data);
  }
});

const momentsListSlice = createSlice({
  name: 'momentsList',
  initialState: {
    moreData: false,
    leftSize: 0,
    rightSize: 0,
    momentsLeft: [
      {
        photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/defaultImage.png',
        type: 1,
        id: 0,
        reactionCount: 0,
      },
    ],
    momentsRight: [
      {
        photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/defaultImage.png',
        type: 1,
        id: 0,
        reactionCount: 0,
      },
    ],
  },
  extraReducers: { [getMomentsList.fulfilled]: (state, { payload }) => payload },
});

const momentsCalendarSlice = createSlice({
  name: 'momentsCalendar',
  initialState: {
    moments: [
      {
        id: 0,
        photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/defaultImage.png',
        date: 'String',
      },
    ],
  },
  extraReducers: { [getMomentsCalendar.fulfilled]: (state, { payload }) => payload },
});

const momentDetailSlice = createSlice({
  name: 'momentDetail',
  initialState: {
    moment: {
      id: -1,
      photoUrl: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/defaultImage.png',
      type: 0,
      writer: -1,
    },
    reaction: {
      count: 0,
      liked: false,
    },
    comments: [],
  },
  extraReducers: { [getMomentDetail.fulfilled]: (state, { payload }) => payload },
});

const commentsSlice = createSlice({
  name: 'comentDetail',
  initialState: {
    comments: [
      {
        comment: 'String',
        location: {
          xpoint: 0,
          ypoint: 0,
          angle: 0,
        },
      },
    ],
  },
  extraReducers: { [getComments.fulfilled]: (state, { payload }) => payload },
});

const groupSchedulesSlice = createSlice({
  name: 'groupSchedules',
  initialState: {
    schedules: [
      {
        id: 0,
        name: 'String',
        date: 'String',
      },
    ],
  },
  extraReducers: { [getGroupSchedules.fulfilled]: (state, { payload }) => payload },
});

export { momentsListSlice, momentDetailSlice, commentsSlice, groupSchedulesSlice, momentsCalendarSlice };
