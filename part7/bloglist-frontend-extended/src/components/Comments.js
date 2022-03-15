import React from 'react'
// eslint-disable-next-line no-unused-vars
import BlogDetails from './BlogDetails'

const Comments = ({ comment }) => {
  if (comment) {
    return <li>{comment}</li>
  }
  return null
}

export default Comments
