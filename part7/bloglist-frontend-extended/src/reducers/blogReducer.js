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
      console.log(action)
      return state.map((blog) => (blog.id !== votedBlog.id ? blog : votedBlog))
    },
    deletingBlog(state, action) {
      console.log(action)
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
    addComment(state, action) {
      console.log(action)
      const id = action.payload.id
      const blogeId = action.payload.blogId
      const content = action.payload.content

      const blog = state.find((blog) => blog.id === blogeId)
      const newComment = { content, id }
      const updatedBlog = {
        ...blog,
        comments: [...blog.comments, newComment],
      }
      return state.map((blog) => (blog.id !== blogeId ? blog : updatedBlog))
    },
  },
})

export const { createBlog, setBlogs, addLike, deletingBlog, addComment } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addBlog = (blog, user) => {
  return async (dispatch) => {
    console.log(user)
    const boka = { ...blog, user: user }
    const newBlog = await blogService.create(boka)
    dispatch(createBlog(newBlog))
  }
}

export const addVoteBlog = (votedBlog) => {
  const updatedBlog = { ...votedBlog, likes: votedBlog.likes + 1 }
  return async (dispatch) => {
    await blogService.addLike(votedBlog.id, updatedBlog)
    dispatch(addLike(updatedBlog))
  }
}

export const delBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch(deletingBlog(id))
  }
}

export const addComments = (id, comment) => {
  const blogId = id
  return async (dispatch) => {
    const newComment = await blogService.addComment(id, comment)
    dispatch(addComment({ ...newComment, blogId }))
  }
}

export default blogSlice.reducer
