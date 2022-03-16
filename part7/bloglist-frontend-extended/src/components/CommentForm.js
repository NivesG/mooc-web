import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addComments } from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'

const CommentForm = () => {
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
    <Form onSubmit={handleCommentClick}>
      <Form.Group className="mb-3">
        <Form.Label></Form.Label>
        <Form.Control
          type="text"
          name="content"
          value={content}
          placeholder="enter comment"
          onChange={({ target }) => setContent(target.value)}
        ></Form.Control>
      </Form.Group>
      <Button variant="primary" size="sm" type="submit">
        add comment
      </Button>
    </Form>
  )
}

export default CommentForm
