/* eslint-disable no-undef */
//const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const dB = require('../db')
const helper = require('../utils/blog_helper')
const Blog = require('../models/blog')


const expect = chai.expect
chai.use(chaiHttp)



describe('blog application', () => {

  beforeEach( async () => {
    try {
      // await dB.connect()
      await Blog.deleteMany({})
      await Blog.create(helper.initialBlogs)
      // console.log('Documents added successfully:', addedBlogs)
    } catch (error) {
      console.error('Error adding documents:', error)
    }
    

  }, 50000)

  after(async () => {
    await dB.disConnect()
  })

  describe('returning blogs correctly', () => {
    it('notes are returned as json',  async () => {
      const res = await chai.request(app).get('/api/blogs')
      // console.log(res.body)
      expect(res).to.have.status(200)
      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.greaterThan(0)
    })

    it('all blogs are returned', async () => {
      const response = await chai.request(app).get('/api/blogs')
      expect(response.body.length).to.be.equal(helper.initialBlogs.length)
    })

    it('unique identifier of a blog post', async () => {
      const response = await chai.request(app).get('/api/blogs')
      expect(response.body[0].id).to.exist
    })

    it('get a specific blog', async () => {
      const allBlogs = await helper.blogsInDb()
      const specificBlog = allBlogs[0]

      const res = await chai.request(app).get(`/api/blogs/${specificBlog.id}`)
      expect(res).to.have.status(200)
      expect(res.headers)
        .to.have.property('content-type')
        .that.matches(/application\/json/)  
    })

  
  })

  describe('deleting blogs', () => {
    it('a blog can be deleted', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      const res = await chai.request(app).delete(`/api/blogs/${blogToDelete.id}`)
      expect(res).to.have.status(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).to.be.equal(helper.initialBlogs.length - 1)
    })

    
    it('deleting a blog with non-existing id', async () => {
      const blogIdToDelete = await helper.nonExistingId()
      
      const res = await chai.request(app).delete(`/api/blogs${blogIdToDelete}`)
      expect(res).to.have.status(404)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).to.be.equal(helper.initialBlogs.length)
    })
    
  })

  describe('adding a blog post', () => {
    it('a valid blog post', async () => {
      const blogPost = {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10
      }

      const res = await chai.request(app).post('/api/blogs').send(blogPost)
      expect(res).to.have.status(201)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).to.be.equal(helper.initialBlogs.length + 1)

    })

    it('missing like property', async () => {
      const blogPost = {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll'
      }
  
      const res = await chai.request(app).post('/api/blogs').send(blogPost)
      expect(res).to.have.status(201)
      expect(res.headers)
        .to.have.property('content-type')
        .that.matches(/application\/json/)
  
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).to.be.equal(helper.initialBlogs.length + 1)
  
    })

    it('missing vital properties not added', async () => {
      const blogPost = {
        author: 'Robert C. Martin',
        likes: 10
      }

      const res = await chai.request(app).post('/api/blogs').send(blogPost)
      expect(res).to.have.status(422)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).to.be.equal(helper.initialBlogs.length)

    })


  })

  describe('updating blog posts', () => {
    it('updating the number of likes', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const likesAtStart = blogToUpdate.likes
      const blogIdToUpdate = blogToUpdate.id
      //Updating the likes
      blogToUpdate.likes += 1

      const res = await chai.request(app)
        .patch(`/api/blogs/${blogIdToUpdate}/likes`)
        .send(blogToUpdate)

      expect(res).to.have.status(200)

      const blogsAtEnd = await helper.blogsInDb()
      const likesAtEnd = blogsAtEnd.find(blog => blog.id === blogToUpdate.id).likes
      expect(likesAtEnd).to.be.greaterThan(likesAtStart)

    })
  })
  
})



