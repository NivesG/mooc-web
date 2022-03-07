import { createSlice } from '@reduxjs/toolkit'


const filterSlice = createSlice( {
    name: 'filters',
    initialState : '',
    reducers: {
        filterWord: ( state, action ) => {
            const content = action.payload
            return content
        }
    }
})

export const { filterWord } = filterSlice.actions
export default filterSlice.reducer
