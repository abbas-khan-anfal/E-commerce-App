import adminModel from "../models/AdminModel.js"
import bcrypt from 'bcrypt'
import adminCookie from '../utils/AdminCookie.js';


// function for loign admin
const adminLoginHandler = async (req, res, next) => {
    try
    {
        const { email, password } = req.body

        let admin = await adminModel.findOne({ email })

        if(!admin)
        {
            return res.status(404).json({
                success : false,
                message : "Incorrect Email"
            })
        }

        const isMatch = await bcrypt.compare(password, admin.password)

        if(!isMatch)
        {
            return res.status(401).json({
                success : false,
                message : "Incorrect Password"
            })
        }

        adminCookie(admin, res, "Login Successfull", 200)
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
const adminSignupHandler = async (req, res, next) => {
    try
    {
        const { username, email, password } = req.body

        let admin = await adminModel.findOne({ email })

        if(admin)
        {
            return res.status(401).json({
                success : false,
                message : "Email already exist"
            })
        }


        const hashedPassword = await bcrypt.hash(password, 10)

        const adminObj = await adminModel.create({
            username,
            email,
            password : hashedPassword
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

// function to get admin
const getAdminHandler = async (req, res, next) => {

    res.status(200).json({
        success : true,
        admin : req.admin
    })
}

// function to logout admin
const logoutAdminHandler = (req, res, next) => {

    res.status(200).cookie("adminToken", "", {
        httpOnly : true,
        expires : new Date(0)
    })
    .json({
        success : true,
        message : "Logout Successfull"
    })
}

// function to find admin when forgot password
const forgotAdminPassword = async (req, res, next) => {
    try
    {
        const { email } = req.body

        let admin = await adminModel.findOne({ email })

        if(!admin)
        {
            return res.status(404).json({
                success : false,
                message : "Incorrect Email"
            })
        }

        return res.status(200).json({
            success : true,
            message : "Email Found"
        })

        // const hashedPassword = await bcrypt.hash(password, 10)

        // admin.password = hashedPassword

        // await admin.save()
    }
    catch(error)
    {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
    
}

// function to reset admin password
const resetAdminPassword = async (req, res, next) => {
    try
    {
        const { password, email } = req.body

        const admin = await adminModel.findOne({email})

        if(!admin)
        {
            return res.status(404).json({
                success : false,
                message : "Email not found",
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        admin.password = hashedPassword
        await admin.save()

        return res.status(200).json({
            success : true,
            message : "Password Reset Successfully",
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

export { adminLoginHandler, adminSignupHandler, getAdminHandler, logoutAdminHandler, forgotAdminPassword, resetAdminPassword }