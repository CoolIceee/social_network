const { Router } = require('express')
const {
  outgoingRequestsController,
} = require('../controllers/outgoingRequests.controller')
const authMiddleware = require('../middleware/auth.middleware')

const router = Router()

router.post(
  '/sending/:id',
  authMiddleware,
  outgoingRequestsController.sendingRequest
)
router.post(
  '/delete/:id',
  authMiddleware,
  outgoingRequestsController.deleteAcquisition
)
router.post(
  '/add/friends/:id',
  authMiddleware,
  outgoingRequestsController.dataOkay
)
router.get(
  '/get/friends',
  authMiddleware,
  outgoingRequestsController.getDataFriends
)
router.get(
  '/data/acquisition',
  authMiddleware,
  outgoingRequestsController.DataFriends
)
router.get(
  '/user/info/:id',
  authMiddleware,
  outgoingRequestsController.usersFriends
)
module.exports = router
