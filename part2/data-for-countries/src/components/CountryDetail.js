import React, { useState } from 'react'

const CountryDetail = ({results}) => {
    return (
        <div>
            <div>
                <h1>{results.name}</h1>
                <p>capital {results.capital}</p>
                <p>population: {results.population}</p>
            </div>
            <div>
                <h2>languages</h2>
                {results.languages.map(lan => (
                    <li key={lan.name}> {lan.name}</li>          
                ))}
            </div>
            <div>
                <img src={results.flag}
                width="100px"
                height="100px"
                />
            </div>
        </div>
    )
}

export default CountryDetail;