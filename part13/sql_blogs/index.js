const express = require('express')
const app = express()
require('express-async-errors')
const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
const { unknownEndpoint, errorHandler } = require('./util/middleware')

const router = express.Router();
const sessionValidator = require('./controllers/sessionvalidator');

router.get('/protected-route', sessionValidator, (req, res) => {
  res.status(200).send('This is a protected route');
});

const authorRouter = require('./controllers/authors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const readingListRouter = require('./controllers/readinglist')
const logoutRouter = require('./controllers/logout')

app.use(express.json())

app.use('/api/authors', authorRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/readinglist', readingListRouter)
app.use('/api/logout', logoutRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
