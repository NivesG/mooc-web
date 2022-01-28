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
  const [errorMessage, setErrorMessage] =useState(null)

  useEffect(() => {
    phonebookService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);


   const refresh = ()  => {
    phonebookService
      .getAll()
      .then(persons => {
        console.log('lista päivitetty lisäyksen/poiston/päivityksen')
        setPersons(persons)
      })
  }


  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find((p) => p.name === newName);
  
    if (persons.some(person => person.name === newName)) {

      if(window.confirm(`${newName} is already added to phonebook do you want to change number?`)){
        const changePerson = { ...person, number: newNumber }

        phonebookService
          .update(person.id, changePerson)
          .catch(error => {
            setErrorMessage(`Information of ${person.name} was already deleted`) 
            setTimeout(() => { setErrorMessage(null) }, 5000)
            refresh()
            return
          })
  
          .then (returnedPerson => {
            
            setPersons(persons.map(persones => persones.id !== person.id ? persones : returnedPerson))
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
          refresh()
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
          `${delPerson.name} deleted from phonebook`
        )
        
        setTimeout(() => {
          setNoticeMessage(null)
        }, 5000)
        refresh()  
      })
    }   
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={search} change={handleSearch}/>
      <Notification messageNotice={noticeMessage} messageError={errorMessage}/> 
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