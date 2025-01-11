import express from 'express'
import { addProductHandler, deleteProductHandler, fetchDashProducts, fetchHomePageProducts, fetchProductsForShop, searchProductsHandler, showProductInForm, updateProductHandler } from '../controllers/Product.js'
import productUpload from '../config/Multer.js'
// create router
const productRouter = express.Router()

// router for add product
productRouter.post('/add', productUpload.fields([{'name' : 'img1', maxCount : 1},{'name' : 'img2', maxCount : 1},{'name' : 'img3', maxCount : 1}]), addProductHandler )

// router for delete product
productRouter.delete('/delete/:pid', deleteProductHandler )

// router for fetching all product
productRouter.get('/fetchfordash', fetchDashProducts )

// router to show product in form
productRouter.get('/productinform/:pid', showProductInForm)

// router for update product
productRouter.put('/update/:pid', productUpload.fields([{'name' : 'img1', maxCount : 1},{'name' : 'img2', maxCount : 1},{'name' : 'img3', maxCount : 1}]), updateProductHandler)

// router for searching product
productRouter.get('/searchproduct/:search', searchProductsHandler)

// router for fetching products for shop page
productRouter.get('/fetchforshop', fetchProductsForShop )

// router for fetching products in home page
productRouter.get('/homeproducts', fetchHomePageProducts )

export default productRouter