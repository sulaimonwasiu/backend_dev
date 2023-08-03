const express = require('express')
const app = express()
const blogRouter = require('./controllers/blogs')
const dBconnect = require('./db')




dBconnect()

app.use(express.json())
app.use('/api/blogs', blogRouter)



module.exports = app