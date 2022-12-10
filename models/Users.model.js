const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  chatsId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
  myPossibleFriends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  possibleFriends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  socketId: { type: String },
  online: { type: Boolean },
  logoUser: { type: String },
  photo: [{ type: String }],
})
const User = mongoose.model('User', userSchema)

module.exports = User
