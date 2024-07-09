const Blog = require('../models/blog')

const initialBlogs = [
    {
      title: "Testing post method",
      author: "Brianna",
      url: "http://testingpostmethodblog.com",
      likes: 223,
      id: "66878bfd078096cb584f32e7"
    },
    {
      title: "Testing after refactoring modules",
      author: "Brianna S",
      url: "http://testing_refactored_modules_blog.com",
      likes: 0,
      id: "66879e0fbf784d514df0fb99"
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon' })
    await blog.save()
    await blog.deleteOne()
  
    return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, 
  nonExistingId, 
  blogsInDb
}