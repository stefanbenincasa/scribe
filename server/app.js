const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const path = require('path')

const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const noteRouter = require('./routes/note')

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static('public'));
app.use(cors({origin: 'http://localhost:3000'}))

app.use('/user', userRouter)
app.use('/note', noteRouter)
app.use('/', indexRouter)

app.use(function errorHandler(error, req, res, next) {
  console.log('Path: ', req.path)
  console.error('Error: ', error)

  if (error.type === 'bad request') {
    res.status(400).send(error)
  }
  else if(error.type === 'unauthorized') {
    res.status(401).send(error)
  }
  else if(error.type === 'not found') {
    res.status(404).send(error)
  }
  else if (!error.type) {
    res.status(500).send(error)
  }
}) 

module.exports = app
