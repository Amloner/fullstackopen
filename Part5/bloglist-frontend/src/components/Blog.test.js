import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('renders content', async () => {
  const note = {
    title: 'Test',
    author: 'Me',
    url : 'IYO' ,
    likes : 1,
    user	: {
name	:"password is username in english"}
  }

  const {container} = await render(<Blog blog={note} />)
  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(    'Test'  )
  expect(div).toHaveTextContent(    'Me'  )

})
test('clicking the button renders URL and likes', async () => {
  const note = {
    title: 'Test',
    author: 'Me',
    url : 'IYO' ,
    likes : 1,
    user	: {
      name	:"password is username in english"}
  }

  const mockHandler = jest.fn()
  const {container} = await render(<Blog blog={note} />)

  const user = userEvent.setup() 
  const button = screen.getByText('view') 
  await user.click(button)
  const div = container.querySelector('.expandedBlog')
  expect(div).toHaveTextContent(    'IYO'  )
  expect(div).toHaveTextContent(    '1'  )


  screen.debug()}
  
  
  )

  test('clicking the button twice calls the function twice', async () => {
    const note = {
      title: 'Test',
      author: 'Me',
      url : 'IYO' ,
      likes : 1,
      user	: {
        name	:"password is username in english"}
    }
  
    const mockHandler = jest.fn()
    await render(<Blog blog={note} removeBlog= {mockHandler} updateBlog={mockHandler}/>)
  
    const user = userEvent.setup() 
    const button = screen.getByText('view') 
    await user.click(button)
    const buttonLike = screen.getByText('like') 
    await user.click(buttonLike)
    await user.click(buttonLike)
  
    expect(mockHandler.mock.calls).toHaveLength(2)  
  }
    
    
    )

    test('<BlogForm /> updates parent state and calls onSubmit', async () => {
      const createNote = jest.fn()
      const user = userEvent.setup()
    
      render(<BlogForm createBlog={createNote}/>)
      const inputs = screen.getAllByRole('textbox')
      await user.type(inputs[0], 'title')
      await user.type(inputs[1], 'author')
      await user.type(inputs[2], 'URL')
      await user.type(inputs[3], 'likes')
      const sendButton = screen.getByText('save')
      await user.click(sendButton)
      screen.debug()
      expect(createNote.mock.calls).toHaveLength(1)
      expect(createNote.mock.calls[0][0].title).toBe('title')
    })



