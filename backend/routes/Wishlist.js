import express from "express"
import { addWishlistHandler, getAllWlistProducts, removeWishlistHandler, totalWshItems } from "../controllers/Wishlist.js";
import userAuth from "../middlewares/UserAuth.js";
// create Router
const wishlistRouter = express.Router()

// route for add wishlist
wishlistRouter.get('/add/:pid', userAuth, addWishlistHandler)

// route for remove product from wishlist
wishlistRouter.get('/remove/:pid', userAuth, removeWishlistHandler)

// route for fetching all wishlist products
wishlistRouter.get('/getwshproducts', userAuth, getAllWlistProducts)

// route for getting wishlist products count
wishlistRouter.get('/wshprocounts', userAuth, totalWshItems)


export default wishlistRouter