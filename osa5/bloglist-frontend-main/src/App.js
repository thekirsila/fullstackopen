import React, { useState, useEffect } from 'react'
import Bloglist from './components/Bloglist'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationText, setNotificationText] = useState('')

  // Get blogs and set them
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((first, second) => {
        if (first.likes > second.likes) {
          return -1
        } else if (first.likes < second.likes) {
          return 1
        }
        return 0
      }) )
    )
  }, [])

  // Get user from cookies
  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleSignout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
  }

  const notify = (text) => {
    setNotificationText(text)
    setTimeout(() => {
      setNotificationText('')
    }, 5000)
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification text={notificationText} />
      { user &&
        <p>
          Welcome {user.name}
          <button onClick={handleSignout}>Sign out</button>
        </p>
      }
      { user ? <Bloglist blogs={blogs} notify={notify} /> : <Login notify={notify} setUser={setUser} /> }
    </div>
  )
}

export default App