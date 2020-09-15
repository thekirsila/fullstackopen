import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const g = props.good
  const n = props.neutral
  const b = props.bad

  const all = g + n + b
  const avg = (g-b)/(g+n+b)
  const pos = g/(g+n+b)

  if (all == 0) {
    return (
      <p>No feedback given</p>
    )
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text="Good:" value={g} />
          <StatisticLine text="Neutral:" value={n} />
          <StatisticLine text="Bad:" value={b} />
          <StatisticLine text="All:" value={all} />
          <StatisticLine text="Avg:" value={avg} />
          <StatisticLine text="Pos:" value={pos} />
        </tbody>
      </table>
    )
  }
}

const Button = (props) => {
  return (
  <button onClick={props.clickHandler}>{props.text}</button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increment = (state, setstate) => {
    console.log("incrementing...")
    setstate(state + 1)
  }

  return (
    <div>
      <h1>Give Feedback: Where you Happy or Not?</h1>
      <Button clickHandler={() => {setGood(good + 1)}} text="Good" />
      <Button clickHandler={() => {setNeutral(neutral + 1)}} text="Neutral" />
      <Button clickHandler={() => {setBad(bad + 1)}} text="Bad" />
      <h2>Given feedback</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)