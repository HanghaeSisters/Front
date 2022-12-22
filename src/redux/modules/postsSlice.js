import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getCookie } from "../../shared/Cookie";

import axios from "axios";

const initialState = {
  posts: [],
  isLoading: true,
  error: null,
};

const config = {
  headers: { Authorization: `Bearer ${getCookie("is_login")}` },
};

export const __getPostss = createAsyncThunk(
  "getPostss",
  async (payload, thunkAPI) => {
    console.log(payload);
    console.log(config);
    try {
      const data = await axios.get(
        `http://43.201.111.129/api/post/${payload}`,
        config
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log("겟이 어렵습니다.", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducer: {},
  extraReducers: {
    [__getPostss.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getPostss.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.posts = action.payload;
    },
    [__getPostss.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

export const {} = postsSlice.actions;
export default postsSlice.reducer;
