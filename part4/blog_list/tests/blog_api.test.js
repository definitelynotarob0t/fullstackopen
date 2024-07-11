require('dotenv').config()
const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
      await Blog.deleteMany({})
      await Blog.insertMany(helper.initialBlogs)

      await helper.initialUsers()
      for (const user of initialUsers) {
          const newUser = new User(user)
          await newUser.save()
      }
    })
  
    test('blogs are returned as json', async () => {
        await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
      })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
    
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
      })
  
    test('a specific blog is within the returned blogs', async () => {
      const response = await api.get('/api/blogs')
  
      const titles = response.body.map(r => r.title)
      assert(titles.includes('Testing post method'))
    })

    test('unique identifier property of the blog posts is named id', async () => {
        const response = await api.get('/api/blogs')
        const blogs = response.body
    
        blogs.forEach(blog => {
            assert('id' in blog)
            assert.strictEqual(typeof blog.id, 'string')
          })
    })
})

// describe('viewing a specific blog', () => {
//     test('succeeds with a valid id', async () => {
//       const blogsAtStart = await helper.blogsInDb()

//       const blogToView = blogsAtStart[0]

//       const resultBlog = await api
//         .get(`/api/blogs/${blogToView.id}`)
//         .expect(200)
//         .expect('Content-Type', /application\/json/)

//       assert.deepStrictEqual(resultBlog.body, blogToView)
//     })

//     test('fails with statuscode 404 if blog does not exist', async () => {
//       const validNonexistingId = await helper.nonExistingId()

//       await api
//         .get(`/api/blogs/${validNonexistingId}`)
//         .expect(404)
//     })

//     test('fails with statuscode 400 id is invalid', async () => {
//       const invalidId = '5a3d5da59070081a82a3445'

//       await api
//         .get(`/api/blogs/${invalidId}`)
//         .expect(400)
//     })
// })

describe('addition of a new blog', () => {
    test('adding new blog succeeds with valid data and token', async () => {
      const usersInDb = await helper.usersInDb()
      const user = usersInDb.find(u => u.username === 'root')
      console.log('user:', user)

      const userForToken = {
        username: user.username,
        id: user.id,  // using user.id instead of user._id since usersInDb maps to JSON
      }
      const token = jwt.sign(userForToken, process.env.SECRET)
      console.log('token:', token)

      const newBlog = {
            title: 'async/await simplifies making async calls',
            author: 'FullStackOpen',
            url: 'https://fullstackopen.com/en/part4/testing_the_backend#async-await'
        }
        
      await api 
        .post('/api/blogs')
        .send(newBlog)
        .set(`Authorization`, `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(r => r.title)
      assert(titles.includes('async/await simplifies making async calls'))
    })

    test('adding new blog fails with status code 401 if token is not provided', async () => {
      const newBlog = {
          title: 'async/await simplifies making async calls',
          author: 'FullStackOpen',
          url: 'https://fullstackopen.com/en/part4/testing_the_backend#async-await'
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
      console.log('No token provided, blog not added')
  })

    test("Status code will be 400 if there's no author/URL in new blog", async () => {
        const blogWithoutTitle = {
            author: 'FullStackOpen',
            url: 'https://fullstackopen.com/en/part4/testing_the_backend#exercises-4-8-4-12'
        }

    
        await api
        .post('/api/blogs')
        .send(blogWithoutTitle)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    
        const blogWithoutURL = {
            title: 'I have no URL',
            author: 'FullStackOpen'
        }
    
        await api
        .post('/api/blogs')
        .send(blogWithoutURL)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('likes property will default to zero if it is missing', async () => {
        const blogWithoutLikes = {
          title: 'I have no likes',
          author: 'FullStackOpen',
          url: 'https://fullstackopen.com/en/part4/testing_the_backend#async-await'
        }
    
        await api
        .post('/api/blogs')
        .send(blogWithoutLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')
        const blogs = response.body
        
        const addedBlog = blogs.find(blog => blog.title === blogWithoutLikes.title)
        assert.strictEqual(addedBlog.likes, 0)
    })
  })

describe('deletion of a blog', () => {
    test('deletion succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map(r => r.title)
      assert(!titles.includes(blogToDelete.title))
    })
})

describe('update of existing blog', () => {
    test('likes of an existing blog can be updated', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const updatedBlog = {
            title: blogToUpdate.title,
            author: blogToUpdate.author,
            url: blogToUpdate.url,
            likes: blogToUpdate.likes + 4
        }
        
        await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb() 
        const updatedBlogFromDb = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)

        assert.strictEqual(updatedBlogFromDb.likes, blogToUpdate.likes + 4)
    })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })
})

after(async () => {
    await mongoose.connection.close()
  })

