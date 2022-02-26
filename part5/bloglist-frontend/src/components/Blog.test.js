import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe ('<Blog />', () => {
  let component

  beforeEach(() => {
    component = render (
      <Blog
        user={user}
        updateLike={mockHandlerLike}
        deleteBlog={mockHandlerDelete}
        blog={blog}>
      </Blog>

    )
  })

  const blog = {
    title: 'zekoti na travniku',
    author: 'nives',
    user: {
      username: 'nives',
      name: 'nives',
      id: '620fefef1e41f81dcc0cf54a'
    },
    url: 'wqeqwe',
    likes: '38'
  }
  const user= {
    username: 'nives',
    name: 'nives',
    id: '620fefef1e41f81dcc0cf54a',
    token: 'asdasdasda'
  }

  const mockHandlerLike = jest.fn()
  const mockHandlerDelete = jest.fn()

  test('renders title and author and not likes and url by default', () => {
    const basicBlogContent = component.container.querySelector('.short-blog')
    const allBlogContent = component.container.querySelector('.long-blog')
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(basicBlogContent).not.toHaveStyle('display: none')
    expect(allBlogContent).toHaveStyle('display: none')
  })

  test('clicking show button reveals all contents of blog', async() => {
    const button = screen.getByText('show')
    userEvent.click(button)
    const allBlogContent = component.container.querySelector('.long-blog')
    expect(allBlogContent).not.toHaveStyle('display: none')
    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(blog.likes)
  })

})