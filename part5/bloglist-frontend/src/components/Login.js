import React from 'react'


const LoginForm = ({ handleLogin, passwordChange, usernameChange,username, password }) => (
  <form onSubmit={handleLogin}>
    <div>
        username
      <input
        id='username'
        type="text"
        value={username}
        name="Username"
        onChange={usernameChange}
      />
    </div>
    <div>
        password
      <input
        id='password'
        type="password"
        value={password}
        name="Password"
        onChange={passwordChange}
      />
    </div>
    <button id='login-button' type="submit">login</button>
  </form>
)





export default LoginForm