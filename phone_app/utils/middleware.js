const logger = require('./logger');

const requestLogger = (req, res, next) => {
    logger.info(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
}

// Middleware function to handle unknown route
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message);
  
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }
  
    next(error);
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}