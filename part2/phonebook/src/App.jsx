import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'},
    { name: 'Ada Lovelace', number: '39-44-5323523'}
  ])
  const [newName, setNewName] = useState('New name...')
  const [newNumber, setNewNumber] = useState('00-00-0000000')

  const addPerson = (event) => {
    event.preventDefault()
    //console.log('button clicked', event.target)
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
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
      {persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
    </>
  )

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handeNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return(
    <>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}/>
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handeNumberChange} />
        </div>
        <div>
          <button type='submit' onClick={addPerson}>add</button>
        </div>
      </form>
      <Persons
        persons={persons}
      />
    </>
  )
}

export default App
