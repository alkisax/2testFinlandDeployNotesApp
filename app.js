require('dotenv').config()

const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use('/api/notes', notesRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

mongoose.set('strictQuery', false)
logger.info('Connecting to ', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

module.exports = app

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }
// app.use(unknownEndpoint)

// const errorHandler = (error, request, response, next) => {
//   console.error(error.message)

//   if (error.name === 'CastError') {
//     return response.status(400).json({ error: 'malformatted id' })
//   } else if (error.name === 'ValidationError') {
//     return response.status(400).json({ error: error.message })
//   }

//   next(error)
// }
// app.use(errorHandler)

// const PORT = process.env.PORT
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })