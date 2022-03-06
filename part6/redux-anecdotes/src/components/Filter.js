import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {filterWord} from '../reducers/filterReducer'


const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        const fieldValue = event.target.value
        dispatch(filterWord(fieldValue))
        console.log('filterchange');
    }
    const style = {
        marginBottom: 10
      }

    return (
        <div style={style}>
        filter 
        <input 
            type="text"
            placeholder="search"
            onChange={handleChange}
        />

        </div>
        
    )

}

export default Filter