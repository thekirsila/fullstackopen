const Anecdote = (props) => {
  const anecdote = props.anecdote

    const handleVote = () => {
        props.addVote()

        props.setNotification(`You voted for '${anecdote.content}'`)
    }

  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}

export default Anecdote