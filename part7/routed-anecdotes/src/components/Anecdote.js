import React from 'react'
import { useParams } from "react-router-dom"

const Anecdote = ({ anecdotes }) => {
    const id = useParams().id
    const anecdo = anecdotes.find(n => n.id === Number(id))
    
    return (
      <div>
        <h2>{anecdo.content}</h2>
        <p>has {anecdo.votes} votes</p>
        <span>for more info see </span>
        <a href={anecdo.info}>{anecdo.info}</a>
        <p></p>
      </div>
    )
  }

  export default Anecdote