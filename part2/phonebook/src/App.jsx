import { useState } from 'react'

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

  const Persons = ({persons}) =>
  (
    <>
      <h2>Numbers</h2>
      {persons.map(person => <div key={person.id}>{person.name} {person.number}</div>)}
    </>
  )

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handeNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChance = (event) => {
    console.log('filter:', event.target.value.toUpperCase())
    setFilter(event.target.value)
  }

  const personsToShow = (filter ==='')
    ? persons
    : persons.filter(person => person.name.toLocaleUpperCase().includes(filter.toUpperCase()))

  return(
    <>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input
        id='filter'
        value={filter}
        onChange={handleFilterChance}/>
      </div>
      <form id='PhonebookEntries'>
        <div>
          <h3>add a new</h3>
          name: <input
            id='name'
            value={newName}
            onChange={handleNameChange}/>
        </div>
        <div>
          number: <input
            id='number'
            value={newNumber}
            onChange={handeNumberChange} />
        </div>
        <div>
          <button type='submit' onClick={addPerson}>add</button>
        </div>
      </form>
      <Persons
        persons={personsToShow}
      />
    </>
  )
}

export default App
