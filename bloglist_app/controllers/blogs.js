const blogsRouter = require('express').Router()
const Blog = require('../models/blog')



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  blog ? response.json(blog) : response.status(404).end()
})
  
blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
  
})

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params

  const blog = await Blog.findById(id)
  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }
  await Blog.findByIdAndRemove(id)
  response.status(204).end()

})


// Update the likes property
blogsRouter.patch('/:id/likes', async (request, response) => {
  const { id } = request.params
  const { likes } = request.body

  // Check if the blog exists
  const blog = await Blog.findById(id)
  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  // Update the likes property
  blog.likes = likes
  await blog.save()

  response.json({ message: 'Likes updated successfully', blog })
})


module.exports = blogsRouter