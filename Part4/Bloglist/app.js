const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const loginRouter = require('./controllers/login') 
const blogsRouter = require('./controllers/blog')     
const usersRouter = require('./controllers/users')   
const mongoose = require('mongoose')  
mongoose.set('strictQuery', false)   
const Blog = require('./models/blog')    
    
      
mongoose.connect(config.MONGODB_URI)
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
 
app.use('/api/blogs', blogsRouter) 
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app