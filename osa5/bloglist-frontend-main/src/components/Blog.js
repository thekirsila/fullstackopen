import React, { useEffect, useState } from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [likes, setLikes] = useState(parseInt(blog.likes))
  const [user, setUser] = useState(null)

  const addLike = () => setLikes(likes + 1)

  const style = {
    paddingTop: '20px'
  }

  const handleLike = async () => {
    addLike()
    try {
      await blogService.put({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: likes
      }, blog.id)
    } catch (e) {
      console.log(e)
    }
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
      } catch (e) {
        console.log(e)
      }
    }
  }

  // Get user from cookies
  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div style={style}>
      {blog.title} by {blog.author}
      <Togglable openLabel='view' closeLabel='close'>
        Url: {blog.url}<br />
        Likes: {likes}<button onClick={handleLike}>like</button><br />
        { blog.user ? `Added by ${blog.user.name}` : 'No recorded user'}<br />
        { user && blog.user.username === user.username && <button onClick={handleRemove}>remove</button> }
      </Togglable>
    </div>
  )
}

export default Blog