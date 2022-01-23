import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)


  const points=new Array(anecdotes.length).fill(0);
  const [votes, setVotes]= useState(points)
  const [maxVote, setMaxvotes] = useState()

  const handleClickNext = () => {
    const ranNumber = Math.floor(Math.random() * anecdotes.length)
    setSelected(ranNumber)
  }

  const handleVote = () => {
    const copy = [...votes];
    copy[selected] += 1
    setVotes(copy)
    const max = votes.indexOf(Math.max(...votes))
    setMaxvotes(max)
  }

  return (
    <div>
      <h1>Anectode of the day</h1>
      <p></p>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <div>
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleClickNext}> Click</button>
      </div>
      <p></p>
      <h1>Anectode with most votes</h1>
      <p>{anecdotes[maxVote]}</p>
      
    </div>
  )
}

export default App