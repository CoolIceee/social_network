const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
  userMessageId1: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userMessageId2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userName: { type: String },
  chatId: { type: mongoose.Schema.Types.ObjectId },
  logoUsers: { type: String },
  message: { type: String },
  dataTime: { type: String },
})
const Message = mongoose.model('Message', messageSchema)

module.exports = Message
