import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import { findRenderedDOMComponentWithClass } from 'react-dom/cjs/react-dom-test-utils.development'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [noticeMessage, setNoticeMessage] =useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [inputValue, setInputValue] = useState(null)
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [linkUrl, setLinkUrl] = useState('');


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
      blogService.setToken(user.token)
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
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    
    } catch (exception) {
      setErrorMessage('wrong username or password')     
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const handleLogout = async(event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleAddBlog = async(event) => {
    event.preventDefault()
    const newBlog = {title: title, author: author, url: linkUrl,  userId: user.id}
    try {
      const addedBlog = await blogService.create(newBlog)
      let blogList = blogs.concat(addedBlog)
      setBlogs(blogList)
      setNoticeMessage(`A new blog ${addedBlog.title} by ${addedBlog.author} was added`);
      setTimeout(() => {
        setNoticeMessage(null);
      }, 4000);

    }catch (exception) {
      setErrorMessage('adding blog failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000) 

    }
    
    setTitle('');
    setAuthor('');
    setLinkUrl('');

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

  const addBlogForm = () => (
    <div>
      <h2>create new: </h2>
      <form onSubmit={handleAddBlog}>
      <div>
         Title:
          <input
            type="text"
            value={title}
            id="title"
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            autoFocus
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={author}
            id="author"
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
         URL:
          <input
            type="text"
            value={linkUrl}
            id="linkUrl"
            name="linkUrl"
            onChange={({ target }) => setLinkUrl(target.value)}
          />
        </div>
        <div>
          <input type="submit" value="create" id="AddBlog" />
        </div>

      </form>
    </div>
    
  )

  return (
    <div>
       <h1>blogs</h1>
       <Notification messageNotice={noticeMessage} messageError={errorMessage}/> 
      {user === null ?
      <div>
      {loginForm()}
     
      </div>
       : 
        <div>
          {loginNotice()}
          {logoutForm()}
          {addBlogForm()}
          {blogList()}
        </div>
      }
  
      
    </div>
  )
}

export default App