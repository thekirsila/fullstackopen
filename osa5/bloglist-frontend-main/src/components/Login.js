import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      props.setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      props.notify('wrong username or password')
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      <label>Username</label>
      <input id="username" type='text' value={username} onChange={({ target }) => setUsername(target.value)}></input><br />
      <label>Password</label>
      <input id="password" type='password' value={password} onChange={({ target }) => setPassword(target.value)}></input><br />
      <button id="login-button" type='submit'>Log in</button>
    </form>
  )
}

export default Login