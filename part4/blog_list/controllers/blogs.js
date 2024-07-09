const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'title or url missing' });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    likes: body.likes,
    url: body.url
  })
  
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const result = await Blog.findByIdAndDelete(request.params.id);
  if (result) {
    response.status(204).end();
  } else {
    response.status(404).json({ error: 'blog not found' });
  }
})

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