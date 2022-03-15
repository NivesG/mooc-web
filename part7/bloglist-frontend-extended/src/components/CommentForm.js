import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addComments } from '../reducers/blogReducer'

const CommentForm = () => {
  //const [user, setUser] = useState(null)
  const [content, setContent] = useState('')
  const blogs = useSelector((state) => state.blogs)
  const id = useParams().id
  const blogD = blogs.filter((blog) => blog.id === id)
  const blog = blogD[0]
  const dispatch = useDispatch()

  const handleCommentClick = (event) => {
    event.preventDefault()
    const comment = {
      content: content,
    }
    dispatch(addComments(blog.id, comment))
    setContent('')
  }

  return (
    <div>
      <form aria-label="form" onSubmit={handleCommentClick}>
        <div>
          <input
            type="text"
            value={content}
            id="content"
            name="content"
            onChange={({ target }) => setContent(target.value)}
            autoFocus
          />
          <button id="create-button" type="submit">
            add comment
          </button>
        </div>
      </form>
    </div>
  )
}

export default CommentForm
