// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import BlogDetails from './BlogDetails'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const Blog = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <>
      <h2>Blogs</h2>
      <Table striped>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>{blog.author}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default Blog
