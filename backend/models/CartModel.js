import mongoose, { Types } from "mongoose"

const cartSchema = new mongoose.Schema({
    u_id : {type : Types.ObjectId, ref : "users", required : true},
    p_id : {type : Types.ObjectId, ref : "products", required : true},
    qty : {type : Number, required : true, default : 1},
})

const cartModel = mongoose.models.cart || mongoose.model('cart', cartSchema)

export default cartModel