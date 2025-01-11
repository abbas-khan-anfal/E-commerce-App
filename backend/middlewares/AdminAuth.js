import jwt from 'jsonwebtoken'
import adminModel from '../models/AdminModel.js'

const adminAuth = async (req, res, next) => {
    
    const { adminToken } = req.cookies

    if(!adminToken)
    {
        return res.status(404).json({
            success : false,
            message : "Login First"
        })
    }

    const decoded = jwt.verify(adminToken, process.env.JWT_SECRET)

    req.admin = await adminModel.findById(decoded.admin_Id)
    next()
}

export default adminAuth