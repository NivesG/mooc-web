import React from 'react'
import PropTypes from 'prop-types'


const BlogDetails = ({ blog, user, handleHideClick, handleLikeClick, handleDeleteClick }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteButoon = () => {
    if (blog.user?.username === user.username) {
      return ( <button id='delete-button' onClick={handleDeleteClick}>DELETE</button>)
    }else{
      return(null)
    }
  }


  return (
    <div className='blogdetails' style={blogStyle}>
      <p>{blog.title} {blog.author}<button onClick={handleHideClick}>hide</button></p>
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button id='like-button' onClick={handleLikeClick}>like</button></p>
      <p>{blog.user.name}</p>
      {deleteButoon()}
    </div>
  )

}

BlogDetails.propTypes = {
// handleLikeClick: PropTypes.func.isRequired,
// handleHideClick: PropTypes.func,
// handleDeleteClick: PropTypes.func.isRequired,
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    //likes: PropTypes.number.isRequired
  }).isRequired,
  user: PropTypes.shape({
    token: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  }).isRequired
}

export default BlogDetails

