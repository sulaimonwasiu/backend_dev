const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  blog ? response.json(blog) : response.status(404).end()
})
  
blogsRouter.post('/', middleware.userExtractor ,async (request, response) => {
  const body = request.body
  const user = request.user
  const blog = new Blog({...body, user: user._id })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor ,async (request, response) => {

  const blog = await Blog.findById(request.params.id)
  !blog ? response.status(404).end() : null
  const user = request.user

  if (blog.user.toString() === user._id.toString() ){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }else{
    response.status(401).json({
      'message': 'this user is not authorized to delete this note'
    })
  }
})



// Update the likes property
blogsRouter.patch('/:id/likes', middleware.userExtractor, async (request, response) => {
  const { id } = request.params
  //const { likes } = request.body

  const user = request.user

  // Check if the blog exists
  const blog = await Blog.findById(id)
  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  if (blog.user.toString() === user._id.toString() ){
    // Update the likes property
    blog.likes += 1
    await blog.save()
    response.json({ message: 'Likes updated successfully', blog })

  }else{
    response.status(401).json({
      'message': 'this user is not authorized to update this blog'
    })
  }
})


module.exports = blogsRouter