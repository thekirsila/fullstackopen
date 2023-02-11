const blogsRouter = require('express').Router()
const { isNull } = require('lodash')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')

  response.json(blogs.map( u => u.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  if (request.body.title == null || request.body.url == null) {
    response.status(400).send({error: "malformatted blog"})
  } else if (!request.user) {
    response.status(401).send()
  } else {
    const body = request.body
    const user = request.user

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
  
    blog.likes = blog.likes == undefined ? 0 : blog.likes

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog.toJSON())
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  const token = req.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  let blogId = req.params.id
  const blog = await Blog.findById(blogId)
  if ( blog.user._id.toString() === decodedToken.id.toString() ) {
    Blog.findByIdAndRemove(blogId).then( result => {
      res.status(204).end()
    })
  } else {
    res.status(401).json({ error: 'invalid token' })
  }
})

blogsRouter.put('/:id', (req, res) => {
  const body = req.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(req.params.id, blog, {new: true})
    .then( updatedBlog => {
      res.json(updatedBlog)
    })
})

module.exports = blogsRouter