const Users = require('../models/Users.model')

module.exports.mainController = {
  doOnline: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id)
      user.online = true
        await user.save()
        
      await setTimeout(off, 240000)
      async function off() {
        user.online = false
        await user.save()
      }
      res.json('успех')
    } catch (error) {
      res.json(error)
    }
  },
}
