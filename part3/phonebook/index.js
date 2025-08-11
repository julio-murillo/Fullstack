require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()
const minId = 1000
const maxId = 1000000

app.use(express.static('dist'))
app.use(express.json())

//app.use(morgan('tiny',))
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

//retrieves all persons from the DB
app.get('/api/people', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

//retrieves the person identified by id
app.get('/api/people/:id', (request, response) => {
  console.log('Pending implementation using mongo DB')
  {/*const id = request.params.id
  const person = persons.find(person => person.id === id)

  if(person) {
    response.json(person)
  } else {
    response.status(404).end()
  }*/}
})

//deletes the person identified by 1d
app.delete('/api/people/:id', (request, response) => {
  console.log('Pending implementation using mongo DB')
  {/*const id = request.params.id
  console.log(`Persons before deletion: ${JSON.stringify(persons)}`)
  persons = persons.filter(person => person.id !== id)
  console.log(`Persons after deletion: ${JSON.stringify(persons)}`)

  response.status(204).end()*/}
})

const genId = () => Math.floor(Math.random() * (maxId - minId + 1) + minId)

app.post('/api/persons', (request, response) => {
  const body = request.body

  if(!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  } else if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  const person = {
    name : body.name,
    number: body.number,
    id: genId().toString()
  }
  
  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({
      error: `${body.name} alredy exists in the phonebook`
    })
  }
  
  persons = persons.concat(person)
  
  response.json(person)
})

app.get('info/', (request, response) => {
  Person.countDocuments({})
      .then((count) => {
        console.log(`There's ${count} people in the collection`)
        peopleCount = count
        console.log(`Value assigned to var peopleCount is: ${peopleCount}`)
      })
      .catch((error) => {
        console.log(error)
      })
    
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
        timeZoneName: "longOffset"
    }
    const formatter = Intl.DateTimeFormat([], options)
    const timeZoneName = Intl.DateTimeFormat([], {timeZoneName: 'long'})
      .formatToParts().find(part => part.type === 'timeZoneName').value

    Person.countDocuments({})
      .then((count) => {
        response.send(`
          <h3>Phonebook has info for ${peopleCount} people</h3>
          <h3>${formatter.format(Date.now())} (${timeZoneName})</h3>
        `)
      })
      .catch((error) => {
        console.log(error)
      })
})

{/*app.get('/', (request, response) => {
    response.send('<h1>This is the root.. nothing to see here!!!</h1>')
})*/}

const PORT=3001
app.listen(PORT, () => {
  const serverTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  console.log(`Server running on port ${PORT}`)
  console.log(`The server's timezone is "${serverTimeZone}`)
})