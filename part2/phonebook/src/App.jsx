import { useState } from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import { useEffect } from 'react'
import personService from './services/persons'
import Person from './components/Person'

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

  const deletePersonWithId = (id) => {
    //console.log(`person with id ${id} is being deleted`)
    const person = persons.find(n => n.id === id)
    if (confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(deleted => {
            const remainingPersons = persons.filter(person => person.id !== deleted.id)
            setPersons(remainingPersons)
        })
    }
  }

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
