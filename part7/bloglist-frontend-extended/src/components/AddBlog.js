import React, { useState } from 'react'

const AddBlogForm = ({ handleAddBlog }) => {
  //const [user, setUser] = useState(null)
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
      //userId: user.id,
    }
    handleAddBlog(newBlog)
  }

  return (
    <div>
      <h2>create new: </h2>
      <form aria-label="form" onSubmit={addBlog}>
        <div>
          Title:
          <input
            type="text"
            value={title}
            id="title"
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            autoFocus
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={author}
            id="author"
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL:
          <input
            type="text"
            value={linkUrl}
            id="linkUrl"
            name="linkUrl"
            onChange={({ target }) => setLinkUrl(target.value)}
          />
        </div>
        <div>
          <button id="create-button" type="submit">
            create
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddBlogForm
