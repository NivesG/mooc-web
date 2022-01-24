import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

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
      <Filter value={search} change={handleSearch}/>

      <div>
        <h2>add new</h2>
        <PersonForm 
          onSubmit={addPerson}
          nameValue={newName}
          onNameChange={handleNameChange}
          numberValue={newNumber}
          onNumberChange={handleNumberChange}
        />
      </div>
      <h2>Numbers</h2>
      <Persons results={searchresults}/>
    </div>
  )
}

export default App