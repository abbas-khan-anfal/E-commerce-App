import express from "express"
import userAuth from '../middlewares/UserAuth.js';
import { deleteUserHandler, fetchDashUsers, forgotUserPassword, getUserHandler, logoutUserHandler, UserLoginHandler, UserSignupHandler } from "../controllers/User.js";
// create Router
const userRouter = express.Router()

// route for user login
userRouter.post('/loginuser', UserLoginHandler)

// route for signup user
userRouter.post('/signupuser', UserSignupHandler)

// route for get user
userRouter.get('/getuser', userAuth, getUserHandler)

// route for logout user
userRouter.get('/logoutuser', logoutUserHandler)

// route for finding user when forgot password
userRouter.post('/userforgotpassword', forgotUserPassword)

// router for fetching users for dashboard
userRouter.get('/fetchusersfordash', fetchDashUsers )

// router for delete user
userRouter.delete('/deleteuser/:uid', deleteUserHandler )


export default userRouter