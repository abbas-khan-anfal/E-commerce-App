import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({
    c_name : {type : String, required : true},
    total_products : {type : Number, default : 0},
})

const categoryModel = mongoose.models.categories || mongoose.model('categories', categorySchema)

export default categoryModel