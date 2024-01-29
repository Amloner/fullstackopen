const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')
  console.log('inga paru')
  console.log(response.body)
  expect(response.body).toHaveLength(2)
})


test('existense of unique identifier', async () => {
  const response = await api.get('/api/blogs')
  console.log('inga paru')
  console.log(response.body[1])
  expect(response.body[1].id).toBeDefined()
})




test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('a valid blog can be added', async () => {
  const initialBlog = await api.get('/api/blogs')
  
  const newBlog = {
    title: 'criw',
    author: 'asaa',
    url: 'asda',
    likes: 12
    
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlog.length + 1)

})

test('blog with 0 likes', async () => {
  
  const newBlog = {
    title: 'criw',
    author: 'asaa',
    url: 'asda',    
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.likes)
  const cat = contents.slice(-1)[0]

  expect(cat).toBe("0")
})

test('put', async () => {
  
  const newBlog = {
    title: 'criw',
    author: 'asaa',
    url: 'asda',    
    likes : 12
  }

  await api
    .put('/api/blogs/:1')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs/:1')

  expect(newBlog.likes).toBe(response.likes)
})

test('a valid blog can be deleted', async () => {
  const initialBlog = await api.get('/api/blogs')

  await api
    .delete('/api/blogs/:1')
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlog.length - 1)

})


afterAll(async () => {
  await mongoose.connection.close()
})