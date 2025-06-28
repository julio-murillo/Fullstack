import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas'},
    {name: 'Ada Lovelace'}
  ])
  const [newName, setNewName] = useState('')

  const Persons = ({persons}) =>
  (
    <>
      <h2>Numbers</h2>
      {persons.map(person => <div key={person.name}>{person.name} <br /></div>)}
    </>
  )

  return(
    <>
      <div>debug: {newName}</div>
      <div>debug: {persons.map(person => person.name)}</div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <Persons
        persons={persons}
      />
    </>
  )
}

export default App
