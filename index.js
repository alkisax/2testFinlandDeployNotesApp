

// const http = require('http')
// 1. Importing Express
const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors()) // added for same origin policy

app.use(express.json())
//middleware morgan does the same
// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }
// app.use(requestLogger)

const morgan = require('morgan')
app.use(morgan('dev'))

// 2. Data Storage
let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  },
  {
    id: "4",
    content: "learn web services",
    important: true
  }
]

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'text/plain' })
//   response.end(JSON.stringify(notes))
// })

// 3. Route: Home Page (/)
app.get('/', (request, response) => {
  response.send('<h1>Hello World!!</h1>')
})

// 4. Route: Fetch All Notes (/api/notes)
// τα νοτεσ τα βλεπω στο http://localhost:3001/api/notes
app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

// this is a test and it only logs
// app.post('/api/notes', (request, response) => {
//   const note = request.body
//   console.log(note)
//   response.json(note)
// })

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  }

  notes = notes.concat(note)

  console.log(note)
  response.json(note)
})

//catch error middleware
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// 5. Start the Server
// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)
// αυτή η αλλαγή είναι για να μπορέσουμενα μεταφερθούμε στο fly.io
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
