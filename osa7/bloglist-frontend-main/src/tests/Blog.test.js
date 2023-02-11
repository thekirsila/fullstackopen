import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

test('Renders first only title and author', () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'http://example.com',
    likes: 0,
  }

  const component = render(<Blog blog={blog} />)

  expect(component.container).toHaveTextContent('Test title by Test author')
})

test('Renders url after button is pressed', () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'http://example.com',
    likes: 0,
  }

  const component = render(<Blog blog={blog} />)

  const button = component.getByText('view')
  fireEvent.click(button)
  expect(component.container).toHaveTextContent('http://example.com')
})

test('Renders likes after button is pressed', () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'http://example.com',
    likes: 0,
  }

  const component = render(<Blog blog={blog} />)

  const button = component.getByText('view')
  fireEvent.click(button)
  expect(component.container).toHaveTextContent('0')
})
