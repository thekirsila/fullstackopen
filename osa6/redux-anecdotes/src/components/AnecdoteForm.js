import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, setNotification } from "../reducers/notificationReducer"
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(createAnecdote(content))

      anecdoteService.createNew(content).then(() => {
          dispatch(setNotification(`You added '${content}'`, 5))
      }).catch(error => {
          dispatch(setNotification(`Creation of '${content}' failed`, 5))
      })
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm