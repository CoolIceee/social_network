const { Router } = require('express')
const { body } = require('express-validator')
const { userController } = require('../controllers/user.controller')
const authMiddleware = require('../middleware/auth.middleware')
const router = Router()

router.post(
  '/register',
  [body('email', { error: 'Некорректный email' }).isEmail()],
  
  userController.registerUser
)
router.post('/login', userController.loginUser)
router.get('', userController.getUsers)
router.get('/my/data', authMiddleware, userController.getMyData)

module.exports = router
