import React, { useRef, useState } from 'react'
import Blog from './Blog'
import Createblog from './Createblog'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const Bloglist = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const togglableRef = useRef()

  const handleCreate = (e) => {
    e.preventDefault()

    try {
      blogService.create({
        title, author, url
      })
      props.notify(`${title} by ${author} added successfully, refresh to see effect`)
      togglableRef.current.toggleVisible()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <Togglable openLabel='Create a Blog!' closeLabel='Cancel' ref={togglableRef}>
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
      {props.blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Bloglist