import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0,0,0,0,0,0])
  const [winning, setWinning] = useState(0)

  const handleClick = () => {
    const rnd = Math.floor(Math.random() * 6)
    setSelected(rnd)
  }

  const addVote = () => {
    const copy = {...votes}
    copy[selected] = copy[selected] + 1
    setVotes(copy)
    setWinning(Object.keys(copy).reduce((a, b) => copy[a] > copy[b] ? a : b))
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {props.anecdotes[selected]}<br />
      <p>Votes: {votes[selected]}</p>
      <button onClick={addVote}>Vote</button>
      <button onClick={handleClick}>Random</button>
      <h2>Anecdote with most votes</h2>
      {props.anecdotes[winning]}<br />
      <p>Votes: {votes[winning]}</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)