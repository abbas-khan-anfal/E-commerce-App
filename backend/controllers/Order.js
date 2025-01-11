import ordersModel from "../models/OrdersModel.js"
import cartModel from '../models/CartModel.js'
import userModel from '../models/UserModel.js'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// function for add order with cod
const codOrderHandler = async (req, res, next) => {
    try
    {
        const { fName, lName, city, state, zip, phone, email, orderNote, address1, address2, paymentMethod } = req.body
        const { _id } = req.user

        const cartItems = await cartModel.find({u_id : _id}).populate('p_id')

        if(cartItems.length === 0)
        {
            return res.status(404).json({
                success : false,
                message : "Your cart is empty"
            });
        }

        // get all product ids and total_amount
        let pIds = [];
        let totalAmount = 0;
        cartItems.forEach((item) => {
            pIds.push(item.p_id._id)
            totalAmount = totalAmount + item.qty * item.p_id.fixed_price
        })

        const order = await ordersModel.create({
            u_id : _id,
            p_ids : pIds,
            f_name : fName,
            l_name : lName,
            address1,
            address2,
            phone,
            email,
            zip,
            state,
            city,
            order_note : orderNote,
            total_amount : totalAmount,
            payment_method : paymentMethod,
        })

        await userModel.findByIdAndUpdate(
            _id,
            { $inc : { items_purchased : 1 } }
        )

        await cartModel.deleteMany({u_id : _id});

        
        
        res.json({
            success : true,
            message : "Order placed successfully",
        })
    }
    catch(error)
    {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

// function for add order in stripe
const addOrderInStripe = async (req, res, next) => {
    try
    {
        const { fName, lName, city, state, zip, phone, email, orderNote, address1, address2, paymentMethod } = req.body
        const { _id } = req.user

        const cartItems = await cartModel.find({u_id : _id}).populate('p_id')

        // check if cart item exists or not
        if(cartItems.length === 0)
        {
            return res.status(404).json({
                success : false,
                message : "Your cart is empty"
            });
        }


        // create lineItems for stirpe checkout session
        const lineItems = cartItems.map((item) => (
            {
                price_data: {
                    currency: 'usd',
                    product_data : {
                        name : item.p_id.p_title,
                        images : [item.p_id.img_path1]
                    },
                    unit_amount: Math.round(item.p_id.fixed_price * 100),
                },
                quantity: item.qty,
            }
        ))


        // // create stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/user/cart`,
            metadata : {
                fName, lName, city, state, zip, phone, email, orderNote, address1, address2
            }
        })
        
        res.json({url : session.url})
    }
    catch(error)
    {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}


// function to verify stripe payment and add order in db
const verifyStripePayment = async (req, res, next) => {
    try
    {
        const { _id } = req.user
        const { sessionId } = req.body

        const existOrder = await ordersModel.findOne({payment_session_id : sessionId});

        if(existOrder)
        {
            return res.status(401).json({
                success : false,
                message : "Order already exists"
                })
        }

        const cartItems = await cartModel.find({u_id : _id}).populate('p_id')

        // check if cart item exists or not
        if(cartItems.length === 0)
        {
            return res.status(404).json({
                success : false,
                message : "Your cart is empty"
            });
        }

        let pIds = [];
        let subTotal = 0;
        cartItems.forEach((item) => {
            pIds.push(item.p_id._id)
            subTotal = subTotal + item.p_id.fixed_price * item.qty
        })

        // get session data and put it in db
        const session = await stripe.checkout.sessions.retrieve(sessionId)

        if(session.payment_status == "paid")
        {
            const order = await ordersModel.create({
                payment_session_id : sessionId,
                u_id : _id,
                p_ids : pIds,
                f_name : session.metadata.fName,
                l_name : session.metadata.lName,
                address1 : session.metadata.address1,
                address2 : session.metadata.address2,
                phone : session.metadata.phone,
                email : session.metadata.email,
                zip : session.metadata.zip,
                city : session.metadata.city,
                state : session.metadata.state,
                order_note : session.metadata.orderNote,
                total_amount : subTotal,
                payment_method : session.payment_method_types[0],
            })

            await userModel.findByIdAndUpdate(
                _id,
                { $inc : { items_purchased : 1 } }
            )

            await cartModel.deleteMany({u_id : _id});

            return res.status(200).json({
                success : true,
                message : "Order placed successfully"
            })
        }
        else
        {
            return res.status(400).json({
                success : false,
                message : "Payment incomplete"
            })
        }
        

    }
    catch(error)
    {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}



// function to fetch all users orders for users
const fetchOrdersForUser = async (req, res, next) => {
    try
    {
        const { _id } = req.user

        const orders = await ordersModel.find({u_id : _id}).populate('p_ids')

        if(orders.length === 0)
        {
            return res.status(404).json({
                success : false,
                message : "Your cart is empty"
            });
        }
        
        res.json({
            success : true,
            orders
        })
    }
    catch(error)
    {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

// function to fetch all users orders for users
const orderStateUpdater = async (req, res, next) => {
    try
    {
        const { oid } = req.query

        const orders = await ordersModel.findById({_id : oid})

        if(!orders)
        {
            return res.status(404).json({
                success : false,
                message : "Order not found"
            });
        }

        orders.status = "Recieved"
        await orders.save()
        
        res.json({
            success : true,
        })
    }
    catch(error)
    {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

// function to fetch order
const fetchOneOrder = async (req, res, next) => {
    try
    {
        const { oid } = req.query

        const order = await ordersModel.findById(oid).populate('p_ids')

        if(!order)
        {
            return res.status(404).json({
                success : false,
                message : "Order not found"
            });
        }
        
        res.json({
            success : true,
            order
        })
    }
    catch(error)
    {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

// function to delete order
const deleteOrder = async (req, res, next) => {
    try
    {
        const { oid } = req.query

        const orders = await ordersModel.findById(oid)

        if(!orders)
        {
            return res.status(404).json({
                success : false,
                message : "Order not found"
            });
        }

        await orders.deleteOne()
        
        res.json({
            success : true,
            message : "Order deleted successfully"
        })
    }
    catch(error)
    {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

export { codOrderHandler, fetchOrdersForUser, orderStateUpdater, fetchOneOrder, deleteOrder, addOrderInStripe, verifyStripePayment }