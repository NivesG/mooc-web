import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notificationStyleNotice = {
    backgroundColor: '#E0E0E0',
    borderStyle: 'solid',
    borderWidth: '3px',
    color: 'green',
    fontSize: 20,
    fontWeight: 'bold',
    margin: '20px',
    paddingTop: '4px',
    paddingBottom: '4px',
    textAlign: 'center',
  }

  const notificationStyleError = {
    backgroundColor: '#E0E0E0',
    borderStyle: 'solid',
    borderWidth: '3px',
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    margin: '20px',
    paddingTop: '4px',
    paddingBottom: '4px',
    textAlign: 'center',
  }

  const notification = useSelector((state) => state.notifications)

  if (!notification.error && !notification.notice) {
    return null
  } else if (notification.error) {
    return (
      <div className="notification" style={notificationStyleError}>
        {notification.error}
      </div>
    )
  } else {
    return (
      <div className="error" style={notificationStyleNotice}>
        {notification.notice}
      </div>
    )
  }
}

export default Notification
