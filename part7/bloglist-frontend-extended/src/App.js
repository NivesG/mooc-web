import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/Login'
import AddBlogForm from './components/AddBlog'
import Togglable from './components/Togglable'
import Users from './components/Users'
import { useDispatch, useSelector } from 'react-redux'

import { setNotification } from './reducers/notificationReducer'
import {
  addBlog,
  addVoteBlog,
  initializeBlogs,
  delBlog,
} from './reducers/blogReducer'

import { login, logout } from './reducers/loginReducer'
import { initializeUsers } from './reducers/usersReducer'

const appStyle = {
  backgroundColor: '#f0f0f0',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  padding: '1em 2em',
}

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogs = useSelector((state) => state.blogs)
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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(login(user))
      setUsername('')
      setPassword('')
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

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logout())
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

  const updateLike = (blogObject) => {
    dispatch(addVoteBlog(blogObject))
  }

  const loginNotice = () => <p>{userD.username} is logged in</p>

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
    </form>
  )

  const deleteBlog = (id) => {
    const delBloge = blogs.filter((blog) => blog.id === id)
    if (
      window.confirm(
        `are you shure you want to delete blog ${delBloge[0].title} by ${delBloge[0].author}?`,
      )
    ) {
      try {
        dispatch(delBlog(id))
        dispatch(
          setNotification(
            {
              notice: `Blog ${delBloge[0].title} by ${delBloge[0].author} was deleted`,
            },
            4000,
          ),
        )
      } catch (exception) {
        dispatch(
          setNotification(
            {
              error: 'you are not authorised to delete blog',
            },
            4000,
          ),
        )
      }
    }
  }

  return (
    <div style={appStyle}>
      <h1>blogs</h1>
      <Notification />
      {userD === null ? (
        <div>
          <Togglable buttonLabel="login">
            <LoginForm
              username={username}
              password={password}
              usernameChange={({ target }) => setUsername(target.value)}
              passwordChange={({ target }) => setPassword(target.value)}
              handleLogin={handleLogin}
            />
          </Togglable>
        </div>
      ) : (
        <div>
          {loginNotice()}
          {logoutForm()}
          <Togglable buttonLabel="new note">
            <AddBlogForm handleAddBlog={handleAddBlog} />
          </Togglable>
          <h2>Users</h2>
          <Users />
          <h2>Blogs</h2>
          {blogs
            //.sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                user={userD}
                key={blog.id}
                blog={blog}
                updateLike={updateLike}
                deleteBlog={deleteBlog}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
