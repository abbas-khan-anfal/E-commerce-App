import jwt from 'jsonwebtoken'

const adminCookie = (admin, res, message, statusCode = 200) => {
    const adminToken = jwt.sign({ admin_Id : admin._id }, process.env.JWT_SECRET)

    res.status(statusCode).cookie('adminToken', adminToken, {
        httpOnly : true,
        maxAge : 15 * 24 * 60 * 60 * 1000 // expire after 15 days
    })
    .json({
        success : true,
        message
    })
}

export default adminCookie