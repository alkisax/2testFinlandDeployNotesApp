// hat means your .env file is either not being loaded correctly or the variable isn't set properly.Steps to Fix: 1. Ensure dotenv is Required at the Top
require('dotenv').config();

//MONGOOSE PART START HERE
// transefred to ./models/note.js


// const mongoose = require('mongoose')

// const password = process.argv[2]

// // DO NOT SAVE YOUR PASSWORD TO GITHUB!!
// const url = process.env.MONGODB_URI;

// mongoose.set('strictQuery',false)
// mongoose.connect(url)

// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// })

// const Note = mongoose.model('Note', noteSchema)

// noteSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString() // Convert _id (ObjectId) to a string and store it in 'id'
//     delete returnedObject._id // Remove the original _id field
//     delete returnedObject.__v // Remove the __v field (used for versioning by Mongoose)
//   }
// });

//MONGOOSE PART END HERE
const Note = require('./models/note')

// const http = require('http')
// 1. Importing Express
const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors()) // added for same origin policy

app.use(express.static('dist')) // to create static render for dist, on the server

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
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  //changed for mongodb
  // const id = request.params.id
  // const note = notes.find(note => note.id === id)

  // if (note) {
  //   response.json(note)
  // } else {
  //   response.status(404).end()
  // }

  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error);
      response.status(400).send({ error: "maloformated id" })      
    })
})

app.delete('/api/notes/:id', (request, response, next) => {
  // const id = request.params.id
  // notes = notes.filter(note => note.id !== id)
  // response.status(204).end()
  // Note.findById(request.params.id)
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      // if (note) {
      //   response.json(note)
      // } else {
      //   response.status(404).end()
      // }
      response.status(294).end()
    })
    .catch(error => next(error))

})

// this is a test and it only logs
// app.post('/api/notes', (request, response) => {
//   const note = request.body
//   console.log(note)
//   response.json(note)
// })

// const generateId = () => {
//   const maxId = notes.length > 0
//     ? Math.max(...notes.map(n => Number(n.id)))
//     : 0
//   return String(maxId + 1)
// }

app.post('/api/notes', (request, response, next) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  // changed for using mongodb
  // const note = {
  //   content: body.content,
  //   important: Boolean(body.important) || false,
  //   id: generateId(),
  // }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  // notes = notes.concat(note)

  console.log(note)
  // response.json(note)

  note.save()
    .then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  // const body = request.body
  const { content, important } = request.body

  // const note = {
  //   content: body.content,
  //   important: body.important,
  // }

  Note.findByIdAndUpdate(request.params.id, { content, important }, { new: true, runValidators: true, context: 'query' })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

//catch error middleware
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// Error handling middleware (MUST be last)
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error); // Pass error to Express default handler if not handled
};
app.use(errorHandler);

// 5. Start the Server
// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)

// αυτή η αλλαγή είναι για να μπορέσουμενα μεταφερθούμε στο fly.io
// const PORT = process.env.PORT || 3001
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

// αυτή η αλλαγή έγινε για να χρησιμοποιήσουμε το πορτ απο το env

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
