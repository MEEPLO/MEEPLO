import axios from 'axios';
import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from '@reduxjs/toolkit';

// TODO: create thunk using axios

// 예시: 스터디 상세 보기
export const getMemory = createAsyncThunk('memory/getMemory', async () => {
  try {
    const response = await axios.get();
    // 서버 url, headers 객체
    return response.data;
  } catch (err) {
    // navigate('/notfound');
    return isRejectedWithValue(err.response.data);
  }
});

const initialState = {
  // TODO: API 명세에 적혀있는대로 초기값 설정
  value: '초기추억',
};
const memorySlice = createSlice({
  name: 'memory',
  initialState,
  reducers: {},
  extraReducers: {
    // [getMemory.fulfilled]: (state, {payload}) => payload
  },
});

export default memorySlice.reducer;
