import wishlistModel from '../models/WishlistModel.js';

// function for add product in wishlist
const addWishlistHandler = async (req, res, next) => {
    try
    {
        const { pid } = req.params;

        // Check if the product already exists in the user's wishlist
        const wishlistItem = await wishlistModel.findOne({ u_id: req.user._id, p_id: pid });

        if (wishlistItem) {
            await wishlistItem.deleteOne()
            return res.status(200).json({
                success : false,
                message : "Product removed from wishlist"
            })
        }

        // Add product to wishlist if it doesn't already exist
        await wishlistModel.create({
            p_id: pid,
            u_id: req.user._id,
        });



        res.status(200).json({
            success : true,
            message : "Product Added In Wishlist"
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

// function for remove product from wishlist
const removeWishlistHandler = async (req, res, next) => {
    try
    {
        const { pid } = req.params;

        // Check if the product already exists in the user's wishlist
        const wishlistItem = await wishlistModel.findOne({ u_id: req.user._id, p_id: pid });

        if (!wishlistItem) {
            return res.status(404).json({
                success: false,
                message: "Product not found in wishlist",
            });
        }

        // Delete the product from the wishlist
        await wishlistItem.deleteOne();

        res.status(200).json({
            success: true,
            message: "Product removed from wishlist",
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

// function for fetching all wishlist products
const getAllWlistProducts = async (req, res, next) => {
    try
    {
        const uid = req.user._id;

        // Find all wishlist items for the user and populate product details
        const wishlists = await wishlistModel.find({ u_id: uid }).populate('p_id');

        // Extract populated products
        const allProducts = wishlists.map((wishlistItem) => wishlistItem.p_id);

        res.status(200).json({
            success: true,
            allProducts
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

// function for fetching total count of products in wishlist
const totalWshItems = async (req, res, next) => {
    try
    {
        const uid = req.user._id;
        // get toatl count of wishlist items where uid = u_id
        const totalItems = await wishlistModel.countDocuments({ u_id: uid });

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

export { addWishlistHandler, removeWishlistHandler, getAllWlistProducts, totalWshItems }