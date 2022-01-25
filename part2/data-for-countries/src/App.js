import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'


const App = () => {

  const [search, setSearch] = useState ('')
  const [searchresults, setSearchResults] = useState([])

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

  
  const handleSearch =(event) => {
    const query = event.target.value
    setSearch(query)
    console.log(search);
  }

  return (
    <div>
      <Filter value={search} change={handleSearch}/>

      <h2>Countries</h2>
      <Countries results={searchresults}/>
    </div>
  )
}

export default App