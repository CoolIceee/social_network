const mongoose = require('mongoose')

const OutgoingRequestsSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  sendingRequest: { type: mongoose.Schema.Types.ObjectId },
})
const OutgoingRequests = mongoose.model(
  'OutgoingRequests',
  OutgoingRequestsSchema
)

module.exports = OutgoingRequests
