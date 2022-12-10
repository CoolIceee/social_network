const { Router } = require('express')
const {
  messageController,
} = require('../../controllers/chat/message.controller')
const authMiddleware = require('../../middleware/auth.middleware')
const router = Router()

router.post('/create/chat/:id', authMiddleware, messageController.createChat)
router.post('/create/:id/:user',authMiddleware, messageController.postMessages)
router.get('/get', authMiddleware, messageController.getMessages)
router.get('/get/one/:id', authMiddleware, messageController.getMessagesOneChat)
module.exports = router
