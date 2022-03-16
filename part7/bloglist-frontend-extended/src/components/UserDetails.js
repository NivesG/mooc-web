//import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserDetails = () => {
  const blogs = useSelector((state) => state.blogs)
  const users = useSelector((state) => state.users)

  const id = useParams().id
  const userBlogs = blogs.filter((blog) => blog.user.id === id)
  const user = users.filter((user) => user.id === id)

  if (!userBlogs) {
    return <p>user has no blogs</p>
  }

  return (
    <>
      <h2>{user[0].username}</h2>
      <h3>added blogs</h3>
      {userBlogs.map((blog) => (
        <div key={blog.id}>
          <li>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        </div>
      ))}
    </>
  )
}

export default UserDetails
