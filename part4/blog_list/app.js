require('dotenv').config()
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

mongoose.set('strictQuery', false)

logger.info('connecting to MongoDB')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

// Public routes (private routes handled in blogs.js)
app.use('/api/blogs', blogsRouter) // Public access for fetching blogs
app.use('/api/users', usersRouter) // Public access for users
app.use('/api/login', loginRouter) // Public access for login

// Error handling middleware
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app