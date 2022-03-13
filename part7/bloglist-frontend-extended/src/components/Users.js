import React /*{ useState } */ from 'react'
import { useSelector } from 'react-redux'

const Users = () => {
  const users = useSelector((state) => state.users)
  return (
    <div>
      <span>blogs created</span>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <p>
              {user.name} {user.blogs.length}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Users
