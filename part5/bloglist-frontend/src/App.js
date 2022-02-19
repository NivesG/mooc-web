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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
      //setNoticeMessage('uspešno prijavljen')
    } catch (exception) {
      setErrorMessage('Wrong credentials')     
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log('login pressed', username, password) 

  }

  const loginForm = () => (
    <div>
    <h2>Log in to application</h2>
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
    </div>      
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

  return (
    <div>
       <h1>blogs</h1>
      {user === null ? loginForm() : 
        <div>
          {loginNotice()}
          {blogList()}
        </div>
      }
  
      <Notification messageNotice={noticeMessage} messageError={errorMessage}/> 

      
    </div>
  )
}

export default App