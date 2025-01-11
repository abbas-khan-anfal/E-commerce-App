import mongoose, { Types } from "mongoose";

const productSchema = new mongoose.Schema({
    p_title: { type: String, required: true },
    p_desc: { type: String, required: true },
    p_category: { type: Types.ObjectId, ref: 'categories', required: true }, // reference category ID
    p_brand: {type : Types.ObjectId, ref : 'brands', required : true},   // reference brand ID
    original_price: { type: Number, required: true },
    fixed_price: { type: Number, required: true },
    p_qty: { type: Number, required: true },
    img_path1: { type: String, required: true },
    img_path2: { type: String, required: true },
    img_path3: { type: String, required: true },
    pubId1: { type: String, required: true },
    pubId2: { type: String, required: true },
    pubId3: { type: String, required: true },
});

const productModel = mongoose.models.products || mongoose.model('products', productSchema);

export default productModel;
