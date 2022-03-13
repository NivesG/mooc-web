import React, { useState } from 'react'
import BlogDetails from './BlogDetails'
//import { useSelector } from 'react-redux'

const blogStyle = {
  backgroundColor: '#ffffff',
  padding: '1em',
  borderRadius: '4px',
  color: '#333333',
  margin: '0.25em 0',
}

const Blog = ({ blog, user, updateLike, deleteBlog }) => {
  //const blogs = useSelector((state) => state.blogs)
  const [visibility, setVisibility] = useState(false)

  const hideWhenVisible = { display: visibility ? 'none' : '' }
  const showWhenVisible = { display: visibility ? '' : 'none' }

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  const handleLike = async (event) => {
    //const blogId = blog.id
    //updateLike(blogId, blog)
    updateLike(blog)
  }

  const handleDelete = async () => {
    const blogId = blog.id
    deleteBlog(blogId)
  }

  return (
    <div className="blog" style={blogStyle}>
      <div data-testid="blogId" style={hideWhenVisible} className="short-blog">
        <p>sdasdas</p>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>show</button>
      </div>
      <div style={showWhenVisible} className="long-blog">
        <BlogDetails
          blog={blog}
          user={user}
          handleHideClick={toggleVisibility}
          handleLikeClick={handleLike}
          handleDeleteClick={handleDelete}
        />
      </div>
    </div>
  )
}

export default Blog
