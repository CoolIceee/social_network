const { Router } = require("express")
const authMiddleware = require('../middleware/auth.middleware')
const { userDataController } = require('../controllers/userData.controller')
const router = Router()

router.get('/:id', authMiddleware, userDataController.getOneUser)

module.exports = router