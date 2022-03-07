import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice( {
    name: 'notifications',
    initialState : '',
    reducers: {
        addNotification: ( state, action ) => {
            const content = action.payload
            return content
        },
        removeNotification: () => {
            return initialState
        }
    }
})

export const { addNotification, removeNotification } = notificationSlice.actions

export const setNotification = (content, time) => {
    return async dispatch => {
        dispatch(addNotification(content))
        setTimeout(() => {
            dispatch(removeNotification())
        }, time)

    }

}

export default notificationSlice.reducer
