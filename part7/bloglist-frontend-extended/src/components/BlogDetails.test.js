import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogDetails from './BlogDetails'
import userEvent from '@testing-library/user-event'

describe('<BlogDetails />', () => {
  let component

  beforeEach(() => {
    component = render(
      <BlogDetails
        blog={blog}
        user={user}
        handleHideClick={mockHandlerVisibility}
        handleLikeClick={mockHandlerLike}
        handleDeleteClick={mockHandlerDelete}
      ></BlogDetails>,
    )
  })

  const blog = {
    title: 'zekoti na travniku',
    author: 'nives',
    user: {
      username: 'nives',
      name: 'nives',
      id: '620fefef1e41f81dcc0cf54a',
    },
    url: 'wqeqwe',
    likes: '38',
  }
  const user = {
    username: 'nives',
    name: 'nives',
    id: '620fefef1e41f81dcc0cf54a',
    token: 'asdasdasda',
  }

  const mockHandlerLike = jest.fn()
  const mockHandlerDelete = jest.fn()
  const mockHandlerVisibility = jest.fn()

  test('if the like button is clicked twice, the event handler the component is called twice', async () => {
    const buttonLike = screen.getByText('like')
    userEvent.click(buttonLike)
    userEvent.click(buttonLike)
    expect(mockHandlerLike.mock.calls).toHaveLength(2)
  })
})
