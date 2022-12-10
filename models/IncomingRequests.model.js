const mongoose = require('mongoose')

const IncomingRequestsSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  acceptingRequest: { type: mongoose.Schema.Types.ObjectId },
})

const IncomingRequests = mongoose.model(
  'IncomingRequests',
  IncomingRequestsSchema
)

module.exports = IncomingRequests
