// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import BlogDetails from './BlogDetails'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const blogStyle = {
  backgroundColor: '#ffffff',
  padding: '1em',
  borderRadius: '4px',
  color: '#333333',
  margin: '0.25em 0',
  borderColor: 'black',
}

const Blog = () => {
  //const blogs = useSelector((state) => state.blogs)

  const blogs = useSelector((state) => state.blogs)
  /*
  const handleLike = async (event) => {
    //const blogId = blog.id
    //updateLike(blogId, blog)
    updateLike(blog)
  }

  const handleDelete = async () => {
    const blogId = blog.id
    deleteBlog(blogId)
  }
*/
  return (
    <div style={blogStyle}>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <div style={blogStyle} key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Blog
