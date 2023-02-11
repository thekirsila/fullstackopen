import React, { useState } from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import { useMutation, useQueryClient } from 'react-query'

const Blog = ({ blog }) => {
  const [likes, setLikes] = useState(parseInt(blog.likes))

  const likeBlogMutation = useMutation(blogService.put)
  const deleteBlogMutation = useMutation(blogService.remove)

  const queryClient = useQueryClient()

  const addLike = () => setLikes(likes + 1)

  const style = {
    paddingTop: '20px',
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog.id, {
        onSuccess: () => {
          queryClient.invalidateQueries('blogs')
        }
      })
    }
  }

  const handleLike = async () => {
    const args = {
      id: blog.id,
      name: blog.name,
      author: blog.author,
      url: blog.url,
      likes: likes + 1,
    }

    likeBlogMutation.mutate(args, {
      onSuccess: () => {
        addLike()
      }
    })
  }

  return (
    <div style={style}>
      {blog.title} by {blog.author}
      <Togglable openLabel="view" closeLabel="close">
        Url: {blog.url}
        <br />
        Likes: {likes}
        <button onClick={handleLike}>like</button>
        <br />
        {blog.user ? `Added by ${blog.user.name}` : 'No recorded user'}
        <br />
        <button onClick={handleDelete}>remove</button>
      </Togglable>
    </div>
  )
}

export default Blog
