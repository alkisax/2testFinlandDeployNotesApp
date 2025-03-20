import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'
import { test, expect, beforeEach, describe } from 'vitest'

describe('<Togglable />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv" >
          togglable content
        </div>
      </Togglable>
    ).container //The .container holds the entire rendered HTML structure, allowing us to: Query specific elements using container.querySelector(). Verify styles (e.g., display: none). Avoid relying on screen.getByText() when querying non-text elements
  })

  test('renders its children', async () => {
    await screen.findAllByText('togglable content')
  })

  // το className που χρησιμοποιεί είναι στον ελεγχόμενο κώδικα
  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

    // Test 3: Simulates clicking the button and checks that the hidden content becomes visible.
  // The `show...` button should trigger the visibility toggle.
  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')  // Προσοχή ".not"
  })

  // After clicking "cancel," the content should be hidden again.
  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const closeButton = screen.getByText('cancel')
    await user.click(closeButton)

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})