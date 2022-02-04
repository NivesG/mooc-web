const blogRouter = require('express').Router()
const { response } = require('express')
const { request } = require('../app')
const Blog = require('../models/blog')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const blogs = await blog.save()
  response.status(201).json(blogs)
})

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndRemove(id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const { body } = request
  const { id } = request.params

  const blog = {
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })

  if (updatedBlog) {
    response.status(200).json(updatedBlog.toJSON())
  } else {
    response.status(404).end()
  }
})


module.exports = blogRouter
