const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
  usersId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  message: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
})

const Chat = mongoose.model('Chat', chatSchema)
module.exports = Chat
