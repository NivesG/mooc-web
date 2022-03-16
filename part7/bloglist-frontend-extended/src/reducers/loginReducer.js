import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'

const initialState = null

const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state, action) {
      console.log(action)
      const user = action.payload
      return user
    },
    logoutUser(state, action) {
      return initialState
    },
  },
})

export const { loginUser, logoutUser } = loginSlice.actions

export const login = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({
      username,
      password,
    })
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch(loginUser(user))
    console.log(user)
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch(logoutUser())
  }
}

export default loginSlice.reducer
