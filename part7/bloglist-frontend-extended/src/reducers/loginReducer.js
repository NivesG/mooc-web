import { createSlice } from '@reduxjs/toolkit'
//import userService from '../services/login'

const initialState = null

const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state, action) {
      const user = action.payload
      return user
    },
    logoutUser(state, action) {
      return initialState
    },
  },
})

export const { loginUser, logoutUser } = loginSlice.actions

export const login = (user) => {
  return async (dispatch) => {
    dispatch(loginUser(user))
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch(logoutUser())
  }
}

export default loginSlice.reducer
