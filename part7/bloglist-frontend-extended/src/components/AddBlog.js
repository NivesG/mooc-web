import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const AddBlogForm = ({ handleAddBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [linkUrl, setLinkUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: linkUrl,
      likes: 0,
    }
    handleAddBlog(newBlog)
    setTitle('')
    setAuthor('')
    setLinkUrl('')
  }

  return (
    <>
      <h2>Create new blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Group className="mb-2">
          <Form.Label>title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>author:</Form.Label>
          <Form.Control
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>url:</Form.Label>
          <Form.Control
            type="text"
            name="linkUrl"
            value={linkUrl}
            onChange={({ target }) => setLinkUrl(target.value)}
          ></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </>
  )
}

export default AddBlogForm
