import mongoose from "mongoose"

const brandSchema = new mongoose.Schema({
    b_name : {type : String, required : true},
    total_products : {type : Number, default : 0},
})

const brandModel = mongoose.models.brands || mongoose.model('brands', brandSchema)

export default brandModel