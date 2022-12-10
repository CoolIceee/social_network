const Users = require('../models/Users.model')
const OutgoingRequests = require('../models/OutgoingRequests.model')

module.exports.userDataController = {
  getOneUser: async (req, res) => {
    try {
      const userInfo = await Users.findById(req.params.id)

      res.json(userInfo)
    } catch (err) {
      res.status(404).json({ error: 'что-то пошло не так, повторите попытку!' })
    }
  },
}
