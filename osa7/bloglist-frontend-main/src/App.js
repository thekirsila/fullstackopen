import React, { useEffect, useReducer } from 'react'
import Bloglist from './components/Bloglist'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import NotificationContext from './NotificationContext'
import UserContext from './UserContext'
import { useQuery } from 'react-query'

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'SHOW':
    return action.data
  case 'HIDE':
    return ''
  default:
    return state
  }
}

const userReducer = (state, action) => {
  switch (action.type) {
  case 'LOGIN':
    blogService.setToken(action.data.token)
    return action.data
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [user, userDispatch] = useReducer(userReducer, '')
  // eslint-disable-next-line no-unused-vars
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  // Get user from cookies
  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedUser')
    if (userJSON) {
      userDispatch({ type: 'LOGIN', data: JSON.parse(userJSON) })
    }
  }, [])

  const result = useQuery(
    'blogs',
    () => blogService.getAll(),
  )

  if (result.isLoading) {
    return <div>Loading...</div>
  }

  const blogs = result.data

  const handleSignout = () => {
    userDispatch({ type: 'LOGOUT' })
    window.localStorage.removeItem('loggedUser')
  }

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <UserContext.Provider value={[ user, userDispatch ]}>
        <h2>Blogs</h2>
        <Notification />
        {user && (
          <p>
            Welcome {user.name}
            <button onClick={handleSignout}>Sign out</button>
          </p>
        )}
        {user ? (
          <Bloglist blogs={blogs} />
        ) : (
          <Login />
        )}
      </UserContext.Provider>
    </NotificationContext.Provider>
  )
}

export default App
