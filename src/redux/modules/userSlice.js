// 리듀서, 미들웨어
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// API, cookie
import { instance } from "../../core/api/axios";

import { getCookie } from "../../shared/Cookie";

const initialState = {
  // user안에 리듀서가 관리할 데이터가 들어가고
  // isLoading - 서버와의 통신결과
  // error - 에러객체 저장
  // 유저의 상태에 따라 추가 가능?
  user: [],
  userCheck: null,
  userSignup: null,
  isLoading: false,
  error: null,
};

console.log(getCookie("is_login"));
const config = {
  headers: { Authorization: `Bearer ${getCookie("is_login")}` },
};
console.log(config);

// ------------------------------------------------- 미들웨어
// 중복체크 ( 유저 데이터 보내기, 결과 받기 )
export const __userCheck = createAsyncThunk(
  "userCheck",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const { data } = await instance.get(
        `/api/user/idcheck?username=${payload}`
      );
      console.log("중복확인: ", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// 회원가입 ( 유저 데이터 보내기, 결과 받기)
// export const __signUpUser = createAsyncThunk(
//   "signUpUser",
//   async (payload, thunkAPI) => {
//     console.log(payload);
//     try {
//       const { data } = await instance.post("/api/user/signup", payload);
//       console.log('로딩데이터: ', data)
//       return thunkAPI.fulfillWithValue(data);
//     } catch (err) {
//       console.log('미들웨어-',err)
//       return thunkAPI.rejectWithValue(err);
//     }
//   }
// );

// 로그인하기 -> 서버에 토큰 보내줌.
export const __loginUser = createAsyncThunk(
  "loginUser",
  async (payload, thunkAPI) => {
    try {
      const { data } = await instance.post("/api/user/login", payload, config);
      console.log(config);
      const token = data.headers.authorization;
      instance.defaults.headers.common["Authorization"] = token;

      return thunkAPI.fulfillWithValue(data, payload);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// ---------------------------- 리듀서
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    // 중복확인  ---------------
    [__userCheck.pending]: (state) => {
      state.userCheck = "--";
      state.isLoading = true;
    },
    [__userCheck.fulfilled]: (state, action) => {
      console.log("중복확인action", action);
      state.isLoading = false;
      action.payload.statusCode === 200
        ? (state.userCheck = true)
        : (state.userCheck = false);
      console.log(state.userCheck);
      localStorage.setItem("msg", action.payload.msg);
    },
    [__userCheck.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // 회원가입  ---------------
    // [__signUpUser.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [__signUpUser.fulfilled]: (state, action) => {
    //   console.log("회원가입action", action);
    //   state.isLoading = false;

    //   // 렌더하는 부분에서 메세지를 조금 더 ..활용할 수 있는 방법은? ㅠㅠ
    //   // 쿠키에 데이터를 저장한다. .. -> 로컬에 저장해서 사
    //   localStorage.setItem('msg', action.payload.msg)
    //   const localMsg = localStorage.getItem('msg')
    //   console.log(localMsg)
    //   state.userSignup = localMsg

    // },
    // [__signUpUser.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   console.log('리듀서 에러-',action)
    //   state.error = action.payload;
    // },

    // 로그인 -----------------받음 payload(username),data
    [__loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [__loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log("action-서버값", action);
      state.user = action.payload;
    },
    [__loginUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
