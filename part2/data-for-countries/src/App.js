import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

 
const api_key = process.env.REACT_APP_API_KEY

const App = () => {

  const [search, setSearch] = useState ('')
  const [searchresults, setSearchResults] = useState([])
  const [weather, setWeather] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        if (search !== "") {
        const data= response.data
        const searchResult = data.filter(country => country.name.toLowerCase().includes(search.toLocaleLowerCase()))
        setSearchResults(searchResult)
      }
      })
     
  }, [search])

  useEffect(() => {
    if(searchresults.length === 1) {
      const capitale = searchresults[0].capital
    axios
      .get("https://api.openweathermap.org/data/2.5/weather?q=" + capitale + "&appid=" + api_key +"&units=metric")
      .then(response => {
        setWeather(response.data)
      })
    }
  },[searchresults])


  
  const handleSearch =(event) => {
    const query = event.target.value
    setSearch(query)
  }

  const handleButtonClick=(country) => {
    setSearch(country);
  }

  return (
    <div>
      <Filter value={search} change={handleSearch}/>
      <Countries results={searchresults} handleClick={handleButtonClick} weatherResults={weather}/>
    </div>
  )
}

export default App