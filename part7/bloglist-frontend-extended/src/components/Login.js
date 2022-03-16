import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = (event) => {
    event.preventDefault()
    handleLogin(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <>
      <h2>Login page</h2>
      <Form onSubmit={login}>
        <Form.Group className="mb-3">
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            placeholder="enter username"
            onChange={({ target }) => setUsername(target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            placeholder="enter password"
            onChange={({ target }) => setPassword(target.value)}
          ></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  )
}

export default LoginForm
