import jwt from 'jsonwebtoken'
import userModel from '../models/UserModel.js';

const userAuth = async (req, res, next) => {
    try
    {
        const {userToken} = req.cookies

        if(!userToken)
        {
            return res.status(404).json({
                success : false,
                message : "Login First"
            })
        }

        const decoded = jwt.verify(userToken, process.env.JWT_SECRET)

        req.user = await userModel.findById(decoded.user_Id)
        next()
    }
    catch(error)
    {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

export default userAuth