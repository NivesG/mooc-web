import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [noticeMessage, setNoticeMessage] =useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
     //noteService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    
    } catch (exception) {
      setErrorMessage('Wrong credentials')     
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log('login pressed', username, password) 

  }

  const handleLogout = async(event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => ( 
    <form onSubmit={handleLogin}>
      <div>
        username 
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password 
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>   
  )

  const blogList = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
  )


  const loginNotice = () => (
    <p>{user.username} is logged in</p>
  )

  const logoutForm = () => (
    
      <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
      </form>


  )

  return (
    <div>
       <h1>blogs</h1>
      {user === null ?
      <div>
      {loginForm()}
     
      </div>
       : 
        <div>
          {loginNotice()}
          {logoutForm()}
          {blogList()}
        </div>
      }
  
      <Notification messageNotice={noticeMessage} messageError={errorMessage}/> 

      
    </div>
  )
}

export default App