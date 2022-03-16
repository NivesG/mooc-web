import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector((state) => state.notifications)

  if (!notification.error && !notification.notice) {
    return null
  } else if (notification.error) {
    return (
      <div className="container">
        {notification.error && (
          <Alert variant="warning">{notification.error}</Alert>
        )}
      </div>
    )
  } else {
    return (
      <div className="container">
        {notification.notice && (
          <Alert variant="success">{notification.notice}</Alert>
        )}
      </div>
    )
  }
}

export default Notification
