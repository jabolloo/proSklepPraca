import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById, getOrderByUserId, getOrders
} from '../controllers/orderController.js'
import protect  from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems)
router.route('/').get(getOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/user/:userId').get(protect, getOrderByUserId)

export default router

