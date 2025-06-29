import { useState } from 'react'
import Filter from "./components/Filter"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('New name...')
  const [newNumber, setNewNumber] = useState('00-00-0000000')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    //console.log('button clicked', event.target)
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id : persons.length + 1
      }
      setPersons(persons.concat(personObject))
      setNewName ('')
      setNewNumber('')
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
