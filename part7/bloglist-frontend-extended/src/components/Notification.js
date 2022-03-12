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

  if (notification.notice == null && notification.error == null) {
    return null
  }
  if (notification.notice !== null) {
    return (
      <div className="notification" style={notificationStyleNotice}>
        {notification.notice}
      </div>
    )
  } else {
    return (
      <div className="error" style={notificationStyleError}>
        {notification.error}
      </div>
    )
  }
}

export default Notification
