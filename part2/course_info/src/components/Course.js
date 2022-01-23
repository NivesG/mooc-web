import React from 'react';

const Header = (props) => {
    return (
      <div>
        <h1>{props.name}</h1>
      </div>
    )
  }
  
  
  const Content = ({parts}) => {
    return (
        <>
        {parts.map((part) => 
            <Part key={part.id} part={part.name} ex={part.exercises} />
          )}
       </>
    
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



const Course = ({course}) => {
   
    return(
        <div>
            <Header name={course.name}/>
            <Content parts={course.parts}/>
        </div>
        

    )

}




export default Course;