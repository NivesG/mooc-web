import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { addNotification, removeNotification } from '../reducers/reducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm =(props) => {
    const dispatch = useDispatch()

    const addNewAnecdote = async(event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const Nanecdote = await anecdoteService.createNew(content)
        dispatch(newAnecdote(Nanecdote))
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