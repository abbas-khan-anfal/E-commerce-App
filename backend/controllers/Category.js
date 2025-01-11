import categoryModel from '../models/CategoryModel.js';

// function for add category
const addCategoryhandler = async (req, res, next) => {
    try
    {
        const { c_name } = req.body

        let category = await categoryModel.findOne({ c_name })

        if(category)
        {
            return res.status(401).json({
                success : false,
                message : "Category already exist"
            })
        }

        category = await categoryModel.create({c_name})

        res.status(200).json({
            success : true,
            message : "Category Saved Successfully",
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

// function for delete category
const deleteCategoryHandler = async (req, res, next) => {
    try
    {
        const { cid } = req.params

        let category = await categoryModel.findById(cid)

        if(!category)
        {
            return res.status(401).json({
                success : false,
                message : "Category Not Found"
            })
        }

        category = await category.deleteOne()

        res.status(200).json({
            success : true,
            message : "Category Deleted Successfully",
            category
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

// function to show category in form for update
const showCategoryInForm = async (req, res, next) => {
    try
    {
        const { cid } = req.params

        let category = await categoryModel.findById(cid)

        if(!category)
        {
            return res.status(401).json({
                success : false,
                message : "Category Not Found"
            })
        }

        res.status(200).json({
            success : true,
            category
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

// function to update category
const updateCategoryHandler = async (req, res, next) => {
    try
    {
        const { cid } = req.params
        const { c_name } = req.body

        let category = await categoryModel.findById(cid)

        if(!category)
        {
            return res.status(401).json({
                success : false,
                message : "Category Not Found"
            })
        }

        category.c_name = c_name
        category = await category.save()

        res.status(200).json({
            success : true,
            message : "Category Updated Successfully",
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

// function to fetch categories for dashboard
const fetchDashCategories = async (req, res, next) => {
    try
    {
        const page = parseInt(req.query.page) || 1
        const limit = 3
        if(req.query.page)
        {
            let categories = await categoryModel.find({})
            .sort({_id : 1})
            .limit(limit)
            .skip((page - 1) * limit)

            const totalCategories = await categoryModel.countDocuments()

            const totalPages = Math.ceil(totalCategories / limit)

            return res.status(200).json({
                success : true,
                categories,
                currentPage : page,
                totalPages
            })
        }

        let categories = await categoryModel.find({}).sort({_id : 1})

        res.status(200).json({
            success : true,
            categories,
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

export { addCategoryhandler, deleteCategoryHandler, showCategoryInForm, updateCategoryHandler, fetchDashCategories }