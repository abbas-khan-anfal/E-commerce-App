import express from 'express'
import { fetchDashboardHomeData } from '../controllers/DashHome.js'

// create router
const homeRouter = express.Router()

// router for get total data for dashboards
homeRouter.get('/totaldata', fetchDashboardHomeData)

export default homeRouter