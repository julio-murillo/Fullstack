require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()

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
app.get('/api/people/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(foundPerson => {
      console.log(`Found person: ${JSON.stringify(foundPerson)}`)
      response.status(200).json(foundPerson)
    })
    .catch(error => next(error))
})

//deletes the person identified by 1d
app.delete('/api/people/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(deleted => {
      console.log(`Deleted document: ${deleted}`)
      response.status(200).json(deleted)
    })
    .catch(error => next(error))
})

app.post('/api/people', (request, response, next) => {
  const { name, number } = request.body

  {/*if(!name) {
    return response.status(400).json({
      error: 'name missing'
    })
  } else


  if (!number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }
  */}

  Person.findOne({ name })
    .then(foundPerson => {
      if (foundPerson) {
        //the person exists, therefore we should update the number
        return Person.findByIdAndUpdate(
          foundPerson.id, { number },
          { new: true, runValidators: true } //validation enforced!!!
        )
          .then(updatedPerson => {
            return response.status(200).json(updatedPerson)
          })
      } else {
        //the person does not exist, must be added to the collection
        const person = new Person({
          name: name,
          number: number
        })
        return person.save().then(savedPerson => {
          response.json(savedPerson)
        })
      }
    })
    .catch(error => next(error))
})

{/*app.post('/api/people', (request, response, next) => {
  const {name, number} = request.body

  const person = new Person({name, number})
  return person.save()
    .then(savedPerson => {
      console.log('Saving the person ', JSON.stringify(savedPerson))
      response.json(savedPerson)
    })
    .catch(error => next(error))
})*/}

//update a person by id
app.put('/api/people/:id', (request, response, next) => {
  const { name, number } = request.body
  const { id } = request.params

  //update only the number... per the logic of the app, the name cannot be updated
  Person.findByIdAndUpdate(id, { number }, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      if (!updatedPerson) {
      //The person does not exist...
        return response.status(404).json({ error: 'Person not found' })
      }
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
  Person.countDocuments({})
    .then((peopleCount) => {
      const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
        timeZoneName: 'longOffset'
      }
      const formatter = Intl.DateTimeFormat([], options)
      const timeZoneName = Intl.DateTimeFormat([], { timeZoneName: 'long' })
        .formatToParts().find(part => part.type === 'timeZoneName').value
      response.send(`
        <h3>Phonebook has info for ${peopleCount} people</h3>
        <h3>${formatter.format(Date.now())} (${timeZoneName})</h3>
      `)
    })
    .catch ((error) => {
      console.log(error)
      response.status(500).send({ error: 'failed to fetch phonebook info' })
    })
})

const unknownEndPoint = (request, response) => {
  response.status(404).json({ error: 'unknown endpoint' })
}

app.use(unknownEndPoint)

const errorHadler = (error, request, response, next) => {
  console.error(error.name, ' / ',error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    console.log('Validation error: ', error.message)
    return response.status(400).json({ error: error.message })
  }

  next(error)

}

app.use(errorHadler)

const PORT= process.env.PORT
app.listen(PORT, () => {
  const serverTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  console.log(`Server running on port ${PORT}`)
  console.log(`The server's timezone is "${serverTimeZone}`)
})