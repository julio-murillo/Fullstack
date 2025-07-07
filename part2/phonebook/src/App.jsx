import { useState } from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import { useEffect } from 'react'
import personService from './services/persons'
import Person from './components/Person'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('New name...')
  const [newNumber, setNewNumber] = useState('00-00-0000000')
  const [filter, setFilter] = useState('')
  const [statusMessage, setStatusMessage] = useState({message: null, cssClass: 'success'})
  const messageDuration = 3000

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[])

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

 
  const handleFilterChange = (event) => {
    //console.log('filter:', event.target.value.toUpperCase())
    setFilter(event.target.value)
  }
  

  const personsToShow = (filter ==='')
    ? persons
    : persons.filter(person => person.name.toLocaleUpperCase().includes(filter.toUpperCase()))

  const displayMessage = (message, cssClass, duration) => {
    const newMessage = {...statusMessage,
      message: message,
      cssClass: cssClass
    }
    setStatusMessage(newMessage)
    setTimeout(() => {
      const resetStatusMessage = {...newMessage,
        message: null}
      setStatusMessage(resetStatusMessage)
    },duration)
  }

  const addPerson = (event) => {
    event.preventDefault()
    //console.log('button clicked', event.target)
    if (persons.some(person => person.name === newName)) {
      //alert(`${newName} is already added to phonebook`)
      if (confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        //console.log ('Value of newName ', newName)
        //console.log ('Values of newNumber ', newNumber)
        const personToUpdate = persons.find(person => person.name === newName)
        //console.log ('Person to update ', personToUpdate)
        const id = personToUpdate.id
        //console.log ('ID value ', id)
        const updatedPerson = {...personToUpdate, number: newNumber}

        personService
          .update(id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === id ? returnedPerson : person))
          })
          setNewName('')
          setNewNumber('')
          const messageToDisplay = `The number for ${updatedPerson.name} has been changed to ${updatedPerson.number}`
          displayMessage(messageToDisplay, 'success', messageDuration)
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      const messageToDisplay = `${personObject.name} has been added to the phonebook with the number ${personObject.number}`
      displayMessage(messageToDisplay, 'success', messageDuration)
    }
  }

  const deletePersonWithId = (id) => {
    //console.log(`person with id ${id} is being deleted`)
    const person = persons.find(n => n.id === id)
    if (confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(deleted => {
            const remainingPersons = persons.filter(person => person.id !== deleted.id)
            const messageToDisplay = `${deleted.name} has been removed from server`
            displayMessage(messageToDisplay, 'success', messageDuration)
            setPersons(remainingPersons)
        })
        .catch(error => {
          const messageToDisplay = `${person.name} has already been removed from server`
          displayMessage(messageToDisplay, 'error', messageDuration)
          const remainingPersons = persons.filter(x => x.id !== id)
          setPersons(remainingPersons)
        })
    }
  }

  return(
    <>
      <h2>Phonebook</h2>
      <Notification
        message={statusMessage.message}
        cssClass={statusMessage.cssClass}
      />
      <Filter
        textToDisplay={'filter shown with '}
        textToFilterBy={filter}
        onChange={handleFilterChange}
      />
      <h3>add a new</h3>
      <PersonForm
        name={newName}
        onNameChange={handleNameChange}
        number={newNumber}
        onNumberChange={handleNumberChange}
        onButtonClick={addPerson}
      />
      <h3>Numbers</h3>
      <div>
        {personsToShow.map(person => <Person key={person.id}
          person={person}
          deletePerson={() => deletePersonWithId(person.id)}
        />)}
      </div>
    </>
  )
}

export default App
