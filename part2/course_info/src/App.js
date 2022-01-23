import React from 'react'
import Course from './components/Course';
//const course = 'Half Stack application development'

const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>

    </div>
  )
}


const Content = (props) => {
  console.log(props)
  return (
    <div>
     <Part part={props.parts.parts[0].name} ex={props.parts.parts[0].exercises} />
     <Part part={props.parts.parts[1].name} ex={props.parts.parts[1].exercises} />
     <Part part={props.parts.parts[2].name} ex={props.parts.parts[2].exercises} />
    </div>
  )
}


const Total = (props) => {
  return (
    <div>
     <p>Number of exercises {props.parts.parts[0].exercises + props.parts.parts[1].exercises + props.parts.parts[2].exercises}</p>
    </div>
  )
}

const Part = (props) => {
  
  return (
    <div>
     <p>
        {props.part} {props.ex}
      </p>
    </div>
  )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App