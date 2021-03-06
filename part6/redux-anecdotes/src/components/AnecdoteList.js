import { useSelector, useDispatch } from 'react-redux'

import { setNotification } from '../reducers/reducer'
import { addVoted } from '../reducers/anecdoteReducer'


const Anecdotelist =() => {
    const filter = useSelector(state => state.filters)
    const anecdotes = useSelector(state => state.anecdotes)
    let currentAnecdotes = anecdotes
    if (filter !== '') {
        currentAnecdotes = anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    }
    const dispatch = useDispatch()


    const addVote =(anecdote) => {
        dispatch(addVoted(anecdote))
        dispatch(setNotification(`added vote for '${anecdote.content}'`, 5000))
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
                            <button onClick={() => addVote(anecdote)}>vote</button>
                        </div>
                    </div>
                )}
        </>
    )
}

export default Anecdotelist

//https://stackoverflow.com/questions/53420055/error-while-sorting-array-of-objects-cannot-assign-to-read-only-property-2-of