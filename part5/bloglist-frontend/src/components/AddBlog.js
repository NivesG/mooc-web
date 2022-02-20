import React from 'react'

  const AddBlogForm = ({handleAddBlog, titleChange, authorChange, urlChange, title, author, linkUrl}) => (
    <div>
      <h2>create new: </h2>
      <form onSubmit={handleAddBlog}>
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
          <input type="submit" value="create" id="AddBlog" />
        </div>

      </form>
    </div>
    
  )

  export default AddBlogForm;