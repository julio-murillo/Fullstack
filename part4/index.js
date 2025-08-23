const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
//const mongoose = require('mongoose')
const Blog = require('./models/blog')
const logger = require('./utils/logger')

const app = express()

{/*const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})*/}

//const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = config.MONGODB_URI

//Blog.mongoose.connect(mongoUrl)

//mongoose.connect(mongoUrl)
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

const PORT = process.env.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})