import express from "express"
import userAuth from "../middlewares/UserAuth.js";
import { addToCartHandler, fetchCartItemsHandler, removeCartItem, totalCartItems, updateCartItemHandler } from "../controllers/Cart.js";
// create Router
const cartRouter = express.Router()


// route for add to cart product
cartRouter.get('/add', userAuth, addToCartHandler)

// route for fetching all cart items in cart page
cartRouter.get('/getcartitems', userAuth, fetchCartItemsHandler)

// route for update cart items
cartRouter.put('/updatecartitems/:pid', userAuth, updateCartItemHandler)

// route for getting cart products count
cartRouter.get('/cartprocounts', userAuth, totalCartItems)

// route for remove product from cart
cartRouter.get('/remove/:pid', userAuth, removeCartItem)


export default cartRouter