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

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (blog) {
    res.status(200).json(blog)
  } else {
    res.status(404).end()
  }
})

blogsRouter.post('/', async (req, res) => {
  const { title,
    author,
    url,
    likes
  } = req.body

  if ((!title) || (!author)) {
    return res.status(400).end()
  }

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes || 0
  })

  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', async(req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async(req, res) => {
  const { likes } = req.body
  //console.log(`Updating blog with ID: ${req.params.id}`)
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { likes: likes }, { new: true })

  if (!updatedBlog) {
    res.status(404).end()
  } else {
    res.status(200).json(updatedBlog)
  }

})

module.exports = blogsRouter