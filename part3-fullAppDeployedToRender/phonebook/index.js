const express = require('express')
const morgan = require('morgan')
//const cors = require('cors')
const app = express()
const minId = 1000
const maxId = 1000000

//const allowedOrigin = 'http://localhost:5173'

{/*const corsOptions = {
  origin: allowedOrigin,
  credentials: false
}*/}

app.use(express.static('dist'))

//app.use(cors(corsOptions))

app.use(express.json())

//app.use(morgan('tiny',))
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons/', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if(person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  console.log(`Persons before deletion: ${JSON.stringify(persons)}`)
  persons = persons.filter(person => person.id !== id)
  console.log(`Persons after deletion: ${JSON.stringify(persons)}`)

  response.status(204).end()
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

app.get('/info/', (request, response) => {
    const people = persons.length

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

    response.send(`
        <h3>Phonebook has info for ${people} people</h3>
        <h3>${formatter.format(Date.now())} (${timeZoneName})</h3>
        `)
})

{/*app.get('/', (request, response) => {
    response.send('<h1>This is the root.. nothing to see here!!!</h1>')
})*/}

const PORT = process.env. PORT || 3001
app.listen(PORT, () => {

    const serverTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    console.log(`Server running on port ${PORT}`)
    console.log(`The server's timezone is "${serverTimeZone}`)
})