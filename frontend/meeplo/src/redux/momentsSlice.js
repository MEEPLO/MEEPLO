import API from '../api';
import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';

export const getMomentsList = createAsyncThunk('moments/getMomentsList', async () => {
  try {
    const response = await API.get('http://meeplo.co.kr/meeplo/api/v1/moment/feed');
    return response.data;
  } catch (err) {
    console.error('getMomentsList: ', err.response.data);
    return isRejectedWithValue(err.response.data);
  }
});

export const getMomentDetail = createAsyncThunk('moments/getMomentDetail', async ({ momentId }) => {
  try {
    const response = await API.get(`http://meeplo.co.kr/meeplo/api/v1/moment/${momentId}`);
    return response.data;
  } catch (err) {
    console.error('getMomentDetail: ', err.response.data);
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
  extraReducers: builder => {
    builder.addCase(getMomentsList.fulfilled, (state, action) => {
      state.payload = action.payload;
    });
  },
});

const momentDetailSlice = createSlice({
  name: 'momentDetail',
  initialState: {
    moment: {
      id: 1,
      photoUrl: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107010141.png',
      writer: 1,
      type: 'POLAROID',
    },
    // moment: {
    //   id: 9,
    //   photoUrl: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107005349.png',
    //   writer: 2,
    //   type: "FOURCUT",
    // },
    // moment: {
    //   id: 3,
    //   photoUrl: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107010049.png',
    //   writer: 1,
    //   type: 'DAYFILM',
    // },
    reaction: {
      count: 2,
      liked: true,
    },
    comments: [
      {
        comment: '다음엔 2차 3차도 갑시다 👍',
        location: {
          xPoint: 0,
          yPoint: 60,
          angle: -40,
        },
      },
      {
        comment: '오늘 진짜 재미있었다 오랜만에 만나서 더 꿀잼이었던 듯 😍',
        location: {
          xPoint: 0,
          yPoint: 170,
          angle: 20,
        },
      },
    ],
  },
  extraReducers: builder => {
    builder.addCase(getMomentDetail.fulfilled, (state, action) => {
      state.payload = action.payload;
    });
  },
});

export { momentsListSlice, momentDetailSlice };
