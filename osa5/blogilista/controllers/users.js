const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  if (request.body.username != null && request.body.password != null && request.body.password.length >= 3) {
    const body = request.body
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save().catch( error => {
      if (error.name == "ValidationError") {
        response.status(400).json( { error: "username has already been taken" })
      }
    })

    response.json(savedUser)
  } else {
    response.status(400).json( { error: "invalid username or password" } )
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users.map(u => u.toJSON()))
})

usersRouter.delete('/:id', (req, res) => {
  let id = req.params.id
  User.findByIdAndRemove(id).then( result => {
    res.status(204).end()
  })
})

module.exports = usersRouter