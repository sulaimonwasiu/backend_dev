/* eslint-disable no-undef */
require('dotenv').config()
const express = require('express')
require('express-async-errors')
const app = express()
const blogRouter = require('./controllers/blogs')
const {connect} = require('./db')
const middleware = require('./utils/middleware')



connect()

app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



module.exports = app