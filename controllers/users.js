const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  // Check if the username already exists
  //αυτα δεν ήταν στο μάθημα αλλα αναγκα΄στικα να τα προσθέσω γιατί ένα τεστδεν πέρναγε με τίποτα, δεν το έπιανε το middleware
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  }

  const saltRounds = 10
  console.log('Received password:', password)
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter