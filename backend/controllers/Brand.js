import brandModel from '../models/BrandModel.js';

// function for add brand
const addBrandhandler = async (req, res, next) => {
    try
    {
        const { b_name } = req.body

        let brand = await brandModel.findOne({ b_name })

        if(brand)
        {
            return res.status(401).json({
                success : false,
                message : "Brand already exist"
            })
        }

        brand = await brandModel.create({ b_name })

        res.status(200).json({
            success : true,
            message : "Brand Saved Successfully",
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

// function for delete brand
const deleteBrandHandler = async (req, res, next) => {
    try
    {
        const { bid } = req.params

        let brand = await brandModel.findById(bid)

        if(!brand)
        {
            return res.status(401).json({
                success : false,
                message : "Brand Not Found"
            })
        }

        brand = await brand.deleteOne()

        res.status(200).json({
            success : true,
            message : "Brand Deleted Successfully",
            brand
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

// function to show brand in form for update
const showBrandInForm = async (req, res, next) => {
    try
    {
        const { bid } = req.params

        let brand = await brandModel.findById(bid)

        if(!brand)
        {
            return res.status(401).json({
                success : false,
                message : "Brand Not Found"
            })
        }

        res.status(200).json({
            success : true,
            brand
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

// function to update brand
const updateBrandHandler = async (req, res, next) => {
    try
    {
        const { bid } = req.params
        const { b_name } = req.body

        let brand = await brandModel.findById(bid)

        if(!brand)
        {
            return res.status(401).json({
                success : false,
                message : "Brand Not Found"
            })
        }

        brand.b_name = b_name
        brand = await brand.save()

        res.status(200).json({
            success : true,
            message : "Brand Updated Successfully",
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

// function to fetch brands for dashboard
const fetchDashBrands = async (req, res, next) => {
    try
    {
            const page = parseInt(req.query.page) || 1
            const limit = 3
            if(req.query.page)
            {
                let brands = await brandModel.find({})
                .sort({_id : 1})
                .limit(limit)
                .skip((page - 1) * limit)

                const totalBrands = await brandModel.countDocuments()

                const totalPages = Math.ceil(totalBrands / limit)

                return res.status(200).json({
                    success : true,
                    brands,
                    currentPages : page,
                    totalPages,
                })
        }


        let brands = await brandModel.find({})
        .sort({_id : 1})

        return res.status(200).json({
            success : true,
            brands,
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

export { addBrandhandler, deleteBrandHandler, showBrandInForm, updateBrandHandler, fetchDashBrands }