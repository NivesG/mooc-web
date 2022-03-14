import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
// eslint-disable-next-line no-unused-vars
import Notification from './components/Notification'
import LoginForm from './components/Login'
import AddBlogForm from './components/AddBlog'
import Togglable from './components/Togglable'
import Users from './components/Users'
import UserDetails from './components/UserDetails'
import { useDispatch, useSelector } from 'react-redux'
// eslint-disable-next-line no-unused-vars
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom'

import { setNotification } from './reducers/notificationReducer'
import {
  addBlog,
  // eslint-disable-next-line no-unused-vars
  addVoteBlog,
  initializeBlogs,
  // eslint-disable-next-line no-unused-vars
  delBlog,
} from './reducers/blogReducer'

import { login, logout } from './reducers/loginReducer'
import { initializeUsers } from './reducers/usersReducer'
import BlogDetails from './components/BlogDetails'
//import BlogDetails from './components/BlogDetails'

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

  //const blogs = useSelector((state) => state.blogs)
  const userD = useSelector((state) => state.user)

  const dispatch = useDispatch()
  //const navigate = useNavigate()

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
  /*
  const updateLike = (blogObject) => {
    dispatch(addVoteBlog(blogObject))
  }
*/

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
    </form>
  )
  /*
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
*/
  const padding = {
    padding: 5,
  }

  const Navbar = () => {
    const navBar = {
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 30,
    }
    return (
      <div style={navBar}>
        <Link style={padding} to="/">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        <span>
          {userD.username} is logged in {logoutForm()}
        </span>
      </div>
    )
  }
  return (
    <div style={appStyle}>
      <Router>
        <div>
          <h2>blog app</h2>
          <div>
            <div>
              {userD ? (
                <>
                  <Navbar />
                  <Togglable buttonLabel="new note">
                    <AddBlogForm handleAddBlog={handleAddBlog} />
                  </Togglable>
                </>
              ) : null}
            </div>
          </div>

          <div>
            <Routes>
              <Route
                path="/login"
                element={
                  !userD ? (
                    <LoginForm
                      username={username}
                      password={password}
                      usernameChange={({ target }) => setUsername(target.value)}
                      passwordChange={({ target }) => setPassword(target.value)}
                      handleLogin={handleLogin}
                    />
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
        </div>
      </Router>
    </div>
  )
}

export default App
