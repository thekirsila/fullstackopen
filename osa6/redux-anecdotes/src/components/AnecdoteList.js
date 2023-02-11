import Anecdote from "./Anecdote"
import { useSelector, useDispatch } from "react-redux"
import anecdoteReducer, { giveVote, createAnecdote } from "../reducers/anecdoteReducer"
import notificationReducer, { notificationChange, setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state =>
      state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  )
  const dispatch = useDispatch()
  
  const compareFunction = (a, b) => {
    if (a.votes > b.votes) {
      return -1
    } else if (a.votes < b.votes ) {
      return 1
    } else {
      return 0
    }
  }

  return (
    <>
      {anecdotes.sort(compareFunction).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          addVote={() => dispatch(giveVote(anecdote))}
          setNotification={text => {
            dispatch(setNotification(text, 5))
          }}
        />
      )}
    </>
  )
}

export default AnecdoteList