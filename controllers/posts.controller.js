const Post = require('../models/Posts.model')
const { v4: randomId } = require('uuid')
const path = require('path')
module.exports.postsController = {
  addPost: async (req, res) => {
    try {
      const { text } = req.body
      await Post.create({
        user: req.user.id,
        name: req.user.login,
        text,
      })
      res.json('добавлно')
    } catch (err) {
      res.status(404).json({ error: 'что-то пошло не так, повторите попытку!' })
    }
  },
  getPost: async (req, res) => {
    try {
      const data = await Post.find()
      res.json(data.reverse())
    } catch (e) {
      res.status(404).json({ error: 'что-то пошло не так, повторите попытку!' })
    }
  },
}
