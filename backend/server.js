import express, { json } from 'express'
import 'dotenv/config'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import connectDB from './config/MongoDB.js'
import adminRouter from './routes/Admin.js'
import userRouter  from './routes/User.js'
import categoryRouter from './routes/Category.js'
import brandRouter from './routes/Brand.js'
import productRouter from './routes/Product.js'
import messageRouter from './routes/Message.js'
import wishlistRouter from './routes/Wishlist.js'
import cartRouter from './routes/Cart.js'
import orderRouter from './routes/Order.js'
import homeRouter from './routes/DashHome.js'

// app config
const app = express()
connectDB()

// static files
app.use('/uploads', express.static('uploads'))

// middlewares
app.use(express.json())
app.use(cors({
  origin : [process.env.FRONTEND_URL],
  methods : ["POST", "GET", "PUT", "DELETE"],
  credentials : true
}))
app.use(cookieParser())

// endpoints

// api for admin
app.use('/admin', adminRouter)

// api for user
app.use('/user', userRouter)

// api for category
app.use('/category', categoryRouter)

// api for brand
app.use('/brand', brandRouter)

// api for product
app.use('/product', productRouter)

// api for wishlist
app.use('/wishlist', wishlistRouter)

// api for cart
app.use('/cart', cartRouter)

// api for order
app.use('/order', orderRouter)

// api for dashboard home page
app.use('/dashhome', homeRouter)



// api for user message
app.use('/message', messageRouter)

// api for server checking
app.get('/', (req, res) => {
  res.json({success : true, message : "Hello api"});
})

// app.listen(process.env.PORT, () => console.log(`App Listening on Port ${process.env.PORT} On Development Mode`))

// server listening
// app.listen(port, () => {
//   console.log(`App listening on port ${port}`)
// })

export default app;
