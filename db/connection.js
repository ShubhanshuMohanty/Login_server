import mongoose from 'mongoose'

const connectDB=async()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/smlogin");
        console.log("mongodb connected");
        
    } catch (error) {
        console.log("Failed to connect");
    }
}

export default connectDB;