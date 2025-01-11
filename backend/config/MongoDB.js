import mongoose from "mongoose"

const connectDB = async () => {
    try
    {
        mongoose.connect(process.env.MONGODB_URI)
        console.log("DB Connected Successfully")
    }
    catch(error)
    {
        console.log("Error Connecting DB : ", error.message)
    }
}

export default connectDB;