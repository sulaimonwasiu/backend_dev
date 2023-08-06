//const { request } = require('../app')
const logger = require('./logger')

const requestLogger = (req, res, next) => {

  const { method, url, query, body } = req
  const timestamp = new Date().toISOString()

  logger.info(`${timestamp} - ${method} ${url}`)
  logger.info('Query Parameters:', query)
  logger.info('Request Body:', body)

  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

/*
const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }

  logger.error(error.message)

  next(error)
}
*/

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      error: 'Validation Error',
      errors: err.message
    })
  }
  
  // Handle CastError
  if (err.name === 'CastError') {
    return res.status(400).json({
      error: 'Cast Error',
      message: 'Invalid ID'
    })
  }
  
  // Handle JSON Web Token errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid token'
    })
  }
  
  // Handle SyntaxError
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      error: 'Syntax Error',
      message: 'Invalid JSON payload'
    })
  }
  
  // Handle other types of errors
  logger.error(err.message)
  
  res.status(500).json({
    error: 'Internal Server Error'
  })
}



module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}