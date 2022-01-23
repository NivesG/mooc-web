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



  const Course = ({ course }) => {
    return (
        course.map(cours => (
            <div>
                <Header name={cours.name} />
                <Content parts={cours.parts} />
                <Total  parts={cours.parts} />
            </div>
        )
        )
    )
}



export default Course;