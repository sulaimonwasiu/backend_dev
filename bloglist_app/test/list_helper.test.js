/* eslint-disable no-undef */
const listHelper = require('../utils/list_helper')
const assert = require('assert')
const manyBlogs = require('../utils/blogs')

// eslint-disable-next-line no-undef
it('dummy returns one', () => {
  const blogs = []
      
  const result = listHelper.dummy(blogs)
  assert.equal(result, 1)
    
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const emptyBlog = []

  it('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyBlog)
    assert.equal(result, 0)
  })
  
  it('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.equal(result, 5)
  })

  it('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(manyBlogs.blogs)
    assert.equal(result,36)
  })

})

describe('favorite blog', () => {
  it('blog with the highest number of likes', () => {
    const result = listHelper.favoriteBlog(manyBlogs.blogs)
    assert.deepStrictEqual(result,{
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })
})

describe('most blogs', () => {
  it('author with the most blogs', () => {
    const result = listHelper.mostBlogs(manyBlogs.blogs)
    assert.deepStrictEqual(result,{
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('most likes', () => {
  it('author with the most liked blog posts', () => {
    const result = listHelper.mostLikes(manyBlogs.blogs)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})
