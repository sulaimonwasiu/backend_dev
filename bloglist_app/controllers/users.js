const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const results = await User.find({}).populate('blogs')
  response.json(results)
})

// Create a user
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  

  //unique username
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  //password be at least 3 characters long
  password.length < 3
    ? response.status(400).json({
      error: 'password must be at least 3 charaters long'})
    : null
  
  const saltRounds = 10
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