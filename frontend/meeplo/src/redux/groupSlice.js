import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import { MEEPLO_SERVER_BASE_URL } from '@env';

export const getGroupList = createAsyncThunk('group/getGroupList', async () => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axios.get(MEEPLO_SERVER_BASE_URL + `/group`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response?.data.group;
  } catch (err) {
    console.error('ERROR in getGroupList!', err);
    return isRejectedWithValue(err.response?.data);
  }
});

export const getGroupDetail = createAsyncThunk('group/getGroupDetails', async ({ groupId }) => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axios.get(MEEPLO_SERVER_BASE_URL + `/group/${groupId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response?.data.group;
  } catch (err) {
    console.error('ERROR in getGroupDetail!', err);
    return isRejectedWithValue(err.response?.data);
  }
});

export const getGroupMomentsFeed = createAsyncThunk('group/getGroupMomentsFeed', async ({ groupId }) => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axios.get(MEEPLO_SERVER_BASE_URL + `/group/${groupId}/moment/feed`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response?.data.moments;
  } catch (err) {
    console.error('ERROR in getGroupMomentsFeed', err);
    return isRejectedWithValue(err.response?.data);
  }
});

export const createGroup = createAsyncThunk('group/createGroup', async ({ form, Alert, navigation }) => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axios
      .post(MEEPLO_SERVER_BASE_URL + `/group`, form, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => {
        Alert.alert(`그룹을 생성했습니다.`, '', [
          {
            text: '확인',
            onPress: () => {
              navigation.reset({
                index: 1,
                routes: [{ name: 'GroupHome' }, { name: 'GroupDetail', params: { groupId: res.data.groupId } }],
              });
            },
          },
        ]);
      });
    console.log('group CREATED!');
  } catch (err) {
    console.error('ERROR in createGroup!', err);
    return isRejectedWithValue(err.response?.data);
  }
});

export const editGroup = createAsyncThunk('group/editGroup', async ({ form, groupId, Alert, navigation }) => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axios
      .put(
        MEEPLO_SERVER_BASE_URL + `/group/${groupId}`,
        { ...form },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then(() => {
        Alert.alert(`그룹을 수정했습니다.`, '', [
          {
            text: '확인',
            onPress: () => {
              navigation.reset({
                index: 2,
                routes: [
                  { name: 'GroupHome' },
                  { name: 'GroupDetail', params: { groupId } },
                  { name: 'GroupDetailInfo', params: { groupId } },
                ],
              });
            },
          },
        ]);
      });
    console.log('group EDITED!');
    return response?.data;
  } catch (err) {
    console.error('ERROR in editGroup!', err);
    return isRejectedWithValue(err.response?.data);
  }
});

// Only available to LEADER
export const deleteGroup = createAsyncThunk('group/deleteGroup', async ({ groupName, groupId, Alert, navigation }) => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axios
      .delete(MEEPLO_SERVER_BASE_URL + `/group/${groupId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        Alert.alert(`${groupName} 그룹을 삭제했습니다.`, '', [
          {
            text: '확인',
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'GroupHome' }],
              });
            },
          },
        ]);
      });
    return response?.data;
  } catch (err) {
    console.error('ERROR in getGroupList!', err);
    return isRejectedWithValue(err.response?.data);
  }
});

export const exitGroup = createAsyncThunk('group/exitGroup', async ({ groupName, groupId, Alert, navigation }) => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axios
      .delete(MEEPLO_SERVER_BASE_URL + `/group/${groupId}/member`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        Alert.alert(`${groupName} 그룹에서 나갔습니다.`, '', [
          {
            text: '확인',
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'GroupHome' }],
              });
            },
          },
        ]);
      });
    console.log('group EXITED!');
    return response?.data;
  } catch (err) {
    console.error('ERROR in exitGroup!', err);
    return isRejectedWithValue(err.response?.data);
  }
});

// Only available to LEADER
// TODO: hrookim 강퇴 후 navigate 로직!!!
export const exitGroupMember = createAsyncThunk('group/exitGroupMember', async ({ groupId, memberId }) => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const response = await axios.delete(MEEPLO_SERVER_BASE_URL + `/group/${groupId}/member/${memberId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('group member EXITED');
    return response?.data;
  } catch (err) {
    console.error('ERROR in exitGroupMember', err);
    return isRejectedWithValue(err.response?.data);
  }
});

// TODO: hrookim 그룹 초대 링크

const groupListSlice = createSlice({
  name: 'groupList',
  initialState: [
    {
      id: -1,
      name: 'string',
      photo:
        'https://images.squarespace-cdn.com/content/v1/5c5f909ee5f7d115a785fd8e/1583427044737-14H3GRLCB4OG2SMSRMBS/light-gray-box%402x.png?format=2500w',
      memberCount: -1,
      leaderName: 'string',
      lastSchedule: '1111-11-11 11:11',
    },
  ],
  reducers: {},
  extraReducers: {
    [getGroupList.fulfilled]: (state, { payload }) => payload,
  },
});

const groupDetailSlice = createSlice({
  name: 'group',
  initialState: {
    details: {},
    moments: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    [createGroup.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [createGroup.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    },
    [editGroup.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [editGroup.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    },
    [getGroupDetail.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [getGroupDetail.fulfilled]: (state, { payload }) => {
      state.details = payload;
      state.isLoading = false;
    },
    [getGroupDetail.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
    [getGroupMomentsFeed.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [getGroupMomentsFeed.fulfilled]: (state, { payload }) => {
      state.moments = payload;
      state.isLoading = false;
    },
    [getGroupMomentsFeed.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
  },
});

export { groupDetailSlice, groupListSlice };
