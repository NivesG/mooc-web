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
  
  const Total = ({parts}) => {
      const sum = parts.reduce((partial_sum, cur_value) => partial_sum + cur_value.exercises, 0)
    return (
      <div>
       <p>Total of {sum} exercises</p>
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
            <Total parts={course.parts} />
        </div>
        

    )

}




export default Course;