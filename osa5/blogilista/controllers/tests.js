const testsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

testsRouter.post('/reset', async (request, response) => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  response.status(204).end()
})

module.exports = testsRouter