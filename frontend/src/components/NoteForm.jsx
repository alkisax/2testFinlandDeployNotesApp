import { useState } from 'react'
import noteService from '../services/notes'

const NoteForm = ({ setNotes, notes, noteFormRef }) => {

  const [newNote, setNewNote] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: true
      // important: Math.random() > 0.5,
    }
  
    noteService
      .create(noteObject)
      .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
    noteFormRef.current.toggleVisibility()
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }


  return (
    <div>
      <h2>Create a new note</h2>
      
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>  
    </div>
  )
}

export default NoteForm