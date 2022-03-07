
import { addVotee } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

import { addNotification, removeNotification } from '../reducers/reducer'


const Anecdotelist =() => {
    const filter = useSelector(state => state.filters)
    const anecdotes = useSelector(state => state.anecdotes)
    let currentAnecdotes = anecdotes
    if (filter !== '') {
        currentAnecdotes = anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    }
    
    const dispatch = useDispatch()

   

    const addVote =(id, content) =>{
        dispatch(addVotee(id))
        dispatch(addNotification('you voted ' + content))
        setTimeout(() => {
            dispatch(removeNotification())
          }, 5000)
        }


    return (
        <>
            <h2>Anecdotes</h2>
            {currentAnecdotes
            //.sort((a, b) => b.votes - a.votes)
            .map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => addVote(anecdote.id, anecdote.content)}>vote</button>
                </div>
                </div>
            )}
        </>
    )
}

export default Anecdotelist

//https://stackoverflow.com/questions/53420055/error-while-sorting-array-of-objects-cannot-assign-to-read-only-property-2-of