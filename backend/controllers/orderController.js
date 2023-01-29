import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

//  @desc  Create new order
//  @route POST /api/orders
//  @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
    user
  } = req.body

  if (orderItems && orderItems.lenght === 0) {
    res.status(400)
    throw new Error('Brak przedmiotów w zamówieniu')
    return
  } else {
    const order = new Order({
      orderItems,
      // user: req.user._id,
      user,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()

    return res.status(201).json(createdOrder)

  }

})

//  @desc  GET order ID
//  @route GET /api/orders/:id
//  @access Private

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email')

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Zamówienia nie znaleziono')
  }

})

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})

  res.json(orders)
})

export {addOrderItems, getOrderById, getOrders}
