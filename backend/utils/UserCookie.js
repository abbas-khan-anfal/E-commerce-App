import jwt from 'jsonwebtoken'

const userCookie = (user, res, message, statusCode = 200) => {
    const userToken = jwt.sign({ user_Id : user._id }, process.env.JWT_SECRET)

    res.status(statusCode).cookie('userToken', userToken, {
        httpOnly: true,
        secure: true, // Required for HTTPS
        sameSite: 'None', // Required for cross-site cookies
        maxAge: 15 * 24 * 60 * 60 * 1000, // expire after 15 days
    })
    .json({
        success : true,
        message
    })
}

export default userCookie