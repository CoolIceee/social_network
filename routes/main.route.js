const { Router } = require('express')
const { mainController } = require('../controllers/main.controller')
const authMiddleware = require('../middleware/auth.middleware')
const router = Router()

router.post('/do/online', authMiddleware, mainController.doOnline)

module.exports = router
