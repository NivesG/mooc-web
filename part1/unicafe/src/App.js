import React, { useState } from 'react'

const Title = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return(
  <button onClick={handleClick}>
    {text}
  </button>
  )
}



const App = () => {
  const title1 = "give feedback";
  const title2 = "statistics";

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handGoodClick = () => {
    setGood(good +1)
    console.log('sadasdasd')
  }
  
  const handNeutralClick = () =>
  setNeutral(neutral + 1)

  const handBadClick = () =>
  setBad(bad + 1)

 

  return (
    <div>
      <Title text={title1}/>
      <Button handleClick={handGoodClick} text="good"/>
      <Button handleClick={handNeutralClick} text="neutral"/>
      <Button handleClick={handBadClick} text="bad" />
      <Title text={title2}/>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

export default App
