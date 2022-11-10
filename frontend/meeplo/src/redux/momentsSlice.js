import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';

export const getMomentsList = createAsyncThunk('moments/getMomentsList', async () => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axios.get('http://meeplo.co.kr/meeplo/api/v1/moment/feed', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error('getMomentsList: ', err.response.data);
    return isRejectedWithValue(err.response.data);
  }
});

export const getMomentDetail = createAsyncThunk('moments/getMomentDetail', async ({ momentDetailId }) => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axios.get(`http://meeplo.co.kr/meeplo/api/v1/moment/${momentDetailId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error('getMomentDetail: ', err.response.data);
    return isRejectedWithValue(err.response.data);
  }
});

export const updateMomentReaction = createAsyncThunk('moments/updateMomentReaction', async ({ momentDetailId }) => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axios.post(`http://meeplo.co.kr/meeplo/api/v1/moment/${momentDetailId}/reaction`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('updateMomentReaction: ', response.data);
    return response.data;
  } catch (err) {
    console.error('updateMomentReaction: ', err.response.data);
    return isRejectedWithValue(err.response.data);
  }
});

export const deleteMomentReaction = createAsyncThunk('moments/deleteMomentReaction', async ({ momentDetailId }) => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axios.delete(`http://meeplo.co.kr/meeplo/api/v1/moment/${momentDetailId}/reaction`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('deleteMomentReaction: ', response.data);

    return response.data;
  } catch (err) {
    console.error('deleteMomentReaction: ', err.response.data);
    return isRejectedWithValue(err.response.data);
  }
});

const momentsListSlice = createSlice({
  name: 'momentsList',
  initialState: {
    momentsLeft: [
      {
        photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107010141.png',
        type: 'POLAROID',
        id: 1,
        reactionCount: 2,
      },
      {
        photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107010049.png',
        type: 'DAYFILM',
        id: 3,
        reactionCount: 3,
      },
      {
        photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107010141.png',
        type: 'POLAROID',
        id: 10,
        reactionCount: 0,
      },
      {
        photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107005349.png',
        type: 'FOURCUT',
        id: 7,
        reactionCount: 3,
      },
    ],
    momentsRight: [
      {
        photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107005349.png',
        type: 'FOURCUT',
        id: 9,
        reactionCount: 3,
      },
      {
        photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107010049.png',
        type: 'DAYFILM',
        id: 4,
        reactionCount: 3,
      },
      {
        photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107010141.png',
        type: 'POLAROID',
        id: 6,
        reactionCount: 0,
      },
    ],
  },
  extraReducers: { [getMomentsList.fulfilled]: (state, { payload }) => payload },
});

const momentDetailSlice = createSlice({
  name: 'momentDetail',
  initialState: {
    moment: {
      id: -1,
      photoUrl: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/defaultImage.png',
      type: 'FOURCUT',
      writer: -1,
    },
    reaction: {
      count: -1,
      liked: true,
    },
    comments: [],
  },
  extraReducers: { [getMomentDetail.fulfilled]: (state, { payload }) => payload },
});

export { momentsListSlice, momentDetailSlice };
