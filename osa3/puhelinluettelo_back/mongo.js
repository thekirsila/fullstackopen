const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const database = 'puhelinluettelo-app'

const url = `mongodb+srv://fullstack:${password}@cluster0.fvxrh.mongodb.net/${database}?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {

  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(response => {
    console.log(`Added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
    process.exit(1)
  })

} else if (process.argv.length === 3) {
  Person.find({}).then( res => {
    console.log('Phonebook:')
    res.forEach(pers => {
      console.log(pers.name, pers.number)
    })
    mongoose.connection.close()
    process.exit(1)
  })
}