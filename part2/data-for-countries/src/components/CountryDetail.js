import React from 'react'

const CountryDetail = ({results, weather}) => {
    console.log(weather);
    const icon = weather.weather[0].icon
    const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
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
                alt="flag picture"
                width="100px"
                height="100px"
                />
            </div>
            <div>
                <h2>Weather in {weather.name}</h2>
                <p><b>temperature: </b> {weather.main.temp} Celsius</p>
                <p><img src={imgURL} alt="weather picture"/></p>
                <p><b>wind: </b> {weather.wind.speed} mph direction {weather.wind.deg}</p>
            </div>
        </div>
    )
}

export default CountryDetail;