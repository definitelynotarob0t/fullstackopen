import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    loginUser(state, action) {
      return action.payload; // user's state becomes payload
    },
    logoutUser(state, action) {
      return null; // clear the user's state on logout
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export const setUser = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials);
    blogService.setToken(user.token);
    dispatch(loginUser(user));
  };
};

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.clear();
    dispatch(logoutUser());
  };
};

export default userSlice.reducer;
