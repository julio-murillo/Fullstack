const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {

  if (!blogs || blogs.length === 0) return null

  const maxLikes =  Math.max(...blogs.map(blog => blog.likes))
  return blogs.find(blog => blog.likes===maxLikes)
}

const mostBlogs = (blogs) => {

  if (!blogs || blogs.length === 0) return null

  const [author, count] = _(blogs)
    .countBy('author')
    .toPairs()
    .maxBy(pair => pair[1])

  return { author, blogs: count }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}