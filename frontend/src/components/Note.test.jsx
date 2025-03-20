import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'
import { test, expect, vi } from 'vitest' //had to add becaise global did not work

test('renders content', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  // vi.fn() creates a mock function that allows us to track calls to it
  const mockHandler = vi.fn()

  // Render the Note component, passing the mock note and mock function as props
  render(<Note note={note} toggleImportance={mockHandler} />)

  
  // Simulate a user
  const user = userEvent.setup()
  // Since the note is initially important (important: true), the button should say 'make not important'
  const button = screen.getByText('make not important')
  await user.click(button)
  // mockHandler.mock.calls gives an array of all the times the function was called
  expect(mockHandler.mock.calls).toHaveLength(1)

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
})