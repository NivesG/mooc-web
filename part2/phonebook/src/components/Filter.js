import React from 'react'

const Filter = (props) => {
    return (
        <input 
        type="text"
        placeholder="search by name"
        value={props.value}
        onChange={props.change}
        />
        
    )
}

export default Filter;