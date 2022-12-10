const User = require('../models/Users.model')
const { v4: randomId } = require('uuid')
const path = require('path')

module.exports.uploadController = {
  postsAvatar: (req, res) => {
    try {
      const image = req.files.image
      const newFileName = `${randomId()}${path.extname(image.name)}`
      image.mv('static/' + newFileName, async err => {
        if (err) {
          res
            .status(404)
            .json({ error: 'что-то пошло не так, повторите попытку!' })
        } else {
          const user = await User.findById(req.user.id)

          user.logoUser = newFileName
          user.photo.push(newFileName)
          await user.save()
        }
      })
      res.json('ok')
    } catch (e) {
      res.json(e)
    }
  },
  getIfoUser: async (req, res) => {
    try {
      const dateAvatar = await User.findById(req.user.id)
      res.json([dateAvatar])
    } catch {
      res.status(404).json({ error: 'что-то пошло не так, повторите попытку!' })
    }
  },
}
