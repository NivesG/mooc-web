import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/Login'
import AddBlogForm from './components/AddBlog'
import Togglable from './components/Togglable'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [noticeMessage, setNoticeMessage] =useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
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
    const newBlog = {title: title, author: author, url: linkUrl, likes: 0, userId: user.id}

    try {
      const addedBlog = await blogService.create(newBlog)
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
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

  const updateLike = async (id, blogObject) => {
    const updatedBlog = {
      ...blogObject,
      likes: blogObject.likes +1 
    }

    try {
      const returnedBlog = await blogService.addLike(id, updatedBlog)
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)))

    }catch(exception) {
      console.log(exception);
    }

  }


  const loginNotice = () => (
    <p>{user.username} is logged in</p>
  )

  const logoutForm = () => (
    
      <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
      </form>

  )

  const deleteBlog = async(id) => {
     const delBlog = blogs.filter((blog) => blog.id === id)
     if(window.confirm(`are you shure you want to delete blog ${delBlog[0].title} by ${delBlog[0].author}?`)){
      try{
        const deletedBlog = await blogService.deleteBlog(id)
        console.log(deletedBlog);   
        setNoticeMessage(`Blog ${delBlog[0].title} by ${delBlog[0].author} was deleted`);
        setTimeout(() => {
        setNoticeMessage(null);
      }, 4000);
        setBlogs(blogs.filter((blog) => blog.id !== id))

      }catch(exception){
        setErrorMessage('brisanje ni uspelo - nisi autor')
        setTimeout(() => {
        setErrorMessage(null)
        }, 5000) 
      }
  }


     }
   
      

  return (
    <div>
       <h1>blogs</h1>
       <Notification messageNotice={noticeMessage} messageError={errorMessage}/> 
      {user === null ?
      <div>
      <Togglable buttonLabel = 'login'>
        <LoginForm
          username={username}
          password={password}
          usernameChange={({target}) => setUsername(target.value)}
          passwordChange={({target}) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
        </Togglable>
     
      </div>
       : 
        <div>
          {loginNotice()}
          {logoutForm()}
          <Togglable buttonLabel = 'new note'>
            <AddBlogForm
              author={author}
              title={title}
              linkUrl={linkUrl}
              handleAddBlog={handleAddBlog}
              authorChange={({target}) => setAuthor(target.value)}
              titleChange={({target}) => setTitle(target.value)}
              urlChange={({target}) => setLinkUrl(target.value)}
            />
          </Togglable>
          <h2>Blogs</h2>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog 
                user={user}
                key={blog.id}
                blog={blog}
                updateLike={updateLike}
                deleteBlog={deleteBlog}
              />
            ))
           
          }
        </div>
      }
  
      
    </div>
  )
}

export default App