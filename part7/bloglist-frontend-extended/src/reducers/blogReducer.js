import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    createBlog(state, action) {
      console.log(action)
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    addLike(state, action) {
      const votedBlog = action.payload
      return state.map((blog) => (blog.id !== votedBlog.id ? blog : votedBlog))
    },
    deletingBlog(state, action) {
      console.log(action)
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
  },
})

export const { createBlog, setBlogs, addLike, deletingBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addBlog = (blog, user) => {
  return async (dispatch) => {
    const boka = { ...blog, userId: user.id }
    const newBlog = await blogService.create(boka)
    dispatch(createBlog(newBlog))
  }
}

export const addVoteBlog = (votedBlog) => {
  const updatedBlog = { ...votedBlog, likes: votedBlog.likes + 1 }
  return async (dispatch) => {
    const returnedBlog = await blogService.addLike(votedBlog.id, updatedBlog)
    dispatch(addLike(returnedBlog))
  }
}

export const delBlog = (id) => {
  return async (dispatch) => {
    const deletedBlog = await blogService.deleteBlog(id)
    console.log(deletedBlog)
    dispatch(deletingBlog(id))
  }
}

export default blogSlice.reducer
