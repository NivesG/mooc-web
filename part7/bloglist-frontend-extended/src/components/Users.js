import React /*{ useState } */ from 'react'

import { useSelector } from 'react-redux'
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector((state) => state.users)
  return (
    <div>
      <span>blogs created</span>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <span>
              <Link to={`/users/${user.id}`}>
                {user.name} {user.blogs.length}
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Users
