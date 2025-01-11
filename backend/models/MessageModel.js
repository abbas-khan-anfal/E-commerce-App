import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    f_name : {type : String, required : true},
    email : {type : String, required : true},
    message : {type : String, required : true},
})

const messageModel = mongoose.models.messages || mongoose.model('messages', messageSchema)

export default messageModel