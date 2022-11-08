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
    return response.data.group;
  } catch (err) {
    console.error('ERROR in getGroupList!', err);
    return isRejectedWithValue(err.response.data);
  }
});

export const getGroupDetail = createAsyncThunk('group/getGroupDetails', async ({ groupId }) => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axios.get(`http://meeplo.co.kr/meeplo/api/v1/group/${groupId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.group;
  } catch (err) {
    console.error('ERROR in getGroupDetail!', err);
    return isRejectedWithValue(err.response.data);
  }
});

export const createGroup = createAsyncThunk('group/createGroup', async ({ form }) => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axios.post(
      'http://meeplo.co.kr/meeplo/api/v1/group',
      { ...form },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log('group CREATED!');
    return response.data;
  } catch (err) {
    console.error('ERROR in createGroup!', err);
    return isRejectedWithValue(err.response.data);
  }
});

export const editGroup = createAsyncThunk('group/editGroup', async ({ form, groupId }) => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axios.put(
      `http://meeplo.co.kr/meeplo/api/v1/group/${groupId}`,
      { ...form },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log('group EDITED!');
    return response.data;
  } catch (err) {
    console.error('ERROR in editGroup!', err);
    return isRejectedWithValue(err.response.data);
  }
});

// Only available to LEADER
export const deleteGroup = createAsyncThunk('group/deleteGroup', async ({ groupId }) => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axios.delete(`http://meeplo.co.kr/meeplo/api/v1/group/${groupId}`, {
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

export const exitGroup = createAsyncThunk('group/exitGroup', async ({ groupId }) => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axios.delete(`http://meeplo.co.kr/meeplo/api/v1/group/${groupId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('group EXITED!');
    return response.data;
  } catch (err) {
    console.error('ERROR in exitGroup!', err);
    return isRejectedWithValue(err.response.data);
  }
});

// Only available to LEADER
export const exitGroupMember = createAsyncThunk('group/exitGroupMember', async ({ groupId, memberId }) => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axios.delete(`http://meeplo.co.kr/meeplo/api/v1/group/${groupId}/member/${memberId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('group member EXITED');
    return response.data;
  } catch (err) {
    console.error('ERROR in exitGroupMember', err);
    return isRejectedWithValue(err.response.data);
  }
});

// TODO: hrookim 그룹 초대 링크

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
  reducers: {},
  extraReducers: {
    [getGroupDetail.fulfilled]: (state, { payload }) => payload,
  },
});

export { groupDetailSlice, groupListSlice };
