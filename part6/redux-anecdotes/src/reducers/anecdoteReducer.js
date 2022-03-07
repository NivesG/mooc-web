import { createSlice } from "@reduxjs/toolkit"


const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}


//const initialState = anecdotesAtStart.map(asObject)
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
      const newAnecdote = asObject(action.payload)
      state.push(newAnecdote)
    },

    appendAnecdote(state, action) {
      console.log(action);
      state.push(action.payload)
    }
  }
})


export default anecdoteSlice.reducer
export const {appendAnecdote, newAnecdote, addVotee} = anecdoteSlice.actions