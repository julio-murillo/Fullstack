require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()

const Person = require('./models/person')
const { default: mongoose } = require('mongoose')

app.use(express.static('dist'))

app.use(express.json())

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

//retrieves all people from the DB
app.get('/api/people', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

app.post('/api/people', (request, response) => {
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


  Person.findOne({name: body.name})
    .then((foundPerson) => {
      if(foundPerson) {
        return response.status(400).json({
          error: `${body.name} alredy exists in the phonebook`
        })
      }  

  //The person doesn't exist in the collection, we should do the insertion
  const person = new Person ({
    name : body.name,
    number: body.number,
  })

  return person.save()
    .then((savedPerson) => {
      console.log(`Person added: ${savedPerson}`)
      response.status(201).json(savedPerson)
      //mongoose.connection.close()
    })
  })
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {

    const serverTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    console.log(`Server running on port ${PORT}`)
    console.log(`The server's timezone is "${serverTimeZone}`)
})