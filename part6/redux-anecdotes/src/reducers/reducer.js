import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice( {
    name: 'notifications',
    initialState : '',
    reducers: {
        addNotification: ( state, action ) => {
            const content = action.payload
            console.log('kakakak');
            return content
        },
        removeNotification: (state) => {
            return initialState
        }
    }
})

export const {addNotification, removeNotification} = notificationSlice.actions
export default notificationSlice.reducer
