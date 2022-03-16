import React, { useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/Login'
import AddBlogForm from './components/AddBlog'
import Togglable from './components/Togglable'
import Users from './components/Users'
import UserDetails from './components/UserDetails'
import { useDispatch, useSelector } from 'react-redux'
import loginService from './services/login'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import { setNotification } from './reducers/notificationReducer'
import { addBlog, initializeBlogs } from './reducers/blogReducer'

import { login } from './reducers/loginReducer'
import { initializeUsers } from './reducers/usersReducer'
import BlogDetails from './components/BlogDetails'
import Navigation from './components/Navigation'
import { Stack } from 'react-bootstrap'

const App = () => {
  const userD = useSelector((state) => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(login(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogin = async (username, password) => {
    console.log(username, password)
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(login(username, password))
    } catch (exception) {
      dispatch(
        setNotification(
          {
            error: 'wrong credentials',
          },
          4000,
        ),
      )
    }
  }

  const handleAddBlog = (newBlog) => {
    try {
      dispatch(addBlog(newBlog, userD))
      dispatch(
        setNotification(
          {
            notice: `A new blog ${newBlog.title} by ${newBlog.author} was added`,
          },
          4000,
        ),
      )
    } catch (exception) {
      dispatch(
        setNotification(
          {
            error: 'adding blog failed',
          },
          4000,
        ),
      )
    }
  }

  return (
    <div className="container">
      <Router>
        <div>
          <Stack gap={3}>
            {userD ? (
              <>
                <Stack gap={3}>
                  <Navigation />
                  <Notification />
                  <Togglable buttonLabel="new blog">
                    <AddBlogForm handleAddBlog={handleAddBlog} />
                  </Togglable>
                </Stack>
              </>
            ) : (
              <Notification />
            )}

            <div>
              <Routes>
                <Route
                  path="/login"
                  element={
                    !userD ? (
                      <LoginForm handleLogin={handleLogin} />
                    ) : (
                      <Navigate replace to="/" />
                    )
                  }
                />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<UserDetails />} />
                <Route path="/blogs/:id" element={<BlogDetails />} />
                <Route
                  path="/"
                  element={userD ? <Blog /> : <Navigate replace to="/login" />}
                />
              </Routes>
            </div>
          </Stack>
        </div>
      </Router>
    </div>
  )
}

export default App
