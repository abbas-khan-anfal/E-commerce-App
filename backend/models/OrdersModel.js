import mongoose, { Types } from "mongoose";

const orderSchema = new mongoose.Schema({
    payment_session_id : {type : String, default : `si-${Math.random()}`},
    u_id : {type : Types.ObjectId, ref : 'users', required : true},
    p_ids : [{type : Types.ObjectId, ref : 'products'}],
    f_name : {type : String, required : true},
    l_name : {type : String, required : true},
    address1 : {type : String, required : true},
    address2 : {type : String, default : ""},
    phone : {type : String, required : true},
    email : {type : String, required : true},
    zip : {type : Number, required : true},
    country : {type : String, required : true, default : "Pakistan"},
    city : {type : String, required : true},
    state : {type : String, required : true},
    order_note : {type : String, default : ""},
    total_amount : {type : Number, required : true},
    status : {type : String, required : true, default : 'Pending'},
    payment_method : {type : String, required : true},
    order_date : {type : Date, required : true, default : Date.now},
})

const ordersModel = mongoose.models.orders || mongoose.model('orders', orderSchema)

export default ordersModel