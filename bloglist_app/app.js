/* eslint-disable no-undef */
require('dotenv').config()
const express = require('express')
const app = express()
const blogRouter = require('./controllers/blogs')
const {connect} = require('./db')


process.env.NODE_ENV === 'test'
  ? console.log('Testing......')
  : connect()

app.use(express.json())
app.use('/api/blogs', blogRouter)



module.exports = app