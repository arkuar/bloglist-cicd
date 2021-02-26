import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    expect(component.container).toHaveTextContent('log in to application')

  })

  test('if user is logged, blogs are rendered', async () => {
    const user = {
      userame: 'tester',
      token: '123456',
      name: 'Tim Tester'
    }

    localStorage.setItem('loggedUser', JSON.stringify(user))

    const component = render(
      <App />
    )

    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.content')
    )

    const blogs = component.container.querySelectorAll('.content')
    expect(blogs.length).toBe(1)

    expect(component.container).toHaveTextContent('blogs')
    expect(component.container).toHaveTextContent('Tim Tester logged in')
    expect(component.container).toHaveTextContent('Test blog Test author')

  })
})
