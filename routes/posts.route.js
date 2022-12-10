const { Router } = require('express')
const { postsController } = require('../controllers/posts.controller')
const authMiddleware = require('../middleware/auth.middleware')

const router = Router()

router.post('/add', authMiddleware, postsController.addPost)
router.get('', postsController.getPost)
module.exports = router
