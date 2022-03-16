import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addVoteBlog, delBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Comments from './Comments'
import CommentForm from './CommentForm'
import { Button } from 'react-bootstrap'
import { Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const BlogDetails = () => {
  const blogs = useSelector((state) => state.blogs)
  const userD = useSelector((state) => state.user)
  const id = useParams().id
  const blogD = blogs.filter((blog) => blog.id === id)
  const blog = blogD[0]
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const deleteButoon = () => {
    if (blog.user?.username === userD.username) {
      return (
        <Button variant="danger" size="sm" onClick={handleDelete}>
          delete
        </Button>
      )
    } else {
      return null
    }
  }

  const handleDelete = async () => {
    if (
      window.confirm(
        `are you shure you want to delete blog ${blog.title} by ${blog.author}?`,
      )
    ) {
      try {
        dispatch(delBlog(id))
        dispatch(
          setNotification(
            {
              notice: `Blog ${blog.title} by ${blog.author} was deleted`,
            },
            4000,
          ),
        )
        navigate('/')
      } catch (exception) {
        dispatch(
          setNotification(
            {
              error: 'you are not authorised to delete blog',
            },
            4000,
          ),
        )
      }
    }
  }

  const handleLikeClick = async (event) => {
    dispatch(addVoteBlog(blog))
  }

  if (!blog) {
    return null
  }
  return (
    <div data-cy="blog" className="blogdetails">
      <Row style={{ paddingTop: '1em' }}>
        <Col>
          <h2>
            {blog.title} {blog.author}
          </h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>
            <a href={blog.url}>{blog.url} </a>
          </h4>
        </Col>
      </Row>

      <Row>
        <Col md="auto" xs="auto">
          <h5>likes:</h5>
        </Col>
        <Col md="auto" xs="auto">
          <h5> {blog.likes}</h5>
        </Col>
        <Col>
          <span>
            <Button variant="secondary" size="sm" onClick={handleLikeClick}>
              like
            </Button>
          </span>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            <span>added by {blog.user?.name}</span>
          </p>
        </Col>
      </Row>
      <Row style={{ paddingBottom: '3em' }}>
        <Col>{deleteButoon()}</Col>
      </Row>

      <Row>
        <Col>
          <h3>Comments:</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <CommentForm />
        </Col>
      </Row>
      <Row style={{ paddingTop: '1em' }}>
        <Col>
          {blog.comments.length !== 0 ? (
            <ul>
              {blog.comments.map((comment) => (
                <div key={comment.id}>
                  <Comments comment={comment.content} />
                </div>
              ))}
            </ul>
          ) : (
            <p>no comments yet</p>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default BlogDetails
