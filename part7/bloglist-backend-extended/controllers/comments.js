const commentsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comments')


commentsRouter.post('/:id/comments', async (request, response) => {
  const { body } = request
  const { id } = request.params


  const blog = await Blog.findById(id)

  const comment = new Comment({
    content: body.content
  })

  const savedComment = await comment.save()

  blog.comments = blog.comments.concat(savedComment)
  await blog.save()
  response.status(201).json(savedComment.toJSON())
})

commentsRouter.get('/:id/comments', async (request, response) => {
  const { id } = request.params
  const blogComments = await Blog.findById(id).populate('comments')
  response.json('BAZA', blogComments)
})

module.exports = commentsRouter