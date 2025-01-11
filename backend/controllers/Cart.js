import cartModel from "../models/CartModel.js"
import productModel from "../models/ProductModel.js"


// function for add to cart product
const addToCartHandler = async (req, res, next) => {
    try
    {
        const pid = req.query.pid
        const qty = Number(req.query.qty) || 1
        const { _id } = req.user

        if(!pid)
        {
            return res.status(404).json({
                success : false,
                message : "Product not found"
            })
        }

        // check if the product alreay in cart or not
        const isCartExist = await cartModel.findOne({p_id : pid, u_id : _id})

        if(isCartExist)
        {
            return res.status(401).json({
                    success : false,
                    message : "Product alreay exist in cart"
                })
        }

        // add data in cart
        const addedCart = await cartModel.create({ u_id : _id, p_id : pid, qty : qty })

        res.status(200).json({
            success : true,
            message : "Product added to cart",
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


// function fetch cart item in cart page
const fetchCartItemsHandler = async (req, res, next) => {
    try
    {
        const { _id } = req.user

        // fetch all products in the cart with this specific id (_id)
        const products = await cartModel.find({u_id : _id}).populate('p_id')

        //check if cart is empty or not
        if(!products)
        {
            return res.status(404).json({
                success : false,
                message : "Your cart is empty"
            })
        }

        res.status(200).json({
            success : true,
            products
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

// function for update cart item
const updateCartItemHandler = async (req, res, next) => {
    try
    {
        const { _id } = req.user
        const { pid } = req.params
        const { qty } = req.body

        // first get cart item
        const cartItem = await cartModel.findOne({u_id : _id, p_id : pid})
        //check if cart item exist or not
        if(!cartItem)
        {
            return res.status(404).json({
                success : false,
                message : "Item not found in cart"
            })
        }

        // update cart qty
        cartItem.qty = qty
        // save cart item
        await cartItem.save()

        res.status(200).json({
            success : true,
            message : "Cart item updated",
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

// function for fetching total count of products in cart
const totalCartItems = async (req, res, next) => {
    try
    {
        const uid = req.user._id;
        // get toatl count of cart items where uid = u_id
        const totalItems = await cartModel.countDocuments({ u_id: uid });

        res.status(200).json({
            success: true,
            totalItems
        });
    }
    catch(error)
    {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

// function for remove product from cart
const removeCartItem = async (req, res, next) => {
    try
    {
        const { pid } = req.params;

        // Check if the product already exists in the user's cart
        const cartItem = await cartModel.findOne({ u_id: req.user._id, p_id: pid });

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart",
            });
        }

        // Delete the product from the cart
        await cartItem.deleteOne();

        res.status(200).json({
            success: true,
            message: "Product removed from cart",
        });
    }
    catch(error)
    {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

export { addToCartHandler, fetchCartItemsHandler, updateCartItemHandler, totalCartItems, removeCartItem }