import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: "notification",
    initialState: null,
    reducers: {
        setNotification(state, action) {
            return `You voted for "${action.payload}"`
        },
        clearNotification(state) {
            return null
        }
    }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const notify = (content, time) => {
    return async dispatch => {
      dispatch(setNotification(content))
      setTimeout(() => {
          dispatch(clearNotification())
      }, time * 1000)
    }
  }

export default notificationSlice.reducer
