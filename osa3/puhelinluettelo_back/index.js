require('dotenv').config()
const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

morgan.token('custom', (req, res) => {
  return JSON.stringify(req.body)
})

// Logger configuration
app.use(morgan( (tokens, req, res) => {
  return[
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens['custom'](req, res)
  ].join(' ')
}))

// let persons = [
//     {
//         id: 1,
//         name: "Arto Hellas",
//         number: "040-123456"
//     },
//     {
//         id: 2,
//         name: "Ada Lovelace",
//         number: "39-44-5323523"
//     },
//     {
//         id: 3,
//         name: "Dan Abramov",
//         number: "12-43-234345"
//     },
//     {
//         id: 4,
//         name: "Mary Poppendick",
//         number: "39-23-6423122"
//     }
// ]

// Create a new person, but with MongoDB
app.post('/api/persons', (req, res, next) => {
  const body = req.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(response => {
    console.log(`Added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
    res.json(person)
  })
    .catch( error => next(error) )
})

// Update a person
app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, {new: true})
    .then( updatedPerson => {
      res.json(updatedPerson)
    })
    .catch( error => next(error) )
})

// Delete person
app.delete('/api/persons/:id', (req, res, next) => {
  let id = req.params.id
  Person.findByIdAndRemove(id).then( result => {
    res.status(204).end()
  })
    .catch(error => next(error))
})

// Get all persons
app.get('/api/persons', (req, res, next) => {
  Person.find({}).then( persons => {
    res.json(persons)
  })
    .catch( error => next(error) )
})

// Get certain person
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).json({
          'error': 'This id does not exist'
        })
      }
    })
    .catch(error => next(error))
})

// Info page
app.get('/info', (req, res) => {
  let date = new Date()
  Person.find({}).then( persons => {
    let amount = persons.length
    res.send('Phonebook has info for ' + amount + ' people<br><br>' + date)
  })
})

// Error handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const port = process.env.PORT
app.listen(port)
console.log(`Server running on port ${port}`)