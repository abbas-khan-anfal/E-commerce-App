import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username : {type : String, required : true},
    email : {type : String, required : true},
    password : {type : String, required : true},
    join_date : {type : String, required : true},
    items_purchased : {type : Number, required : true},
})

const userModel = mongoose.models.users || mongoose.model('users', userSchema)

export default userModel