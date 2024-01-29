const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const getTokenFrom = request => {  const authorization = request.get('authorization') 
 if (authorization && authorization.startsWith('Bearer ')) {  
    return authorization.replace('Bearer ', '')  }  return null}


blogsRouter.get('/',  (request, response) => {
    Blog
      .find({}).populate({ path: 'user', select: 'name' })
      .then(blogs => {
        response.json(blogs)
      })


})

blogsRouter.post('/', async (request, response) => {
  const blog = request.body
  const decodedToken = jwt.verify(getTokenFrom(request), '121')  
  if (!decodedToken.id) {    return response.status(401).json({ error: 'token invalid' })  }  
  const user = await User.findById(decodedToken.id)
  
  const blogs = new Blog({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes, 
  user: user._id


  })

  
  const savedNote = await blogs.save()
  user.blogs = user.blogs.concat(savedNote._id)
  await user.save()

  response.json(savedNote)


  })

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, url, author, likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id,  { title, url, author, likes }, { new: true })

  response.json(updatedBlog)
})





module.exports = blogsRouter