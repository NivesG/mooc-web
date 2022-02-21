import React from 'react'


const BlogDetails = ({blog, handleHideClick}) => {
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
    <p>{blog.likes}</p>
    <p>{blog.url}</p>
  </div>  
)

}   
 

export default BlogDetails