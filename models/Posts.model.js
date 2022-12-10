const mongoose = require('mongoose')

const postsSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  name: { type: String, required: true },
  text: { type: String },
  img: { type: String },
})

const Post = mongoose.model('Post', postsSchema)
module.exports = Post
