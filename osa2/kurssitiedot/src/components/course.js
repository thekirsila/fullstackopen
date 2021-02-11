import React from 'react'

const Course = (props) => {
    return (
      <div>
        <Header course={props.course} />
        <Content course={props.course} />
        <Total course={props.course} />
      </div>
    )
  }
  
  const Header = (props) => {
    return (
      <h1>{props.course.name}</h1>
    )
  }
  
  const Content = (props) => {
    return (
      <div>
        {props.course.parts.map(part => <Part key={part.id} facts={part} />)}
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <p>{props.facts.name} {props.facts.exercises}</p>
    )
  }
  
  const Total = (props) => {
    console.log(props.course.parts.map( part => part.exercises))
    return (
      <p>Number of exercises {props.course.parts.map( part => part.exercises).reduce( (accumulator, currentValue) => accumulator + currentValue)}</p>
    )
  }

export default Course