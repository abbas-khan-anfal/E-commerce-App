import userModel from "../models/UserModel.js"
import bcrypt from 'bcrypt'
import userCookie from '../utils/UserCookie.js';
import moment from "moment";


// function for loign admin
const UserLoginHandler = async (req, res, next) => {
    try
    {
        const { email, password } = req.body

        let user = await userModel.findOne({ email })

        if(!user)
        {
            return res.status(404).json({
                success : false,
                message : "Incorrect Email"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch)
        {
            return res.status(401).json({
                success : false,
                message : "Incorrect Password"
            })
        }

        userCookie(user, res, "Login Successfull", 200)
    }
    catch(error)
    {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

// function for signup admin
const UserSignupHandler = async (req, res, next) => {
    try
    {
        const { username, email, password } = req.body

        let user = await userModel.findOne({ email })

        if(user)
        {
            return res.status(401).json({
                success : false,
                message : "Email already exist"
            })
        }


        const hashedPassword = await bcrypt.hash(password, 10)

        const userObj = await userModel.create({
            username,
            email,
            password : hashedPassword,
            join_date : moment().format('DD/MM/YYYY'),
            items_purchased : 0
        })

        res.status(200).json({
            success : true,
            message : "Signup Successfull",
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

// function to get user
const getUserHandler = async (req, res, next) => {

    res.status(200).json({
        success : true,
        user : req.user
    })
}

// function to logout user
const logoutUserHandler = (req, res, next) => {

    res.status(200).cookie("userToken", "", {
        httpOnly : true,
        expires : new Date(0),
        secure: true, // Required for HTTPS
        sameSite: 'None', // Required for cross-site cookies
    })
    .json({
        success : true,
        message : "Logout Successfull"
    })
}

// function to find user when forgot password
const forgotUserPassword = async (req, res, next) => {
    try
    {
        const { email, password } = req.body

        let user = await userModel.findOne({ email })

        if(!user)
        {
            return res.status(404).json({
                success : false,
                message : "Incorrect Email"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        user.password = hashedPassword

        await user.save()


        res.status(200).json({
            success : true,
            message : "Password Updated",
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

// function to fetch users for dashboard
const fetchDashUsers = async (req, res, next) => {
    try
    {
        const page = parseInt(req.query.page) || 1
        const limit = 3
        let users = await userModel.find({})
        .sort({_id : 1})
        .limit(limit)
        .skip((page - 1) * 3)

        const totalUsers = await userModel.countDocuments()

        const totalPages = Math.ceil(totalUsers / limit)

        res.status(200).json({
            success : true,
            users,
            currentPage : page,
            totalPages
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

// function to delete user
const deleteUserHandler = async (req, res, next) => {
    try
    {
        const { uid } = req.params

        let user = await userModel.findById(uid)

        if(!user)
        {
            return res.status(200).json({
                success : true,
                message : "User not found"
            })
        }

        await user.deleteOne()

        res.status(200).json({
            success : true,
            message : "User Deleted Successfully"
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

export { UserLoginHandler, UserSignupHandler, getUserHandler, logoutUserHandler, forgotUserPassword, fetchDashUsers, deleteUserHandler }