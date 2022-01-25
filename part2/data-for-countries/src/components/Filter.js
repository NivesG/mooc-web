import React from 'react'

const Filter = (props) => {
    return (
        <p>find coutries: <input 
        type="text"
        placeholder="search by name"
        value={props.value}
        onChange={props.change}
        /></p>
        
        
    )
}

export default Filter;