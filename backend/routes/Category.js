import express from 'express'
import { addCategoryhandler, deleteCategoryHandler, fetchDashCategories, showCategoryInForm, updateCategoryHandler } from '../controllers/Category.js'

// create router
const categoryRouter = express.Router()

// router for add category
categoryRouter.post('/add', addCategoryhandler)

// router for delete category
categoryRouter.delete('/delete/:cid', deleteCategoryHandler)

// router to show category in form
categoryRouter.get('/categoryinform/:cid', showCategoryInForm)

// router to update category
categoryRouter.put('/update/:cid', updateCategoryHandler)

// router for fetching products for dashboard
categoryRouter.get('/fetchfordash', fetchDashCategories )

export default categoryRouter