import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import { MEEPLO_SERVER_BASE_URL } from '@env';

export const getMomentsList = createAsyncThunk('moments/getMomentsList', async () => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axios.get(MEEPLO_SERVER_BASE_URL + `/moment/feed`, {
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

export const getMomentsCalendar = createAsyncThunk('moments/getMomentsCalendar', async () => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axios.get(MEEPLO_SERVER_BASE_URL + `/moment/calendar`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
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
    const response = await axios.get(MEEPLO_SERVER_BASE_URL + `/moment/${momentDetailId}`, {
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
    const response = await axios.post(MEEPLO_SERVER_BASE_URL + `/moment/${momentDetailId}/reaction`, {
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
    const response = await axios.delete(MEEPLO_SERVER_BASE_URL + `/moment/${momentDetailId}/reaction`, {
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

export const createMoment = createAsyncThunk('moment/createMoment', async ({ moment, Alert, navigation }) => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axios
      .post(MEEPLO_SERVER_BASE_URL + `/moment`, moment, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => {
        Alert.alert(`추억을 생성했습니다.`, '', [
          {
            text: '확인',
            onPress: () => {
              navigation.reset({ routes: [{ name: 'MomentsCreate' }] });
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
    const response = await axios.delete(MEEPLO_SERVER_BASE_URL + `/moment/${momentDetailId}`, {
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
    const response = await axios.get(MEEPLO_SERVER_BASE_URL + `/moment/${momentDetailId}/comment`, {
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
  console.log(commentInfo.comment, commentInfo.momentId);
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axios.post(
      MEEPLO_SERVER_BASE_URL + `/moment/${commentInfo.momentId}/comment`,
      commentInfo.comment,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error('createComment: ', err);
    return isRejectedWithValue(err.response.data);
  }
});

const momentsListSlice = createSlice({
  name: 'momentsList',
  initialState: {
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

const momentDetailSlice = createSlice({
  name: 'momentDetail',
  initialState: {
    moment: {
      id: -1,
      photoUrl: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/defaultImage.png',
      type: 1,
      writer: -1,
    },
    reaction: {
      count: 0,
      liked: true,
    },
    comments: [],
    isLikeSwitched: false,
  },
  extraReducers: {
    [getMomentDetail.fulfilled]: (state, { payload }) => {
      state = payload;
    },
    [updateMomentReaction.pending]: (state, { payload }) => {
      state.isLikeSwitched = false;
    },
    [updateMomentReaction.fulfilled]: (state, { payload }) => {
      state.isLikeSwitched = true;
    },
    [updateMomentReaction.rejected]: (state, { payload }) => {
      state.isLikeSwitched = false;
    },
    [deleteMomentReaction.pending]: (state, { payload }) => {
      state.isLikeSwitched = false;
    },
    [deleteMomentReaction.fulfilled]: (state, { payload }) => {
      state.isLikeSwitched = true;
    },
    [deleteMomentReaction.rejected]: (state, { payload }) => {
      state.isLikeSwitched = false;
    },
  },
});

const commentsSlice = createSlice({
  name: 'momentDetail',
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

export { momentsListSlice, momentDetailSlice, commentsSlice };
