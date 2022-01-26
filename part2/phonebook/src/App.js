import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from './services/phones'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState ('')

  const [searchresults, setSearchResults] = useState(persons)

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialpersons => {
      setPersons(initialpersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
      setNewName('')
      setNewNumber('')
    }else{
      const newPerson = {name: newName, number: newNumber}

      phonebookService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
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


  const handleDelete = (itemId) => {

    // Whatever you want to do with that item
    /*axios.delete(`http://localhost:3001/persons/${itemId}`).then(response => {
      console.log("deleted")
    }); */
    const delPerson = persons.find((p) => p.id === itemId)
    if(window.confirm(`do you want to delete ${delPerson.name}?`)) {
      phonebookService
      .deleting(itemId)
      .then(response => {
        const newpersonList = persons.filter((person) => person.id !== itemId)
        setPersons(newpersonList)
        setSearch('');
      })
    }   
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
      <Persons results={searchresults} deleted={handleDelete}/>
    </div>
  )
}

export default App