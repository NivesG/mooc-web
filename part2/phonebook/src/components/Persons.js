import React, { useState } from 'react'

const Persons = ({results, deleted}) => {
    return (
        results.map(perso =>
        <div key={perso.name}>     
        <p>{perso.name} {perso.number} 
        <button className="button" onClick={() => deleted(perso.id)}>
        Delete
      </button></p>
      </div>)

    )
}

export default Persons;