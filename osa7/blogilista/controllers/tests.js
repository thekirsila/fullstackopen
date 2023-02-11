const testsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

if (process.env.NODE_ENV === 'test') {
  testsRouter.get('/reset', async (request, response) => {
    Blog.deleteMany({})
    User.deleteMany({})

    response.status(204).end()
  })
}

module.exports = testsRouter