const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when there is initially some users saved', () => {
    beforeEach(async () => {
      await User.deleteMany({})
      await User.insertMany(helper.initialUsers)
    })
  
    test('users are returned as json', async () => {
        await api
          .get('/api/users')
          .expect(200)
          .expect('Content-Type', /application\/json/)
      })

    test('all users are returned', async () => {
        const response = await api.get('/api/users')
    
        assert.strictEqual(response.body.length, helper.initialUsers.length)
      })
})

describe('adding a new user', () => {
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'mluukkai',
          name: 'Matti Luukkainen',
          password: 'salainen',
        }
    
        await api
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    
        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
      })
    
    test('creation fails when username / password is invalid', async () => {
        const usersAtStart = await helper.usersInDb()
        // console.log('usersAtStart:', usersAtStart)
    
        const invalidUser = {
          name: 'Invalid Username',
          password: 'salainen',
        }

        await api
        .post('/api/users')
        .send(invalidUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const invalidUser2 = {
            username: "mluukkai",
            name: 'Invalid Password',
        }

        await api
        .post('/api/users')
        .send(invalidUser2)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const invalidUser3 = {
            username: "m",
            name: 'Invalid Username',
            password: 'salainen'
        }

        await api
        .post('/api/users')
        .send(invalidUser3)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
        // console.log('usersAtEnd:', usersAtEnd)
    
        const usernames = usersAtEnd.map(u => u.username)
        assert(!usernames.includes(invalidUser3.username))
    })
})


after(async () => {
    await mongoose.connection.close()
  })

