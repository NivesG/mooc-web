import { createSlice } from '@reduxjs/toolkit'
import anectodeService from '../services/anecdotes'


const initialState = []


const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState,
    reducers: {
        addVotee(state, action) {
            const anecdote2 = action.payload
            return state.map(anecdote => anecdote.id !== anecdote2.id ? anecdote : anecdote2)
        },

        newAnecdote(state, action) {
            console.log(action)
            state.push(action.payload)
        },

        appendAnecdote(state, action) {
            console.log(action)
            state.push(action.payload)
        },

        setAnecdotes(state, action) {
            return action.payload
        }
    }
})



export const { appendAnecdote, addVotee, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anectodeService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anectodeService.createNew(content)
        dispatch(appendAnecdote(newAnecdote))
    }
}

export const addVoted = votedAnecdote => {

    const anecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1
    }

    return async (dispatch) => {
        const updatedAnecdote = await anectodeService.vote(anecdote)
        dispatch(addVotee(updatedAnecdote))

    }

}


export default anecdoteSlice.reducer

