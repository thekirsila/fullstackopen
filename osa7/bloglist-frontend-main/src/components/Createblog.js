import React from 'react'

const Createblog = (props) => {
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={props.handleCreate}>
        <label>Title</label>
        <input
          id="title"
          value={props.title}
          onChange={({ target }) => props.setTitle(target.value)}
          type="text"
        ></input>
        <br />
        <label>Author</label>
        <input
          id="author"
          value={props.author}
          onChange={({ target }) => props.setAuthor(target.value)}
          type="text"
        ></input>
        <br />
        <label>Url</label>
        <input
          id="url"
          value={props.url}
          onChange={({ target }) => props.setUrl(target.value)}
          type="text"
        ></input>
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default Createblog
