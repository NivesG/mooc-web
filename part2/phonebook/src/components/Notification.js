import React from 'react'




const Notification = ({messageNotice, messageError}) => {
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
        textAlign: 'center'
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
        textAlign: 'center'

    }


    if(messageNotice == null && messageError == null) {
        return null
    }
    if (messageNotice !== null) {
    return (
        <div style={notificationStyleNotice}>
            {messageNotice}
        </div>
        )
    }else {
        return(
        <div style={notificationStyleError}>
            {messageError}
        </div>
        )
    }
}

export default Notification;