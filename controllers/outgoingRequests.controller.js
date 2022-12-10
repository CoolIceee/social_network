// const OutgoingRequests = require('../models/OutgoingRequests.model')
const IncomingRequests = require('../models/IncomingRequests.model')
const Users = require('../models/Users.model')
const Friends = require('../models/Friends.model')
module.exports.outgoingRequestsController = {
  sendingRequest: async (req, res) => {
    try {
      await IncomingRequests.create({
        user: req.user.id,
        acceptingRequest: req.params.id,
      })
      const userInfo = await Users.findById(req.params.id)
      const myInfo = await Users.findById(req.user.id)
      const myId = myInfo._id
      const id = userInfo._id

      await Users.findByIdAndUpdate(req.user.id, {
        $push: { possibleFriends: id },
      })
      await Users.findByIdAndUpdate(req.params.id, {
        $push: { myPossibleFriends: myId },
      })

      res.json('успех')
    } catch (err) {
      res.json(err)
    }
  },
  deleteAcquisition: async (req, res) => {
    try {
      const reqData = await IncomingRequests.find({
        user: req.user.id,
      })
      reqData.map(async data => {
        return await IncomingRequests.findByIdAndDelete(data.id)
      })

      await Users.findByIdAndUpdate(req.user.id, {
        $pull: { possibleFriends: req.params.id },
      })
      await Users.findByIdAndUpdate(req.params.id, {
        $pull: { myPossibleFriends: req.user.id },
      })

      res.json('успех')
    } catch (err) {
      res.json('ошибка')
    }
  },
  dataOkay: async (req, res) => {
    try {
      const data = await Users.findById(req.user.id)
      const dataTwo = await Users.findById(req.params.id)
      await Users.findByIdAndUpdate(req.user.id, {
        $pull: { myPossibleFriends: req.params.id },
      })
      await Users.findByIdAndUpdate(req.params.id, {
        $pull: { possibleFriends: req.user.id },
      })
      await Users.findByIdAndUpdate(req.params.id, {
        $push: { friends: req.user.id },
      })
      await Users.findByIdAndUpdate(req.user.id, {
        $push: { friends: req.params.id },
      })

      res.json('успех')
    } catch (err) {
      res.json('ошибка')
    }
  },
  getDataFriends: async (req, res) => {
    try {
      const data = await Users.findById(req.user.id).populate('friends')
      res.json([data])
    } catch (err) {
      res.json('ошибка')
    }
  },
  DataFriends: async (req, res) => {
    try {
      const data = await IncomingRequests.find({
        acceptingRequest: req.user.id,
      })
      res.json(data)
    } catch {}
  },
  usersFriends: async (req, res) => {
    try {
      const array = await Users.findById(req.user.id).populate('friends')
      const user = await Users.findById(req.params.id).populate(
        'myPossibleFriends possibleFriends'
      )
      res.json({ array, user })
    } catch {
      res.json("err")
    }
  }
}
