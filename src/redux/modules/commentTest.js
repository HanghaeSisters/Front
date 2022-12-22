// todosSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comment :  [
    { 
        postId : 0,
        commentId : 1,
        comment : "리덕스 툴킷 적용한 투두..",
        username : "thdud11",
    },
    { 
        postId : 0,
        commentId : 2,
        comment : "axios언제하짘 투두..",
        username : "thdud22",
    },
    { 
        postId : 1,
        commentId : 3,
        comment : "test입니다아..",
        username : "thdud11",
    },
    { 
        postId : 1,
        commentId : 4,
        comment : "tes444입니다아..",
        username : "thdud22",
    },
  ]
};

// action 생성하는 부분이 사라지고 아래 부분에서
// 액션value, 액션함수, 리듀서가 합쳐짐

const commentSlice = createSlice({
  // 모듈의 이름  name: "todos",(큰 영향 없는듯...바꿔도 값 안바뀜)
  // 초기상태값의 들어감 위의 todos
  // 리듀서 안의 이름addTodo이 액션 함수 이름과 같다
  name: "comment",
  initialState,
  reducers: {
    addComment: (state, action) => {
      console.log('state', state.comment)
      console.log('action', action.payload)
      // stste는 따로 출력을 할 수 없다. 
      // state의 initialState의 객체이름(todos)을 넣어서 출력한다
      // state.(init)=> 기본state = 바꿀 값 넣어주기 
      state.comment = [action.payload, ...state.comment]
    },
  },
});


// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export const { addComment } = commentSlice.actions;
export default commentSlice.reducer;