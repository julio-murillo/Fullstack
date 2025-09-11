const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  if (blogs) {
    res.status(200).json(blogs)
  } else {
    res.status(404).end()
  }
})

blogsRouter.post('/', (res, req, next) => {
  const { title,
    author,
    url,
    likes
  } = req.body

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes
  })

  blog.save()
    .then(savedBlog => {
      res.json(savedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter