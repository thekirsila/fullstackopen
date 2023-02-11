import React, {useEffect} from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import anecdoteService from './services/anecdotes'

import { useDispatch, useSelector } from 'react-redux'
import {initializeAnecdotes} from "./reducers/anecdoteReducer";

const App = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
        { notification.length > 0 && <Notification /> }
        <Filter />
        <AnecdoteForm />
        <AnecdoteList />
    </div>
  )
}

export default App