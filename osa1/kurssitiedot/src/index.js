import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part facts={props.course.parts[0]} />
      <Part facts={props.course.parts[1]} />
      <Part facts={props.course.parts[2]} />
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <p>{props.facts.name} {props.facts.exercises}</p>
  )
}

const Total = (props) => {
  return (
  <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  // const part1 = 'Fundamentals of React'
  // const exercises1 = 10
  // const part2 = 'Using props to pass data'
  // const exercises2 = 7
  // const part3 = 'State of a component'
  // const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )

  // return (
  //   <div>
  //     <h1>{course}</h1>
  //     <p>
  //       {part1} {exercises1}
  //     </p>
  //     <p>
  //       {part2} {exercises2}
  //     </p>
  //     <p>
  //       {part3} {exercises3}
  //     </p>
  //     <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
  //   </div>
  // )
}

ReactDOM.render(<App />, document.getElementById('root'))