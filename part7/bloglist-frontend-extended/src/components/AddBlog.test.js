import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {
  fireEvent,
  render,
  screen,
  cleanup,
  getByAltText,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBlog from './AddBlog'

describe('<AddBlog />', () => {
  const handleAddBlog = jest.fn().mockImplementation((e) => e.preventDefault())
  let component

  test('Addblog updates parent state and calls onSubmit', () => {
    const { getByText } = render(<AddBlog handleAddBlog={handleAddBlog} />)
    //const form = component.container.querySelector('form')
    const inputs = screen.getAllByRole('textbox')
    const SUB = screen.getAllByText('create')
    const suba = SUB[0]
    //const inputTitle = component.container.querySelector('#note-input')
    // const inputAuthor = component.container.querySelector('#author')
    // const inputUrl = component.container.querySelector('#linkUrl')
    // const sendButton = screen.getByText('create')

    userEvent.type(inputs[0], {
      target: { value: 'piki jakob blog' },
    })
    userEvent.type(inputs[1], {
      target: { value: 'Nives' },
    })
    userEvent.type(inputs[2], {
      target: { value: 'www.noviblog.si' },
    })
    //const sendButton = screen.getByText('create')
    //userEvent.click(sendButton)
    //fireEvent.submit(form);

    fireEvent.submit(suba)
    //fireEvent.submit(screen.getByRole('form'));

    expect(handleAddBlog.mock.calls).toHaveLength(1)
  })
})
