import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
  const blog = {
    title: 'Test title',
    author: 'Tester',
    likes: 5
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent('Test title Tester')
  expect(component.container).toHaveTextContent('blog has 5 likes')
})
test('clicking like button twice calls event handler twice', () => {
  const blog = {
    title: 'Test title',
    author: 'Tester',
    likes: 4
  }
  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )
  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler.mock.calls.length).toBe(2)

})
