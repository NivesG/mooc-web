import { createSlice } from '@reduxjs/toolkit'

const initialState = { notification: null }

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification(state, action) {
      const content = action.payload
      console.log(content)
      return content
    },
    removeNotification() {
      return initialState
    },
  },
})

export const { addNotification, removeNotification } = notificationSlice.actions

export const setNotification = (content, time) => {
  return async (dispatch) => {
    console.log(content)
    dispatch(addNotification(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, time)
  }
}

export default notificationSlice.reducer
