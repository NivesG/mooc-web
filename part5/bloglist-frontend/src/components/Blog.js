import React, {useState} from 'react'
import BlogDetails from './BlogDetails'
import blogService from '../services/blogs'
const Blog = ({blog, user, updateLike}) => {
  const [visibility, setVisibility] = useState (false)



  const hideWhenVisible = { display: visibility ? 'none' : '' }
  const showWhenVisible = { display: visibility ? '' : 'none' }
  //const buttonLabel =  visibility ? 'show' : 'hide' 

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  const handleLike = async (event) => {
    const blogId = blog.id
    console.log(blogId);
    const updatedBlog = {title: blog.title, author: blog.author, url: blog.linkUrl,  likes: blog.likes + 1, userId: user.id}
    updateLike(blogId, updatedBlog)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        {blog.title}<button onClick={toggleVisibility}>show</button>
      </div>
      <div style={showWhenVisible}>
        <BlogDetails blog={blog} handleHideClick={toggleVisibility} handleLikeClick={handleLike}/>

      </div>
    </div>







  )


}
 


export default Blog