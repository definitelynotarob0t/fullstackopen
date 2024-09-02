const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


const errorHandler = (error, request, response, next) => {
    if (error.name === 'SequelizeValidationError') {
      if (error.errors[0].message == "Validation isEmail on username failed") {
        return response.status(400).json({"error": "Validation isEmail on username failed"})
      }
    return response.status(400).json({ error: error.message })
    } else if (error.name === 'NotFoundError') { 
        return response.status(404).json({ error: 'Not found' })
    } else if (error.name === 'SequelizeDatabaseError') {
        return response.status(400).json({error: error.message})
    }

    console.error(error)
    response.status(500).json({ error: 'An unknown error occurred' })
  
    next(error)
  }
  
module.exports = {
  unknownEndpoint,
  errorHandler
}

