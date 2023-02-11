import React, { useRef, useState, useContext } from 'react'
import Blog from './Blog'
import Createblog from './Createblog'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import NotificationContext from '../NotificationContext'
import { useMutation } from 'react-query'

const Bloglist = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const togglableRef = useRef()
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const newBlogMutation = useMutation(blogService.create)

  const handleCreate = (e) => {
    e.preventDefault()

    console.log(newBlogMutation, notification)
    newBlogMutation.mutate({ title, author, url })

    notificationDispatch({ type: 'SHOW', data: `A new blog ${title} by ${author} added` })
    setTimeout(() => {
      notificationDispatch({ type: 'HIDE' })
    }, 5000)
  }

  return (
    <div>
      <Togglable
        openLabel="Create a Blog!"
        closeLabel="Cancel"
        ref={togglableRef}
      >
        <Createblog
          notify={props.notify}
          handleCreate={handleCreate}
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          url={url}
          setUrl={setUrl}
        />
      </Togglable>
      {props.blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default Bloglist
