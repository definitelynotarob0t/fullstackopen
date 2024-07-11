const Blog = require('../models/blog')
const User = require('../models/user')

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

const initialUsers = async () => {
  const passwordHash1 = await bcrypt.hash('salainen', 10)
  const passwordHash2 = await bcrypt.hash('salainen', 10)

  return [
      {
          username: 'root',
          name: 'Superuser',
          passwordHash: passwordHash1,
          token: null
      },
      {
          username: 'hellas',
          name: 'Arto Hellas',
          passwordHash: passwordHash2,
          token: null
      }
  ]
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, 
  nonExistingId, 
  blogsInDb,
  initialUsers,
  usersInDb
}