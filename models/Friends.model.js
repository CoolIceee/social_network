const mongoose = require('mongoose')

const friendsSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})

const Friends = mongoose.model('Friends', friendsSchema)
module.exports = Friends
