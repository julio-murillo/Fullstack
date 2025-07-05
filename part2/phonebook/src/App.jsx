import { useState } from 'react'
import Filter from "./components/Filter"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import axios from "axios"
import { useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('New name...')
  const [newNumber, setNewNumber] = useState('00-00-0000000')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[])

  const addPerson = (event) => {
    event.preventDefault()
    //console.log('button clicked', event.target)
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
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
    }
  }

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

  return(
    <>
      <h2>Phonebook</h2>
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
      <Persons
        persons={personsToShow}
      />
    </>
  )
}

export default App
