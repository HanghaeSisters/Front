import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../../shared/Cookie";

import axios from "axios";

const initialState = {
  comment: [],
  isLoading: false,
  error: null,
};
const config = {
  headers: { Authorization: `Bearer ${getCookie("is_login")}` },
};

export const __addComment = createAsyncThunk(
  "addComment",
  async (payload, thunkAPI) => {
    console.log("페이로드는?", payload);
    try {
      // const data = await instance.post(
      //   `/api/comment/${payload.postId}`,{content: payload.content}, config );
      // 네트워크에서 Bearer이 안붙은 토큰이 감..오ㅐ?
      // => 인터셉터 설정은 베어러 없음.나중에 나눠서 고쳐
      const data = await axios.post(
        `http://43.201.111.129/api/comment/${payload.postId}`,
        { content: payload.content },
        config
      );

      console.log("추가데이터: ", data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);
// 데이터삭제 : 서버에서는 데이터를 삭제했으므로,
// 아래 리듀서에 삭제할 데이터를 보낼 순 없다.
// 리듀서에서는 id값을 받아서 filter로 걸러낸 후 store에 있는 데이터를 출력해줘야함
export const __delComment = createAsyncThunk(
  "delComment",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      // const data = await instance.delete(
      //   `/api/comment/${payload}`, config);
      // console.log("데이터삭제, 리듀서는 id값 주기: ", payload);
      const data = await axios.delete(
        `http://43.201.111.129/api/comment/${payload}`,
        config
      );
      console.log(data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);
// ------------------------------------------------
export const __editStartDiary = createAsyncThunk(
  "editStartDiary",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const data = await axios.put(
        `http://localhost:3005/comment/${payload.id}`,
        payload
      );
      console.log("수정: ", data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __editEndtDiary = createAsyncThunk(
  "editEndDiary",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const data = await axios.put(
        `http://localhost:3005/comment/${payload.id}`,
        payload
      );
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// --------------------------------------------------Diary 리듀서
export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: {
    // 댓글 추가 ------------------
    [__addComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__addComment.fulfilled]: (state, action) => {
      // 액션으로 받은 값 = payload 추가해준다.
      console.log("action-서버값", action.payload);
      state.isLoading = false;
      state.comment = action.payload;
    },
    [__addComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // 댓글 삭제 ------------------
    [__delComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__delComment.fulfilled]: (state, action) => {
      // 미들웨어를 통해 받은 action값이 무엇인지 항상 확인한다
      console.log("action-서버값", action.payload);
      state.isLoading = false;
      state.comment = state.comment.filter((t) => t.id !== action.payload);
      console.log(state.comment.filter((t) => t.id !== action.payload));
    },
    [__delComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // 수정 버튼 클릭 -----------------  아직
    [__editStartDiary.pending]: (state) => {
      state.isLoading = true;
    },
    [__editStartDiary.fulfilled]: (state, action) => {
      // console.log('state-store값',state.diary)
      console.log("action-서버값", action);
      state.isLoading = false;
      const copy = [...state.diary];
      const index = state.diary.findIndex((c) => +c.id === +action.payload.id);
      state.comment[index] = action.payload;
      state.comment = [...state.diary];
    },
    [__editStartDiary.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // 수정 완료 버튼 클릭 -----------------
    [__editStartDiary.pending]: (state) => {
      state.isLoading = true;
    },
    [__editStartDiary.fulfilled]: (state, action) => {
      // console.log('state-store값',state.diary)
      console.log("action-서버값", action);
      state.isLoading = false;
      const index = state.diary.findIndex((c) => +c.id === +action.payload.id);
      state.diary[index] = action.payload;
      state.diary = [...state.diary];
    },
    [__editStartDiary.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default commentSlice.reducer;
