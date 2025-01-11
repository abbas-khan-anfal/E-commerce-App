import productModel from "../models/ProductModel.js"
import deleteFileHandler from '../utils/DeleteFile.js'
import path from 'path'
import mongoose from "mongoose"
import categoryModel from "../models/CategoryModel.js"
import brandModel from '../models/BrandModel.js';

// function for add product
const addProductHandler = async (req, res, next) => {
    try
    {

        const img_path1 = req.files.img1?.[0]?.path || ""
        const img_path2 = req.files.img2?.[0]?.path || ""
        const img_path3 = req.files.img3?.[0]?.path || ""
        const { p_title, p_desc, p_category, p_brand, original_price, fixed_price, p_qty } = req.body

        // Extract the public_id from each uploaded file
        const pubId1 = req.files.img1?.[0]?.filename || ""; // public_id for img1
        const pubId2 = req.files.img2?.[0]?.filename || ""; // public_id for img2
        const pubId3 = req.files.img3?.[0]?.filename || ""; // public_id for img3
        

        let product = await productModel.create({p_title,p_desc,p_category,p_brand,original_price,fixed_price,p_qty,img_path1,img_path2,img_path3,pubId1, pubId2, pubId3
        })

        // // increment the total_products in category & brand also
        const [updatedCategory, updatedBrand] = await Promise.all([
            categoryModel.findByIdAndUpdate(
              product.p_category,
              { $inc: { total_products: 1 } },
              { new: true, runValidators: true }
            ),
            brandModel.findByIdAndUpdate(
              product.p_brand,
              { $inc: { total_products: 1 } },
              { new: true, runValidators: true }
            )
          ]);
          


        res.status(200).json({
            success : true,
            message : "Product Saved Successfully",
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

// function for delete product
const deleteProductHandler = async (req, res, next) => {
    try
    {
        const { pid } = req.params

        let product = await productModel.findById(pid)

        if(!product)
        {
            return res.status(404).json({
                success : false,
                message : "Product Not Found"
            })
        }

        for (let i = 1; i <= 3; i++) {
            const imgPath = product[`pubId${i}`]; // Access the path using bracket notation for dynamically accessing img
            if (imgPath) {
                await deleteFileHandler(imgPath); // Pass the actual image path to deleteFileHandler
            }
        }

        // increment in the related cateory & brand with this product
        const [ updatedCategory, updatedBrand ] = await Promise.all([
            categoryModel.findByIdAndUpdate(
                product.p_category,
                {$inc : { total_products : -1}},
                {new : true, runValidators : true}
            ),
            brandModel.findByIdAndUpdate(
                product.p_brand,
                {$inc : { total_products : -1}},
                {new : true, runValidators : true}
            )
        ])

        product = await product.deleteOne()

        res.status(200).json({
            success : true,
            message : "Product Deleted Successfully",
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

// function to fetch product for dashboard
const fetchDashProducts = async (req, res, next) => {
    try
    {
        const page = parseInt(req.query.page) || 1
        const limit = 3
        let products = await productModel.find({})
        .sort({_id : 1})
        .limit(limit)
        .skip((page - 1) * limit)

        const totalProducts = await productModel.countDocuments()

        const totalPages = Math.ceil(totalProducts / limit)

        res.status(200).json({
            success : true,
            products,
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

// function to show product in form for update and also in single product view
const showProductInForm = async (req, res, next) => {
    try
    {
        const { pid } = req.params

        // Validate the ObjectId
        if (!mongoose.Types.ObjectId.isValid(pid)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Product ID",
            });
        }

        let product = await productModel.findById(pid)

        if(!product)
        {
            return res.status(401).json({
                success : false,
                message : "Product Not Found"
            })
        }

        res.status(200).json({
            success : true,
            product
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

// function to update product
const updateProductHandler = async (req, res, next) => {
    // const session = await productModel.startSession();
    // session.startTransaction();

    try {
            const { pid } = req.params;
            const { p_title, p_desc, p_category, p_brand, p_price, p_qty } = req.body;

            let product = await productModel.findById(pid);

            // Check if the product exists before proceeding
            if (!product) {
                // Delete uploaded files if product is not found
                const img_path1 = req.files.img1?.[0]?.path || "";
                const img_path2 = req.files.img2?.[0]?.path || "";
                const img_path3 = req.files.img3?.[0]?.path || "";

                

                if (img_path1) await deleteFileHandler(img_path1);
                if (img_path2) await deleteFileHandler(img_path2);
                if (img_path3) await deleteFileHandler(img_path3);

                return res.status(404).json({
                    success: false,
                    message: "Product Not Found"
                });
            }

            // Define new paths or keep existing ones if no new file uploaded
            const img_path1 = req.files.img1?.[0]?.path || product.img_path1 || "";
            const pubId1 = req.files.img1?.[0]?.filename || product.pubId1 || ""


            const img_path2 = req.files.img2?.[0]?.path || product.img_path2 || "";
            const pubId2 = req.files.img2?.[0]?.filename || product.pubId2 || ""


            const img_path3 = req.files.img3?.[0]?.path || product.img_path3 || "";
            const pubId3 = req.files.img3?.[0]?.filename || product.pubId3 || ""

            // Helper to handle image updates
            const updateImagePath = async (oldPath, newPath) => {
                if (oldPath !== newPath && oldPath) await deleteFileHandler(oldPath);
                return newPath;
            };

            // Update product fields
            product.pubId1 = await updateImagePath(product.pubId1, pubId1);
            product.pubId2 = await updateImagePath(product.pubId2, pubId2);
            product.pubId3 = await updateImagePath(product.pubId3, pubId3);
            product.p_title = p_title;
            product.p_desc = p_desc;
            product.p_category = p_category;
            product.p_brand = p_brand;
            product.p_price = p_price;
            product.p_qty = p_qty;
            product.img_path1 = img_path1
            product.img_path2 = img_path2
            product.img_path3 = img_path3

            await product.save();

            res.status(200).json({
                success: true,
                message: "Product Updated Successfully",
            });
        }
        catch(error)
        {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
};

// function to search products
const searchProductsHandler = async (req, res, next) => {
    try
    {
        const { search } = req.params

        let filter;
        search ? (
            filter = {
                $or : [
                    {p_title : {$regex : search, $options : "i"}},
                    {p_desc : {$regex : search, $options : "i"}},
                ]
            }
        )
        : filter = {}

        let searchedProducts = await productModel.find(filter)

        if(searchedProducts.length === 0)
        {
            return res.status(404).json({
                success : false,
                message : "No product found for this search term",
                search,
            })
        }

        res.status(200).json({
            success : true,
            searchedProducts,
            search
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

// function to fetch product for shop page
const fetchProductsForShop = async (req, res, next) => {
    try
    {
        const price = Number(req.query.price) || 0
        const cid = req.query.cid

        if(req.query.cid)
        {
            // Fetch products if cid exist
            const products = await productModel.find({p_category : cid});
    
            return res.status(200).json({
                success: true,
                products
            })
        }

        // Create the filter based on the price value
        const filter = price === 0 ? {} : { fixed_price: { $lte: price } };

        // Fetch products based on the filter
        const products = await productModel.find(filter);
 
         res.status(200).json({
             success: true,
             products
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


// function to fetch products in home page
const fetchHomePageProducts = async (req, res, next) => {
    try
    {
        const products = await productModel.aggregate([
            { $sample: { size: 4 } } // Randomly selects 4 products
        ])
 
         res.status(200).json({
             success: true,
             products
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



export { addProductHandler, deleteProductHandler, fetchDashProducts, showProductInForm, updateProductHandler, searchProductsHandler, fetchProductsForShop , fetchHomePageProducts}