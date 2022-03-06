import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice( {
    name: 'notifications',
    initialState : "This is notification",
    reducers: {
        addNotification: (state, action) => {
            const content= action.payload
            return state= content
        }
    }
})

export const {addNotification} = notificationSlice.actions
export default notificationSlice.reducer
