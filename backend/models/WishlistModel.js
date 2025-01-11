import mongoose, { Types } from "mongoose"

const wishlistSchema = new mongoose.Schema({
    u_id : {type : Types.ObjectId, ref : "users", required : true},
    p_id : {type : Types.ObjectId, ref : "products", required : true}
})

const wishlistModel = mongoose.models.wishlist || mongoose.model('wishlist', wishlistSchema)

export default wishlistModel