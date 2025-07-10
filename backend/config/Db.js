import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://mydemoforuser:demo500account25@cluster0.updwn.mongodb.net/ecommerce?retryWrites=true&w=majority');
        console.log('DB Connected Successfully');
    } catch (error) {
        console.log('Error Connecting DB:', error);
    }
};

export default connectDB;
