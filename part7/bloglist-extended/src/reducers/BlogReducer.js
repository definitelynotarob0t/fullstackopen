import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: null,
  reducers: {
    setBlogs(state, action) {
      return action.payload; // blogs' state becomes payload
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
    changeBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog,
      );
    },
    removeBlog(state, action) {
      const blogToDelete = action.payload;
      return state.map((blog) => (blog.id !== blogToDelete.id ? blog : null));
    },
  },
});

export const { setBlogs, addBlog, changeBlog, removeBlog } = blogSlice.actions;

export const initialiseBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  const blogToAdd = {
    ...content,
    likes: 0,
  };
  return async (dispatch) => {
    const newBlog = await blogService.createNew(blogToAdd);
    dispatch(addBlog(newBlog));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.updateBlog({
      ...blog,
      likes: blog.likes + 1,
    });
    dispatch(changeBlog(likedBlog));
  };
};

export const remove = (blog) => {
  return async (dispatch) => {
    const deletedBlog = await blogService.deleteBlog(blog);
    dispatch(removeBlog(deletedBlog));
  };
};
export default blogSlice.reducer;
