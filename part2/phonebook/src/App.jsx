import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas'},
    {name: 'Ada Lovelace'}
  ])
  const [newName, setNewName] = useState('New name...')

  const addPerson = (event) => {
    event.preventDefault()
    //console.log('button clicked', event.target)
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName
      }
      setPersons(persons.concat(personObject))
      setNewName ('')
    }
  }

  const Persons = ({persons}) =>
  (
    <>
      <h2>Numbers</h2>
      {persons.map(person => <div key={person.name}>{person.name} <br /></div>)}
    </>
  )

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
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
