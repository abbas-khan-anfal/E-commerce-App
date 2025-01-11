import express from 'express'
import { codOrderHandler, fetchOrdersForUser, orderStateUpdater, fetchOneOrder, deleteOrder, addOrderInStripe, verifyStripePayment } from '../controllers/Order.js'
import userAuth from '../middlewares/UserAuth.js'
// create router
const orderRouter = express.Router()

// route for add order in db with cod payment method
orderRouter.post('/cod-order',userAuth, codOrderHandler)

// route for add order in stripe
orderRouter.post('/stripe-order',userAuth, addOrderInStripe)

// route for for verify stripe payment and put order in db
orderRouter.post('/verify-stripe-payment',userAuth, verifyStripePayment)

// route to fetch orders for user
orderRouter.get('/ordersforuser',userAuth, fetchOrdersForUser)

// route to fetch one order details
orderRouter.get('/fetchoneorder',userAuth, fetchOneOrder)

// route to delete order (user can delete)
orderRouter.delete('/deleteorder',userAuth, deleteOrder)

// route to update order state
orderRouter.get('/orderstateupdate',userAuth, orderStateUpdater)

export default orderRouter