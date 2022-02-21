import React, {useState} from 'react'
import BlogDetails from './BlogDetails'
const Blog = ({blog, user}) => {
const [visibility, setVisibility] = useState (false)



  const handleShow = () => {
    setVisibility(true)
  }

  const handleHide = () => {
    setVisibility(false)
  }

  if (!visibility) {
    return (
        <div>
          {blog.title} {blog.author} <button onClick={handleShow}>show</button>
         </div>  
      )
  }
  return (
    <BlogDetails blog={blog} handleHideClick= {handleHide}/>
  )

}
 


export default Blog