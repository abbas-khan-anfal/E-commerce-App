import express from "express"
import { adminLoginHandler, adminSignupHandler, forgotAdminPassword, getAdminHandler, logoutAdminHandler, resetAdminPassword } from "../controllers/Admin.js";
import adminAuth from '../middlewares/AdminAuth.js';
// create Router
const adminRouter = express.Router()

// route for admin login
adminRouter.post('/loginadmin', adminLoginHandler)

// route for signup admin
adminRouter.post('/signupadmin', adminSignupHandler)

// route for get admin
adminRouter.get('/getadmin', adminAuth, getAdminHandler)

// route for logout admin
adminRouter.get('/logoutadmin', logoutAdminHandler)

// route for finding admin when forgot password
adminRouter.post('/adminforgotpassword', forgotAdminPassword)

// route for reset admin password
adminRouter.post('/resetpassword', resetAdminPassword)
export default adminRouter