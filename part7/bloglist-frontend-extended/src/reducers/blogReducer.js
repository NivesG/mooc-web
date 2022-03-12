import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    createBlog(state, action) {
      console.log('dsdfsd')
    },
  },
})

export const { createBlog } = blogSlice.actions
export default blogSlice.reducer
