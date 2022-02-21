import React from 'react'


const BlogDetails = ({blog, handleHideClick, handleLikeClick}) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }

   return (
    <div style={blogStyle}>
    <p>{blog.title}<button onClick={handleHideClick}>hide</button></p>
    <p>{blog.author}</p>
    <p>{blog.likes} <button onClick={handleLikeClick}>like</button></p>
    <p>{blog.url}</p>
  </div>  
)

}   
 

export default BlogDetails