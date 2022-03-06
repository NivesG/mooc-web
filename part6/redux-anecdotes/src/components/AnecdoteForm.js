import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { addNotification, removeNotification } from '../reducers/reducer'

const AnecdoteForm =(props) => {
    const dispatch = useDispatch()

    const addNewAnecdote =(event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addAnecdote(content))
        dispatch(addNotification('new anecdote added'))
        setTimeout(() => {
            dispatch(removeNotification())
          }, 5000)
      }


    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addNewAnecdote}>
            <div><input name='anecdote'/></div>
            <button type='submit'>create</button>
            </form>
        </>
    )

}

export default AnecdoteForm