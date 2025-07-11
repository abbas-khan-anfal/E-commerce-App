import jwt from 'jsonwebtoken'

const adminCookie = (admin, res, message, statusCode = 200) => {
    const adminToken = jwt.sign({ admin_Id : admin._id }, process.env.JWT_SECRET)

    res.status(statusCode).cookie('adminToken', adminToken, {
        httpOnly: true,
        secure: true, // Required for HTTPS
        sameSite: 'None', // Required for cross-site cookies
        maxAge: 15 * 24 * 60 * 60 * 1000,
    })
    .json({
        success : true,
        message
    })
}

export default adminCookie