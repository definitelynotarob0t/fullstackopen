const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

// Fetch all blogs (public access)
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

// Middleware to protect routes below
blogsRouter.use(middleware.tokenExtractor)
blogsRouter.use(middleware.userExtractor)


// Add new blog (if user is authorised)
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'title or url missing' });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    likes: body.likes,
    url: body.url,
    user: user._id
  })
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

// Delete a blog (if user is authorised)
blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  console.log('user:', user)

  const blogToDelete = await Blog.findById(request.params.id).populate('user')
  console.log('blogToDelete:', blogToDelete)
  if (!blogToDelete) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if (blogToDelete.user._id.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'blogs can only be deleted by their creators' });
  } 

  const result = await Blog.findByIdAndDelete(request.params.id)
  console.log('result of deletion:', result)
  if (result) {
    response.status(204).end()
  } else {
    response.status(500).json({ error: 'blog deletion failed' })
  }
})

// Update a pre-existing blog's likes
blogsRouter.put('/:id', async (request, response) => {
  const body = await request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new : true })
  if (updatedBlog) {
    response.status(200).json(updatedBlog)
  } else {
    response.status(404).json({ error: 'blog not updated'})
  }
})

module.exports = blogsRouter