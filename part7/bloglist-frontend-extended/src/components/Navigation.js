import React from 'react'
import { Button, Navbar, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { Link, useNavigate } from 'react-router-dom'

const Navigation = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userD = useSelector((state) => state.user)
  const padding = {
    padding: 5,
    color: 'inherit',
    textDecoration: 'inherit',
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logout())
    navigate('/')
  }

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="primary"
      variant="dark"
      sticky="top"
    >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Navbar.Brand href="">BlogApp</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="" as="span">
            <Link style={padding} to="/">
              blogs
            </Link>
          </Nav.Link>
          <Nav.Link href="" as="span">
            <Link style={padding} to="/users">
              users
            </Link>
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="#" as="span">
            {userD.username} is logged in
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Button variant="secondary" onClick={handleLogout}>
              logout
            </Button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
