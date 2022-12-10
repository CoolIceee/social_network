const { Router } = require('express')
const router = Router()

router.use('/users', require('./user.route'))
router.use('/posts', require('./posts.route'))
router.use('/upload', require('./upload.route'))
router.use('/requests', require('./outgoingRequests.route'))
router.use('/main', require('./main.route'))
router.use('/data', require('./userData.route'))
router.use('/message', require('./chat/message.route'))

module.exports = router
