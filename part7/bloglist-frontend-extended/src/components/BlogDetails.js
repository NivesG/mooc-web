import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addVoteBlog } from '../reducers/blogReducer'

const BlogDetails = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const blogs = useSelector((state) => state.blogs)
  const id = useParams().id
  const blogD = blogs.filter((blog) => blog.id === id)
  const blog = blogD[0]
  const dispatch = useDispatch()
  console.log(blogD)
  /*
  const deleteButoon = () => {
    if (blog.user?.username === user.username) {
      return (
        <button id="delete-button" onClick={handleDeleteClick}>
          DELETE
        </button>
      )
    } else {
      return null
    }
  }
*/
  const handleLikeClick = async (event) => {
    dispatch(addVoteBlog(blog))
  }

  if (!blog) {
    return null
  }
  return (
    <div data-cy="blog" className="blogdetails" style={blogStyle}>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <h3>{blog.url}</h3>
      <span>likes</span>
      <span data-cy="likes"> {blog.likes}</span>
      <span>
        <button id="like-button" onClick={handleLikeClick}>
          like
        </button>
      </span>
      <p>
        <span>added by {blog.user?.name}</span>
      </p>
    </div>
  )
}

export default BlogDetails

/*<button onClick={handleHideClick}>hide</button>


      */

/*{deleteButoon()}*/
