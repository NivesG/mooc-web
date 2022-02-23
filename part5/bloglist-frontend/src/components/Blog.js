import React, {useState} from 'react'
import BlogDetails from './BlogDetails'

const Blog = ({blog, user, updateLike, deleteBlog}) => {
  const [visibility, setVisibility] = useState (false)

  const hideWhenVisible = { display: visibility ? 'none' : '' }
  const showWhenVisible = { display: visibility ? '' : 'none' }

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  const handleLike = async (event) => {
    const blogId = blog.id
    updateLike(blogId, blog)
  }

  const handleDelete = async() => {
    const blogId = blog.id
    deleteBlog(blogId)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}<button onClick={toggleVisibility}>show</button>
      </div>
      <div style={showWhenVisible}>
        <BlogDetails blog={blog} user={user} handleHideClick={toggleVisibility} handleLikeClick={handleLike} handleDeleteClick={handleDelete} />
      </div>
    </div>
  )
}
 


export default Blog



