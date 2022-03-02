
import { vote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'


const Anecdotelist =(props) => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const addVote =(id) =>{
        dispatch(vote(id))
        }


    return (
        <>
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
        </>
    )
}

export default Anecdotelist