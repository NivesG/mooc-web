import { useSelector, useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import {vote, addAnecdote} from './reducers/anecdoteReducer'




const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

const addVote =(id) =>{
  dispatch(vote(id))
  }

const addNewAnecdote =(event) => {
  event.preventDefault()
  const content = event.target.anecdote.value
  event.target.anecdote.value = ''
  dispatch(addAnecdote(content))
}



  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
      .sort((a, b) => b.votes - a.votes)
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => addVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <AnecdoteForm />
     
    </div>
  )
}

export default App