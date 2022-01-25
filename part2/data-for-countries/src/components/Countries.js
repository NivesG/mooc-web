import React, { useState } from 'react'
import CountryDetail from './CountryDetail'

const Countries = ({results, handleClick}) => {
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
            <div>
                {results.map(country => 
                <p key={country.name}>{country.name} 
                <button onClick={()=> handleClick(country.name)}>show</button></p>)}
            </div>
        )
    }
}

export default Countries;