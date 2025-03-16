import { useState, useEffect, useRef } from 'react'
// import { useState, useEffect } from 'react'

import Note from './components/Note'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import noteService from './services/notes'
// import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './index.css'
// import axios from 'axios'


const App = () => {
  const [notes, setNotes] = useState([])
  // const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // const [loginVisible, setLoginVisible] = useState(false)

  const noteFormRef = useRef()

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        console.log('Initial notes:', initialNotes);
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
        .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        console.log(error);
        
        alert(
          `the note '${note.content}' was already deleted from server`
        )
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user === null && (
        // αυτο θα περάσει ως props.buttonLabel
        <Togglable buttonLabel='login'> 
          {/* και ολο το <LoginForm /> ως props.children */}
          <LoginForm
            setUser={setUser}
            username={username}
            password={password}
            setErrorMessage={setErrorMessage}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </Togglable>
      )}
      {user !== null && (
        <div>
          <div>
            <p style={{ margin: 0, display: 'inline' }}>{user.name} logged in </p>
            <button onClick={handleLogout}>logout</button>
          </div>
          <br />

          <Togglable buttonLabel="new note" ref={noteFormRef}>
          {/* <Togglable buttonLabel="new note"> */}
            <NoteForm 
              setNotes={setNotes}
              notes={notes}
              noteFormRef={noteFormRef}
            />
          </Togglable>
        </div>
      )}

      <h2>Notes</h2>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>      
      <ul>
        {notesToShow.map(note => 
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <Footer />
    </div>
  )
}


  const Footer = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }
    return (
      <div style={footerStyle}>
        <br />
        <em>Note app. Created as part of exercise during the lessons of Full Stack Finland Mooc</em>
      </div>
    )
  }

export default App