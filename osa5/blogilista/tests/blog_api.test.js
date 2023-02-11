const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const blogsList = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  }
]

const TOKEN = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRoZWtpcnNpbGEiLCJpZCI6IjYwNTg4NjRiNmE3MDgwMGQ1MDkzN2I3YiIsImlhdCI6MTYxNjQyMjI0MX0.sS9zn81vMq7rcwQim0jYq0liMxGzuEmtpV-ugkpAkvo"

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(blogsList[0])
  await blogObject.save()
  blogObject = new Blog(blogsList[1])
  await blogObject.save()
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(2)
})

test('the field id exists', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('http post adds one element', async () => {
  const newBlog = {
    title: "Paholainen sisälläni",
    author: "Jere Niemi",
    url: "https://paholainensisallani.com",
    likes: 69
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .set({
      "Authorization": TOKEN
    })
  
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(3)
})

test('empty likes gives likes of 0', async () => {
  const newBlog = {
    title: "Paholainen sisälläni",
    author: "Jere Niemi",
    url: "https://paholainensisallani.com"
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .set({
      "Authorization": TOKEN
    })
  
  const response = await api.get('/api/blogs')
  expect(response.body[2].likes).toBe(0)
})

test('empty title or url returns status code 400', async () => {
  const newBlog = {
    author: "Jere Niemi",
    likes: 69
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('failure to add blog with no token', async () => {
  const newBlog = {
    title: "Paholainen sisälläni",
    author: "Jere Niemi",
    url: "https://paholainensisallani.com",
    likes: 69
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(401)
})

afterAll(() => {
  mongoose.connection.close()
})