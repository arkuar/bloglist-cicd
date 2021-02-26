const path = require('path')
const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.tokenExtractor)
app.use(express.static(path.join(__dirname, '../build')))

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.get('/health', (req, res) => {
  res.send('ok')
})

app.use(middleware.errorHandler)

module.exports = app
