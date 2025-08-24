const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.deepStrictEqual(result, 1)
})


describe('total likes', () => {
  const listWithOneBlog = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5
    }
  ]

  const listWithNoBlogs = [
  ]

  const listWithSeveralBlogs = [
    {
      title: 'Test blog',
      author: 'Julio Murillo',
      url: 'https://myblog.com',
      likes: 5
    },
    {
      title: 'Test blog 2',
      author: 'Kathy Canessa',
      url: 'https://herblog.com',
      likes: 18
    },
    {
      title: 'Test blog X',
      author: 'Matias Murillo Canessa',
      url: 'https://hisblog.com/Matias',
      likes: 13
    },
    {
      title: 'Test blog Y',
      author: 'Camila Murillo Canessa',
      url: 'https://theblog.com/Matias',
      likes: 15
    },
    {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12
    },
    {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 0
    },
    {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0
    },
    {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('when list has no blogs, equals 0', () => {
    const result = listHelper.totalLikes(listWithNoBlogs)
    assert.strictEqual(result, 0)
  })

  test('when list has several blogs, equals the sum of the likes of all blogs', () => {
    const result = listHelper.totalLikes(listWithSeveralBlogs)
    assert.strictEqual(result, 77)
  })
})

describe('favorite blog', () => {
  const listWithSeveralBlogs = [
    {
      title: 'Test blog',
      author: 'Julio Murillo',
      url: 'https://myblog.com',
      likes: 5
    },
    {
      title: 'Test blog 2',
      author: 'Kathy Canessa',
      url: 'https://herblog.com',
      likes: 18
    },
    {
      title: 'Test blog X',
      author: 'Matias Murillo Canessa',
      url: 'https://hisblog.com/Matias',
      likes: 13
    },
    {
      title: 'Test blog Y',
      author: 'Camila Murillo Canessa',
      url: 'https://theblog.com/Matias',
      likes: 15
    },
    {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12
    },
    {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 18
    },
    {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0
    },
    {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2
    }
  ]

  test('when list has several blogs, and more that one blog share the max value, return the first one', () => {
    const result = listHelper.favoriteBlog(listWithSeveralBlogs)
    //console.log ('This is the favorite blog', result)
    assert.deepStrictEqual(result, { title: 'Test blog 2', author: 'Kathy Canessa', url: 'https://herblog.com', likes: 18 })
  })
})