import React, {useState} from 'react'
import BlogDetails from './BlogDetails'
const Blog = ({blog, user}) => {
  const [visibility, setVisibility] = useState (false)



  const hideWhenVisible = { display: visibility ? 'none' : '' }
  const showWhenVisible = { display: visibility ? '' : 'none' }
  //const buttonLabel =  visibility ? 'show' : 'hide' 

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        {blog.title}<button onClick={toggleVisibility}>show</button>
      </div>
      <div style={showWhenVisible}>
        <BlogDetails blog={blog} handleHideClick={toggleVisibility} />

      </div>
    </div>







  )


}
 


export default Blog