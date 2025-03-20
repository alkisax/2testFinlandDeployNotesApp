import { render, screen } from '@testing-library/react'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import noteService from '../services/notes'

import { test, expect } from 'vitest'


// Mock the noteService.create function
// This is essential for isolating the behavior of the component under test
// Without this, the real noteService.create method would be called, possibly hitting a real API or causing side effects
vi.mock('../services/notes', () => ({
  default: {
    // The mock of `create` should return a resolved promise with a sample note object
    // This simulates the asynchronous behavior of the real noteService.create method
    // The promise resolves with the note object that contains 'content' and 'important' properties
    create: vi.fn(() => Promise.resolve({ content: 'testing a form...', important: true }))
  }
}));

test('<NoteForm /> updates parent state and calls noteService.create', async () => {
  const setNotes = vi.fn()
  const notes = []
  const noteFormRef = { current: { toggleVisibility: vi.fn() } }

  const user = userEvent.setup()

  render(<NoteForm setNotes={setNotes} notes={notes} noteFormRef={noteFormRef} />)

  const input = screen.getByRole('textbox')
  const sendButton = screen.getByText('save')

  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  // Ensure noteService.create was called with the correct object
  expect(noteService.create).toHaveBeenCalledTimes(1)
  expect(noteService.create).toHaveBeenCalledWith({ content: 'testing a form...', important: true })

  // Ensure setNotes was called to update the state
  expect(setNotes).toHaveBeenCalled()

  // Ensure the form was cleared (by resetting the input field)
  expect(input.value).toBe('')

  // Ensure noteFormRef.current.toggleVisibility was called
  expect(noteFormRef.current.toggleVisibility).toHaveBeenCalled()
})
