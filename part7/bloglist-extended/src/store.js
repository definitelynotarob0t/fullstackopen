import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./reducers/UserReducer";
import BlogReducer, { setBlogs } from "./reducers/BlogReducer";
import blogService from "./services/blogs";
import NotificationReducer from "./reducers/NotificationReducer";

const store = configureStore({
  reducer: {
    user: UserReducer,
    blogs: BlogReducer,
    notification: NotificationReducer,
  },
});

console.log(store.getState());

blogService.getAll().then((blogs) => store.dispatch(setBlogs(blogs)));

export default store;
