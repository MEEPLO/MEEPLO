import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';

export const getGroupList = createAsyncThunk('group/getGroupList', async () => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axios.get('http://meeplo.co.kr/meeplo/api/v1/group', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error('ERROR in getGroupList!', err);
    return isRejectedWithValue(err.response.data);
  }
});

// TODO: hrookim groupId 인자 받기!
export const getGroupDetail = createAsyncThunk('group/getGroupDetails', async ({ groupId }) => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axios.get(`http://meeplo.co.kr/meeplo/api/v1/group/${groupId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error('ERROR in getGroupDetail!', err);
    return isRejectedWithValue(err.response.data);
  }
});

const groupListSlice = createSlice({
  name: 'groupList',
  initialState: {
    group: [
      {
        id: -1,
        name: 'string',
        photo: 'photo url',
        memberCount: -1,
        leaderName: 'string',
        lastSchedule: 'YYYY-MM-DD hh:mm',
      },
    ],
  },
  reducers: {},
  extraReducers: {
    [getGroupList.fulfilled]: (state, { payload }) => payload,
  },
});

const groupDetailSlice = createSlice({
  name: 'group',
  initialState: {
    group: [
      {
        id: -1,
        name: 'string',
        description: 'string',
        photo: 'photo url',
        leader: 'string',
        members: [
          {
            id: -1,
            nickname: 'string',
            photo: 'string',
          },
        ],
        schedules: [
          {
            id: -1,
            name: 'string',
            date: 'string',
            memberCount: -1,
            location: {
              meetName: 'string',
              amuseName: 'string',
            },
          },
        ],
      },
    ],
  },
  reducers: {},
  extraReducers: {
    [getGroupDetail.fulfilled]: (state, { payload }) => payload,
  },
});

export { groupDetailSlice, groupListSlice };
