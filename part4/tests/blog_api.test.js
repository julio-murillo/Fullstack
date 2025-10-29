const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const blog = require('../models/blog')
//const { Console } = require('node:console')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe ('blogs retrieval', () => {
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

  test ('a randomly choosen blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const indexToView = helper.randomIndex()
    const blogToView = blogsAtStart[indexToView]

    //console.log(`retrieveing the blog # ${indexToView}: ${JSON.stringify(blogToView)}`)

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(resultBlog.body, blogToView)
  })

})

describe ('blogs creation', () => {
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

  test ('if the likes property is missing, it defaults to 0', async () => {
    const newBlog = {
      title: 'Fake blog title 2',
      author: 'Fake blog author 2',
      url: 'fakeblog2.com'
    }

    const postResponse = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const createdBlog = postResponse.body

    const retrievedBlog = await api.get(`/api/blogs/${createdBlog.id}`)

    assert.strictEqual(retrievedBlog.body.likes, 0)
  })

  test ('if the title property is missing status 400 Bad Request is returned', async () => {
    const newBlog = {
      author: 'Blog with no title',
      url: 'noTitleBlog.com',
      likes: 4
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test ('if the author property is missing status 400 Bad Request is returned', async () => {
    const newBlog = {
      title: 'Blog with no author',
      url: 'noAuthorBlog.com',
      likes: 6
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe ('deleting blogs', () => {
  test ('a randomly choosen blog can be deleted', async() => {
    const blogsAtStart = await helper.blogsInDb()
    const indexToDelete = helper.randomIndex()
    const blogToDelete = blogsAtStart[indexToDelete]

    //console.log(`blogs at start ${blogsAtStart.length}:  ${JSON.stringify(blogsAtStart)}`)
    //console.log(`blog being deleted has index # ${indexToDelete} and this is the content: ${JSON.stringify(blogToDelete)}`)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    //console.log(`blogs after the delete ${blogsAtEnd.length}: ${JSON.stringify(blogsAtEnd)}`)

    const titles = blogsAtEnd.map(blog => blog.title)
    assert(!titles.includes(blogToDelete.title))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  })

})

describe ('updating blogs', () => {
  test ('a randomly choosen blog can have its likes updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const indexToUpdate = helper.randomIndex()
    const blogToUpdate = blogsAtStart[indexToUpdate]

    //console.log(`ID of Blog to update:  ${blogToUpdate.id}`)
    //console.log(`All Blogs: ${JSON.stringify(blogsAtStart)}`)
    //console.log(`Chosen Blog; ${JSON.stringify(blogToUpdate)}`)
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: blogToUpdate.likes + 1 })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd.find(b => b.id == blogToUpdate.id)

    assert.strictEqual(updatedBlog.likes, blogToUpdate.likes + 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})