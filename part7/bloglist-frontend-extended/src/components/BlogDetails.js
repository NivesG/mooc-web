import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addComments, addVoteBlog } from '../reducers/blogReducer'
import Comments from './Comments'
import CommentForm from './CommentForm'

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
  console.log(blog)
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

  const handleCommentClick = (commente) => {
    const comment = {
      content: commente,
    }
    dispatch(addComments(blog.id, comment))
  }
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
        <button id="like-button" onClick={handleCommentClick}>
          comment
        </button>
      </span>
      <p>
        <span>added by {blog.user?.name}</span>
      </p>
      <div>
        <h3>Comments</h3>
        <CommentForm />
        {blog.comments.length !== 0 ? (
          <ul>
            {blog.comments.map((comment) => (
              <Comments key={comment.id} comment={comment.content} />
            ))}
          </ul>
        ) : (
          <p>no comments yet</p>
        )}
      </div>
    </div>
  )
}

export default BlogDetails

/*<button onClick={handleHideClick}>hide</button>


      */

/*{deleteButoon()}*/
