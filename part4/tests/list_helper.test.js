const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.deepStrictEqual(result, 1)
})

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
    likes: 15
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

const listWithSeveralBlogsTieOnFavoriteBlog = [
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
  }
]

describe('total likes', () => {
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
    assert.strictEqual(result, 74)
  })
})

describe('favorite blog', () => {
  test('when list has several blogs, and more that one blog share the max value, return the first one', () => {
    const result = listHelper.favoriteBlog(listWithSeveralBlogs)
    //console.log ('This is the favorite blog', result)
    assert.deepStrictEqual(result, {
      title: 'Test blog 2',
      author: 'Kathy Canessa',
      url: 'https://herblog.com',
      likes: 15
    })
  })
  test ('when list has no blogs, return null', () => {
    const result = listHelper.favoriteBlog(listWithNoBlogs)
    //console.log('This is the result of searching the favorite blog in a list with no blogs', result)
    assert.strictEqual(result, null)
  })
  test ('when list has only on blog, return that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result,  {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5
    })
  })
})

describe('author with most blogs', () => {
  test('when list has several blogs, and one author actually has more blogs than all others', () => {
    const result = listHelper.mostBlogs(listWithSeveralBlogs)
    //console.log('This is the author with the highest number of blogs in the list and the amount of blogs', result)
    assert.deepStrictEqual(result, {
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
  test('when list has several blogs, and there is a tie in the most blogs', () => {
    const result = listHelper.mostBlogs(listWithSeveralBlogsTieOnFavoriteBlog)
    //console.log('This is the author with the highest number of blogs in the list and the amount of blogs', result)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      blogs: 2
    })
  })
  test('when the list has only one blog, return that author and the count should be 1', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })
  test ('when the list is empty, return null', () => {
    const result = listHelper.mostBlogs(listWithNoBlogs)
    assert.strictEqual(result, null)
  })
})

describe('author with most likes', () => {
  test ('When the the list has several blogs and the author with most likes has several blogs, return the sum of the likes of each of the blogs', () => {
    const result = listHelper.mostLikes(listWithSeveralBlogs)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
  test ('When the list has no blogs, return null', () => {
    const result = listHelper.mostLikes(listWithNoBlogs)
    assert.strictEqual(result, null)
  })
  test ('When the list has only on blog, return the author and likes for that blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })
})