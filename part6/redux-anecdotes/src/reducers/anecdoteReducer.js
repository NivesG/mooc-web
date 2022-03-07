import { createSlice } from "@reduxjs/toolkit"
import anectodeService from '../services/anecdotes'


const initialState = []


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addVotee(state, action) {
      const id = action.payload
      const anecdoteVote = state.find(a => a.id === id)
      console.log(action);
      const changedAncdote = {
        ...anecdoteVote,
        votes: anecdoteVote.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAncdote)
    },

    newAnecdote(state, action) {
      console.log(action);
      state.push(action.payload)
    },

    appendAnecdote(state, action) {
      console.log(action);
      state.push(action.payload)
    },

    setAnecdotes(state, action) {
      return action.payload
    }
  }
})





export const {appendAnecdote, newAnecdote, addVotee, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anectodeService.getAll()
    dispatch(setAnecdotes(anecdotes))

  }
}

export default anecdoteSlice.reducer