import express from 'express'
import { addBrandhandler, deleteBrandHandler, fetchDashBrands, showBrandInForm, updateBrandHandler } from '../controllers/Brand.js'

// create router
const brandRouter = express.Router()

// router for add brand
brandRouter.post('/add', addBrandhandler)

// router for delete brand
brandRouter.delete('/delete/:bid', deleteBrandHandler)

// router to show brand in form
brandRouter.get('/brandinform/:bid', showBrandInForm)

// router to update brand
brandRouter.put('/update/:bid', updateBrandHandler)

// router for fetching brands for dashboard
brandRouter.get('/fetchfordash', fetchDashBrands )

export default brandRouter