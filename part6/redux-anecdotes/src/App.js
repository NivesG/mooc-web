import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdoteService from './services/anecdotes'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes, setAnecdotes } from './reducers/anecdoteReducer'






const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
    console.log('JSDLKAJSLKDJALKDSJL');
  }, [dispatch])
  
  return (
    <div>
      <Notification />
      <Filter />
      <AnecdoteList /> 
      <AnecdoteForm />    
    </div>
  )
}

export default App