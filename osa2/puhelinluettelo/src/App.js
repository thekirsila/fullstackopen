import React, { useEffect, useState } from 'react'
import axios from 'axios'
import peopleService from './services/people'
import './App.css'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ notification, setNotification ] = useState('')
  const [ notificationState, setNotificationState ] = useState('notification-disabled')

  useEffect( () => {
    axios
      .get('http://localhost:3001/persons')
      .then( response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length != 0 ? persons[persons.length - 1].id + 1 : 1
    }

    if (persons.filter( person => person.name.toLowerCase() === newName.toLowerCase()).length > 0) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        // Henkilön tietojen muutos
        peopleService.update( persons.find( person => person.name.toLowerCase() === newName.toLowerCase() ).id, personObject ).then( () => {
          peopleService.getAll().then( response => {
            setPersons(response.data)
            showNotification(`${newName} changed successfully`, 'notification')
          })
        }).catch( error => {
          showNotification(`${newName} has already been removed from server, updating...`, 'error')
          peopleService.getAll().then( response => {
            setPersons(response.data)
          })
        })
        setNewName('')
        setNewNumber('')
      }
    } else {
      // Henkilön lisäys
      peopleService.create(personObject).then( () => {
        setPersons(persons.concat(personObject))
        showNotification(`${newName} added successfully`, 'notification')
      })

      setNewName('')
      setNewNumber('')
    }
  }

  const personsToShow = newSearch.value == 0 
    ? persons 
    : persons.filter( person => person.name.toLowerCase().includes(newSearch.toLowerCase()) )

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const showNotification = (message, type) => {
    setNotification(message)
    setNotificationState(type == 'notification' ? 'notification-enabled' : 'error-enabled')
    setTimeout( () => setNotificationState('disabled'), 3000 )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notificationState={notificationState} message={notification} />
      <Search newSearch={newSearch} handleSearchChange={handleSearchChange}/>
      <h2>Add new entry</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons showNotification={showNotification} personsToShow={personsToShow} setPersons={setPersons} />
    </div>
  )

}

const Notification = (props) => {
  return (
    <div className={props.notificationState}>{props.message}</div>
  )
}

const Search = (props) => {
  return (
    <div>
      Search: <input value={props.newSearch} onChange={props.handleSearchChange} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} /><br />
        number: <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  const removeThis = (id) => {
    const name = props.personsToShow.filter( (person) => person.id == id)[0].name
    if (window.confirm("Do you really wish to delete " + name))
    // Henkilön poisto
    peopleService.deleteId(id).then( () => {
      peopleService.getAll().then( response => {
        props.setPersons(response.data)
        props.showNotification(`${name} was removed successfully`, 'notification')
      })
    }).catch( error => {

    })
  }

  return (
    <div>
      {props.personsToShow.map( person => 
        <Person key={person.id} name={person.name} number={person.number} removeOne={ () => removeThis(person.id) } />
      )}
    </div>
  )
}

const Person = (props) => {
  return (
    <div>
      {props.name} {props.number}
      <button onClick={ props.removeOne }>Remove</button>
    </div>
  )
}

export default App