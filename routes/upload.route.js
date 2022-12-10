const { Router } = require('express')
const { uploadController } = require('../controllers/upload.controller')
const authMiddleware = require('../middleware/auth.middleware')
const router = Router()

router.post('/avatar', authMiddleware, uploadController.postsAvatar)
router.get('/avatar', authMiddleware, uploadController.getIfoUser)
module.exports = router
