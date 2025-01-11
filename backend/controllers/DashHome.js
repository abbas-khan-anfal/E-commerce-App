import messageModel from "../models/MessageModel.js"
import brandModel from '../models/BrandModel.js'
import categoryModel from '../models/CategoryModel.js'
import userModel from '../models/UserModel.js'
import productModel from '../models/ProductModel.js'

// function for fetch dashboard home data
const fetchDashboardHomeData = async (req, res, next) => {
    try
    {
        const [brandCount, categoryCount, productCount, userCount, messageCount] = await Promise.all([
            brandModel.countDocuments(),
            categoryModel.countDocuments(),
            productModel.countDocuments(),
            userModel.countDocuments(),
            messageModel.countDocuments()
        ]);
        // const productSoldCount = await productModel.countDocuments({status: 'sold'})
        

        res.status(200).json({
            success : true,
            brandCount : brandCount || 0,
            categoryCount : categoryCount || 0,
            productCount : productCount || 0,
            userCount : userCount || 0,
            messageCount : messageCount || 0
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

export { fetchDashboardHomeData }