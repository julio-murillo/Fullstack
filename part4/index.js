const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
//const mongoose = require('mongoose')
const Blog = require('./models/blog')
const logger = require('./utils/logger')

const app = express()

app.use(express.json())


//const mongoUrl = config.MONGODB_URI

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error(`error connecting to MongoDB: ${error.message}`)
  })

app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

const unknownEndPoint = (request, response) => {
  response.status(404).json({error: 'unknown endpoint'})
}

app.use(unknownEndPoint)

const errorHadler = (error, request, response, next) => {
  console.error(error.name, ' / ',error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id'})
  } else if (error.name === 'ValidationError') {
    console.log('Validation error: ', error.message)
    return response.status(400).json({error: error.message})
  }

  next(error)

}

app.use(errorHadler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})