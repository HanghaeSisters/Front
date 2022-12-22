import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "../../shared/Cookie";

import { instance } from "../../core/api/axios";

const initialState = {
  posts: [],
  isLoading: true,
  error: null,
  hospitalCheck: false,
};

const config = {
  headers: { Authorization: `Bearer ${getCookie("is_login")}` },
};

export const __postPost = createAsyncThunk(
  "postPost",
  async (payload, thunkAPI) => {
    console.log(payload);

    console.log(config);
    try {
      // const data = await instance.post("/api/post", payload, config);
      const data = await axios.post(
        `http://43.201.111.129/api/post`,
        payload,
        config
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __upDatePost = createAsyncThunk(
  "upDatePost",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);

      const data = await axios.put(
        `http://43.201.111.129/api/post/${payload[0]}`,
        payload[1],
        config
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      alert("서버요청중 오류발생!");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deletePost = createAsyncThunk(
  "__deletePost",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.delete(
        `http://43.201.111.129/api/post/${payload}`,
        config
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      // console.log("에러가 발생했습니다.", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getPosts = createAsyncThunk(
  "getPosts",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const data = await axios.get(
        `http://43.201.111.129/api/post/category?category=${payload}`
      );

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getHospital = createAsyncThunk(
  "postHospital",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const data = await axios.get(
        `http://43.201.111.129/api/post/hospital?hospital-name=${payload}`
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducer: {},
  extraReducers: {
    [__postPost.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__postPost.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.posts.push(action.payload); // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
      console.log(action);
      console.log(action.payload);
    },
    [__postPost.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__deletePost.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__deletePost.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.posts = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__deletePost.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },

    [__getPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [__getPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    [__getPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getHospital.pending]: (state) => {
      state.isLoading = true;
    },
    [__getHospital.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(state, action);
      action.payload.statusCode === 200
        ? (state.hospitalCheck = true)
        : (state.hospitalCheck = false);
      console.log(state.hospitalCheck);
    },
    [__getHospital.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = postSlice.actions;
export default postSlice.reducer;
