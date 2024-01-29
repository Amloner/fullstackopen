const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({ 
    username,
    name,
    passwordHash,
  })
  

 

  if (password.length < 3) {
    response.status(404).end()
  } else {
    const savedUser = user.save()
    response.status(201).json(savedUser)
  }
}

)

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

module.exports = usersRouter