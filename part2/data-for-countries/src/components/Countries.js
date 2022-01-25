import React, { useState } from 'react'
import CountryDetail from './CountryDetail'

const Countries = ({results}) => {
    if(results.length > 10) {
        return (
            <div>Too many matches, specify another filter.</div>
        )
    }else if(results.length === 1){
        return (
            results.map(county => (
                <CountryDetail key={county.name} results ={county}/>
            ))
                   
            )
    }else {
        return (
            results.map(country => <p key={country.name}>{country.name}</p>)
        )
    }
}

export default Countries;