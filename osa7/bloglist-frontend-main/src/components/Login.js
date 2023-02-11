import React, { useState, useContext } from 'react'
// eslint-disable-next-line no-unused-vars
import loginService from '../services/login'
// eslint-disable-next-line no-unused-vars
import blogService from '../services/blogs'
import NotificationContext from '../NotificationContext'
// eslint-disable-next-line no-unused-vars
import UserContext from '../UserContext'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // eslint-disable-next-line no-unused-vars
  const [user, userDispatch] = useContext(UserContext)
  // eslint-disable-next-line no-unused-vars
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      userDispatch({ type: 'LOGIN', data: user })
      setUsername('')
      setPassword('')
    } catch (exception) {
      notificationDispatch({ type: 'SHOW', data: 'Wrong credentials' })
      setTimeout(() => {
        notificationDispatch({ type: 'HIDE' })
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      <label>Username</label>
      <input
        type="text"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      ></input>
      <br />
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      ></input>
      <br />
      <button type="submit">Log in</button>
    </form>
  )
}

export default Login
