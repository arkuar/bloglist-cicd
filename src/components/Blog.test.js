import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

let component
let blog = {
  title: 'Test title',
  author: 'Tester',
  url: 'url.com',
  likes: 2,
  user: { name: 'Adder' }
}

beforeEach(() => {
  component = render(
    <Blog blog={blog} onLike={() => null} onRemove={() => null} />
  )
})

test('at start only title and author are shown', () => {
  expect(component.container).toHaveTextContent('Test title Tester')
  expect(component.container).not.toHaveTextContent('added by Adder')
})

test('after clicking, all information is shown', () => {
  const div = component.getByText('Test title Tester')

  fireEvent.click(div)

  expect(div).toHaveTextContent('Test title Tester')
  expect(div).toHaveTextContent('url.com')
  expect(div).toHaveTextContent('2 likes')
  expect(div).toHaveTextContent('added by Adder')
})
