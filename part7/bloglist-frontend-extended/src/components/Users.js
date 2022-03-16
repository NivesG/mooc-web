import React /*{ useState } */ from 'react'

import { useSelector } from 'react-redux'
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

const Users = () => {
  const users = useSelector((state) => state.users)
  return (
    <>
      <Row>
        <Col>
          <h2 style={{ paddingBottom: '1em' }}>Blogs created</h2>
        </Col>
      </Row>
      <Row>
        <Col md={2} xs="auto">
          <h3>User:</h3>
        </Col>
        <Col md={3}>
          <h3>no. of blogs:</h3>
        </Col>
      </Row>

      {users.map((user) => (
        <div key={user.id}>
          <Row>
            <Col md={2}>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </Col>
            <Col>{user.blogs.length}</Col>
          </Row>
        </div>
      ))}
    </>
  )
}

export default Users
