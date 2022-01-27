import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import phonebookService from './services/phones'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState ('')
  const [searchresults, setSearchResults] = useState(persons)
  const [noticeMessage, setNoticeMessage] =useState(null)

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialpersons => {
      setPersons(initialpersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find((p) => p.name === newName);
  
    if (persons.some(person => person.name === newName)) {
      console.log("jevpisan");

      if(window.confirm(`${newName} is already added to phonebook do you want to change number?`)){
        const url = "http://localhost:3001/persons/" + person.id
        const perso = persons.find(p => p.name === newName)
        const changePerson = { ...perso, number: newNumber }
        console.log(changePerson);
        axios.put(url, changePerson).then(response => {
        setPersons(persons.map(perso => perso.name !== newName ? perso : response.data))
        setNoticeMessage(
          `Added new number for ${newName}`
        )
        setTimeout(() => {
          setNoticeMessage(null)
        }, 5000)

      })
        setNewName('')
        setNewNumber('')
      }
      
    }else{
      console.log("ni vpisan");
      const newPerson = {name: newName, number: newNumber}
      phonebookService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNoticeMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setNoticeMessage(null)
          }, 5000)
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
    const delPerson = persons.find((p) => p.id === itemId)
    if(window.confirm(`do you want to delete ${delPerson.name}?`)) {
      phonebookService
      .deleting(itemId)
      .then(response => {
        const newpersonList = persons.filter((person) => person.id !== itemId)
        setPersons(newpersonList)
        setSearch('');
        setNoticeMessage(
          `Deleted ${delPerson.name}`
        )
        setTimeout(() => {
          setNoticeMessage(null)
        }, 5000)
      })
    }   
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={search} change={handleSearch}/>
      <Notification message={noticeMessage}/>
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