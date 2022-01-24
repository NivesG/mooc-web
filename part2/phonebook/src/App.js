import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '05535433'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState ('')

  const [searchresults, setSearchResults] = useState(persons)

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
      setNewName('')
      setNewNumber('')
    }else{
      const newPerson = {name: newName, number: newNumber}
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch =(event) => {
    setSearch(event.target.value)
    const filtered = persons.filter((person) => person.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
    setSearchResults(filtered)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <input 
        type="text"
        placeholder="search by name"
        value={search}
        onChange={handleSearch}
        />

      <div>
        <h2>add new</h2>
        <form onSubmit={addPerson}
           >
        <div>
          name: <input
          value={newName}
          onChange={handleNameChange} />
        </div>
        <div>number: <input 
          value={newNumber}
          onChange={handleNumberChange}
        /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      </div>
      
      <h2>Numbers</h2>
        {searchresults.map(perso => <p key={perso.name}>{perso.name} {perso.number}</p>)}
      
    </div>
  )
}

export default App