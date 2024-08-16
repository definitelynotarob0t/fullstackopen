import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification(state) {
      return null;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const notify = (message) => {
  return async (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };
};

export default notificationSlice.reducer;
