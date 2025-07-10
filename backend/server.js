import express from 'express'
import 'dotenv/config'
import cors from 'cors'

import cookieParser from 'cookie-parser'
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
import {GlobalError} from './utils/GlobalError.js';
import connectDB from './config/Db.js'

// app config
const app = express()
connectDB();

// static files
// app.use('/uploads', express.static('uploads'))

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin : ["https://e-commerce-frontend-five-mauve.vercel.app"],
  methods : ["POST", "GET", "PUT", "DELETE"],
  credentials : true
}));

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
  res.send("Hello world! Api is working fine");
})

// use global error
app.use(GlobalError);


// app.listen(process.env.PORT, () => console.log(`App Listening on Port ${process.env.PORT} On Development Mode`))

// server listening
// app.listen(port, () => {
//   console.log(`App listening on port ${port}`)
// })

export default app;
