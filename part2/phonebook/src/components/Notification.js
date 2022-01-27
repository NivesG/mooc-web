import React from 'react'




const Notification = ({message}) => {
    const notificationStyle = {
        backgroundColor: '#E0E0E0',
        borderStyle: 'solid',
        borderWidth: '3px',
        color: 'green',
        fontSize: 20,
        fontWeight: 'bold',
        margin: '20px',
        paddingTop: '4px',
        paddingBottom: '4px',
        textAlign: 'center'
    }


    if(message == null) {
        return null
    }
    return (
        <div style={notificationStyle}>
            {message}
        </div>

    )
}

export default Notification;