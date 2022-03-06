import { createSlice } from '@reduxjs/toolkit'


const initialState = "This is notification";

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            console.log(action);
            const newNotification = action.data
            return  [...state, newNotification]
        default:
            return state
    }

}

export const addNotification = (content) => {
    return {
      type: 'SET_NOTIFICATION',
      data: {content}
    }
  }




export default notificationReducer