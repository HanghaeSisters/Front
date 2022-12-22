import { configureStore } from "@reduxjs/toolkit";
import comment from "../modules/commentSlice";
import user from "../modules/userSlice";
import post from "../modules/postSlice";
import posts from "../modules/postsSlice";

const store = configureStore({
  reducer: { posts: posts, post: post, comment: comment, user: user },
});

export default store;
