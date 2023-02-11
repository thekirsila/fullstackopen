import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Createblog from '../components/Createblog'

test('Blog creation handler is called with correct values', () => {
  const submitHandler = jest.fn()
  const title = 'Test blog'
  const author = 'Test author'
  const url = 'http://example.com'

  const component = render(
    <Createblog
      title={title}
      author={author}
      url={url}
      handleCreate={submitHandler}
    />
  )

  const form = component.container.querySelector('form')
  fireEvent.submit(form)

  expect(submitHandler.mock.calls).toHaveLength(1)
})
