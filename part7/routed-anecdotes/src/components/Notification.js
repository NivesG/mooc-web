import React from 'react'

const Notification = ({data}) => {
    const style = {
      border: 'solid',
      padding: 7,
      borderWidth: 1
  }
  
    if(data) {
      return ( <div style={style}>{data}</div>)
    }
    return null
  }

export default Notification