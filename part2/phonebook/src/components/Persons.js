import React, { useState } from 'react'

const Persons = ({results}) => {
    return (
        results.map(perso => <p key={perso.name}>{perso.name} {perso.number}</p>)

    )
}

export default Persons;