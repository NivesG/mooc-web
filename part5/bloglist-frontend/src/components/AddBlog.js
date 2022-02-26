import React from 'react'

const AddBlogForm = ({ handleAddBlog, titleChange, authorChange, urlChange, title, author, linkUrl }) => (
  <div>
    <h2>create new: </h2>
    <form aria-label="form" onSubmit={handleAddBlog}>
      <div>
         Title:
        <input
          type="text"
          value={title}
          id="title"
          name="title"
          onChange={titleChange}
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
          onChange={authorChange}
        />
      </div>
      <div>
         URL:
        <input
          type="text"
          value={linkUrl}
          id="linkUrl"
          name="linkUrl"
          onChange={urlChange}
        />
      </div>
      <div>
        <button id='create-button' type="submit">create</button>
      </div>

    </form>
  </div>
)

export default AddBlogForm