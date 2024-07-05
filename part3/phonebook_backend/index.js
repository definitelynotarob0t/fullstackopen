require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
var morgan = require('morgan')
const Person = require('./models/persons')

app.use(express.static('dist'))
app.use(express.json())
morgan.token('entry', function (request, response) { return JSON.stringify(request.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :entry'))
app.use(cors())

// Route to array of persons
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// Route to info page
app.get('/info', (request, response, next) => {
    Person.countDocuments({})
      .then(count => {
        const date = new Date()
        response.send(`
          <p>Phonebook has info for ${count} people</p>
          <p>${date}</p>
        `)
      })
      .catch(error => next(error))
  })

// Route to see individual person object
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
  })

// Delete a person from the database
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

// Add a new person to the database
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ 
        error: 'name or number missing' 
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
        // id: generateId(),
    })

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  })

// Update existing person's number if an entry is made with a pre-existing name
app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body
  
  const updatedPerson = {
    name: body.name,
    number: body.number
  };

  Person.findByIdAndUpdate(id, updatedPerson, { new: true })
    .then(updatedPerson => {
      if (updatedPerson) {
        response.json(updatedPerson);
      } else {
        response.status(404).send({ error: 'Person not found' });
      }
    })
    .catch(error => next(error));
});

// Error handling
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
    next(error)
  }

app.use(errorHandler)

  
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})





