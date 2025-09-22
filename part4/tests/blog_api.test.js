const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test ('blogs are returned as json and the right number of blogs is returned', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test ('the unique identifier property of the blog post is named id', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogs = response.body
  const blog = blogs[0]

  assert.ok(blog.id, 'Expects blog.id to be defined')
})

test ('making a post to /api/blogs creates a new post', async () => {
  const newBlog = {
    title: 'Fake blog title',
    author: 'Fake blog author',
    url: 'fakeblog.com',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const found = response.body.find(
    blog =>
      blog.title === newBlog.title &&
      blog.author === newBlog.author &&
      blog.url === newBlog.url &&
      blog.likes === newBlog.likes
  )

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

  assert.ok(found, 'The inserted blog was not found')
})


after(async () => {
  await mongoose.connection.close()
})